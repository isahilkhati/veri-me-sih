'use client';
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
              The AI-Powered Industry Problem Resolution and Collaborative Research Platform (Nexus AI) is designed to bridge the gap between academia and industry through an advanced intelligence network.
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
}
