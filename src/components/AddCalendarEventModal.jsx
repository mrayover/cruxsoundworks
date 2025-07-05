import React, { useState, useEffect } from 'react';

export default function AddCalendarEventModal({ isOpen, onClose, onAdd, initialValues }) {
const [form, setForm] = useState({
  title: '',
  date: '',
  location: '',
  description: '',
  link: ''
});

useEffect(() => {
  if (initialValues) {
    setForm({
      title: initialValues.title || '',
      date: '', // always blank for duplicates
      location: initialValues.location || '',
      description: initialValues.description || '',
      link: initialValues.link || ''
    });
  }
}, [initialValues]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Add Calendar Event</h2>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full mb-2 border p-2" required />
        <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="w-full mb-2 border p-2" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full mb-2 border p-2" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full mb-2 border p-2" />
        <input name="link" value={form.link} onChange={handleChange} placeholder="External Link (optional)" className="w-full mb-2 border p-2" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
        </div>
      </form>
    </div>
  );
}
