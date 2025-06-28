import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-neutral text-center py-6 text-lg">
      <div className="mb-2">
        <a href="/contact" className="hover:underline font-semibold">Contact</a>
      </div>
      <div className="text-sm">&copy; {new Date().getFullYear()} Crux Soundworks. All rights reserved.</div>
      <div className="mt-2 flex justify-center gap-4 text-sm">
        <a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a>
        <a href="https://soundcloud.com" target="_blank" className="hover:underline">SoundCloud</a>
      </div>
    </footer>
  );
}
