// Full replacement for src/pages/admin/ComposerDashboard.jsx

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import EditWorkModal from '../../components/EditWorkModal';
import AddWorkModal from '../../components/AddWorkModal';

export default function ComposerDashboard() {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = async () => {
      const querySnapshot = await getDocs(collection(db, 'works'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorks(items);
    };
    fetchWorks();
  }, []);

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
      {works.map((work) => (
        <div key={work.id} className="p-4 border rounded bg-gray-50">
          <h2 className="font-bold text-lg">{work.title}</h2>
          <p className="text-sm text-gray-600">{work.instrumentation}</p>
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