import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/ui/navbar'
import { Home } from '@/pages/Home'
import { SupplierPanel } from '@/pages/SupplierPanel'
import { AdminDashboard } from '@/pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/supplier" element={<SupplierPanel />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
