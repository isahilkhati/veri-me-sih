'use client';
import { useEffect, useState } from 'react';
import { MessageSquare, Bot, Clock, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AIActivityPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchActivity() {
      // Fetch latest messages with user info
      const { data, error } = await supabase
        .from('ai_messages')
        .select(`
          id,
          content,
          role,
          model,
          created_at,
          ai_conversations (
            user_id,
            profiles (full_name, email)
          )
        `)
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (!error && data) {
        setConversations(data);
      }
      setLoading(false);
    }
    fetchActivity();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold mb-2">AI Activity Log</h1>
        <p className="text-zinc-400 text-sm">Real-time feed of AI interactions across the platform.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-medium flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Live Feed</h2>
          <span className="text-xs text-zinc-500 bg-black/40 px-2 py-1 rounded-md">Showing last 50 messages</span>
        </div>
        
        <div className="divide-y divide-white/5 max-h-[700px] overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-zinc-500 animate-pulse">Loading AI logs...</div>
          ) : conversations.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">No AI activity found.</div>
          ) : (
            conversations.map((msg) => (
              <div key={msg.id} className="p-4 hover:bg-white/[0.02] transition-colors flex gap-4">
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'assistant' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-zinc-200">
                        {msg.role === 'assistant' ? 'Nexus AI' : msg.ai_conversations?.profiles?.full_name || 'Anonymous User'}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/30 border border-white/5 text-zinc-400">
                        {msg.model || 'gemini'}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 truncate line-clamp-2 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import { Activity } from 'lucide-react';
