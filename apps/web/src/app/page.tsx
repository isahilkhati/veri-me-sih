'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight, Code2, BrainCircuit, ShieldAlert, BadgeCheck, Network } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Inter, Urbanist } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const urbanist = Urbanist({ subsets: ['latin'], weight: ['500', '600', '700'] });

// --- Custom Hooks ---
const useCountUp = (end: number, duration: number, delay: number) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let timeout: any;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(ease * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  return count;
};

// --- Components ---
const TypewriterHeading = ({ text, delay = 400, speed = 35 }: { text: string, delay?: number, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: any;
    let currentIndex = 0;
    const startTyping = () => {
      setIsTyping(true);
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);
    };
    timeout = setTimeout(startTyping, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <h1 className={`${urbanist.className} text-[36px] md:text-[64px] font-semibold leading-[1.1] tracking-[-1.5px] mb-6`}>
      <span className="text-white">{displayedText.substring(0, 21)}</span>
      <span className="text-[#A068FF]">{displayedText.substring(21)}</span>
      <span className={`inline-block w-[4px] h-[0.9em] bg-[#A068FF] ml-1 align-middle ${isTyping ? 'animate-pulse' : 'animate-bounce'}`} />
    </h1>
  );
};

const AnimatedBorderButton = ({ children, className, onClick, href, slideFrom = 'left' }: any) => {
  const Element = href ? Link : 'button';
  const slideClass = slideFrom === 'left' ? '-translate-x-full group-hover:translate-x-0' : 'translate-x-full group-hover:translate-x-0';

  return (
    <div className="relative inline-flex rounded-[50px] p-[3px] overflow-hidden group btn-border-wrap" style={{ '--border-angle': '0deg' } as any}>
      <div className="absolute inset-0 z-0 bg-[conic-gradient(from_var(--border-angle),#A068FF,#070319,#A068FF,#070319,#A068FF)] animate-[rotate-border_3s_linear_infinite]" />
      <Element href={href || '#'} onClick={onClick} className={`relative z-10 bg-[#060218] text-white rounded-[50px] overflow-hidden ${className}`}>
        <div className={`absolute inset-0 bg-[#A068FF] ${slideClass} transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] z-0`} />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Element>
    </div>
  );
};

const NavLink = ({ children, href }: any) => (
  <Link href={href} className="relative group text-white text-[15px] font-medium transition-colors">
    {children}
    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
  </Link>
);

const Orbit = ({ size, duration, direction, children }: any) => {
  const spinAnim = direction === 'left' ? 'spin-reverse' : 'spin-forward';
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-border z-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{ animation: `${spinAnim} ${duration}s linear infinite` }}>
        {children}
      </div>
    </div>
  );
};

