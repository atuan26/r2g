import React, { useCallback, useEffect, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { connect } from "react-redux";
import { deleteEvent, loadEvent } from "../../../redux/actions/eventAction";

import EventModal from "../../Other/Modal/EventModal";
import EventList from "./EventList";
import {
  AgendaEvent,
  MonthEvent,
  RBCToolbar,
  WeekEvent,
  WeekHeader,
} from "./RBCCustomComponent";
import EventDetailPopup from "./EventDetailPopup";
import { relativeOffsetPosition } from "../../../ultils/relativeOffsetPosition";
import { usePrevious } from "../../../ultils/hooks";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ eventList, isAuthenticated, loadEvent, deleteEvent }) => {
  const calendarRef = useRef();
  const popupRef = useRef();
  const [showEventModal, setShowEventModal] = useState({
    show: false,
    initValues: {},
  });

  const [showEventDetailPopup, setShowEventDetailPopup] = useState({});
  const showEventDetailPopupPre = usePrevious(showEventDetailPopup);
  console.log("### showEventDetailPopup :", showEventDetailPopupPre);

  function isDescendant(parent, child) {
    var node = child.parentElement;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  useEffect(() => {
    const checkClickInside = (event) => {
      const isOtherPopupButton =
        event?.target?.className.includes("popUpButton") ||
        event?.target?.parentElement?.className.includes("popUpButton");
      if (
        !isDescendant(popupRef.current, event.target) &&
        showEventDetailPopup?.event &&
        !isOtherPopupButton
      ) {
        setShowEventDetailPopup({});
      }
    };

    window.addEventListener("click", checkClickInside);

    return () => {
      window.removeEventListener("click", checkClickInside);
    };
  }, [showEventDetailPopup]);

  const handleSelectSlot = ({ start, end }) => {
    setShowEventModal({ show: true, initValues: { start, end } });
  };
  // [showEventDetailPopupPre]

  const handleDoubleClickEvent = useCallback((event) => {
    setShowEventModal({ show: true, initValues: event });
  }, []);

  const handleSelectEvent = useCallback((event, e) => {
    const relativePos = relativeOffsetPosition(
      calendarRef.current,
      e.target.parentElement.parentElement
    );
    setShowEventDetailPopup({
      event: event,
      rect: relativePos,
      editEvent: () => {
        setShowEventModal({ show: true, initValues: event });
      },
      deleteEvent: () => {
        deleteEvent(event);
      },
      close: () => setShowEventDetailPopup({}),
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadEvent();
    }
  }, [isAuthenticated, loadEvent]);

  return (
    <div ref={calendarRef} className="relative min-h-screen">
      {showEventModal.show && (
        <EventModal
          initialValues={showEventModal.initValues}
          close={() => setShowEventModal({ show: false })}
        />
      )}
      <div className=" grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        <div className="col-span-4 z-base  xl:col-span-3">
          <div className="relative shadow-lg rounded-2xl bg-white dark:bg-gray-700">
            <Calendar
              localizer={localizer}
              defaultView={"month"}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              popup
              components={{
                month: { event: MonthEvent },
                week: {
                  event: WeekEvent,
                  header: WeekHeader,
                },
                day: {
                  event: WeekEvent,
                },
                agenda: {
                  event: AgendaEvent,
                },
                toolbar: RBCToolbar,
              }}
              onDoubleClickEvent={handleDoubleClickEvent}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              selectable
              style={{ height: 800, padding: 24 }}
            />
            <button
              className="fixed btn btn-circle bg-[#1c64f2] border-0 hover:bg-[#1c64f2dd] bottom-20 right-20 z-20"
              onClick={() => setShowEventModal({ show: true })}
            >
              +
            </button>
          </div>
        </div>
        <div className="col-span-4 xl:col-span-1 h-full w-[99%]  flex flex-col gap-4">
          <EventList onGoing={true} eventList={eventList} />
          <EventList onGoing={false} eventList={eventList} />
        </div>
      </div>
      <div ref={popupRef}>
        {showEventDetailPopup?.event && (
          <EventDetailPopup data={showEventDetailPopup} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  eventList: state.event || [],
});

const mapDispatchtoProps = (dispatch) => ({
  loadEvent: () => dispatch(loadEvent()),
  deleteEvent: (initialValues) => dispatch(deleteEvent(initialValues)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(MyCalendar);
