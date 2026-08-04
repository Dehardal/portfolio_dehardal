/**
 * ProjectCta.jsx — Reusable project showcase section.
 * Modular assembly:
 * - Left column: ProjectDetailsLeft (Heading, Vertical 3D DNA Tech Helix, Action Buttons)
 * - Right column: DashboardMock (Pixel-faithful Custom Interactive Previews — UNTOUCHED & LOCKED)
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProjectDetailsLeft from './ProjectDetailsLeft';

/* ─────────────────────────────────────────
   CONSTANTS & MEDIA
───────────────────────────────────────── */
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

const CANNED_REPLIES = [
  "That's a fantastic approach! Full-screen looping videos create incredible atmosphere. The key is using object-fit: cover with proper z-indexing to layer content on top.",
  "Great follow-up! For the liquid glass nav bar you'll want backdrop-filter blur with rgba backgrounds and very subtle borders. Let me show you the pattern.",
  "Excellent question! The email signup should be minimal — a pill-shaped input + button combo floating above your hero is the modern standard.",
];

/* ─────────────────────────────────────────
   HOOK: useIsMobile
───────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return isMobile;
}

/* ─────────────────────────────────────────
   MIcon — Material Symbols Outlined Helper
───────────────────────────────────────── */
function MIcon({ name, size = 20, fill = 0, weight = 400, className = '' }) {
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

/* ─────────────────────────────────────────
   FadeUp Wrapper
───────────────────────────────────────── */
function FadeUp({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   ChatPanel — driven by project context (RIGHT SECTION)
───────────────────────────────────────── */
function ChatPanel({ project }) {
  const seedMessages = [
    {
      id: 's1',
      role: 'assistant',
      text: `🤖 WELCOME TO ${project.title.toUpperCase()} WORKSPACE\nI have loaded the blueprint documentation below:`,
    },
    {
      id: 's2',
      role: 'assistant',
      text: `📌 OVERVIEW:\n${project.desc}`,
    },
    {
      id: 's3',
      role: 'assistant',
      text: `🎯 THE PROBLEM:\n${project.problem}`,
    },
    {
      id: 's4',
      role: 'assistant',
      text: `💡 OUR SOLUTION:\n${project.solution}`,
    },
    {
      id: 's5',
      role: 'assistant',
      text: `💻 TECH STACK:\n${project.tech.join(', ')}`,
    },
    {
      id: 's6',
      role: 'assistant',
      text: `⚙️ ARCHITECTURE:\n${project.architecture.map(a => `• ${a}`).join('\n')}`,
    },
    {
      id: 's7',
      role: 'system',
      text: '🔒 Secured session. Type below to ask queries.',
    },
  ];

  const [messages, setMessages] = useState(seedMessages);
  const [input, setInput] = useState('');
  const [cannedIdx, setCannedIdx] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = useCallback(() => {
    const t = input.trim();
    if (!t) return;
    setMessages((prev) => [...prev, { id: `u${Date.now()}`, role: 'user', text: t }]);
    setInput('');
    
    // Generate intelligent contextual reply using project data
    const query = t.toLowerCase();
    let reply = "";

    if (query.includes('concept') || query.includes('caoncept') || query.includes('about') || query.includes('description') || query.includes('describe') || query.includes('what is')) {
      reply = `${project.title} is ${project.desc.charAt(0).toLowerCase() + project.desc.slice(1)}`;
    } else if (query.includes('tech') || query.includes('stack') || query.includes('built') || query.includes('build') || query.includes('language') || query.includes('framework')) {
      reply = `The platform is built using a modern full-stack architecture featuring ${project.tech.join(', ')}.`;
    } else if (query.includes('architecture') || query.includes('deployed') || query.includes('deploy') || query.includes('host') || query.includes('modules')) {
      reply = `The system deployment architecture utilizes: ${project.architecture.join(', ')}. It is fully integrated with active endpoints.`;
    } else if (query.includes('problem') || query.includes('why')) {
      reply = `The primary problem addressed: ${project.problem}`;
    } else if (query.includes('solution') || query.includes('solve') || query.includes('how')) {
      reply = `Our solution: ${project.solution}`;
    } else if (query.includes('feature') || query.includes('highlight') || query.includes('key') || query.includes('milestone')) {
      reply = `Key highlights include:\n` + project.highlights.map(h => `• ${h.text}`).join('\n');
    } else {
      reply = `I am the assistant for ${project.title}. I can answer questions about the project's core concepts, tech stack, architecture, target problem, or highlights. Try asking me "what is the tech stack?" or "what is the main concept?"`;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a${Date.now()}`, role: 'assistant', text: reply },
      ]);
    }, 700);
  }, [input, project]);

  return (
    <div
      className="flex flex-col h-full rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: 'rgba(8,8,10,0.65)', backdropFilter: 'blur(24px)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/5 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${project.color}22` }}
        >
          <MIcon name="hub" size={14} fill={1} className="text-white/70" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white leading-tight truncate">{project.title}</p>
          <p className="text-[10px] text-white/40 leading-tight truncate">{project.domain}</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4 space-y-3 min-h-0">
        {messages.map((msg, i) => {
          if (msg.role === 'system') {
            return (
              <FadeUp key={msg.id} delay={i * 0.05} y={8} className="flex justify-center w-full my-2">
                <div className="max-w-[92%] rounded-xl bg-amber-500/10 border border-amber-500/20 px-3.5 py-2 text-center text-[10px] leading-relaxed text-amber-300/85 font-mono shadow-sm">
                  {msg.text}
                </div>
              </FadeUp>
            );
          }

          return (
            <FadeUp key={msg.id} delay={i * 0.1} y={10}>
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-white/12 text-white/90'
                      : 'bg-white/[0.04] text-white/65 border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-2.5">
        <div className="liquid-glass rounded-xl flex items-center gap-2 px-3 py-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask about ${project.title}…`}
            className="flex-1 bg-transparent outline-none border-0 text-xs text-white/80 placeholder:text-white/30 min-w-0"
          />
          <button
            onClick={sendMessage}
            className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors cursor-pointer"
          >
            <MIcon name="arrow_upward" size={14} weight={600} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   VelorahHeroPreview — fallback design
───────────────────────────────────────── */
function VelorahHeroPreview({ project }) {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: 'hsl(201 100% 13%)' }}
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Overlay tint */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4">
        <span
          className="text-white text-sm sm:text-base md:text-lg tracking-tight flex items-center gap-1.5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {project.title}<sup className="text-[0.5em]">®</sup>
        </span>

        <nav className="hidden md:flex items-center gap-4 lg:gap-5">
          {['Home', 'Studio', 'About', 'Journal', 'Reach Us'].map((item) => (
            <span
              key={item}
              className={`text-[9px] lg:text-[10px] cursor-pointer transition-colors ${
                item === 'Home' ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {item}
            </span>
          ))}
        </nav>

        <span className="liquid-glass rounded-full px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] text-white cursor-pointer">
          Begin Journey
        </span>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4 pt-3 sm:pt-5 md:pt-7 pb-6">
        <h1
          className="animate-fade-rise font-normal leading-[0.95] tracking-[-0.03em] text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[90%]"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-white/55">dreams</em> rise{' '}
          <em className="not-italic text-white/55">through the silence.</em>
        </h1>

        <p className="animate-fade-rise-delay text-white/60 text-[9px] sm:text-[11px] md:text-xs leading-relaxed max-w-[80%] sm:max-w-sm md:max-w-md mt-2 sm:mt-3 md:mt-4">
          {project.desc}
        </p>

        <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-[9px] sm:text-[10px] text-white mt-3 sm:mt-4 md:mt-5 cursor-pointer hover:bg-white/10 transition-colors">
          Begin Journey
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CareerAtlasPreview — Simulated Web Browser Mockup of Live Platform
───────────────────────────────────────── */
function CareerAtlasPreview() {
  const [activeStep, setActiveStep] = useState('react');
  const [checklist, setChecklist] = useState({
    html: true,
    css: true,
    js: true,
    react: true,
    ts: false,
    systemDesign: false,
  });

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0b0c10] text-white rounded-2xl border border-white/10 overflow-hidden font-sans">
      
      {/* 1. Browser Window Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-white/10 flex-shrink-0 select-none">
        {/* Left Mac-style controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        
        {/* URL Bar */}
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-black/40 border border-white/5 text-[10px] text-white/60 font-mono w-[60%] justify-center">
          <MIcon name="lock" size={9} className="text-emerald-400" />
          <span className="truncate">career-atlas-nextstep.onrender.com</span>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-1 opacity-50">
          <MIcon name="refresh" size={12} />
          <MIcon name="more_vert" size={12} />
        </div>
      </div>

      {/* 2. Platform Client Interface */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        
        {/* Left Navigator Sidebar */}
        <div className="w-14 sm:w-16 border-r border-white/5 bg-[#0f1115] flex flex-col items-center py-3 justify-between flex-shrink-0 select-none">
          <div className="flex flex-col items-center gap-4">
            {/* Logo */}
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-xs shadow-lg text-white">
              C
            </div>
            
            {/* Nav Icons */}
            <div className="flex flex-col gap-3.5 mt-2">
              <span className="p-1.5 rounded-lg bg-white/10 text-blue-400 cursor-pointer">
                <MIcon name="explore" size={15} fill={1} />
              </span>
              <span className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white cursor-pointer transition-colors">
                <MIcon name="view_kanban" size={15} />
              </span>
              <span className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white cursor-pointer transition-colors">
                <MIcon name="analytics" size={15} />
              </span>
            </div>
          </div>

          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] opacity-75 font-bold">
            DP
          </span>
        </div>

        {/* Main Interface Workspace */}
        <div className="flex-1 flex flex-col p-3 overflow-y-auto scrollbar-hide min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-white/5 flex-shrink-0">
            <div>
              <h2 className="text-xs sm:text-sm font-semibold tracking-tight">Full Stack Developer Pathway</h2>
              <p className="text-[9px] text-white/40">Step-by-step progress checklist and curriculum roadmap</p>
            </div>
            <div className="bg-[#1f242d] px-2 py-0.5 rounded text-[9px] font-mono text-blue-400 font-semibold border border-blue-500/20">
              85% MATCH
            </div>
          </div>

          {/* Interactive pathway split grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[1.2fr_1fr] gap-3 flex-1 min-h-0">
            
            {/* Left: Dynamic Path Nodes Graph */}
            <div className="flex flex-col gap-2 relative bg-black/40 rounded-xl p-2.5 border border-white/5 min-h-[160px] justify-between">
              
              {/* Connecting vertical path wire */}
              <div className="absolute left-[24px] top-6 bottom-6 w-[1.5px] bg-gradient-to-b from-blue-500 via-emerald-400 to-white/10 pointer-events-none" />

              {/* Node 1: Foundations */}
              <div 
                onClick={() => setActiveStep('foundations')}
                className={`flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg transition-all ${
                  activeStep === 'foundations' ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold z-10 ${
                  checklist.html && checklist.css && checklist.js ? 'bg-blue-500 text-white' : 'border border-blue-500 text-blue-500 bg-[#0b0c10]'
                }`}>
                  ✓
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white/90">Web Foundations</p>
                  <p className="text-[8px] text-white/40">HTML, CSS, modern ES6+ JS</p>
                </div>
              </div>

              {/* Node 2: React Core */}
              <div 
                onClick={() => setActiveStep('react')}
                className={`flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg transition-all ${
                  activeStep === 'react' ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold z-10 ${
                  checklist.react ? 'bg-emerald-500 text-white' : 'border border-emerald-400 text-emerald-400 bg-[#0b0c10]'
                }`}>
                  ✓
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white/90">React Framework</p>
                  <p className="text-[8px] text-white/40">State management, hooks, layout</p>
                </div>
              </div>

              {/* Node 3: Systems & TypeScript */}
              <div 
                onClick={() => setActiveStep('systems')}
                className={`flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg transition-all ${
                  activeStep === 'systems' ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-white/5'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold z-10 ${
                  checklist.ts && checklist.systemDesign ? 'bg-emerald-500 text-white' : 'border border-white/20 text-white/30 bg-[#0b0c10]'
                }`}>
                  3
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-white/90">Systems & TypeScript</p>
                  <p className="text-[8px] text-white/40">Backend architecture, strongly typed</p>
                </div>
              </div>

            </div>

            {/* Right: Milestone Checklists & Inspector */}
            <div className="flex flex-col bg-white/[0.02] border border-white/5 rounded-xl p-2.5 justify-between min-h-[160px]">
              <div className="space-y-2">
                <span className="text-[8px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                  PREREQUISITE CHECKLIST
                </span>

                <div className="space-y-1.5">
                  <div 
                    onClick={() => toggleCheck('html')}
                    className="flex items-center justify-between p-1.5 rounded bg-black/20 hover:bg-black/40 cursor-pointer border border-white/5 transition-colors"
                  >
                    <span className="text-[9px] text-white/80">HTML5 Semantic Structure</span>
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] ${checklist.html ? 'bg-blue-500 text-white' : 'border border-white/20'}`}>
                      {checklist.html ? '✓' : ''}
                    </span>
                  </div>

                  <div 
                    onClick={() => toggleCheck('react')}
                    className="flex items-center justify-between p-1.5 rounded bg-black/20 hover:bg-black/40 cursor-pointer border border-white/5 transition-colors"
                  >
                    <span className="text-[9px] text-white/80">React Hooks & State Context</span>
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] ${checklist.react ? 'bg-blue-500 text-white' : 'border border-white/20'}`}>
                      {checklist.react ? '✓' : ''}
                    </span>
                  </div>

                  <div 
                    onClick={() => toggleCheck('ts')}
                    className="flex items-center justify-between p-1.5 rounded bg-black/20 hover:bg-black/40 cursor-pointer border border-white/5 transition-colors"
                  >
                    <span className="text-[9px] text-white/80">TypeScript Type Interfaces</span>
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] ${checklist.ts ? 'bg-blue-500 text-white' : 'border border-white/20'}`}>
                      {checklist.ts ? '✓' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-500/10 border border-blue-500/10 p-2 rounded text-[8px] text-blue-300 leading-normal mt-1.5">
                💡 <span className="font-semibold">Tip:</span> Select nodes on the left pathway graph to load syllabus modules and check off completed skills.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export function DashboardMock({ project }) {
  const hasLiveUrl = project.live && project.live !== '';

  return (
    <div className="liquid-glass w-full aspect-[3/4] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden p-2 sm:p-2.5 shadow-2xl">
      <div className="grid h-full grid-cols-1 sm:grid-cols-[minmax(200px,300px)_1fr] gap-2 sm:gap-2.5">
        <div className="hidden sm:block min-h-0">
          <ChatPanel project={project} />
        </div>
        <div className="min-h-0 relative w-full h-full">
          {hasLiveUrl ? (
            <div className="w-full h-full flex flex-col bg-[#0b0c10] text-white rounded-2xl border border-white/10 overflow-hidden font-sans">
              {/* Browser Window Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#161b22] border-b border-white/10 flex-shrink-0 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded bg-black/40 border border-white/5 text-[10px] text-white/60 font-mono w-[60%] justify-center">
                  <MIcon name="lock" size={9} className="text-emerald-400" />
                  <span className="truncate">{project.live.replace('https://', '')}</span>
                </div>
                <div className="flex items-center gap-1 opacity-50">
                  <MIcon name="refresh" size={12} />
                  <MIcon name="more_vert" size={12} />
                </div>
              </div>
              {/* Embedded Live Iframe */}
              <iframe
                src={project.live}
                title={`${project.title} Live Preview`}
                className="flex-1 w-full h-full border-none bg-[#0a0a0d]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <VelorahHeroPreview project={project} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ProjectCta — main reusable export
   Props:
     project  {object}  — one item from PROJECTS array
     flip     {boolean} — flip layout for alternating rows
───────────────────────────────────────── */
export default function ProjectCta({ project, flip = false, isSlideshow = false }) {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const dashY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['20px', '-20px'] : ['0px', '-50px']
  );

  const grassY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ['60px', '-30px'] : ['180px', '-180px']
  );

  return (
    <section
      ref={sectionRef}
      id={`project-${project.id}`}
      className="relative w-full h-full flex flex-col justify-center overflow-hidden"
      style={{
        background: 'transparent',
      }}
    >
      <div
        className={`relative mx-auto max-w-[1080px] w-full px-4 sm:px-6 pl-14 sm:pl-16 lg:pl-10 pt-12 sm:pt-14 lg:pt-16 pb-[350px] ${
          isSlideshow ? 'lg:pb-24' : 'lg:pb-[340px]'
        }`}
      >
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center ${
            flip ? 'lg:flex lg:flex-row-reverse' : ''
          }`}
        >
          {/* Modular Left Section: Heading + 3D Vertical DNA Tech Helix + Action Buttons */}
          <ProjectDetailsLeft project={project} />
        </div>
      </div>

      {/* Modular Right Section: DashboardMock — (LOCKED UNTOUCHED ORIGINAL LAYOUT & SIZING) */}
      <motion.div
        style={{ y: dashY }}
        className={`absolute top-[320px] sm:top-[340px] md:top-[350px] lg:top-16
          left-4 right-4 sm:left-auto
          ${flip
            ? 'sm:-left-[8%] md:-left-[10%] lg:-left-[12%]'
            : 'sm:-right-[8%] md:-right-[10%] lg:-right-[12%]'
          }
          z-10 sm:w-[85%] md:w-[78%] lg:w-[66%]`}
      >
        <DashboardMock project={project} />
      </motion.div>

      {/* Grass foreground */}
      <motion.img
        src="https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1780586778/cta-bg_mlwy5s.png"
        alt=""
        aria-hidden
        style={{ y: grassY }}
        className="pointer-events-none select-none absolute left-0 right-0 bottom-[-30px] sm:bottom-[-60px] lg:bottom-[-120px] w-full z-30 object-cover"
      />
    </section>
  );
}
