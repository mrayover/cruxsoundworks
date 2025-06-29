import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminAddWork = () => {
  const [formData, setFormData] = useState({
    title: '',
    instrumentation: '',
    year: '',
    description: '',
    imageURL: '',
    audioURL: '',
    scoreLink: '',
    pastPerformances: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = { ...formData };
  data.year = parseInt(data.year);
  data.pastPerformances = data.pastPerformances.split('\n').filter(Boolean);
  try {
    await addDoc(collection(db, 'works'), data);
    alert('Work added!');
    // reset form
    setFormData({
      title: '',
      instrumentation: '',
      year: '',
      description: '',
      imageURL: '',
      audioURL: '',
      scoreLink: '',
      pastPerformances: '',
    });
  } catch (err) {
    console.error('Error adding document:', err);
    alert('Failed to submit. Check console.');
  }
};

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-serif font-semibold mb-6">Add New Work</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'instrumentation', 'year', 'description', 'imageURL', 'audioURL', 'scoreLink'].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
        <textarea
          name="pastPerformances"
          value={formData.pastPerformances}
          onChange={handleChange}
          placeholder="Past Performances (one per line)"
          className="w-full p-2 border border-gray-300 rounded h-32"
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-red-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminAddWork;
