'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Briefcase, FileText, MessageSquare, Bot, Activity as ActivityIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import CountUp from '@/components/CountUp';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        if (!token) return;

        const [statsRes, activityRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api$/, "") || "http://localhost:4000"}/api/admin/activity?limit=5`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (activityRes.ok) {
          const actData = await activityRes.json();
          setActivity(actData.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [supabase.auth]);

  if (loading) {
    return <div className="animate-pulse flex space-x-4">Loading stats...</div>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const statCards = [
    { title: 'Total Verified Candidates', value: stats?.totalUsers || 0, icon: Users },
    { title: 'New Syncs This Week', value: stats?.newUsersThisWeek || 0, icon: UserPlus },
    { title: 'Recruiters Active', value: stats?.totalOpportunities || 0, icon: Briefcase },
    { title: 'Endorsements Given', value: stats?.totalApplications || 0, icon: FileText },
    { title: 'Plagiarism Checks', value: stats?.totalAiConversations || 0, icon: MessageSquare },
    { title: 'Flagged Repos', value: stats?.totalAiMessages || 0, icon: Bot },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Platform Overview</h1>
        <p className="text-zinc-400 text-sm">Welcome to the Veri-ME Command Center.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {statCards.map((stat, idx) => (
          <motion.div key={idx} variants={item} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm font-medium mb-1">{stat.title}</p>
              <h3 className="text-3xl font-semibold">
                <CountUp value={stat.value} />
              </h3>
            </div>
            <div className="bg-white/10 p-3 rounded-xl">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-zinc-400" />
            Role Breakdown
          </h2>
          <div className="space-y-4">
            {['Student', 'College', 'Industry', 'Admin'].map((role) => {
              const count = stats?.usersByRole?.[role.toUpperCase()] || 0;
              const total = stats?.totalUsers || 1;
              const percentage = Math.round((count / total) * 100);
              return (
                <div key={role}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-300">{role}s</span>
                    <span className="text-zinc-400">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-zinc-400" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {activity.length > 0 ? activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-white/40 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-200">{item.description || item.action}</p>
                  <p className="text-xs text-zinc-500 mt-1">{new Date(item.created_at).toLocaleString()}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-zinc-500 text-center py-4">No recent activity.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
