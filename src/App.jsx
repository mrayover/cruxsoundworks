import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import CruxWorks from './pages/CruxWorks/index';
import FresnoComposersSociety from './pages/FresnoComposersSociety/index';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cruxworks" element={<CruxWorks />} />
      <Route path="/fresnocomposersociety" element={<FresnoComposersSociety />} />
      {/* Optional aliases */}
      <Route path="/fresno" element={<Navigate to="/fresnocomposersociety" />} />
      <Route path="/fcs" element={<Navigate to="/fresnocomposersociety" />} />
    </Routes>
  );
}

