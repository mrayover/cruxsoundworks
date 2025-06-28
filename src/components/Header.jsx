import React from 'react'

const Header = () => {
  return (
    <header className="bg-dark text-neutral p-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-10" />
      </div>
      <nav className="flex space-x-4 mt-2 sm:mt-0">
        <a href="/" className="hover:opacity-70 font-bold">Home</a>
        <a href="/works" className="hover:opacity-70 font-bold">Works</a>
        <a href="/lessons" className="hover:opacity-70 font-bold">Lessons</a>
        <a href="/contact" className="hover:opacity-70 font-bold">Contact</a>
      </nav>
    </header>
  )
}

export default Header
