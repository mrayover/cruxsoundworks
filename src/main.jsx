import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App'
import Layout from './components/Layout'
import WorksIndex from './pages/works/WorksIndex'
import TarotTreeOfLife from './pages/works/TarotTreeOfLife'
import ToAutumn from './pages/works/ToAutumn'
import UnearthingHome from './pages/works/UnearthingHome'
// ...import other works as needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/works" element={<WorksIndex />} />
          <Route path="/works/tarot-tree-of-life" element={<TarotTreeOfLife />} />
          <Route path="/works/to-autumn" element={<ToAutumn />} />
          <Route path="/works/unearthing-home" element={<UnearthingHome />} />
          {/* Add other works here */}
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>,
)
