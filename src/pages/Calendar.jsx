import React, { useEffect, useState, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import enUS from 'date-fns/locale/en-US';


const locales = {
  'en-US': enUS,
};


const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'calendarEvents'));
      const data = snapshot.docs.map(doc => {
        const raw = doc.data();
        return {
          id: doc.id,
          title: raw.title,
          start: new Date(raw.date),
          end: new Date(raw.date),
          location: raw.location,
          description: raw.description,
          link: raw.link,
        };
      });
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const eventPropGetter = () => ({
    style: {
      backgroundColor: '#403233',
      color: '#fff',
      borderRadius: '4px',
      padding: '2px',
    },
  });


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Performance Calendar</h1>
      <BigCalendar


        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event) => setSelectedEvent(event)}
        />
                {selectedEvent && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
      <h2 className="text-xl font-semibold mb-2">{selectedEvent.title}</h2>
      <p className="text-sm text-gray-600 mb-1">{new Date(selectedEvent.start).toLocaleString()}</p>
      <p className="text-sm mb-2">{selectedEvent.location}</p>
      {selectedEvent.description && <p className="text-sm mb-2">{selectedEvent.description}</p>}
      {selectedEvent.link && (
        <a
          href={selectedEvent.link}
          target="_blank"
          className="text-blue-600 underline block mb-2"
        >More Info</a>
      )}
      <button
        onClick={() => setSelectedEvent(null)}
        className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
      >Close</button>
    </div>
  </div>
)}
  alert(
    `${event.title}\n\n${event.location}\n${new Date(event.start).toLocaleString()}\n\n${event.description || ''}`
  );
    </div>
  );
}
