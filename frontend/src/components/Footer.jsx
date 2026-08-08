import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

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
    <footer id="contact" className="w-full mt-auto z-10 font-sans">
      
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 lg:gap-10 max-w-7xl mx-auto">

              {/* ── Column 1: Tagline + Copyright ── */}
              <div className="md:col-span-3 space-y-5">
                <h3 className="text-white text-base sm:text-lg font-semibold leading-snug tracking-tight">
                  Engineering digital products,<br />
                  One commit at a time.
                </h3>
                <div className="space-y-1.5">
                  <p className="text-white/30 text-[11px] font-mono">
                    &copy; {new Date().getFullYear()} Deepankar Dayal
                  </p>
                  <p className="text-white/20 text-[10px] font-mono">
                    Designed & Built by Deepankar
                  </p>
                </div>
              </div>

              {/* ── Column 2: Navigation ── */}
              <div className="md:col-span-2 space-y-4">
                <span className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase block">
                  Navigation
                </span>
                <ul className="space-y-2.5 text-sm font-light text-white/55">
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

              {/* ── Column 3: Contact Form ── */}
              <div className="md:col-span-4 space-y-4">
                <span className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase block">
                  Get in Touch
                </span>
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      placeholder="Name"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/25 text-xs outline-none focus:border-white/30 transition-colors duration-300"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      placeholder="Email"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/25 text-xs outline-none focus:border-white/30 transition-colors duration-300"
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    value={contactData.message}
                    onChange={handleContactChange}
                    placeholder="Your message..."
                    rows={2}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3.5 py-2.5 text-white placeholder:text-white/25 text-xs outline-none focus:border-white/30 transition-colors duration-300 resize-none"
                    required
                  />
                  {contactStatus && (
                    <p className={`text-[10px] ${contactStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {contactStatus.message}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="px-5 py-2 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-[11px] tracking-wider uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {contactLoading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </div>

              {/* ── Column 4: Follow + Socials ── */}
              <div className="md:col-span-3 space-y-4">
                <span className="text-white/40 text-[10px] font-mono tracking-[0.2em] uppercase block">
                  Follow Me
                </span>
                <div className="flex items-center gap-2.5">
                  <a href="mailto:deepankar1562@gmail.com" className="w-10 h-10 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer" title="Email">
                    <Mail size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/deepankar-dayal-4516291b8/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer" title="LinkedIn">
                    <Linkedin size={16} />
                  </a>
                  <a href="https://github.com/Dehardal" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-white/[0.06] hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-white transition-all duration-300 cursor-pointer" title="GitHub">
                    <Github size={16} />
                  </a>
                </div>

                {/* Back to Top */}
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-white/30 hover:text-white text-[10px] font-mono tracking-wider uppercase transition-colors duration-200 cursor-pointer mt-2 flex items-center gap-1.5"
                >
                  Back to top <span className="text-sm">&uarr;</span>
                </button>
              </div>

            </div>
          </motion.div>

          {/* ── Giant Brand Name ── */}
          <div className="relative overflow-hidden select-none pointer-events-none" style={{ height: 'clamp(80px, 14vw, 180px)' }}>
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-black uppercase text-white/[0.04] leading-none"
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
