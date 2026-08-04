import React, { useState } from 'react';
import { motion } from 'framer-motion';
import profilePhoto from '../images/IMG_20260307_043624.jpg.jpeg';

/**
 * AboutSection — Modular component representing Deepankar Dayal's bio 
 * and core developer competencies through an interactive 3D-feeling circle diagram.
 */
export default function AboutSection({ isVisible }) {
  const customEase = [0.22, 1, 0.36, 1];
  const [activeLabel, setActiveLabel] = useState(null); // 'systems' | 'automation' | 'web3' | null

  // Function to calculate SVG coordinates at angle (in degrees) and radius
  const getCoordinates = (angleDeg, radius, cx = 50, cy = 50) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(angleRad),
      y: cy + radius * Math.sin(angleRad)
    };
  };

  // Angles: full stack (215 deg), automation (335 deg), web3 dev (110 deg)
  const angleSystems = 215;
  const angleAutomation = 335;
  const angleWeb3 = 110;

  // Glitch Blocks Coordinates for Portrait:
  const glitchBlocks = [
    { x: 2, y: -3, w: 22, h: 22 },
    { x: 12, y: -5, w: 14, h: 10 },
    { x: 28, y: -2, w: 10, h: 10 },
    { x: 82, y: 22, w: 8, h: 8 },
    { x: -4, y: 75, w: 16, h: 12 },
    { x: 8, y: 82, w: 10, h: 10 },
    { x: -2, y: 88, w: 18, h: 16 },
    { x: 56, y: 82, w: 12, h: 14 },
    { x: 70, y: 90, w: 10, h: 10 },
    { x: 42, y: 94, w: 8, h: 6 }
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 pt-12 pb-12 sm:px-10 lg:px-16 lg:pt-20 lg:pb-20">
      
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4 mb-20">
        <div className="flex flex-col text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: customEase }}
            className="text-[#6e6e6e] font-light text-[clamp(2.0rem,3.4vw,2.6rem)] leading-[1.18] tracking-[-0.01em]"
          >
            ABOUT DEEPANKAR
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: customEase }}
            className="text-white font-light text-[clamp(2.0rem,3.4vw,2.6rem)] leading-[1.18] tracking-[-0.01em]"
          >
            Architecting Operations & Systems
          </motion.span>
        </div>
      </div>

      {/* Content Row */}
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
        
        {/* Left side: portrait & bio */}
        <div className="flex min-w-0 flex-1 flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          
          {/* Glitch Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
            className="relative shrink-0 w-[250px] h-[310px] bg-slate-900 overflow-visible rounded-2xl"
          >
            <img 
              src={profilePhoto} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&fit=crop&w=600&h=800&q=80";
              }}
              alt="Deepankar Dayal" 
              className="w-full h-full object-cover rounded-2xl border border-white/10"
            />

            {/* 10 Glitch Blocks */}
            {isVisible && glitchBlocks.map((block, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 1, 0.9] }}
                transition={{ 
                  duration: 0.35, 
                  delay: 0.5 + idx * 0.05, 
                  ease: customEase 
                }}
                className="absolute bg-white z-20 pointer-events-none"
                style={{
                  left: `${block.x}%`,
                  top: `${block.y}%`,
                  width: `${block.w}px`,
                  height: `${block.h}px`
                }}
              />
            ))}
          </motion.div>

          {/* Testimonial/Bio Text */}
          <div className="min-w-0 max-w-[420px] text-left">
            <motion.div
              initial={{ y: 14, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
              className="text-[#555] select-none pointer-events-none"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "3.2rem", lineHeight: 0.7 }}
            >
              &ldquo;
            </motion.div>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: customEase }}
              className="text-white/90 text-[clamp(1.05rem,1.5vw,1.2rem)] font-light leading-[1.6] max-w-lg"
            >
              I specialize in designing and engineering high-impact web applications, automated workflow engines, and decentralized systems. My focus is on turning operational chaos into streamlined digital workflows that scale silently.
            </motion.p>

            <motion.div
              initial={{ y: 14, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: customEase }}
              className="mt-8"
            >
              <h4 className="text-[1.15rem] font-medium tracking-[0.01em] text-white">Deepankar Dayal</h4>
              <p className="mt-1 text-[0.85rem] tracking-wide text-[#6e6e6e]">Product Thinker &amp; Full Stack Engineer</p>
            </motion.div>
          </div>

        </div>

        {/* Right side: circle diagram */}
        <div className="flex w-full max-w-[360px] shrink-0 items-center justify-center self-center sm:max-w-[400px] lg:max-w-[440px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: customEase }}
            className="w-full relative aspect-square -translate-y-20 lg:-translate-y-28 -mb-20 lg:-mb-28"
          >
            {/* SVG Centered Diagram */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 z-10">
              
              {/* Central Circle */}
              <circle 
                cx="50" 
                cy="50" 
                r="30" 
                stroke="white" 
                strokeWidth="0.18" 
                fill="none"
                opacity="0.45"
              />

              {/* 3 Radiating Lines */}
              {/* 1. full stack */}
              <motion.line
                x1="50"
                y1="50"
                x2={getCoordinates(angleSystems, 36).x}
                y2={getCoordinates(angleSystems, 36).y}
                stroke="white"
                initial={{ strokeWidth: 0.18, opacity: 0.45 }}
                animate={{
                  strokeWidth: activeLabel === 'systems' ? 0.6 : 0.18,
                  opacity: activeLabel === 'systems' ? 1 : 0.45
                }}
                transition={{ duration: 0.25, ease: customEase }}
              />

              {/* 2. automation */}
              <motion.line
                x1="50"
                y1="50"
                x2={getCoordinates(angleAutomation, 36).x}
                y2={getCoordinates(angleAutomation, 36).y}
                stroke="white"
                initial={{ strokeWidth: 0.18, opacity: 0.45 }}
                animate={{
                  strokeWidth: activeLabel === 'automation' ? 0.6 : 0.18,
                  opacity: activeLabel === 'automation' ? 1 : 0.45
                }}
                transition={{ duration: 0.25, ease: customEase }}
              />

              {/* 3. web3 dev */}
              <motion.line
                x1="50"
                y1="50"
                x2={getCoordinates(angleWeb3, 36).x}
                y2={getCoordinates(angleWeb3, 36).y}
                stroke="white"
                initial={{ strokeWidth: 0.18, opacity: 0.45 }}
                animate={{
                  strokeWidth: activeLabel === 'web3' ? 0.6 : 0.18,
                  opacity: activeLabel === 'web3' ? 1 : 0.45
                }}
                transition={{ duration: 0.25, ease: customEase }}
              />

            </svg>

            {/* 3 Absolute Labels positioned outside at radius 46 */}
            {/* 1. full stack */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6, ease: customEase }}
              onMouseEnter={() => setActiveLabel('systems')}
              onMouseLeave={() => setActiveLabel(null)}
              onClick={() => setActiveLabel(activeLabel === 'systems' ? null : 'systems')}
              className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 text-white font-light text-[clamp(1.1rem,2.4vw,2.0rem)] tracking-[-0.01em] whitespace-nowrap select-none px-3 py-2"
              style={{
                left: `${getCoordinates(angleSystems, 54).x}%`,
                top: `${getCoordinates(angleSystems, 54).y}%`,
                fontWeight: activeLabel === 'systems' ? 700 : 300,
                transition: 'font-weight 0.2s ease'
              }}
            >
              full stack
            </motion.div>

            {/* 2. automation */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.75, ease: customEase }}
              onMouseEnter={() => setActiveLabel('automation')}
              onMouseLeave={() => setActiveLabel(null)}
              onClick={() => setActiveLabel(activeLabel === 'automation' ? null : 'automation')}
              className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 text-white font-light text-[clamp(1.1rem,2.4vw,2.0rem)] tracking-[-0.01em] whitespace-nowrap select-none px-3 py-2"
              style={{
                left: `${getCoordinates(angleAutomation, 46).x}%`,
                top: `${getCoordinates(angleAutomation, 46).y}%`,
                fontWeight: activeLabel === 'automation' ? 700 : 300,
                transition: 'font-weight 0.2s ease'
              }}
            >
              automation
            </motion.div>

            {/* 3. web3 dev */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.9, ease: customEase }}
              onMouseEnter={() => setActiveLabel('web3')}
              onMouseLeave={() => setActiveLabel(null)}
              onClick={() => setActiveLabel(activeLabel === 'web3' ? null : 'web3')}
              className="absolute z-20 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 text-white font-light text-[clamp(1.1rem,2.4vw,2.0rem)] tracking-[-0.01em] whitespace-nowrap select-none px-3 py-2"
              style={{
                left: `${getCoordinates(angleWeb3, 46).x}%`,
                top: `${getCoordinates(angleWeb3, 46).y}%`,
                fontWeight: activeLabel === 'web3' ? 700 : 300,
                transition: 'font-weight 0.2s ease'
              }}
            >
              web3 dev
            </motion.div>

          </motion.div>
        </div>

      </div>

    </div>
  );
}
