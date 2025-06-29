import React, { useState } from 'react';
import SidePanel from './SidePanel';

const Header = () => {
  const [activePanel, setActivePanel] = useState(null);

  return (
    <>
      <header
        className="bg-dark text-neutral px-6 py-4 flex justify-center items-center text-2xl gap-8 relative z-10"
        onMouseLeave={() => setActivePanel(null)}
      >
        {/* Works hover trigger */}
        <div
          className="cursor-pointer font-bold hover:opacity-70"
          onMouseEnter={() => setActivePanel('works')}
        >
          Works
        </div>

        {/* Center glyph */}
        <a href="/" className="mx-4">
          <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-40" />
        </a>

        {/* Lessons hover trigger */}
        <div
          className="cursor-pointer font-bold hover:opacity-70"
          onMouseEnter={() => setActivePanel('lessons')}
        >
          Lessons
        </div>
      </header>

      {/* Side Panel logic */}
      {activePanel && <SidePanel type={activePanel} />}
    </>
  );
};

export default Header;
