import React from 'react';
import { Link } from 'react-router-dom';
import '../../style.css'; // reuse existing styles if safe, but this page stays visually distinct

export default function LessonsLanding() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center relative px-4">
      <Link to="/" className="absolute top-4 left-4">
        <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-12 w-10 opacity-80 hover:opacity-100 transition-opacity" />
      </Link>

      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Welcome to CruxSoundworks Lessons Portal
        </h1>
        <p className="text-lg text-gray-300">
          A focused, private environment for students of CruxSoundworks. This page will grow to include lesson resources, updates, and secure communications.
        </p>
      </div>
    </div>
  );
}
