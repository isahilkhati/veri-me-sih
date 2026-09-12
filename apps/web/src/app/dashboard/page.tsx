'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Student Profile</h1>
        <p className="text-zinc-400 text-sm">Real-time metrics of your Verified Credentials.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Verified Commits', val: '1,242', trend: '+45 this week' },
          { label: 'Sandboxed Score', val: '92/100', trend: 'Top 10%' },
          { label: 'Academic Endorsements', val: '2', trend: 'Verified ✅' }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{stat.label}</h3>
            <div className="flex items-end justify-between">
              <p className="text-4xl font-light">{stat.val}</p>
              <span className="text-xs text-zinc-400 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> {stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-xl font-medium mb-4 tracking-tight">Hiring Matches</h2>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
        <p className="text-sm text-zinc-400">Complete your Proof-of-Work sync to start receiving zero-bias interview invites directly from recruiters.</p>
      </div>
    </motion.div>
  );
}
