'use client';
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
}
