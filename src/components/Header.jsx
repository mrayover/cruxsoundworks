import React from 'react'

const Header = () => {
  return (
<header className="bg-dark text-neutral px-6 py-4 flex items-center justify-between">
  {/* Left: Glyph + Home */}
  <div className="flex items-center gap-4">
    <a href="/">
      <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-40" />
    </a>
    <a href="/" className="text-xl font-semibold hover:underline">Home</a>
  </div>

  {/* Center: Works + Lessons */}
  <div className="flex gap-24 items-center text-2xl">
    <div className="relative group">
      <span className="hover:opacity-70 font-bold cursor-pointer">Works</span>
      <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 bg-dark text-neutral mt-2 py-2 px-4 rounded shadow-lg z-50">
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
    <a href="/lessons" className="hover:opacity-70 font-bold">Lessons</a>
  </div>

  {/* Right: Contact */}
  <div className="text-2xl">
    <a href="/contact" className="hover:opacity-70 font-bold">Contact</a>
  </div>
</header>
  )
}

export default Header
