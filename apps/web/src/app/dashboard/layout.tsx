'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, User, Briefcase, Settings, LogOut, Code2, BrainCircuit, ShieldCheck, GitBranch } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', icon: User, label: 'Overview' },
    { href: '/dashboard/portfolio', icon: GitBranch, label: 'Sync Portfolio' },
    { href: '/dashboard/assessments', icon: Code2, label: 'Skill Sandbox' },
    { href: '/dashboard/ai-assistant', icon: BrainCircuit, label: 'AI Integrity Guard' },
    { href: '/dashboard/settings', icon: Settings, label: 'Config' },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full z-10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white">
            <ShieldCheck className="h-5 w-5 text-orange-500" />
            <span className="font-semibold tracking-wide text-sm">Veri-ME</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-all ${
                  isActive ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className="h-4 w-4" /> {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <ThemeToggle />
          <Link href="/" className="flex w-full items-center gap-3 p-3 text-sm font-medium rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <LogOut className="h-4 w-4" /> Disconnect
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
