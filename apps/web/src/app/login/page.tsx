'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function Login() {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();
      
      // TEMPORARY BYPASS: Force redirect to admin panel for testing
      // if (profile?.role === 'ADMIN') {
      if (true) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      }
    });

    if (error) {
      setErrorMsg(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] flex flex-col items-center justify-center p-6 selection:bg-white selection:text-black relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 md:top-10 md:left-16 w-6 h-9 block hover:opacity-80 transition z-20">
        <svg viewBox="0 0 31.5 48.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="bg2" x1="8" y1="0" x2="34.1" y2="28.9" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9e9e9e"/>
              <stop offset="0.55" stopColor="#414141"/>
              <stop offset="1" stopColor="#cccccc"/>
            </linearGradient>
          </defs>
          <path d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z" fill="url(#bg2)"/>
          <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd"/>
          <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd"/>
        </svg>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome back</h1>
          <p className="text-[#a7a6a6] text-sm tracking-wide">Sign in to access your platform.</p>
        </div>

        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{errorMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Auth Button */}
        <button 
          onClick={handleGoogleLogin}
          type="button"
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors rounded-xl px-4 py-3.5 text-[15px] font-medium disabled:opacity-50"
        >
          {googleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="text-xs text-[#a7a6a6] uppercase tracking-widest">Or</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#a7a6a6] uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" 
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-[#c4c4c4] uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" 
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end -mt-1 pb-1">
            <Link 
              href="/forgot-password" 
              className="text-xs text-zinc-300 hover:text-white transition-colors underline underline-offset-4 font-medium"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="terms" required className="w-4 h-4 rounded border-white/10 accent-white" />
            <label htmlFor="terms" className="text-xs text-[#a7a6a6]">I accept the <a href="#" className="text-white hover:underline">Terms & Conditions</a></label>
          </div>
          <button 
            type="submit" 
            disabled={loading || googleLoading}
            className="w-full bg-white text-black font-medium rounded-xl px-4 py-3.5 mt-2 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin text-black" /> : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#a7a6a6]">
          Don't have an account? <Link href="/register" className="text-white hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
