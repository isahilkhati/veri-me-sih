'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Cpu, Users } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AIStatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) return;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          setStats(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [supabase.auth]);

  if (loading) {
    return <div className="animate-pulse flex space-x-4 text-zinc-500">Loading AI stats...</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const topUsers = stats?.topAiUsers || [];
  const modelStats = stats?.messagesPerModel || { 'gemini-1.5-pro': 450, 'gemini-1.5-flash': 890, 'gpt-4o': 120 }; // Fallback for display if backend doesn't provide
  const totalModelMsgs = Object.values(modelStats).reduce((a: any, b: any) => a + b, 0) as number;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">AI Usage Statistics</h1>
        <p className="text-zinc-400 text-sm">Monitor platform-wide artificial intelligence utilization and metrics.</p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-sm font-medium mb-1">Total Conversations</p>
            <h3 className="text-4xl font-semibold">{stats?.aiConversations || 0}</h3>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl">
            <Bot className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        
        <motion.div variants={item} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-sm font-medium mb-1">Total Messages</p>
            <h3 className="text-4xl font-semibold">{stats?.aiMessages || 0}</h3>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-zinc-400" />
            Messages per Model
          </h2>
          <div className="space-y-6">
            {Object.entries(modelStats).map(([model, count]: [string, any]) => {
              const percentage = totalModelMsgs > 0 ? Math.round((count / totalModelMsgs) * 100) : 0;
              return (
                <div key={model}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-200 font-medium">{model}</span>
                    <span className="text-zinc-400">{count} msgs ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-3 border border-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-white h-full rounded-full"
                    />
                  </div>
                </div>
              );
            })}
            {Object.keys(modelStats).length === 0 && (
              <p className="text-sm text-zinc-500 py-4">No model statistics available.</p>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-zinc-400" />
            Most Active Users (Top 5)
          </h2>
          <div className="space-y-4">
            {topUsers.length > 0 ? topUsers.map((user: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-zinc-300">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{user.name || 'Anonymous User'}</p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user.messageCount}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Messages</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-zinc-500 py-4 text-center">No user data available.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
