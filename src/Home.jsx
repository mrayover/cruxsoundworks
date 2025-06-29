import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 space-y-4">
      <h1 className="text-xl uppercase tracking-widest">Welcome to</h1>
      <img
      src="/crux-logo.png"
      alt="Crux Soundworks Logo"
      className="h-36 drop-shadow-xl"/>

    <div className="h-0" />

      <p className="text-xl italic text-neutral/70">
        The Pattern Beneath the Noise
      </p>
    </div>
  );
};

export default Home;
