import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';

/**
 * Footer — Unified Mega Footer Component.
 * Combines the Kresna Split Contact Cards (quote/signature/subscribe form) 
 * and the Bottom Copyright Brand Bar into a single, cohesive modular section.
 */
export default function Footer() {
  const customEase = [0.22, 1, 0.36, 1];
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, margin: "-60px" });



  // Contact Form State (for direct messaging)
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
    if (contactStatus) setContactStatus(null);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactData.name.trim()) {
      setContactStatus({ success: false, message: "⚠️ Name is required." });
      return;
    }
    if (!contactData.email.trim() || !/\S+@\S+\.\S+/.test(contactData.email)) {
      setContactStatus({ success: false, message: "⚠️ Please provide a valid email." });
      return;
    }
    if (!contactData.message.trim() || contactData.message.trim().length < 8) {
      setContactStatus({ success: false, message: "⚠️ Message must be at least 8 characters." });
      return;
    }

    setContactLoading(true);
    setContactStatus(null);

    // Call Web3Forms API to send email directly to Deepankar
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: "6318ad8a-5b4e-4c51-b15d-f2625d96d205",
        name: contactData.name,
        email: contactData.email,
        message: contactData.message
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setContactLoading(false);
        if (data.success) {
          setContactStatus({ success: true, message: "✉️ Message transmitted successfully to Deepankar!" });
          setContactData({ name: '', email: '', message: '' });
        } else {
          setContactStatus({ success: false, message: data.message || "⚠️ Failed to transmit message." });
        }
      })
      .catch((err) => {
        setContactLoading(false);
        setContactStatus({ success: false, message: "⚠️ Connection error. Please try again later." });
      });
  };

  return (
    <footer id="contact" className="w-full mt-auto z-10 font-hero-body">
      
      {/* ── Outer dark background ── */}
      <div className="bg-[#030305] pt-8 sm:pt-12 px-4 sm:px-6">

        {/* ── Rounded-top container ── */}
        <div 
          ref={contactRef}
          className="relative rounded-t-[2.5rem] sm:rounded-t-[3.5rem] overflow-hidden"
          style={{ background: 'linear-gradient(165deg, #141418 0%, #0c0c10 50%, #080810 100%)' }}
        >

          {/* ── Subtle top border glow ── */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* ── Main Content Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: customEase }}
            className="px-8 sm:px-12 lg:px-16 pt-14 sm:pt-20 pb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 max-w-7xl mx-auto">

              {/* ── Column 1: Branding & Copyright (Span 4) ── */}
              <div className="md:col-span-4 flex flex-col justify-between h-full space-y-10 md:space-y-0">
                <div className="space-y-4">
                  <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-hero-heading font-medium leading-tight tracking-tight">
                    Engineering digital products,<br className="hidden lg:block" />
                    One commit at a time.
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="text-white/30 text-[11px]">
                    &copy; {new Date().getFullYear()} Deepankar Dayal
                  </p>
                  <p className="text-white/20 text-[10px] tracking-widest uppercase">
                    Designed & Built by Deepankar
                  </p>
                </div>
              </div>

              {/* ── Column 2: Navigation & Socials (Span 3) ── */}
              <div className="md:col-span-3 flex flex-col gap-10">
                {/* Navigation */}
                <div className="space-y-4">
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase block font-medium">
                    Navigation
                  </span>
                  <ul className="space-y-3 text-[13px] font-light text-white/60">
                    <li>
                      <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200">
                        Projects
                      </a>
                    </li>
                    <li>
                      <Link to="/blog" className="hover:text-white transition-colors duration-200">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Socials */}
                <div className="space-y-4">
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase block font-medium">
                    Connect
                  </span>
                  <div className="flex items-center gap-3">
                    <a href="/resume (2).pdf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white text-white/80 hover:text-black flex items-center justify-center border border-white/[0.08] hover:border-white transition-all duration-300 cursor-pointer" title="Resume">
                      <FileText size={16} />
                    </a>
                    <a href="mailto:deepankar1562@gmail.com" className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white text-white/80 hover:text-black flex items-center justify-center border border-white/[0.08] hover:border-white transition-all duration-300 cursor-pointer" title="Email">
                      <Mail size={16} />
                    </a>
                    <a href="https://www.linkedin.com/in/deepankar-dayal-4516291b8/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white text-white/80 hover:text-black flex items-center justify-center border border-white/[0.08] hover:border-white transition-all duration-300 cursor-pointer" title="LinkedIn">
                      <Linkedin size={16} />
                    </a>
                    <a href="https://github.com/Dehardal" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/[0.03] hover:bg-white text-white/80 hover:text-black flex items-center justify-center border border-white/[0.08] hover:border-white transition-all duration-300 cursor-pointer" title="GitHub">
                      <Github size={16} />
                    </a>
                  </div>
                </div>
              </div>

              {/* ── Column 3: Contact Form (Span 5) ── */}
              <div className="md:col-span-5 flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase block font-medium">
                    Get in Touch
                  </span>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-white/30 hover:text-white text-[10px] tracking-wider uppercase transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
                  >
                    Back to top <span className="text-sm">&uarr;</span>
                  </button>
                </div>
                
                <form onSubmit={handleContactSubmit} className="space-y-3.5 mt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      placeholder="Name"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-[13px] outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      placeholder="Email"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-[13px] outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300"
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={handleContactChange}
                    placeholder="Your message..."
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-[13px] outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                    required
                  />
                  
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex-1">
                      {contactStatus && (
                        <p className={`text-[11px] font-medium ${contactStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {contactStatus.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="px-8 py-2.5 rounded-lg bg-white hover:bg-white/90 text-black font-hero-heading font-bold text-[11px] tracking-[0.1em] uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {contactLoading ? 'Sending...' : 'Send'}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </motion.div>

          {/* ── Giant Brand Name ── */}
          <div className="relative overflow-hidden select-none pointer-events-none" style={{ height: 'clamp(80px, 14vw, 180px)' }}>
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-hero-heading font-black uppercase text-white/[0.04] leading-none"
              style={{ 
                fontSize: 'clamp(120px, 18vw, 280px)',
                letterSpacing: '-0.02em',
                transform: 'translateX(-50%) translateY(25%)'
              }}
            >
              DEEPANKAR
            </div>
          </div>

        </div>
      </div>

    </footer>
  );
}
