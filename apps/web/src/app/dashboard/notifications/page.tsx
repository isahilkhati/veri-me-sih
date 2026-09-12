'use client';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-semibold mb-2">Alerts & Notifications</h1>
        <p className="text-zinc-400 text-sm">Stay updated with the latest platform events and announcements.</p>
      </div>

      <div className="bg-white/5 border border-white/10 p-12 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
          <Bell className="w-8 h-8 text-zinc-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No new alerts</h3>
        <p className="text-sm text-zinc-400 max-w-sm">
          You're all caught up! New notifications regarding applications or platform updates will appear here.
        </p>
      </div>
    </motion.div>
  );
}
