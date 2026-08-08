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
      
      {/* ── CONTACT SECTION ── */}
      <div 
        ref={contactRef}
        className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16 pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isContactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: customEase }}
          className="space-y-10 text-left"
        >
          {/* Header */}
          <div className="space-y-4">
            <span className="text-white/40 text-xs font-mono tracking-widest uppercase block">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.1] font-sans">
              Say hello.
            </h2>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light max-w-lg pt-1">
              Have a full-stack platform to engineer, a SaaS system to scale, or automated workflows to construct? Let's build it together.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                value={contactData.name}
                onChange={handleContactChange}
                placeholder="Your Name"
                className="w-full bg-transparent border-b border-white/15 focus:border-white py-3 text-white placeholder:text-white/30 text-sm outline-none transition-colors duration-300"
                required
              />
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

            <textarea
              name="message"
              value={contactData.message}
              onChange={handleContactChange}
              placeholder="Tell me about your project or system..."
              rows={4}
              className="w-full bg-transparent border-b border-white/15 focus:border-white py-3 text-white placeholder:text-white/30 text-sm outline-none transition-colors duration-300 resize-none"
              required
            />

            {contactStatus && (
              <p className={`text-xs ${contactStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                {contactStatus.message}
              </p>
            )}

            <div className="flex items-center gap-6 pt-2">
              <button
                type="submit"
                disabled={contactLoading}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-white/90 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 disabled:opacity-50 min-h-[42px] cursor-pointer"
              >
                {contactLoading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Social icons inline with button */}
              <div className="flex items-center gap-2.5">
                <a href="mailto:deepankar1562@gmail.com" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer" title="Email">
                  <Mail size={14} />
                </a>
                <a href="https://www.linkedin.com/in/deepankar-dayal-4516291b8/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer" title="LinkedIn">
                  <Linkedin size={14} />
                </a>
                <a href="https://github.com/Dehardal" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer" title="GitHub">
                  <Github size={14} />
                </a>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ── PART B: BRAND + NAVIGATION (single row) ── */}
      <div className="border-t border-white/10 pt-16 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 text-left">
          
          {/* Brand & Signature */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                DD
              </div>
              <span 
                className="text-2xl font-normal text-white"
                style={{ fontFamily: "'Allura', cursive" }}
              >
                Deepankar Dayal
              </span>
            </div>
            <div className="w-36 h-10 relative opacity-85 select-none pointer-events-none hidden sm:block">
              <SignatureCanvas />
            </div>
          </div>

          {/* Navigation Links (inline) */}
          <ul className="flex items-center gap-6 font-sans text-sm font-light text-white/50">
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
