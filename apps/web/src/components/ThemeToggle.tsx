'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-12 w-full"></div>;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex w-full items-center justify-between p-1 rounded-full bg-black/20 border border-white/5 overflow-hidden transition-all hover:bg-black/30"
      style={{ height: '48px' }}
    >
      <div className="absolute inset-0 z-0 flex w-full h-full">
        <div className="w-1/2 h-full flex items-center justify-center text-xs font-medium text-zinc-500">Dark</div>
        <div className="w-1/2 h-full flex items-center justify-center text-xs font-medium text-zinc-500">Light</div>
      </div>
      
      <motion.div
        className="relative z-10 flex items-center justify-center w-[calc(50%-4px)] h-[40px] bg-[#1a1a1a] border border-white/10 rounded-full shadow-lg"
        animate={{
          x: isDark ? 4 : 'calc(100% + 4px)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-yellow-400 fill-yellow-400/20" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500 fill-yellow-500/20" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
