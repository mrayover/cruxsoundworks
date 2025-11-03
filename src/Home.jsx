// src/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <section className="max-w-3xl w-full text-center space-y-8">
        {/* Logo card */}
        <div className="inline-flex flex-col items-center justify-center px-10 py-8 bg-neutral-50/80 shadow-xl rounded-3xl border border-neutral-200">
          <img
            src="/crux-logo.png"
            alt="Crux Soundworks logo"
            className="max-h-40 w-auto"
          />
        </div>

        {/* Text stack */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-light tracking-widest text-neutral-800">
            Marcus Overacker
          </h1>
          <p className="text-lg md:text-xl uppercase tracking-[0.35em] text-neutral-700">
            Composer &amp; Guitarist
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
