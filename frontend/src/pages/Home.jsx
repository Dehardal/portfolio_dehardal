import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink } from 'lucide-react';
import ProjectCta, { DashboardMock } from '../components/ProjectCta';
import GlobalHero from '../components/GlobalHero';
import { PROJECTS } from '../data/projects';
import AboutSection from '../components/AboutSection';

/* ─────────────────────────────────────────
   Material Symbols Outlined Icon Helper
   ───────────────────────────────────────── */
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

function usePrefersReducedMotion() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPref(mq.matches);
    const h = (e) => setPref(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return pref;
}

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(PROJECTS[0]?.id || '');
  const [mobileActiveId, setMobileActiveId] = useState(PROJECTS[0]?.id || '');
  const prefersReducedMotion = usePrefersReducedMotion();

  const projectIds = PROJECTS.map((p) => p.id);

  // Section scroll spy to auto-focus navigation when clicking hash links in Hero/Navbar
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location]);

  // Project ScrollSpy for left sidebar indicators
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -70% 0px', threshold: 0 }
    );
    projectIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      projectIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  const handleAccordionToggle = (id, ref) => {
    if (mobileActiveId === id) {
      setMobileActiveId('');
    } else {
      setMobileActiveId(id);
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'nearest',
        });
      }, 150);
    }
  };

  // Section Refs & InView Triggers for About section
  const brandingRef = useRef(null);
  const isBrandingInView = useInView(brandingRef, { once: true, margin: "-60px" });

  return (
    <div className="w-full relative min-h-screen text-white bg-transparent">

      {/* ========================================================
          1. SENTINEL AI 3D SPLINE HERO
          ======================================================== */}
      <GlobalHero />


      {/* ========================================================
          2. METHOD SECTION: COMPREHENSIVE BRANDING APPROACH (ABOUT SECTION)
          ======================================================== */}
      <section 
        ref={brandingRef} 
        id="about" 
        className="overflow-x-hidden bg-transparent text-white scroll-mt-20 font-dmsans relative z-10"
      >
        <AboutSection isVisible={isBrandingInView} />
      </section>

      {/* ========================================================
          3. FEATURED PROJECTS: ALL PROJECTS INTEGRATED
          ======================================================== */}
      <section
        id="projects"
        className="bg-transparent text-white scroll-mt-20 font-dmsans relative z-10 pt-12 pb-12 lg:pt-20 lg:pb-20"
      >
        
        {/* Header */}
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 border-b border-white/20 grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] font-sans">
              Selected Projects &amp; Systems
            </h2>
          </div>
          <div className="text-white/70 font-sans text-sm sm:text-[15px] leading-relaxed space-y-4 pt-2 md:pt-4">
            <p className="font-semibold text-white/95">
              Observe, evaluate, and scale full-stack architectures built with modern engineering practices.
            </p>
            <p className="text-white/50">
              These production-ready applications, SaaS platforms, and decentralized networks showcase end-to-end integration, performance optimization, and robust system design.
            </p>
          </div>
        </div>

        {/* ─── DESKTOP: Overlay sticky sidebar + full-width ProjectCta sections ─── */}
        <div className="hidden md:block relative">

          {/* Sidebar wrapper: aligns perfectly with header's max-width grid */}
          <div className="absolute left-0 right-0 top-0 max-w-[1440px] mx-auto px-6 sm:px-12 h-full pointer-events-none z-40">
            {/* Vertical line: stretches from top-0 (horizontal line) to bottom-0 (footer) */}
            <div className="absolute left-6 sm:left-12 top-0 bottom-0 w-[1px] bg-white/20" />
            
            <div className="sticky top-28 pt-16 pointer-events-auto w-[200px]">
              <nav className="flex flex-col gap-4 pl-4 relative" aria-label="Projects navigation">
                {PROJECTS.map((project) => {
                  const isActive = activeId === project.id;
                  return (
                    <button
                      key={project.id}
                      onClick={() => handleNavClick(project.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative flex items-center text-left py-1 transition-all duration-200 cursor-pointer text-sm tracking-tight ${
                        isActive ? 'text-white font-semibold' : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      <span className={`absolute -left-4 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)] transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
                      {project.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Full-width ProjectCta sections — unaffected by sidebar overlay */}
          <div className="flex flex-col">
            {PROJECTS.map((project) => {
              const isActive = activeId === project.id;
              return (
                <div
                  key={project.id}
                  id={project.id}
                  className="scroll-mt-20 outline-none"
                >
                  <div
                    className={`transition-all duration-500 ease-out ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'
                    }`}
                  >
                    <ProjectCta project={project} isSlideshow={false} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE ACCORDION ─── */}
        <div className="flex md:hidden flex-col gap-4 px-4 py-8">
          {PROJECTS.map((project, index) => {
            const isOpen = mobileActiveId === project.id;
            const itemRef = useRef(null);

            return (
              <div
                key={project.id}
                ref={itemRef}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]"
              >
                <button
                  id={`header-${project.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${project.id}`}
                  onClick={() => handleAccordionToggle(project.id, itemRef)}
                  className="w-full flex items-center justify-between p-5 text-left select-none outline-none cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-white/60 uppercase tracking-wider">
                      0{index + 1} // {project.domain}
                    </span>
                    <span className="text-base font-semibold text-white mt-0.5">
                      {project.title}
                    </span>
                  </div>
                  <MIcon
                    name={isOpen ? 'expand_less' : 'expand_more'}
                    size={22}
                    className="text-white/60"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`panel-${project.id}`}
                      role="region"
                      aria-labelledby={`header-${project.id}`}
                      initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-white/5 flex flex-col gap-5">
                        <div>
                          <p className="text-xs text-white/60 font-mono tracking-wider mb-1">
                            {project.label}
                          </p>
                          <p className="text-white/70 text-xs leading-relaxed">{project.tagline}</p>
                        </div>
                        <ul className="flex flex-col gap-2">
                          {project.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-white/50 leading-normal">
                              <MIcon name={item.icon || 'check_circle'} size={14} className="text-white/70 mt-0.5" />
                              <span>{item.text}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.map((t) => (
                            <span key={t} className="text-[9px] font-mono bg-white/5 text-white/60 border border-white/10 rounded px-1.5 py-0.5">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-3.5 py-1.5 text-xs font-semibold hover:bg-white/90">
                              <ExternalLink size={11} /> Live View
                            </a>
                          )}
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 text-white px-3.5 py-1.5 text-xs font-semibold">
                              <Code size={11} /> GitHub
                            </a>
                          )}
                        </div>
                        <div className="w-full mt-2">
                          <DashboardMock project={project} isSlideshow={true} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
