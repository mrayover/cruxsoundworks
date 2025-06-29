import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'
import Layout from './components/Layout'
import WorksIndex from './pages/WorksIndex';
import WorkDetail from './pages/WorkDetail';
import AdminAddWork from './pages/AdminAddWork';
// ...import other works as needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/works" element={<WorksIndex />} />
          <Route path="/works/:slug" element={<WorkDetail />} />
          <Route path="/admin/add-work" element={<AdminAddWork />} />
          {/* Add other works here */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
)
