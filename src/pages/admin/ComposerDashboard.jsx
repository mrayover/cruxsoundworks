// Full replacement for src/pages/admin/ComposerDashboard.jsx

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import EditWorkModal from '../../components/EditWorkModal';

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

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/composer/login');
  };

  const handleEdit = (work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWork(null);
  };

  const handleSave = (updatedWork) => {
    // Placeholder — Phase 2B will save to Firestore
    console.log('Save this work to Firestore:', updatedWork);
    handleCloseModal();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif">Composer Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Log Out
        </button>
      </div>

      <div className="grid gap-4">
        {works.map(work => (
          <div key={work.id} className="p-4 border rounded bg-gray-50">
            <h2 className="font-bold text-lg">{work.title}</h2>
            <p className="text-sm text-gray-600">{work.instrumentation}</p>
            <button
              onClick={() => handleEdit(work)}
              className="mt-2 text-blue-600 underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <EditWorkModal
        work={selectedWork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
