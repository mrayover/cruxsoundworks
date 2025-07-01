import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AddWorkModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [instrumentation, setInstrumentation] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const [published, setPublished] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const newWork = { title, instrumentation, duration, description, imageURL, audioURL, slug, published  };

    try {
      const docRef = await addDoc(collection(db, 'works'), {
  ...newWork,
  displayOrder: Date.now() // Temporary large number to push it to the end
      });

      onAdd({ id: docRef.id, ...newWork });
      onClose();
    } catch (err) {
      console.error('Error adding work:', err);
      alert('Failed to add work.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Add New Work</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={instrumentation}
            onChange={(e) => setInstrumentation(e.target.value)}
            placeholder="Instrumentation"
          />
        <input
            className="w-full p-2 border rounded"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (e.g. 5:30)"
        />
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            placeholder="Image URL"
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={audioURL}
            onChange={(e) => setAudioURL(e.target.value)}
            placeholder="Audio URL"
          />
          <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded">
              Add Work
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
