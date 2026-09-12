const fs = require('fs');
const path = require('path');

const webSrc = path.join(__dirname, 'apps/web/src');

const files = {
  'app/register/page.tsx': `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, GraduationCap, Building2, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [role, setRole] = useState('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  }

  const roles = [
    { id: 'STUDENT', label: 'Student', icon: GraduationCap },
    { id: 'COLLEGE', label: 'College', icon: Building2 },
    { id: 'INDUSTRY', label: 'Industry', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] blur-[100px] rounded-full pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 md:top-10 md:left-16 w-6 h-9 block hover:opacity-80 transition z-20">
        <svg viewBox="0 0 31.5 48.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="bg3" x1="8" y1="0" x2="34.1" y2="28.9" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9e9e9e"/>
              <stop offset="0.55" stopColor="#414141"/>
              <stop offset="1" stopColor="#cccccc"/>
            </linearGradient>
          </defs>
          <path d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z" fill="url(#bg3)"/>
          <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd"/>
          <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd"/>
        </svg>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-tight mb-2">Create Account</h1>
          <p className="text-[#c4c4c4] text-sm tracking-wide">Join the collaborative intelligence network.</p>
        </div>

        {/* Animated Role Selector */}
        <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex relative mb-8">
          {roles.map(r => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className="relative z-10 flex-1 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase"
            >
              {role === r.id && (
                <motion.div
                  layoutId="activeRole"
                  className="absolute inset-0 bg-white rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <r.icon className={\`w-4 h-4 transition-colors duration-300 \${role === r.id ? 'text-black' : 'text-[#c4c4c4]'}\`} />
              <span className={\`transition-colors duration-300 \${role === r.id ? 'text-black' : 'text-[#c4c4c4] hover:text-white hidden sm:block'}\`}>
                {r.label}
              </span>
            </button>
          ))}
        </div>

        {/* Google Auth Button */}
        <button 
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl px-4 py-3.5 text-[15px] font-medium disabled:opacity-50 mb-8"
        >
          {googleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </>
          )}
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="text-xs text-[#c4c4c4] uppercase tracking-widest">Or Register Manually</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {role === 'STUDENT' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Full Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">University / College</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" placeholder="MIT" />
                  </div>
                </>
              )}

              {role === 'COLLEGE' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Institution Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" placeholder="Stanford University" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Accreditation Code</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" placeholder="AICTE-12345" />
                  </div>
                </>
              )}

              {role === 'INDUSTRY' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Company Name</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" placeholder="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Industry Sector</label>
                    <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" placeholder="Software & AI" />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" 
              placeholder="you@example.com"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" 
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Confirm</label>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" 
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full bg-white text-black font-medium rounded-xl px-4 py-3.5 mt-6 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin text-black" /> : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#c4c4c4]">
          Already have an account? <Link href="/login" className="text-white hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}`,
  'app/about/page.tsx': `'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-16 md:py-10">
        <Link href="/" className="w-[31.5px] h-[48.5px] block hover:opacity-80 transition">
          <svg viewBox="0 0 31.5 48.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="bgAbout" x1="8" y1="0" x2="34.1" y2="28.9" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9e9e9e"/>
                <stop offset="0.55" stopColor="#414141"/>
                <stop offset="1" stopColor="#cccccc"/>
              </linearGradient>
            </defs>
            <path d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z" fill="url(#bgAbout)"/>
            <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd"/>
            <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd"/>
          </svg>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[17px] text-[#b6b5b5] font-medium tracking-wide">
          <Link href="/about" className="text-white transition">About</Link>
          <Link href="/opportunities" className="hover:text-white transition">Features</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-200 mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> System Architecture
          </div>
          
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-10 text-white">About the Platform</h1>
          
          <div className="space-y-8 text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
            <p>
              The AI-Powered Industry Problem Resolution and Collaborative Research Platform (IPRCRP) is designed to bridge the gap between academia and industry through an advanced intelligence network.
            </p>
            <p>
              We connect students, institutions, and companies through a unified, high-performance ecosystem. By crowdsourcing industry challenges to verified academic talent, we accelerate research and streamline hiring.
            </p>
            <p>
              Our integrated AI assistant provides personalized career mapping, research vector generation, and autonomous code analysis, ensuring that the next generation of engineers is equipped to tackle the world's most complex technical hurdles.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}`,
  'app/opportunities/page.tsx': `'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Opportunities() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-16 md:py-10">
        <Link href="/" className="w-[31.5px] h-[48.5px] block hover:opacity-80 transition">
          <svg viewBox="0 0 31.5 48.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="bgOpp" x1="8" y1="0" x2="34.1" y2="28.9" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#9e9e9e"/>
                <stop offset="0.55" stopColor="#414141"/>
                <stop offset="1" stopColor="#cccccc"/>
              </linearGradient>
            </defs>
            <path d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z" fill="url(#bgOpp)"/>
            <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd"/>
            <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd"/>
          </svg>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-[17px] text-[#b6b5b5] font-medium tracking-wide">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/opportunities" className="text-white transition">Features</Link>
          <Link href="/faq" className="hover:text-white transition">FAQ</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-white">Active Opportunities</h1>
          <p className="text-zinc-300 text-lg mb-12">Solve real industry problems and accelerate your career trajectory.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-colors group">
                <span className="text-xs font-bold px-3 py-1.5 bg-white/10 text-white rounded-md mb-5 inline-block tracking-widest uppercase">Research</span>
                <h2 className="text-xl font-medium mt-2 mb-3 group-hover:text-white text-zinc-100 transition-colors">Optimize Supply Chain Logistics</h2>
                <p className="text-zinc-300 text-sm mb-6 leading-relaxed">Develop a machine learning model to dynamically route fleet networks and reduce logistics cost by 15%.</p>
                <button className="text-white text-sm font-medium hover:underline flex items-center gap-2">
                  View Specifications →
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(webSrc, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

console.log('Dynamic form & global text contrast applied.');
