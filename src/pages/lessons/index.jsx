import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';

export default function LessonsLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    styles: [],
    other: '',
  });

  const styleOptions = [
    'Rock',
    'Jazz',
    'Country',
    'Musicals',
    'Metal',
    'Improv',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        styles: checked
          ? [...prev.styles, value]
          : prev.styles.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/sendWaitlistEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
await supabase.from('lessons_waitlist').insert([
  {
    name: formData.name,
    email: formData.email,
    experience: formData.experience,
    styles: formData.styles,            // ✅ this is correct
    other_style: formData.other         // ✅ also correct
  }
]);
    if (res.ok) {
      setSubmitted(true);
    } else {
      alert('Failed to submit. Please try again later.');
    }
  } catch (err) {
    console.error(err);
    alert('Error submitting form.');
  }
};


  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center justify-center relative px-4 py-12">
      <Link to="/" className="absolute top-4 left-4">
        <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-12 w-10 opacity-80 hover:opacity-100 transition-opacity" />
      </Link>

      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Welcome to CruxSoundworks Lessons Portal
        </h1>
        <p className="text-lg">
          Lessons to be offered online and in person in the Fresno area.
          Add your name to the waitlist below.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Guitar Experience</label>
            <select
              name="experience"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select...</option>
              <option>0–6 months</option>
              <option>6 months – 1 year</option>
              <option>1–2 years</option>
              <option>3–4 years</option>
              <option>4+ years</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Interested Styles</label>
            <div className="flex flex-wrap gap-4">
              {styleOptions.map((style) => (
                <label key={style} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="styles"
                    value={style}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <span>{style}</span>
                </label>
              ))}
            </div>
            <div className="mt-3">
              <label className="block font-medium mb-1">Other:</label>
              <input
                type="text"
                name="other"
                placeholder="Write in a style"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </form>
      ) : (
        <div className="text-xl font-semibold text-center text-green-700">
          Thank you! You will be contacted when lessons are available.
        </div>
      )}
    </div>
  );
}
