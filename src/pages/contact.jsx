import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return alert('Name, email, and message are required.');
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...form,
        timestamp: serverTimestamp(),
      });
      setStatus('Message sent!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-serif mb-6">Contact Me</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject (optional)" className="w-full p-2 border rounded" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" className="w-full p-2 border rounded h-40" required />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Send</button>
      </form>
      {status && <p className="mt-4 text-sm text-green-600">{status}</p>}
    </div>
  );
}
