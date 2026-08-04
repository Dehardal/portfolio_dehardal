import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Terminal, Briefcase, User } from 'lucide-react';

export default function GlobalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 30);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '#home', label: 'Home', icon: Terminal },
    { path: '#about', label: 'About', icon: User },
    { path: '#projects', label: 'Projects', icon: Briefcase }
  ];

  const handleLinkClick = (e, path) => {
    setIsOpen(false);
    if (path.startsWith('#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        const element = document.getElementById(path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/' + path);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const textColor = 'text-white';
  const navBg = scrolled 
    ? 'bg-[#0a0a0d]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-4'
    : 'py-5 bg-transparent';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${navBg} ${
        (visible || isOpen) ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          <Link 
            to="/" 
            className="flex items-center select-none pointer-events-auto" 
            onClick={(e) => handleLinkClick(e, '#home')}
          >
            <span className={`font-hero-heading text-[21px] sm:text-[26px] tracking-tight transition-colors duration-300 ${textColor}`}>
              Deepankar Dayal
            </span>
          </Link>

          {/* Desktop nav links (center, hidden below md) */}
          <div className="hidden md:flex items-center gap-8 text-[23px] font-normal tracking-tight">
            {navLinks.map((link) => {
              const isHash = link.path.startsWith('#');
              return (
                <Link
                  key={link.path}
                  to={isHash ? '/' + link.path : link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`transition-all duration-300 hover:opacity-60 ${textColor}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA (right, hidden below md) */}
          <div className="hidden md:flex items-center gap-6">
             <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={`text-[23px] underline underline-offset-2 transition-all duration-300 hover:opacity-60 ${textColor}`}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger (visible below md) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg focus:outline-none pointer-events-auto z-50 relative"
            aria-label="Toggle navigation menu"
          >
            <span className={`w-6 h-[2px] transform transition-all duration-300 bg-white ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-6 h-[2px] transition-all duration-300 bg-white ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-[2px] transform transition-all duration-300 bg-white ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay (z-index: 40, hidden on md+) */}
      <div 
        className={`fixed inset-0 bg-[#0a0a0d]/95 backdrop-blur-sm z-40 flex flex-col justify-center items-start px-8 gap-8 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 text-left">
          {navLinks.map(link => {
            const isHash = link.path.startsWith('#');
            return (
              <Link
                key={link.path}
                to={isHash ? '/' + link.path : link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
              >
                {link.label}
              </Link>
            );
          })}
          
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Hire Me
          </a>

        </div>
      </div>
    </>
  );
}
