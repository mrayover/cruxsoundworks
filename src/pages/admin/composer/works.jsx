// File: works.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import EditWorkModal from '../../../components/EditWorkModal';
import AddWorkModal from '../../../components/AddWorkModal';

export default function ComposerWorks() {
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchWorks = async () => {
      const snapshot = await getDocs(collection(db, 'works'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = [...items].sort((a, b) => a.displayOrder - b.displayOrder);
      setWorks(sorted);
    };
    fetchWorks();
  }, []);

  const handleEdit = (work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  const handleDelete = async (work) => {
    if (!window.confirm(`Delete "${work.title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'works', work.id));
      setWorks(prev => prev.filter(w => w.id !== work.id));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch {
      alert('Failed to delete work.');
    }
  };

  const updateWorkOrder = async (target, swapWith) => {
    const targetRef = doc(db, 'works', target.id);
    const swapRef = doc(db, 'works', swapWith.id);
    try {
      await updateDoc(targetRef, { displayOrder: swapWith.displayOrder });
      await updateDoc(swapRef, { displayOrder: target.displayOrder });
      const updated = works.map(w => {
        if (w.id === target.id) return { ...w, displayOrder: swapWith.displayOrder };
        if (w.id === swapWith.id) return { ...w, displayOrder: target.displayOrder };
        return w;
      }).sort((a, b) => a.displayOrder - b.displayOrder);
      setWorks(updated);
    } catch {
      alert('Failed to update order.');
    }
  };

  const handleSave = async (updatedWork) => {
    const slug = updatedWork.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    try {
      await updateDoc(doc(db, 'works', updatedWork.id), { ...updatedWork, slug });
      setWorks(prev => prev.map(w => w.id === updatedWork.id ? { ...updatedWork, slug } : w));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
      setIsModalOpen(false);
    } catch {
      alert('Error saving changes.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-serif">🎵 Works</h2>
        <button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 text-white px-3 py-1 rounded">+ New Work</button>
      </div>
      <div className="grid gap-4">
        {works.map((w, i) => (
          <div key={w.id} className="p-4 border rounded bg-gray-50">
            <h3 className="font-bold">{w.title}</h3>
            <p className="text-sm text-gray-600">{w.instrumentation}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(w)} className="text-blue-600 underline text-sm">Edit</button>
              <button onClick={() => handleDelete(w)} className="text-red-600 underline text-sm">Delete</button>
              <button disabled={i === 0} onClick={() => updateWorkOrder(w, works[i - 1])} className="text-xs">↑</button>
              <button disabled={i === works.length - 1} onClick={() => updateWorkOrder(w, works[i + 1])} className="text-xs">↓</button>
            </div>
          </div>
        ))}
      </div>

      <EditWorkModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} work={selectedWork} />
      <AddWorkModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={w => setWorks(prev => [...prev, w])} />

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">✅ Changes saved!</div>
      )}
    </div>
  );
}
