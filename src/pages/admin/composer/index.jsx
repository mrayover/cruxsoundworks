import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function ComposerAdminWrapper() {
  const navigate = useNavigate();

  const tabStyle = ({ isActive }) =>
    `px-4 py-2 rounded-t-lg font-medium ${isActive ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif">🎼 Composer Admin Panel</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/admin/composer/login');
          }}
          className="text-sm bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Log Out
        </button>
      </div>

      <div className="border-b mb-4">
        <nav className="flex gap-2">
          <NavLink to="works" className={tabStyle}>Works</NavLink>
          <NavLink to="calendar" className={tabStyle}>Calendar</NavLink>
          <NavLink to="contact" className={tabStyle}>Contact</NavLink>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
