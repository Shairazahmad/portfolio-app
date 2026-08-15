import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      {/* Replaced bg-slate-50/50 with transparent background and updated selection colors to #34b7a6 */}
      <div className="min-h-screen flex flex-col bg-transparent text-gray-900 selection:bg-[#34b7a6]/20 selection:text-[#34b7a6]">
        <Navbar />
        
        <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            {/* Direct Admin Route */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Fallback Route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;