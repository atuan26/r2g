import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "./Calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from "react-redux";
import { loadEvent } from '../../../redux/actions/eventAction';

import EventModal from "../../Other/Modal/EventModal";

const localizer = momentLocalizer(moment);

const MyCalendar = ({ eventList, isAuthenticated, loadEvent }) => {
  const [showEventModal, setShowEventModal] = useState(false);
  // const [myEvents, setEvents] = useState(eventList)
  const [initialValues, setInitialValues] = useState({});

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setInitialValues({ start, end })
      setShowEventModal(true)
    },
    []
    // [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => {
      console.log('### event :', event)
      window.alert(event.title);
    },
    []
  )

  useEffect(() => {
    if (isAuthenticated) {
      loadEvent();
    }
  }, [isAuthenticated, loadEvent]);
  return (
    <div className="min-h-screen">
      {showEventModal && (
        <EventModal
          initialValues={initialValues}
          close={() => setShowEventModal(false)}
        />
      )}
      <div className="grid grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 ">
        <div className="col-span-4 z-base  xl:col-span-3">
          <div className=' shadow-lg rounded-2xl bg-white dark:bg-gray-700'>
            <Calendar
              localizer={localizer}
              // defaultDate={defaultDate}
              defaultView={"month"}
              events={eventList}
              startAccessor="start"
              endAccessor="end"
              popup

              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              style={{ height: 768, padding: 24 }}
            />
          </div>
        </div>
      </div>
      {/* Incoming events */}
      <div className="col-span-4 xl:col-span-1"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  eventList: state.event || [],
});

const mapDispatchtoProps = (dispatch) => ({
  loadEvent: () => dispatch(loadEvent()),
});
export default connect(mapStateToProps, mapDispatchtoProps)(MyCalendar);
