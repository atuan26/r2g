import React from 'react'
import dayjs from 'dayjs'
var calendar = require('dayjs/plugin/calendar')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.extend(calendar)

const UpcomingEvent = ({ eventList }) => {

  eventList.sort(function (a, b) {
    var keyA = new Date(a.start),
      keyB = new Date(b.start);
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  return <div
    className=' '
  >
    <div className='px-6 py-4 text-xl'>Upcoming Events</div>
    <ol
      className="relative border-l border-gray-200 dark:border-gray-700 translate-x-8 mr-12"
    >
      {eventList.map((e, i) => {
        console.log('### e :', e)
        return <EventItem event={e} />
      })}
    </ol>

  </div >
}

const EventItem = ({ event: { title, start, end, allDay, color, description } }) => {
  console.log(start, dayjs(start).fromNow())
  return <li className="mb-2 ml-6">
    <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
      <svg
        className={`w-3 h-3 text-blue-600 dark:text-blue-400`}
        color={color}
        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
    </span>
    <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white -translate-y-[2px]">{title}</h3>
    <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
      {dayjs(start).fromNow()}
    </time>
    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
  </li>
}


export default UpcomingEvent