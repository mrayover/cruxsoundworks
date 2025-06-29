import React from 'react';

const SidePanel = ({ type, onClose }) => {
  const isLeft = type === 'works';
  return (
    <div
      className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-1/3 bg-dark text-neutral p-8 z-40 pt-6 transform transition-transform duration-300 ease-in-out ${
        isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {type === 'works' ? 'Explore Works' : 'Lessons Info'}
        </h2>
        <button
          onClick={onClose}
          className="text-sm font-bold hover:underline text-neutral"
        >
          Close
        </button>
      </div>
      {type === 'works' ? (
        <>
          <p className="text-xs mb-4">Click to view the full index</p>
          <a href="/works/tarot-tree-of-life" className="block py-1 hover:underline">Tarot Tree of Life</a>
          <a href="/works/to-autumn" className="block py-1 hover:underline">To Autumn</a>
          <a href="/works/unearthing-home" className="block py-1 hover:underline">Unearthing Home</a>
          <a href="/works/counting-seconds" className="block py-1 hover:underline">Counting Seconds</a>
          <a href="/works/corrida" className="block py-1 hover:underline">Corrida</a>
          <a href="/works/grafan-imago" className="block py-1 hover:underline">Grafan Imago</a>
          <a href="/works/string-quartet" className="block py-1 hover:underline">String Quartet</a>
          <a href="/works/discretus-discernere" className="block py-1 hover:underline">Discretus & Discernere</a>
          <a href="/works/seven-against-thebes" className="block py-1 hover:underline">Seven Against Thebes</a>
          <a href="/works/counting-down" className="block py-1 hover:underline">Counting Down</a>
          <a href="/works" className="block py-1 mt-2 pt-2 border-t border-neutral/30 hover:underline">All Works</a>
        </>
      ) : (
        <div className="text-sm leading-snug space-y-2">
          <p>Offering private lessons in guitar, composition, and music theory.</p>
          <p>Available for all skill levels, in-person and online.</p>
          <p>Click 'Lessons' above to learn more and book a session.</p>
        </div>
      )}
    </div>
  );
};

export default SidePanel;
