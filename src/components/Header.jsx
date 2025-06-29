import React from 'react';

const Header = () => {
  return (
    <header className="bg-dark text-neutral px-6 py-4 flex justify-center items-center text-2xl gap-8 relative z-10">
      {/* Works */}
      <div className="relative group inline-block mr-4">
        <a href="/works" className="hover:opacity-70 font-bold cursor-pointer">Works</a>
        <div className="absolute right-full top-0 mr-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 bg-dark text-neutral p-4 rounded shadow-lg z-50 text-sm w-48">
          <p className="font-semibold mb-2">Explore Works</p>
          <p className="text-xs">Click to view the full index</p>
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
        </div>
      </div>

      {/* Glyph */}
      <a href="/" className="mx-4">
        <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-40" />
      </a>

      {/* Lessons */}
      <div className="relative group inline-block ml-4">
        <a href="/lessons" className="hover:opacity-70 font-bold cursor-pointer">Lessons</a>
        <div className="absolute left-full top-0 ml-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 bg-dark text-neutral p-4 rounded shadow-lg z-50 text-sm w-48">
          <p className="font-semibold mb-2">Private Lessons</p>
          <p className="text-xs">Click to view lesson offerings</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
