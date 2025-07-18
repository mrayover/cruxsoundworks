import React from 'react';

export default function Footer() {
  return (
      <footer className="bg-dark text-neutral text-center py-6 text-lg">
        <div className="mb-2 flex justify-between w-[14rem] mx-auto">
          <a href="/contact" className="hover:underline font-semibold">Contact</a>
          <a href="/calendar" className="hover:underline font-semibold">Calendar</a>
          <a href="/about" className="hover:underline font-semibold">About</a>
        </div>

        <div className="text-sm">&copy; {new Date().getFullYear()} Crux Soundworks. All rights reserved.</div>
        <div className="mt-2 flex justify-center gap-4 text-sm">
          <a href="https://instagram.com" target="_blank" className="hover:underline">Instagram</a>
          <a href="https://soundcloud.com" target="_blank" className="hover:underline">SoundCloud</a>
        </div>
        <div className="mt-4 text-sm text-center text-muted-foreground space-x-4">
      <a href="/fresnocomposersociety" className="hover:underline">Fresno Composers Society</a>
      <a href="/cruxworks" className="hover:underline">CruxWorks Label</a>
    </div>

      </footer>
        );
}
