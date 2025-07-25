import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import './index.css';

import Layout from './components/Layout';
import WorksIndex from './pages/WorksIndex';
import WorkDetail from './pages/WorkDetail';
import AdminAddWork from './pages/AdminAddWork';
import Calendar from './pages/Calendar';
import ComposerAdminWrapper from './pages/admin/composer/index';
import ComposerWorks from './pages/admin/composer/works';
import ComposerCalendar from './pages/admin/composer/calendar';
import ComposerContact from './pages/admin/composer/contact';
import Contact from './pages/contact';

import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminIndex from './pages/admin/AdminIndex';

import CruxWorks from './pages/cruxworks/index';
import FresnoComposersSociety from './pages/fresnocomposerssociety/index';
import LessonsLanding from './pages/lessons/index';
import LessonsAdmin from './pages/admin/lessons/index';
import { LessonsAuthProvider } from './context/LessonsAuthContext'

import { AuthProvider } from './context/AuthContext';
import LessonsLogin from './pages/admin/lessons/login';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <LessonsAuthProvider>
      <Router>
        <Routes>
          {/* Standalone routes without Layout */}
          <Route path="/lessons" element={<LessonsLanding />} />
          <Route path="/cruxworks" element={<CruxWorks />} />
          <Route path="/fresnocomposersociety" element={<FresnoComposersSociety />} />

          {/* Redirect aliases */}
          <Route path="/fresno" element={<Navigate to="/fresnocomposersociety" />} />
          <Route path="/fcs" element={<Navigate to="/fresnocomposersociety" />} />

          {/* Everything else with Layout */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/works" element={<WorksIndex />} />
                  <Route path="/works/:slug" element={<WorkDetail />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/admin/add-work" element={<AdminAddWork />} />
                  <Route path="/admin" element={<AdminIndex />} />
                  <Route path="/admin/composer/login" element={<Login />} />
                  <Route path="/admin/lessons/login" element={<LessonsLogin />} />
                  <Route path="/admin/lessons" element={<LessonsAdmin />} />
                  <Route
                    path="/admin/composer"
                    element={
                      <ProtectedRoute>
                        <ComposerAdminWrapper />
                      </ProtectedRoute>
                    }
                  >
                   <Route index element={<Navigate to="works" />} />
                    <Route path="works" element={<ComposerWorks />} />
                    <Route path="calendar" element={<ComposerCalendar />} />
                    <Route path="contact" element={<ComposerContact />} />
                  </Route>
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
      </LessonsAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
