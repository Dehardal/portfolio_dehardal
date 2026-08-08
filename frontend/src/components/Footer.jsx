import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';

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
    <footer id="contact" className="w-full mt-auto z-10 bg-[#050507] border-t border-white/10 pt-20 pb-12 relative overflow-hidden font-sans">
      
      {/* ── PART A: CONTACT DIRECTORY ("Say Hello") ── */}
      <div 
        ref={contactRef}
        className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Branding Message & Direct Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: customEase }}
            className="lg:col-span-5 space-y-8 text-left"
          >
            <div className="space-y-4">
              <span className="text-white/40 text-xs font-mono tracking-widest uppercase block">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] font-sans">
                Say hello.
              </h2>
              <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light max-w-md pt-2">
                Have a full-stack platform to engineer, a SaaS system to scale, or automated workflows to construct? Let's build it together.
              </p>
            </div>

            {/* Social Circle Links */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="mailto:deepankar1562@gmail.com" 
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer"
                title="Send Email"
              >
                <Mail size={15} />
              </a>
              <a 
                href="https://www.linkedin.com/in/deepankar-dayal-4516291b8/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a 
                href="https://github.com/Dehardal" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer"
                title="GitHub"
              >
                <Github size={15} />
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Minimalist Border-Line Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            className="lg:col-span-7 w-full text-left"
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={handleContactChange}
                    placeholder="Your Name"
                    className="w-full bg-transparent border-b border-white/15 focus:border-white py-3 text-white placeholder:text-white/30 text-sm outline-none transition-colors duration-300"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleContactChange}
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-white/15 focus:border-white py-3 text-white placeholder:text-white/30 text-sm outline-none transition-colors duration-300"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  value={contactData.message}
                  onChange={handleContactChange}
                  placeholder="Tell me about your project or system..."
                  rows={4}
                  className="w-full bg-transparent border-b border-white/15 focus:border-white py-3 text-white placeholder:text-white/30 text-sm outline-none transition-colors duration-300 resize-none"
                  required
                />
              </div>

              {contactStatus && (
                <p className={`text-xs ${contactStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {contactStatus.message}
                </p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={contactLoading}
                  className="px-8 py-3.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 disabled:opacity-50 min-h-[42px] cursor-pointer"
                >
                  {contactLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>

      {/* ── PART B: STRUCTURED SITEMAP GRID ── */}
      <div className="border-t border-white/10 pt-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start text-left">
          
          {/* Column 1: Brand & Cursive Signature */}
          <div className="md:col-span-8 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                DD
              </div>
              <span 
                className="text-foreground text-2xl font-normal text-white"
                style={{ fontFamily: "'Allura', cursive" }}
              >
                Deepankar Dayal
              </span>
            </div>
            {/* Signature Placement */}
            <div className="w-48 h-12 relative opacity-85 select-none pointer-events-none pt-2">
              <SignatureCanvas />
            </div>
          </div>

          {/* Column 2: Structural Sitemap & Availability */}
          <div className="md:col-span-4 space-y-6">
            <div className="space-y-4">
              <span className="text-white/30 text-[10px] font-mono tracking-widest uppercase block">
                NAVIGATION
              </span>
              <ul className="space-y-3 font-sans text-sm font-light text-white/60">
                <li>
                  <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <Link to="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-2.5 text-white/50">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono tracking-wide">Available &bull; Noida, IN</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── PART C: COPYRIGHT & BACK TO TOP ── */}
      <div className="pt-12 border-t border-white/5 mt-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-white/30">
        <p>
          &copy; {new Date().getFullYear()} Deepankar Dayal. All rights reserved.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          BACK TO TOP &uarr;
        </button>
      </div>

    </footer>
  );
}
