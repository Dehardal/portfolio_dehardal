import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { 
  Menu, X, User, LogOut, Terminal, 
  Layers, Cpu, BookOpen, Briefcase, MessageSquare
} from 'lucide-react';

// Subcomponents and Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Footer from './components/Footer';

// Create Global Contexts
export const AuthContext = createContext();

import GlobalNavbar from './components/GlobalNavbar';

import InteractiveBackground from './components/InteractiveBackground';

// Main Layout Wrapper
function AppLayout() {
  const location = useLocation();
  const isFullBleed = ['/'].includes(location.pathname);

  useEffect(() => {
    // Unconditionally scroll to top when changing page routes (pathname changes)
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col transition-colors duration-200 z-10 bg-hero-bg selection:bg-primary/20 selection:text-primary">
      {/* Global Interactive Background shared across all pages */}
      <InteractiveBackground />
      
      {/* Layout Header */}
      <GlobalNavbar />

      
      {/* View container */}
      <main className={`flex-grow z-10 w-full relative ${
        isFullBleed ? 'pt-0' : 'pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto'
      }`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/#about" replace />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          

          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState(null);

  // Load system state
  useEffect(() => {
    // Keep dark mode active by default for premium dark aesthetic
    document.documentElement.classList.add('dark');

    // Prevent browser scroll restoration on refresh/reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // Recover admin token if saved
    const token = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    if (token && adminUser) {
      setAuth({ token, username: adminUser });
    }
  }, []);

  const loginAdmin = (token, username) => {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', username);
    setAuth({ token, username });
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, loginAdmin, logout }}>
      <Router>
        <AppLayout />
      </Router>
    </AuthContext.Provider>
  );
}
