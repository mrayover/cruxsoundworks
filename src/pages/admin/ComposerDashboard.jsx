// Full replacement for src/pages/admin/ComposerDashboard.jsx

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import EditWorkModal from '../../components/EditWorkModal';
import AddWorkModal from '../../components/AddWorkModal';
import AddCalendarEventModal from '../../components/AddCalendarEventModal';
import EditCalendarEventModal from '../../components/EditCalendarEventModal';

export default function ComposerDashboard() {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

useEffect(() => {
  const fetchWorks = async () => {
    const querySnapshot = await getDocs(collection(db, 'works'));
    const items = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    // Sort alphabetically (or however you like)
    const sorted = [...items].sort((a, b) =>
      (a.title || '').localeCompare(b.title || '')
    );

    // Assign displayOrder if missing
    const updates = [];
    sorted.forEach((work, index) => {
      if (work.displayOrder === undefined) {
        const workRef = doc(db, 'works', work.id);
        updates.push(updateDoc(workRef, { displayOrder: index + 1 }));
        work.displayOrder = index + 1;
      }
    });

    await Promise.all(updates);

    sorted.sort((a, b) => a.displayOrder - b.displayOrder);
    setWorks(sorted);
  };

  fetchWorks();
}, []);
const [calendarEvents, setCalendarEvents] = useState([]);
const [showEventModal, setShowEventModal] = useState(false);

useEffect(() => {
  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, 'calendarEvents'));
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    const sorted = [...items].sort((a, b) => new Date(a.date) - new Date(b.date));
    setCalendarEvents(sorted);
  };

  fetchEvents();
}, []);

const handleAddEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, 'calendarEvents'), eventData);
    setCalendarEvents(prev => [...prev, { id: docRef.id, ...eventData }]);
  } catch (err) {
    console.error('Error adding event:', err);
    alert('Failed to add event.');
  }
};
const handleEditEvent = (event) => {
  setSelectedEvent(event);
  setIsEditEventModalOpen(true);
  const handleDuplicateEvent = (event) => {
  const copied = {
    title: event.title,
    date: '', // clear date so user picks a new one
    location: event.location,
    description: event.description,
    link: event.link,
  };

  setSelectedEvent(copied);
  setIsEditEventModalOpen(false);
  setTimeout(() => setShowEventModal(true), 100); // delay to avoid modal collision
};
};

const handleSaveEvent = async (updatedEvent) => {
  const eventRef = doc(db, 'calendarEvents', updatedEvent.id);
  try {
    await updateDoc(eventRef, {
      title: updatedEvent.title,
      date: updatedEvent.date,
      location: updatedEvent.location,
      description: updatedEvent.description,
      link: updatedEvent.link,
    });

    setCalendarEvents(prev =>
      prev.map(ev => (ev.id === updatedEvent.id ? { ...updatedEvent } : ev))
    );
  } catch (err) {
    console.error('Error updating event:', err);
    alert('Failed to save event.');
  }
};

