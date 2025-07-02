import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'calendarEvents'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sorted);
    };

    fetchEvents();
  }, []);

return (
  <div className="max-w-3xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold mb-6">Upcoming Performances</h1>

    {events.length === 0 ? (
      <p className="text-center text-gray-600 italic">No upcoming performances yet. Check back soon!</p>
    ) : (
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event.id} className="border p-4 rounded">
            <h2 className="font-semibold text-lg">{event.title}</h2>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
            <p className="text-sm text-gray-700">{event.location}</p>
            {event.description && <p className="text-sm mt-2">{event.description}</p>}
            {event.link && (
              <a href={event.link} target="_blank" className="text-blue-600 underline mt-1 block">More Info</a>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}