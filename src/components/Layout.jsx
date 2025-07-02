import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SidePanel from './SidePanel';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
<main className="flex-1 mx-auto p-4 flex gap-8 max-w-6xl">
  <div className="w-3/4">{children}</div>
  <aside className="w-1/4">
    <SidePanel type="works" />
  </aside>
</main>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

