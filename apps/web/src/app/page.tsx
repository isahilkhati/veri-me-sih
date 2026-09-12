'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Code2, BrainCircuit, ShieldAlert, BadgeCheck, Network, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-orange-500/30 overflow-x-hidden font-sans relative">
      
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Top Navigation */}
      <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-8 border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Veri-ME</span>
        </div>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="#problem" className="hover:text-white transition">The Problem</Link>
          <Link href="#solution" className="hover:text-white transition">Platform</Link>
          <Link href="#impact" className="hover:text-white transition">Impact</Link>
        </nav>

        <div className="flex gap-4">
          <Link href="/login" className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white transition">
            Sign In
          </Link>
          <Link href="/register" className="px-5 py-2 rounded-full text-sm font-medium bg-white text-slate-950 hover:bg-slate-200 transition shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Start Verifying
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="w-full max-w-7xl px-6 pt-32 pb-24 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span>
            SIH 2025 Innovation (SIH26044)
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Verify the Candidate, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-rose-500">
              Trust the Profile.
            </span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate resume fraud and skill inflation. Veri-ME replaces PDFs with a live, 
            sandboxed Proof-of-Work engine backed by AI integrity checks and Academic endorsements.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-2 group">
              Join the Ecosystem <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* COMPARISON SECTION */}
        <section id="problem" className="w-full max-w-7xl px-6 py-24 border-t border-white/5 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Talent Verification Crisis</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Over 55% of candidates exaggerate skills. Traditional screening is broken.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-bold text-slate-300">The Old Way (Broken)</h3>
              </div>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 text-slate-400">
                  <span className="text-red-400 mt-1">❌</span>
                  <div><strong className="text-slate-200">Static Resumes:</strong> Easily faked using Canva or ChatGPT.</div>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <span className="text-red-400 mt-1">❌</span>
                  <div><strong className="text-slate-200">Slow Hiring:</strong> BGV takes 2-3 weeks, delaying recruitment.</div>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <span className="text-red-400 mt-1">❌</span>
                  <div><strong className="text-slate-200">Skill Gap Bias:</strong> Tier-3 students ignored due to lack of pedigree.</div>
                </li>
              </ul>
            </div>

            {/* The Veri-ME Way */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">The Veri-ME Way</h3>
              </div>
              <ul className="space-y-5 relative z-10">
                <li className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 mt-1">✅</span>
                  <div><strong className="text-white">Proof-of-Work:</strong> Live syncs with GitHub, Figma & GitLab.</div>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 mt-1">✅</span>
                  <div><strong className="text-white">Automated Sandbox:</strong> Code tested instantly in Judge0 environments.</div>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 mt-1">✅</span>
                  <div><strong className="text-white">Merit-Based Match:</strong> Filter by verified scores, eliminating bias.</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CORE FEATURES (Solution) */}
        <section id="solution" className="w-full bg-slate-900/30 border-y border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Powered by Deep Tech</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-orange-500/30 transition-colors">
                <Code2 className="w-10 h-10 text-orange-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Automated Code Execution</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Integrated with Judge0 Sandbox to compile, run, and score code quality, speed, and logical efficiency automatically.</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-blue-500/30 transition-colors">
                <BrainCircuit className="w-10 h-10 text-blue-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">AI Plagiarism Guard</h3>
                <p className="text-slate-400 text-sm leading-relaxed">PyTorch-based Abstract Syntax Tree (AST) analysis to detect if code was generated by ChatGPT or copied from public repos.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-white/10 hover:border-green-500/30 transition-colors">
                <BadgeCheck className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Verified Academic Badges</h3>
                <p className="text-slate-400 text-sm leading-relaxed">A dual-verification engine where college professors and alumni endorse student projects, stored securely as tamper-proof credentials.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STAKEHOLDERS IMPACT */}
        <section id="impact" className="w-full max-w-7xl px-6 py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Value for the Ecosystem</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">Creating a win-win scenario for all 3 major stakeholders.</p>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <h3 className="text-xl font-bold text-white mb-4">For Students</h3>
              <p className="text-slate-400 mb-4 text-sm">Tier-2/3 Focus</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• <strong className="text-white">Equal Opportunity:</strong> Bias-free selection.</li>
                <li>• <strong className="text-white">Continuous Learning:</strong> AI skill-gap feedback.</li>
                <li>• <strong className="text-white">Faster Hiring:</strong> Direct invites without cold emails.</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
              <h3 className="text-xl font-bold text-white mb-4">For Academia</h3>
              <p className="text-slate-400 mb-4 text-sm">Colleges & Universities</p>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>• <strong className="text-white">NIRF & NAAC:</strong> Verified placement data points.</li>
                <li>• <strong className="text-white">Auto Verification:</strong> 1-click professor dashboards.</li>
                <li>• <strong className="text-white">Curriculum Sync:</strong> Real-time industry alignment.</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-white/5 relative overflow-hidden group">
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
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-white">Veri-ME</span>
          </div>
          <p className="text-sm text-slate-500">
            Team Zero Day Nextron • Smart India Hackathon 2025 • SIH26044
          </p>
          <div className="flex gap-4">
            <Network className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition" />
            <Code2 className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </footer>
    </div>
  );
}
