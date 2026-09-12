'use client';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function OpportunitiesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold mb-2">Opportunities</h1>
        <p className="text-zinc-400 text-sm">Explore available jobs, internships, and collaborative research projects.</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-12 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
          <Briefcase className="w-8 h-8 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No new opportunities</h3>
        <p className="text-sm text-zinc-400 max-w-sm">
          There are currently no active opportunities matching your profile. Check back later or adjust your preferences.
        </p>
      </div>
    </motion.div>
  );
}
