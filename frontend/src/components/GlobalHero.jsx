import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Custom hook to typewriter reveal characters step-by-step
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer;

    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayed((prev) => prev + text.charAt(index));
          index++;
        } else {
          setDone(true);
          clearInterval(timer);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function GlobalHero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inView, setInView] = useState(true);

  // Mouse tracking and seek parameters
  const prevXRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  // Intersection Observer to stop expensive video seeking/listeners when scrolled away
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Typewriter parameters
  const heroDescription = "I build high-performance web applications, decentralized blockchain networks, and intelligent automation systems. Now, what are we building?";
  const { displayed, done } = useTypewriter(heroDescription, 38, 600);

  // Trigger button entry after 400ms
  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Video metadata loaded
  const handleLoadedMetadata = () => {
    setIsReady(true);
  };

  // Prevent seek flooding by queueing updates in onSeeked
  const handleSeeked = () => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || !video.duration) return;

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  // Horizontal mouse movement scrubs the video timeline (throttled with rAF)
  useEffect(() => {
    if (!inView || !isReady) return;

    let animId;
    const video = videoRef.current;

    const handleMouseMove = (e) => {
      if (!video || !video.duration || isNaN(video.duration)) return;

      const currentX = e.clientX;
      const prevX = prevXRef.current;
      prevXRef.current = currentX;

      const delta = currentX - prevX;
      const SENSITIVITY = 0.8;
      // Convert translation to time offset
      const timeOffset = (delta / window.innerWidth) * SENSITIVITY * video.duration;

      let targetTime = targetTimeRef.current + timeOffset;
      // Clamp between 0 and duration
      targetTime = Math.max(0, Math.min(video.duration, targetTime));
      targetTimeRef.current = targetTime;
    };

    const handleMouseEnter = (e) => {
      prevXRef.current = e.clientX;
    };

    // Ticker loop to execute at most one seek per screen refresh frame
    const tick = () => {
      if (video && !isSeekingRef.current && Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isReady, inView]);

  // Copy email helper
  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('deepankar1562@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={containerRef} className="font-hero-body relative min-h-screen flex flex-col justify-end md:justify-center px-5 sm:px-8 md:px-10 pb-12 md:pb-0 overflow-hidden bg-transparent select-none">
      
      {/* ── Absolute Scrub-Controlled Background Video ── */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onSeeked={handleSeeked}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ objectPosition: '70% center' }}
      />

      {/* Cinematic dark gradient overlay mask to unify the theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0d]/40 via-[#0a0a0d]/65 to-[#0a0a0d] z-0 pointer-events-none" />

      {/* ── Interactive Content Container ── */}
      <div className="relative z-10 max-w-xl text-left">
        
        {/* 1. Blurred Intro Label */}
        <div className="pointer-events-none select-none mb-5 sm:mb-6 text-[clamp(18px,4vw,26px)] leading-[1.3] font-normal text-white/40 blur-[1.5px]">
          Hey there, meet Deepankar Dayal,<br />
          Full-Stack Developer & Systems Architect
        </div>

        {/* 2. Typewriter Description */}
        <p className="text-white mb-5 sm:mb-6 text-[clamp(18px,4vw,26px)] leading-[1.35] font-normal min-height-[54px]">
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />
          )}
        </p>

        {/* 3. Action Pill Buttons */}
        <div
          className={`flex flex-wrap gap-y-1 transition-all duration-500 ease-out ${
            showButtons 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {/* White Glassmorphic Pill Buttons */}
          <Link
            to="/projects"
            className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore my projects
          </Link>
          
          <Link
            to="/blog"
            className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-all duration-300"
          >
            Read my blog
          </Link>

          <Link
            to="/about"
            className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-all duration-300"
          >
            Learn about me
          </Link>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-all duration-300"
          >
            MERN & Web3 Systems
          </a>

          {/* Outline Email Copy Button */}
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <span>
              {copied ? "Email copied!" : (
                <span>
                  Contact me: <span className="underline underline-offset-1">deepankar1562@gmail.com</span>
                </span>
              )}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
