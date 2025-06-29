import React, { useState } from 'react';
import SidePanel from './SidePanel';

const Header = () => {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <>
      <header
        className="bg-dark text-neutral px-6 py-4 flex justify-center items-center text-2xl gap-8 relative z-10"
      >
        {/* Works click trigger */}
        <div
          className="cursor-pointer font-bold hover:opacity-70"
          onClick={() => togglePanel('works')}
        >
          Works
        </div>

        {/* Center glyph */}
        <a href="/" className="mx-4">
          <img src="/discretus-glyph.png" alt="Discretus Glyph" className="h-40" />
        </a>

        {/* Lessons click trigger */}
        <div
          className="cursor-pointer font-bold hover:opacity-70"
          onClick={() => togglePanel('lessons')}
        >
          Lessons
        </div>
      </header>

      {/* Side Panel logic */}
      {activePanel && <SidePanel type={activePanel} onClose={() => setActivePanel(null)} />}
    </>
  );
};

export default Header;
