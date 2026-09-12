'use client';
import { Settings, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserSettings() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center backdrop-blur-sm relative z-10 shadow-2xl">
          <Settings className="w-12 h-12 text-zinc-400" />
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -right-4 -bottom-4 w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm z-20"
        >
          <Wrench className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-md"
      >
        <h1 className="text-2xl font-bold text-white mb-3">Under Maintenance</h1>
        <p className="text-zinc-400 leading-relaxed">
          The User Configuration feature is currently being upgraded to bring you a better experience. 
          Please check back later!
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/80 rounded-full text-sm font-medium mt-4"
      >
        Estimated completion: Soon
      </motion.div>
    </div>
  );
}
