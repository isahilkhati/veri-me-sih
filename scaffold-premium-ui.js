const fs = require('fs');
const path = require('path');

const webSrc = path.join(__dirname, 'apps/web/src');

const files = {
  'app/page.tsx': `'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, GraduationCap, Building2, Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-white" />
            <span className="font-semibold tracking-wide text-sm">IPRCRP</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/opportunities" className="hover:text-white transition-colors">Opportunities</Link>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link href="/register" className="text-black bg-white px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-40 px-6 pb-24">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Platform v2.0 Live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]"
          >
            The Next Layer of <br className="hidden md:block" />
            <span className="text-zinc-500">Intelligence.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 font-light"
          >
            A high-performance ecosystem uniting academic brilliance with industry challenges. Solve real problems, hire top talent, and accelerate research.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex gap-4"
          >
            <Link href="/register" className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-zinc-200 transition-all">
              Initialize Platform <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto mt-32 grid md:grid-cols-3 gap-6">
          {[
            { icon: GraduationCap, title: 'For Students', desc: 'Access industry problems, get AI career guidance, and secure premium roles.' },
            { icon: Building2, title: 'For Institutions', desc: 'Monitor research success and seamlessly connect cohorts with top-tier companies.' },
            { icon: Briefcase, title: 'For Industry', desc: 'Crowdsource solutions from verified academic talent and streamline hiring.' }
          ].map((item, i) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: "easeOut" }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors group"
            >
              <item.icon className="h-8 w-8 text-zinc-400 mb-6 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}`,
  'app/login/page.tsx': `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay and redirect
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-white/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors z-10">
        <Zap className="h-5 w-5" /> <span className="font-medium text-sm">IPRCRP</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-zinc-500 text-sm">Authenticate to access the network.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600" 
              placeholder="system@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Passphrase</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-medium rounded-xl px-4 py-3 mt-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin text-black" /> : <>Access System <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Don't have an access node? <Link href="/register" className="text-white hover:underline">Request access</Link>
        </p>
      </motion.div>
    </div>
  );
}`,
  'app/register/page.tsx': `'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('STUDENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-white/20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors z-10">
        <Zap className="h-5 w-5" /> <span className="font-medium text-sm">IPRCRP</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Initialize Node</h1>
          <p className="text-zinc-500 text-sm">Join the collaborative intelligence network.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {['STUDENT', 'COLLEGE', 'INDUSTRY'].map(r => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={\`py-2 text-xs font-medium rounded-lg border transition-all \${
                  role === r ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10'
                }\`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Full Name / Entity</label>
            <input 
              type="text" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600" 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600" 
              placeholder="system@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Passphrase</label>
            <input 
              type="password" 
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600" 
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-medium rounded-xl px-4 py-3 mt-4 flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin text-black" /> : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already verified? <Link href="/login" className="text-white hover:underline">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
}`,
  'app/dashboard/layout.tsx': `'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, User, Briefcase, Settings, LogOut, MessageSquare, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', icon: User, label: 'Overview' },
    { href: '/dashboard/opportunities', icon: Briefcase, label: 'Opportunities' },
    { href: '/dashboard/ai-assistant', icon: MessageSquare, label: 'AI Assistant' },
    { href: '/dashboard/notifications', icon: Bell, label: 'Alerts' },
    { href: '/dashboard/settings', icon: Settings, label: 'Config' },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full z-10 bg-[#050505]/80 backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Zap className="h-5 w-5" />
            <span className="font-semibold tracking-wide text-sm">IPRCRP NODE</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={\`flex items-center gap-3 p-3 text-sm font-medium rounded-xl transition-all \${
                  isActive ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }\`}
              >
                <link.icon className="h-4 w-4" /> {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
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
}`,
  'app/dashboard/page.tsx': `'use client';
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">System Overview</h1>
        <p className="text-zinc-400 text-sm">Real-time metrics for your active sessions.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Active Applications', val: '12', trend: '+2 this week' },
          { label: 'Saved Queries', val: '5', trend: 'Stable' },
          { label: 'Profile Integrity', val: '85%', trend: 'Needs attention' }
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

      <h2 className="text-xl font-medium mb-4 tracking-tight">Intelligence Recommendations</h2>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
        <p className="text-sm text-zinc-400">Run the AI Assistant to generate personalized research vectors and career paths.</p>
      </div>
    </motion.div>
  );
}`,
  'app/dashboard/ai-assistant/page.tsx': `'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';

export default function AIAssistant() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState<{role: string, content: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if(!prompt.trim()) return;
    setResponses([...responses, { role: 'user', content: prompt }]);
    setLoading(true);
    setPrompt('');
    
    try {
      const res = await fetch('http://localhost:4000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResponses(prev => [...prev, { role: 'assistant', content: data.response || 'Error processing request.' }]);
    } catch(err) {
      setResponses(prev => [...prev, { role: 'assistant', content: 'Connection failed to AI Node.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
    >
      <div className="p-4 border-b border-white/10 bg-white/[0.02]">
        <h2 className="font-medium">Intelligence Core</h2>
        <p className="text-xs text-zinc-500">Encrypted AI session active.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {responses.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={i} 
            className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
          >
            <div className={\`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed \${
              msg.role === 'user' ? 'bg-white text-black' : 'bg-white/10 border border-white/5 text-zinc-200'
            }\`}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 text-zinc-400 p-4 rounded-2xl text-sm flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Processing...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10 bg-white/[0.02] flex gap-3">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Transmit prompt..." 
          className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-600 text-white"
        />
        <button 
          onClick={handleSend} 
          disabled={loading} 
          className="bg-white text-black rounded-xl px-6 flex items-center justify-center hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(webSrc, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

console.log('Premium UI applied.');
