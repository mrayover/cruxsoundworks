import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import EditCalendarEventModal from '../../../components/EditCalendarEventModal';
import AddCalendarEventModal from '../../../components/AddCalendarEventModal';

export default function ComposerCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const snapshot = await getDocs(collection(db, 'calendarEvents'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(items.sort((a, b) => new Date(a.date) - new Date(b.date)));
    };
    fetchEvents();
  }, []);

  const handleAdd = async (eventData) => {
    try {
      const docRef = await addDoc(collection(db, 'calendarEvents'), eventData);
      setEvents(prev => [...prev, { id: docRef.id, ...eventData }]);
      setIsAddOpen(false);
    } catch {
      alert('Failed to add event.');
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditOpen(true);
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      await updateDoc(doc(db, 'calendarEvents', updatedEvent.id), updatedEvent);
      setEvents(prev => prev.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev));
      setIsEditOpen(false);
    } catch {
      alert('Failed to update event.');
    }
  };

  const handleDelete = async (event) => {
    if (!window.confirm(`Delete event: "${event.title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'calendarEvents', event.id));
      setEvents(prev => prev.filter(ev => ev.id !== event.id));
    } catch {
      alert('Failed to delete event.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif">📅 Calendar Events</h2>
        <button onClick={() => setIsAddOpen(true)} className="bg-blue-600 text-white px-3 py-1 rounded">+ New Event</button>
      </div>
      <ul className="grid gap-4">
        {events.map(ev => (
          <li key={ev.id} className="p-4 border rounded bg-white">
            <h3 className="font-semibold">{ev.title}</h3>
            <p className="text-sm text-gray-600">{new Date(ev.date).toLocaleString()}</p>
            <p className="text-sm">{ev.location}</p>
            {ev.link && <a href={ev.link} target="_blank" className="text-blue-500 underline text-sm">More Info</a>}
            <div className="flex gap-4 mt-2">
              <button onClick={() => handleEdit(ev)} className="text-blue-600 text-sm underline">Edit</button>
              <button onClick={() => handleDelete(ev)} className="text-red-600 text-sm underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <EditCalendarEventModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} onSave={handleUpdate} event={selectedEvent} />
      <AddCalendarEventModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} initialValues={selectedEvent} />
    </div>
  );
}