const Avatar = ({ orbitDirection, orbitDuration, angle, size = 58, img, glow, delay, rounded = 'rounded-full' }: any) => {
  const rad = angle * Math.PI / 180;
  const left = `calc(50% + ${Math.cos(rad) * 50}%)`;
  const top = `calc(50% + ${Math.sin(rad) * 50}%)`;
  const counterAnim = orbitDirection === 'left' ? 'spin-forward' : 'spin-reverse';

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top, width: size, height: size }}>
      <div className="w-full h-full" style={{ animation: `${counterAnim} ${orbitDuration}s linear infinite` }}>
        <div className={`w-full h-full opacity-0 animate-[avatar-fly-in_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards] ${rounded} ${glow} overflow-hidden border border-white/10 bg-[#060218]`} style={{ animationDelay: `${delay}s` }}>
          <img src={img} alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const IconNode = ({ orbitDirection, orbitDuration, angle, size = 50, glow = 'shadow-[0_0_15px_rgba(255,255,255,0.1)]', delay, rounded = 'rounded-xl', children }: any) => {
  const rad = angle * Math.PI / 180;
  const left = `calc(50% + ${Math.cos(rad) * 50}%)`;
  const top = `calc(50% + ${Math.sin(rad) * 50}%)`;
  const counterAnim = orbitDirection === 'left' ? 'spin-forward' : 'spin-reverse';

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top, width: size, height: size }}>
      <div className="w-full h-full" style={{ animation: `${counterAnim} ${orbitDuration}s linear infinite` }}>
        <div className={`w-full h-full opacity-0 animate-[avatar-fly-in_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards] flex items-center justify-center bg-[#0d0726] border border-white/10 ${rounded} ${glow}`} style={{ animationDelay: `${delay}s` }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const verifiedCount = useCountUp(20, 2000, 1200);
  const logos = [
    'https://polo-pecan-73837341.figma.site/_assets/v11/1e7b0e6fcc016cd28aec5c68990118b8c54c35a5.svg',
    'https://polo-pecan-73837341.figma.site/_assets/v11/3eac03c183db2ae080d910159211c14843398b61.svg',
    'https://polo-pecan-73837341.figma.site/_assets/v11/17705a4c0023a0e5a99154dfb10582adbbf4260b.svg',
    'https://polo-pecan-73837341.figma.site/_assets/v11/0e5f442b09dc5c248e3e60d40a65505fb1887228.svg',
    'https://polo-pecan-73837341.figma.site/_assets/v11/63f99030ceb459e3c9ab9e429cfa2353491d3816.svg'
  ];
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

  const handleSmoothScroll = (e: any, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#060218] text-white ${inter.className} overflow-x-hidden`}>
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        @property --border-angle { syntax: "<angle>"; inherits: true; initial-value: 0turn; }
        @keyframes rotate-border { to { --border-angle: 1turn; } }
        @keyframes orbit-left { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes orbit-right { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes scroll-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes avatar-fly-in { 0% { transform: scale(0.3) rotate(-180deg); opacity: 0; filter: blur(10px); } 100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin-forward { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes float-cursor { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-5deg); } }
        .orbit-border {
          border: 1px dashed rgba(160, 104, 255, 0.4);
          box-shadow: 0 0 20px rgba(160, 104, 255, 0.15);
          border-radius: 50%;
        }
        .fade-down { animation: fadeDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .fade-up { animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        .scale-in { animation: scaleIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; transform-origin: center; }
        .bg-hero { background: url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85') center center / cover no-repeat; }
        
        .hero-circles-wrapper {
           position: relative;
           width: 100%;
           max-width: 720px;
           aspect-ratio: 1/1;
           display: flex;
           justify-content: center;
           align-items: center;
        }
        .hero-circles-responsive {
           transform-origin: center;
           display: flex;
           justify-content: center;
           align-items: center;
           width: 100%;
           height: 100%;
        }
        .hero-circles {
           position: absolute;
           width: 720px;
           height: 720px;
        }
        
        @media (max-width: 1536px) { .hero-circles-responsive { transform: scale(0.85); } }
        @media (max-width: 1280px) { .hero-circles-responsive { transform: scale(0.70); } .hero-left { flex: 0 1 500px; } }
        @media (max-width: 1024px) { 
          .hero-circles-responsive { transform: scale(0.65); } 
          .hero-circles-wrapper { height: 450px; }
          .hero-layout { flex-direction: column; text-align: center; gap: 20px; padding-top: 40px; } 
          .hero-left { align-items: center; flex: none; width: 100%; } 
          .cursor-element { margin-left: 0 !important; right: 20%; } 
        }
        @media (max-width: 768px) { .hero-circles-responsive { transform: scale(0.5); } .hero-circles-wrapper { height: 350px; } .mobile-hide { display: none !important; } }
        @media (max-width: 480px) { .hero-circles-responsive { transform: scale(0.4); } .hero-circles-wrapper { height: 300px; } }
      `}} />

      {/* Hero Section */}
      <div className="w-full min-h-[100svh] flex flex-col relative overflow-hidden bg-hero pb-8 lg:pb-0">
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060218] via-[#060218]/90 to-[#060218]/10 pointer-events-none z-0"></div>
        
        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-[64px] py-[24px] max-w-[1920px] mx-auto w-full fade-down relative z-20">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 text-white group">
              <ShieldCheck className="h-8 w-8 text-[#A068FF] group-hover:scale-110 transition-transform" />
              <span className={`font-bold tracking-wide text-xl ${urbanist.className}`}>Veri-ME</span>
            </Link>
            <nav className="hidden md:flex gap-8 mobile-hide">
              <a href="#problem" onClick={(e) => handleSmoothScroll(e, 'problem')} className="relative group text-white text-[15px] font-medium transition-colors cursor-pointer">
                The Problem
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
              <a href="#solution" onClick={(e) => handleSmoothScroll(e, 'solution')} className="relative group text-white text-[15px] font-medium transition-colors cursor-pointer">
                Platform
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
              <a href="#impact" onClick={(e) => handleSmoothScroll(e, 'impact')} className="relative group text-white text-[15px] font-medium transition-colors cursor-pointer">
                Impact
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            </nav>
          </div>
          <div className="flex gap-6 items-center">
            <NavLink href="/login">Sign In</NavLink>
            <AnimatedBorderButton href="/register" slideFrom="left" className="px-[26px] py-[12px] text-[15px] font-medium">
              Start Verifying
            </AnimatedBorderButton>
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between max-w-[1920px] mx-auto w-full px-6 md:px-[64px] relative z-10 hero-layout">
          
          {/* Hero Left */}
          <div className="flex-[0_1_600px] flex flex-col items-start hero-left relative z-20">
            <div className="fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A068FF]/10 border border-[#A068FF]/30 text-[#A068FF] text-sm font-medium mb-8">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A068FF] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#A068FF]"></span></span>
                SIH 2026 Innovation (SIH26044)
              </div>
            </div>

            <div className="fade-up w-full" style={{ animationDelay: '0.4s' }}>
              <TypewriterHeading text="Verify the Candidate, Trust the Profile." delay={400} speed={45} />
            </div>

            <p className="text-lg text-slate-300 max-w-xl mb-10 leading-relaxed fade-up" style={{ animationDelay: '2.5s' }}>
              Eliminate resume fraud and skill inflation. Veri-ME replaces PDFs with a live, 
              sandboxed Proof-of-Work engine backed by AI integrity checks and Academic endorsements.
            </p>
            
            <div className="fade-up relative" style={{ animationDelay: '3.2s' }}>
              <AnimatedBorderButton href="/register" slideFrom="right" className="px-[28px] py-[14px] text-[16px] font-medium">
                Join the Ecosystem <ChevronRight className="w-5 h-5 ml-1" />
              </AnimatedBorderButton>
              
              {/* Cursor Element */}
              <div className="absolute top-[40px] left-[290px] cursor-element animate-[float-cursor_3s_ease-in-out_infinite] z-20 pointer-events-none" style={{ animationDelay: '3.6s' }}>
                <div className="opacity-0 animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_forwards]" style={{ animationDelay: '3.6s' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#A068FF" className="drop-shadow-lg -rotate-12">
                    <path d="M5.5 2.5L21.5 9.5L13.5 13.5L9.5 21.5L5.5 2.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  <div className="mt-1 ml-4 bg-[#A068FF] text-white text-sm font-medium px-4 py-2 rounded-[20px] shadow-xl whitespace-nowrap">
                    Recruiter ✅
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right - Circles */}
          <div className="hero-circles-wrapper z-10 scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="hero-circles-responsive">
              <div className="hero-circles">
                <Orbit size={300} duration={20} direction="left">
                  <Avatar orbitDirection="left" orbitDuration={20} angle={270} img="https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png" glow="shadow-[0_0_20px_rgba(160,104,255,0.6)]" delay={0.6} rounded="rounded-[20px]" />
                  <IconNode orbitDirection="left" orbitDuration={20} angle={90} size={48} delay={0.8}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-6 h-6 invert" />
                  </IconNode>
                </Orbit>
                <Orbit size={450} duration={35} direction="right">
                  <Avatar orbitDirection="right" orbitDuration={35} angle={60} img="https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png" glow="shadow-[0_0_20px_rgba(255,215,0,0.6)]" delay={0.9} />
                  <IconNode orbitDirection="right" orbitDuration={35} angle={150} size={50} delay={1.1}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" className="w-6 h-6" />
                  </IconNode>
                  <Avatar orbitDirection="right" orbitDuration={35} angle={240} size={78} img="https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png" glow="shadow-[0_0_20px_rgba(255,105,180,0.6)]" delay={1.2} />
                  <IconNode orbitDirection="right" orbitDuration={35} angle={330} size={45} delay={1.3}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" alt="GitLab" className="w-6 h-6" />
                  </IconNode>
                </Orbit>
                <Orbit size={600} duration={45} direction="left">
                  <Avatar orbitDirection="left" orbitDuration={45} angle={130} size={88} img="https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png" glow="shadow-[0_0_20px_rgba(255,105,180,0.6)]" delay={1.4} />
                  <IconNode orbitDirection="left" orbitDuration={45} angle={40} size={55} delay={1.5}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-7 h-7" />
                  </IconNode>
                  <Avatar orbitDirection="left" orbitDuration={45} angle={280} img="https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png" glow="shadow-[0_0_20px_rgba(160,104,255,0.6)]" delay={1.6} />
                </Orbit>
                <Orbit size={750} duration={55} direction="right">
                  <Avatar orbitDirection="right" orbitDuration={55} angle={30} img="https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png" glow="shadow-[0_0_20px_rgba(0,191,255,0.6)]" delay={1.7} rounded="rounded-[20px]" />
                  <IconNode orbitDirection="right" orbitDuration={55} angle={95} size={50} delay={1.8}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-7 h-7" />
                  </IconNode>
                  <Avatar orbitDirection="right" orbitDuration={55} angle={160} size={88} img="https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png" glow="shadow-[0_0_20px_rgba(255,165,0,0.6)]" delay={1.9} rounded="rounded-[24px]" />
                  <Avatar orbitDirection="right" orbitDuration={55} angle={240} size={88} img="https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png" glow="shadow-[0_0_20px_rgba(255,105,180,0.6)]" delay={2.0} rounded="rounded-[24px]" />
                  <IconNode orbitDirection="right" orbitDuration={55} angle={300} size={45} delay={2.1}>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" className="w-6 h-6" />
                  </IconNode>
                </Orbit>
            
            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 flex flex-col items-center justify-center opacity-0 animate-[fadeUp_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards]" style={{ animationDelay: '1.2s' }}>
              <div className={`${urbanist.className} text-[64px] font-medium leading-none tracking-tight text-white drop-shadow-2xl`}>
                {verifiedCount}k+
              </div>
              <div className={`${urbanist.className} text-[16px] font-semibold tracking-wide text-[#A068FF] uppercase mt-1`}>
                Verified Profiles
              </div>
            </div>
          </div>
          </div>
          </div>
        </main>

        {/* Logo Ticker */}
        <div className="w-full overflow-hidden py-10 mt-auto fade-up relative z-10" style={{ animationDelay: '0.6s', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex gap-[64px] w-max animate-[scroll-ticker_20s_linear_infinite]">
            {repeatedLogos.map((url, i) => (
              <img key={i} src={url} className="w-[137px] h-[40px] object-contain opacity-50 hover:opacity-100 transition-opacity" alt="Partner logo" />
            ))}
          </div>
        </div>
      </div>

      {/* --- EXISTING SECTIONS (Integrated seamlessly below hero) --- */}
      <div className="relative z-10 bg-[#060218]">
        {/* COMPARISON SECTION */}
        <motion.section 
          id="problem" 
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full min-h-[100svh] flex flex-col justify-center max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Talent Verification Crisis</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Over 55% of candidates exaggerate skills. Traditional screening is broken.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-red-500/10 hover:border-red-500/30 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-slate-300">The Old Way (Broken)</h3>
              </div>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 text-slate-400"><span className="text-red-400 mt-1">❌</span><div><strong className="text-slate-200">Static Resumes:</strong> Easily faked using Canva or ChatGPT.</div></li>
                <li className="flex items-start gap-3 text-slate-400"><span className="text-red-400 mt-1">❌</span><div><strong className="text-slate-200">Slow Hiring:</strong> BGV takes 2-3 weeks, delaying recruitment.</div></li>
                <li className="flex items-start gap-3 text-slate-400"><span className="text-red-400 mt-1">❌</span><div><strong className="text-slate-200">Skill Gap Bias:</strong> Tier-3 students ignored due to lack of pedigree.</div></li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#A068FF]/10 to-transparent border border-[#A068FF]/20 relative overflow-hidden group hover:border-[#A068FF]/50 transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A068FF]/10 blur-[100px] rounded-full group-hover:bg-[#A068FF]/20 transition-colors"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <ShieldCheck className="w-6 h-6 text-[#A068FF]" />
                <h3 className="text-xl font-bold text-white">The Veri-ME Way</h3>
              </div>
              <ul className="space-y-5 relative z-10">
                <li className="flex items-start gap-3 text-slate-300"><span className="text-[#A068FF] mt-1">✅</span><div><strong className="text-white">Proof-of-Work:</strong> Live syncs with GitHub, Figma & GitLab.</div></li>
                <li className="flex items-start gap-3 text-slate-300"><span className="text-[#A068FF] mt-1">✅</span><div><strong className="text-white">Automated Sandbox:</strong> Code tested instantly in Judge0 environments.</div></li>
                <li className="flex items-start gap-3 text-slate-300"><span className="text-[#A068FF] mt-1">✅</span><div><strong className="text-white">Merit-Based Match:</strong> Filter by verified scores, eliminating bias.</div></li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CORE FEATURES */}
        <motion.section 
          id="solution" 
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full min-h-[100svh] flex flex-col justify-center bg-[#070319] border-y border-white/5 py-24"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Powered by Deep Tech</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[#A068FF]/40 transition-colors group hover:-translate-y-2 duration-300">
                <Code2 className="w-10 h-10 text-[#A068FF] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-2">Automated Code Execution</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Integrated with Judge0 Sandbox to compile, run, and score code quality, speed, and logical efficiency automatically.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[#A068FF]/40 transition-colors group hover:-translate-y-2 duration-300">
                <BrainCircuit className="w-10 h-10 text-[#A068FF] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-2">AI Plagiarism Guard</h3>
                <p className="text-slate-400 text-sm leading-relaxed">PyTorch-based Abstract Syntax Tree (AST) analysis to detect if code was generated by ChatGPT or copied from public repos.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[#A068FF]/40 transition-colors group hover:-translate-y-2 duration-300">
                <BadgeCheck className="w-10 h-10 text-[#A068FF] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-white mb-2">Verified Academic Badges</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A dual-verification engine where college professors and alumni endorse student projects, stored securely as tamper-proof credentials.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* STAKEHOLDERS IMPACT */}
        <motion.section 
          id="impact" 
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="w-full min-h-[100svh] flex flex-col justify-center max-w-7xl mx-auto px-6 py-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Value for the Ecosystem</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">Creating a win-win scenario for all 3 major stakeholders.</p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <h3 className="text-xl font-bold text-white mb-4">For Students</h3>
              <p className="text-slate-400 mb-4 text-sm">Tier-2/3 Focus</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• <strong className="text-white">Equal Opportunity:</strong> Bias-free selection.</li>
                <li>• <strong className="text-white">Continuous Learning:</strong> AI skill-gap feedback.</li>
                <li>• <strong className="text-white">Faster Hiring:</strong> Direct invites without cold emails.</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              <h3 className="text-xl font-bold text-white mb-4">For Academia</h3>
              <p className="text-slate-400 mb-4 text-sm">Colleges & Universities</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• <strong className="text-white">NIRF & NAAC:</strong> Verified placement data points.</li>
                <li>• <strong className="text-white">Auto Verification:</strong> 1-click professor dashboards.</li>
                <li>• <strong className="text-white">Curriculum Sync:</strong> Real-time industry alignment.</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group hover:border-orange-500/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-600"></div>
              <h3 className="text-xl font-bold text-white mb-4">For Industry</h3>
              <p className="text-slate-400 mb-4 text-sm">Recruiters & Tech Firms</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• <strong className="text-white">Zero Fake Resumes:</strong> 100% verified Git commits.</li>
                <li>• <strong className="text-white">60% Cost Reduction:</strong> Pre-screened candidates.</li>
                <li>• <strong className="text-white">Show, Don't Tell:</strong> Hire based on real code.</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-[#060218] py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#A068FF]" />
              <span className="font-bold text-white">Veri-ME</span>
            </div>
            <p className="text-sm text-slate-500">
              Team Zero Day Nextron • Smart India Hackathon 2026 • SIH26044
            </p>
            <div className="flex gap-4">
              <Network className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition" />
              <Code2 className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
