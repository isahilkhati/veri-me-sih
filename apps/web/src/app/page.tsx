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

const Orbit = ({ size, duration, direction, children }: any) => (
  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-border animate-[orbit-${direction}_${duration}s_linear_infinite]`} style={{ width: size, height: size }}>
    {children}
  </div>
);

const Avatar = ({ orbitDirection, orbitDuration, angle, size = 58, img, glow, delay, rounded = 'rounded-full' }: any) => {
  const rad = angle * Math.PI / 180;
  const left = `calc(50% + ${Math.cos(rad) * 50}%)`;
  const top = `calc(50% + ${Math.sin(rad) * 50}%)`;
  const counterDir = orbitDirection === 'left' ? 'right' : 'left';

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
      <div className={`animate-[orbit-${counterDir}_${orbitDuration}s_linear_infinite]`}>
        <div className="opacity-0 animate-[avatar-fly-in_0.8s_cubic-bezier(0.22,1,0.36,1)_forwards]" style={{ animationDelay: `${delay}s` }}>
          <img src={img} className={`${rounded} ${glow} object-cover`} style={{ width: size, height: size }} alt="avatar" />
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

  return (
    <div className={`min-h-screen bg-[#060218] text-white ${inter.className} overflow-x-hidden`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @property --border-angle { syntax: "<angle>"; inherits: true; initial-value: 0turn; }
        @keyframes rotate-border { to { --border-angle: 1turn; } }
        @keyframes orbit-left { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(-360deg); } }
        @keyframes orbit-right { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes scroll-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes avatar-fly-in { 0% { transform: scale(0.3) rotate(-180deg); opacity: 0; filter: blur(10px); } 100% { transform: scale(1) rotate(0deg); opacity: 1; filter: blur(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.85) translate(-50%, -50%); transform-origin: top left; } to { opacity: 1; transform: scale(1) translate(-50%, -50%); transform-origin: top left; } }
        @keyframes float-cursor { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-5deg); } }
        .orbit-border {
          border: 1px solid transparent;
          background: linear-gradient(#060218, #060218) padding-box, linear-gradient(180deg, rgba(217, 161, 255, 0) 0%, rgba(217, 161, 255, 1) 43%, rgba(217, 161, 255, 0) 100%) border-box;
          border-radius: 50%;
        }
        .fade-down { animation: fadeDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .fade-up { animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        .scale-in { animation: scaleIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
        .bg-hero { background: url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85') center center / cover no-repeat; }
        @media (max-width: 1280px) { .hero-circles { transform: scale(0.85); transform-origin: right center; } }
        @media (max-width: 1024px) { .hero-circles { transform: scale(0.7); transform-origin: center; } .hero-layout { flex-direction: column; text-align: center; gap: 40px; padding-top: 60px; } .hero-left { align-items: center; } .cursor-element { margin-left: 0 !important; right: 20%; } }
        @media (max-width: 768px) { .hero-circles { transform: scale(0.5); } .mobile-hide { display: none !important; } }
        @media (max-width: 480px) { .hero-circles { transform: scale(0.4); } }
      `}} />

      {/* Hero Section */}
      <div className="w-full min-h-screen flex flex-col relative overflow-hidden bg-hero pb-12 lg:pb-0">
        
        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-[64px] py-[24px] max-w-[1920px] mx-auto w-full fade-down relative z-20">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 text-white group">
              <ShieldCheck className="h-8 w-8 text-[#A068FF] group-hover:scale-110 transition-transform" />
              <span className={`font-bold tracking-wide text-xl ${urbanist.className}`}>Veri-ME</span>
            </Link>
            <nav className="hidden md:flex gap-8 mobile-hide">
              <NavLink href="#problem">The Problem</NavLink>
              <NavLink href="#solution">Platform</NavLink>
              <NavLink href="#impact">Impact</NavLink>
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
          <div className="flex-[0_1_600px] pt-[40px] flex flex-col items-start hero-left relative">
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
          <div className="relative w-[720px] h-[720px] shrink-0 scale-in hero-circles" style={{ animationDelay: '0.3s', top: '50%', left: '50%' }}>
            <Orbit size={353} duration={30} direction="left">
              <Avatar orbitDirection="left" orbitDuration={30} angle={270} img="https://polo-pecan-73837341.figma.site/_assets/v11/aa51718fb3af3637e6d666b6543fc27a175fada6.png" glow="shadow-[0_0_20px_rgba(160,104,255,0.6)]" delay={0.6} rounded="rounded-[20px]" />
            </Orbit>
            <Orbit size={501} duration={40} direction="right">
              <Avatar orbitDirection="right" orbitDuration={40} angle={60} img="https://polo-pecan-73837341.figma.site/_assets/v11/ca755f7f93c1126fb8bdbf99ab364a33aa9ab272.png" glow="shadow-[0_0_20px_rgba(255,215,0,0.6)]" delay={0.9} />
              <Avatar orbitDirection="right" orbitDuration={40} angle={180} size={78} img="https://polo-pecan-73837341.figma.site/_assets/v11/dc01064c7093dcc32674876ee3cf5e41c4a485c6.png" glow="shadow-[0_0_20px_rgba(255,105,180,0.6)]" delay={1.2} />
              <Avatar orbitDirection="right" orbitDuration={40} angle={300} img="https://polo-pecan-73837341.figma.site/_assets/v11/d5470a58b02388336141575048720f19a50de832.png" glow="shadow-[0_0_20px_rgba(0,191,255,0.6)]" delay={1.4} rounded="rounded-[20px]" />
            </Orbit>
            <Orbit size={649} duration={50} direction="right">
              <Avatar orbitDirection="right" orbitDuration={50} angle={130} size={88} img="https://polo-pecan-73837341.figma.site/_assets/v11/018736aa5d0275c4ce56cfebaf2ae3007d81ca1e.png" glow="shadow-[0_0_20px_rgba(255,105,180,0.6)]" delay={1.7} />
            </Orbit>
            <Orbit size={797} duration={60} direction="left">
              <Avatar orbitDirection="left" orbitDuration={60} angle={30} img="https://polo-pecan-73837341.figma.site/_assets/v11/c76d8a0b99676de31c014344bfaf75bad090758d.png" glow="shadow-[0_0_20px_rgba(160,104,255,0.6)]" delay={1.9} />
              <Avatar orbitDirection="left" orbitDuration={60} angle={95} size={88} img="https://polo-pecan-73837341.figma.site/_assets/v11/7b1b5f039de7b54cc9913e96c1923c3b15a157fa.png" glow="shadow-[0_0_20px_rgba(255,165,0,0.6)]" delay={2.1} rounded="rounded-[24px]" />
              <Avatar orbitDirection="left" orbitDuration={60} angle={220} size={88} img="https://polo-pecan-73837341.figma.site/_assets/v11/9ae171d8895199349755c43fbff00e122221a027.png" glow="shadow-[0_0_20px_rgba(255,105,180,0.6)]" delay={2.2} rounded="rounded-[24px]" />
              <Avatar orbitDirection="left" orbitDuration={60} angle={320} img="https://polo-pecan-73837341.figma.site/_assets/v11/926c9eb7b4bc1df846fa0e39f0b0dc3fefd80671.png" glow="shadow-[0_0_20px_rgba(160,104,255,0.6)]" delay={2.3} />
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
        <section id="problem" className="w-full max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Talent Verification Crisis</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Over 55% of candidates exaggerate skills. Traditional screening is broken.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-red-500/10">
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

            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#A068FF]/10 to-transparent border border-[#A068FF]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#A068FF]/10 blur-[100px] rounded-full"></div>
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
        </section>

        {/* CORE FEATURES */}
        <section id="solution" className="w-full bg-[#070319] border-y border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Powered by Deep Tech</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[#A068FF]/40 transition-colors">
                <Code2 className="w-10 h-10 text-[#A068FF] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Automated Code Execution</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Integrated with Judge0 Sandbox to compile, run, and score code quality, speed, and logical efficiency automatically.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[#A068FF]/40 transition-colors">
                <BrainCircuit className="w-10 h-10 text-[#A068FF] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">AI Plagiarism Guard</h3>
                <p className="text-slate-400 text-sm leading-relaxed">PyTorch-based Abstract Syntax Tree (AST) analysis to detect if code was generated by ChatGPT or copied from public repos.</p>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[#A068FF]/40 transition-colors">
                <BadgeCheck className="w-10 h-10 text-[#A068FF] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Verified Academic Badges</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A dual-verification engine where college professors and alumni endorse student projects, stored securely as tamper-proof credentials.</p>
              </div>
            </div>
          </div>
        </section>

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
