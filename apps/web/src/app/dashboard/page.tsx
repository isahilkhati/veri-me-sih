'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, TerminalSquare, BrainCircuit } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl"
    >
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Veri-ME (SIH Demo)</h1>
        <p className="text-zinc-400 text-sm">Verify the Candidate, Trust the Profile.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck className="w-32 h-32" />
          </div>
          <h2 className="text-xl font-bold mb-3 relative z-10 text-white">What is Veri-ME?</h2>
          <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
            Veri-ME is a decentralized, Proof-of-Work based talent verification platform designed to eliminate resume fraud. 
            Instead of trusting a PDF resume, Veri-ME connects directly to a candidate's actual work (GitHub, GitLab, Figma) 
            and verifies their skills automatically using AI and Sandbox execution.
          </p>
        </div>

        <div className="p-6 bg-gradient-to-br from-orange-900/20 to-black border border-orange-500/20 rounded-2xl backdrop-blur-sm relative overflow-hidden group hover:border-orange-500/40 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit className="w-32 h-32" />
          </div>
          <h2 className="text-xl font-bold mb-3 relative z-10 text-white">The SIH 2026 Problem</h2>
          <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
            <strong>Problem ID: SIH26044.</strong> Currently, 55% of candidates exaggerate skills on resumes, and background verification is painfully slow. 
            Veri-ME solves this by creating a zero-trust architecture where skills are proven by live code execution, plagiarism detection, and institutional endorsements.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-medium mb-6 tracking-tight">Demo Walkthrough Guide</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <TerminalSquare className="w-6 h-6 text-blue-400" />,
            title: "1. Code Assessment",
            desc: "Go to the Assessments tab. Write some code (or paste a demo script) and hit Run. Watch the Judge0 sandbox execute it and the AI grade it in real-time."
          },
          {
            icon: <CheckCircle2 className="w-6 h-6 text-green-400" />,
            title: "2. Portfolio Sync",
            desc: "Navigate to the Portfolio tab. Enter a GitHub or GitLab username, or a Figma URL, and instantly pull verified live data directly from the APIs."
          },
          {
            icon: <BrainCircuit className="w-6 h-6 text-purple-400" />,
            title: "3. AI Assistant",
            desc: "Test out the AI Assistant tab. The assistant contextually understands the platform and can provide career recommendations or code reviews."
          }
        ].map((step, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col gap-4 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-black/50 border border-white/5 flex items-center justify-center">
              {step.icon}
            </div>
            <div>
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
