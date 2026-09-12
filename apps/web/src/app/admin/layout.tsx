'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, Users, Activity, Bot, ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/login');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      // TEMPORARY BYPASS: Allow any user to see admin panel for testing
      // if (profile?.role !== 'ADMIN') {
      if (false) {
        router.push('/dashboard');
      } else {
        setLoading(false);
      }
    }
    checkAdmin();
  }, [router, supabase]);

  const links = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/users', icon: Users, label: 'Verified Candidates' },
    { href: '/admin/activity', icon: Activity, label: 'Plagiarism Logs' },
    { href: '/admin/config', icon: Shield, label: 'Configuration' },
  ];

  if (loading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full z-10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-red-500" />
            <div className="flex items-center gap-1">
              <span className="font-semibold tracking-wide text-sm">ADMIN PANEL</span>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-0.5"></div>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-all ${
                  isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}>
                <link.icon className="h-4 w-4" /> {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <ThemeToggle />
          <Link href="/dashboard" className="flex w-full items-center gap-3 p-3 text-sm font-medium rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/[0.02] blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
