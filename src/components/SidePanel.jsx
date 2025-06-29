import React from 'react';

const SidePanel = ({ type }) => {
  const isLeft = type === 'works';
  return (
    <div
className={`fixed top-0 ${isLeft ? 'left-0' : 'right-0'} h-full w-1/2 bg-dark text-neutral p-8 z-40 transition duration-300 ease-in-out`}
    >
      <h2 className="text-2xl font-bold mb-6">{type === 'works' ? 'Explore Works' : 'Lessons Info'}</h2>
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
