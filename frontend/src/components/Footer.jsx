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
    <footer id="contact" className="w-full mt-auto z-10 bg-transparent relative pt-12 pb-12 lg:pt-20 lg:pb-20">
      
      {/* 1. Split Contact Cards Container */}
      <div 
        ref={contactRef}
        className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16"
      >
        <div className="flex flex-col xl:flex-row gap-8 items-stretch w-full relative">
          
          {/* LEFT CARD: Dark Mesh Gradient Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: customEase }}
            className="flex-1 rounded-[32px] p-8 md:p-12 bg-gradient-to-b from-[#111827] to-[#030712] border border-white/5 flex flex-col justify-between min-h-[480px] relative overflow-hidden group shadow-2xl"
          >
            {/* Subtle Glowing mesh background */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/15 transition-all duration-700" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-650/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Top Brand Logo matching navbar */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold text-xs shadow-md">
                  DD
                </div>
                <span 
                  className="text-foreground text-2xl font-normal tracking-normal text-white"
                  style={{ fontFamily: "'Allura', cursive" }}
                >
                  Deepankar Dayal
                </span>
              </div>

              {/* Mindset Quote Headline callout */}
              <h3 className="font-italiana font-light text-[clamp(0.9rem,1.5vw,1.15rem)] leading-relaxed text-white/80 pt-4 max-w-xl italic text-left">
                "Simplicity is the ultimate sophistication. When we build digital systems, we do not just write code—we design workflows to turn operational chaos into streamlined automation. We design for absolute scale, and we engineer for lasting impact."
              </h3>

              {/* Hand-written Signature Canvas (Above the line) */}
              <div className="w-full flex justify-end select-none pointer-events-auto mt-4 -mr-2.5 -mb-6">
                <div className="w-48 h-16 relative">
                  <SignatureCanvas />
                </div>
              </div>
            </div>

            {/* Bottom Row: Cursive + Socials */}
            <div className="relative z-10 pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/5 mt-auto">
              <span className="font-sora text-2xl font-normal text-white/95 leading-none">
                Stay in touch!
              </span>

              {/* Social row */}
              <div className="flex items-center gap-3">
                <a 
                  href="mailto:deepankar1562@gmail.com" 
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all cursor-pointer"
                  title="Send Email"
                >
                  <Mail size={16} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/deepankar-dayal-4516291b8/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://github.com/Dehardal" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-all cursor-pointer"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD: Sleek Glass Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            className="flex-[1.2] rounded-[32px] p-8 md:p-12 bg-white/[0.01] border border-white/10 flex flex-col justify-between min-h-[480px] relative shadow-lg"
          >
            {/* Links columns and newsletter subscription */}
            <div className="grid sm:grid-cols-10 gap-8 pt-4">
              
              {/* Column 1: Navigation (30% width) */}
              <div className="sm:col-span-3 space-y-4 text-left">
                <h4 className="font-sora text-white/50 text-lg uppercase tracking-wider leading-none">
                  Navigation
                </h4>
                <ul className="space-y-3 font-manrope text-sm font-light text-white/80">
                  <li>
                    <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-red-500 transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <Link to="/blog" className="hover:text-red-500 transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Sleek Contact Us Form (70% width) */}
              <div className="sm:col-span-7 space-y-4 text-left">
                <h4 className="font-sora text-white/50 text-lg uppercase tracking-wider leading-none">
                  Send a Message
                </h4>
                <form onSubmit={handleContactSubmit} className="space-y-3 font-manrope text-xs">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      placeholder="Your Name"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-xl px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleContactChange}
                      placeholder="Email Address"
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-xl px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      placeholder="How can I help you?"
                      rows={3}
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-white/30 rounded-xl px-4 py-2.5 text-white placeholder:text-white/35 outline-none transition-all resize-none"
                      required
                    />
                  </div>
                  
                  {contactStatus && (
                    <p className={`text-[10px] ${contactStatus.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {contactStatus.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-full px-6 py-2.5 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer min-h-[36px]"
                  >
                    {contactLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>

                {/* Callout text below form (right-aligned) */}
                <div className="space-y-1.5 pt-4 text-right">
                  <span className="text-[10px] tracking-widest text-[#6e6e6e] uppercase font-semibold block">
                    AI & TECH MOVES FAST.
                  </span>
                  <h4 className="font-italiana font-light text-xl text-white">
                    Stay ahead with Deepankar Dayal.
                  </h4>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

    </footer>
  );
}
