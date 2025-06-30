import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import Layout from './components/Layout'
import WorksIndex from './pages/WorksIndex';
import WorkDetail from './pages/WorkDetail';
import AdminAddWork from './pages/AdminAddWork';

import Login from './pages/admin/Login'
import ComposerDashboard from './pages/admin/ComposerDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext';
import AdminIndex from './pages/admin/AdminIndex';

// ...import other works as needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/works" element={<WorksIndex />} />
            <Route path="/works/:slug" element={<WorkDetail />} />
            <Route path="/admin/add-work" element={<AdminAddWork />} />
            <Route path="/admin" element={<AdminIndex />} />
            {/* 🔐 Admin Composer Routes */}
            <Route path="/admin/composer/login" element={<Login />} />
            <Route
              path="/admin/composer"
              element={
                <ProtectedRoute>
                  <ComposerDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  </React.StrictMode>
)
