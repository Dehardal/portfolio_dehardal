/**
 * ProjectDetailsLeft.jsx — Modular Left Column Component for Project Showcase.
 * Contains:
 * 1. Project Heading (Category label, status badge, title, tagline)
 * 2. 3D Vertical DNA Double-Helix Tech Stack Visualizer
 * 3. Deployed Architecture Module Chips
 * 4. GitHub Repo & Live Website Action Buttons
 */
import React from 'react';
import { motion } from 'framer-motion';

/* Material Symbols Outlined Icon Helper */
function MIcon({ name, size = 18, fill = 0, weight = 400, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined select-none leading-none ${className}`}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
    >
      {name}
    </span>
  );
}

/* Hover Slide-up Animated Text */
function AnimatedText({ children }) {
  return (
    <span className="relative overflow-hidden inline-flex flex-col" style={{ height: '1.25em' }}>
      <span className="transition-transform duration-200 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span
        className="absolute top-full transition-transform duration-200 ease-out group-hover:-translate-y-full"
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}

export default function ProjectDetailsLeft({ project }) {
  if (!project) return null;

  return (
    <div className="relative z-20 max-w-[440px] w-full space-y-5 font-dmsans">
      
      {/* ── 1. Project Heading & Status Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
            {project.label}
          </span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: project.status === 'Completed' || project.status === 'Live' ? '#34d399' : '#fbbf24',
              borderColor: project.status === 'Completed' || project.status === 'Live' ? '#34d39930' : '#fbbf2430',
              background: project.status === 'Completed' || project.status === 'Live' ? '#34d39910' : '#fbbf2410',
            }}
          >
            {project.status}
          </span>
        </div>

        <h2
          className="text-2xl sm:text-3xl lg:text-[2.3rem] font-normal tracking-[-0.025em] leading-[1.08] text-white"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {project.title}
        </h2>
        
        <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          {project.tagline}
        </p>
      </motion.div>

      {/* ── 2. Highlight Bullets ── */}
      {project.highlights && project.highlights.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-2"
          aria-label={`${project.title} features`}
        >
          {project.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-white/50 leading-normal">
              <MIcon name={item.icon || 'check_circle'} size={14} className="text-white/70 mt-0.5 flex-shrink-0" />
              <span>{item.text}</span>
            </li>
          ))}
        </motion.ul>
      )}

      {/* ── 3. Tech Stack Chips ── */}
      {project.tech && project.tech.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-1.5"
        >
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] font-mono bg-white/5 text-white/60 border border-white/10 rounded px-2 py-0.5">
              {t}
            </span>
          ))}
        </motion.div>
      )}

      {/* ── 4. GitHub Repo & Live Website Action Buttons ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-3 pt-1"
      >
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 justify-center rounded-full bg-white/85 hover:bg-white text-black px-6 h-10 text-xs sm:text-sm font-medium leading-none transition-colors cursor-pointer"
          >
            <MIcon name="open_in_new" size={14} weight={500} />
            <AnimatedText>Live Website</AnimatedText>
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className={`group inline-flex items-center gap-2 justify-center rounded-full text-xs sm:text-sm font-medium leading-none transition-all cursor-pointer ${
              project.live
                ? 'border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white px-5 h-10'
                : 'bg-white/85 hover:bg-white text-black px-6 h-10'
            }`}
          >
            <MIcon name="code" size={14} weight={500} />
            <AnimatedText>GitHub Repo</AnimatedText>
          </a>
        )}
      </motion.div>

    </div>
  );
}
