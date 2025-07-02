import React, { useEffect, useState, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
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
      />
    </div>
  );
}
