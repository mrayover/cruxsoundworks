import React from 'react'

const Header = () => {
  return (
<header className="bg-dark text-neutral px-6 py-4 flex justify-between items-center text-2xl max-w-4xl mx-auto">
  {/* Left: Works */}
  <div className="relative group inline-block">
    <span className="hover:opacity-70 font-bold cursor-pointer">Works</span>
    <div className="absolute top-full left-0 mt-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 bg-dark text-neutral py-2 px-4 rounded shadow-lg z-50 text-sm leading-tight">
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
    </div>
  </div>

  {/* Glyph */}
  <a href="/" className="mx-4">
    <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-40" />
  </a>

  {/* Right: Lessons */}
  <a href="/lessons" className="hover:opacity-70 font-bold">Lessons</a>
</header>

  );
};

export default Header;