const handleDeleteEvent = async (event) => {
  const confirmed = window.confirm(`Delete event: "${event.title}"? This cannot be undone.`);
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, 'calendarEvents', event.id));
    setCalendarEvents(prev => prev.filter(ev => ev.id !== event.id));
  } catch (err) {
    console.error('Error deleting event:', err);
    alert('Failed to delete event.');
  }
};

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddWork = (newWork) => {
  setWorks((prev) => [...prev, newWork]);
};

  const [showToast, setShowToast] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/composer/login');
  };

  const handleEdit = (work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleDelete = async (work) => {
  const confirmed = window.confirm(`Delete "${work.title}"? This cannot be undone.`);
  if (!confirmed) return;

  try {
    await deleteDoc(doc(db, 'works', work.id));
    setWorks((prev) => prev.filter((w) => w.id !== work.id));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  } catch (err) {
    console.error('Error deleting work:', err);
    alert('Failed to delete work.');
  }
};


const updateWorkOrder = async (targetWork, swapWithWork) => {
  const targetRef = doc(db, 'works', targetWork.id);
  const swapRef = doc(db, 'works', swapWithWork.id);

  const targetOrder = targetWork.displayOrder;
  const swapOrder = swapWithWork.displayOrder;

  try {
    await updateDoc(targetRef, { displayOrder: swapOrder });
    await updateDoc(swapRef, { displayOrder: targetOrder });

    setWorks((prev) =>
      prev.map(w =>
        w.id === targetWork.id
          ? { ...w, displayOrder: swapOrder }
          : w.id === swapWithWork.id
          ? { ...w, displayOrder: targetOrder }
          : w
      ).sort((a, b) => a.displayOrder - b.displayOrder)
    );
  } catch (err) {
    console.error('Error reordering:', err);
    alert('Failed to update order.');
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

const handleSave = async (updatedWork) => {
  if (!updatedWork.id) return;

  const slug = updatedWork.title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

  const workRef = doc(db, 'works', updatedWork.id);
  const updatedData = {
    ...updatedWork,
    slug,
  };

  try {
    await updateDoc(workRef, updatedData);

    // Refresh local list
    setWorks((prev) =>
      prev.map((w) => (w.id === updatedWork.id ? updatedData : w))
    );
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);

    handleCloseModal();
 
  } catch (err) {
    console.error('Error updating Firestore:', err);
    alert('Error saving changes.');
  }
};


 return (
  <div className="max-w-4xl mx-auto py-10 px-4">
    {/* Header with New Work and Logout buttons */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-serif">Composer Admin Panel</h1>
      <div className="flex gap-2">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          + New Work
        </button>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Log Out
        </button>
      </div>
    </div>
    {/* List of Works */}
    <div className="grid gap-4">
      {works.map((work, i) => (
        <div key={work.id} className="p-4 border rounded bg-gray-50">
          <h2 className="font-bold text-lg">{work.title}</h2>
          <p className="text-sm text-gray-600">{work.instrumentation}</p>
          <div className="flex gap-2 mt-1">
            <button
              disabled={i === 0}
              onClick={() => updateWorkOrder(work, works[i - 1])}
              className="text-xs text-gray-500 hover:underline disabled:opacity-30"
            >
              ↑ Up
            </button>
            <button
              disabled={i === works.length - 1}
              onClick={() => updateWorkOrder(work, works[i + 1])}
              className="text-xs text-gray-500 hover:underline disabled:opacity-30"
            >
              ↓ Down
            </button>
          </div>
          {work.duration && (
            <p className="text-sm text-gray-500 italic">Duration: {work.duration}</p>
          )}
          
          <div className="mt-2 flex gap-4">
            <button
              onClick={() => handleEdit(work)}
              className="text-blue-600 underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(work)}
              className="text-red-600 underline"
            >
              Delete
            </button>
            
          </div>
          
        </div>
      ))}
    </div>

<hr className="my-10" />

<div className="mb-6 flex justify-between items-center">
  <h2 className="text-xl font-serif">📅 Calendar Events</h2>
  <button
    onClick={() => setShowEventModal(true)}
    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
  >
    + New Event
  </button>
</div>

<ul className="grid gap-4">
  {calendarEvents.map(ev => (
<li key={ev.id} className="p-4 border rounded bg-white">
  <h3 className="font-semibold">{ev.title}</h3>
  <p className="text-sm text-gray-600">{new Date(ev.date).toLocaleString()}</p>
  <p className="text-sm">{ev.location}</p>
  {ev.link && (
    <a href={ev.link} target="_blank" className="text-blue-500 text-sm underline">More Info</a>
  )}
  <div className="flex gap-4 mt-2">
    <button onClick={() => handleEditEvent(ev)} className="text-blue-600 text-sm underline">Edit</button>
    <button onClick={() => handleDeleteEvent(ev)} className="text-red-600 text-sm underline">Delete</button>
    <button onClick={() => handleDuplicateEvent(ev)} className="text-sm text-gray-700 underline">Duplicate</button>
  </div>
</li>
  ))}
</ul>

<EditCalendarEventModal
  isOpen={isEditEventModalOpen}
  onClose={() => setIsEditEventModalOpen(false)}
  onSave={handleSaveEvent}
  event={selectedEvent}
/>
<AddCalendarEventModal
  isOpen={showEventModal}
  onClose={() => setShowEventModal(false)}
  onAdd={handleAddEvent}
  initialValues={selectedEvent}
/>

    {/* Edit Modal */}
    <EditWorkModal
      work={selectedWork}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSave={handleSave}
    />

    {/* Add Modal */}
    <AddWorkModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      onAdd={handleAddWork}
    />

    {/* Toast */}
    {showToast && (
      <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
        ✅ Changes saved!
      </div>
    )}
  </div>
  
);
}