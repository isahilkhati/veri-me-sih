'use client';
import { useState } from 'react';
import { Save, Shield, Settings, Bot, Mail, LayoutTemplate, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const [config, setConfig] = useState({
    appName: 'Nexus AI',
    supportEmail: 'support@nexus.ai',
    maintenanceMode: false,
    aiProvider: 'gemini',
    aiMaxTokens: 2048,
    aiEnabled: true,
    allowRegistration: true,
    requireEmailVerification: false,
    sessionTimeout: 60,
  });

  const handleSave = () => {
    setSaving(true);
    // Simulate API save
    setTimeout(() => {
      setSaving(false);
      alert('Configuration saved successfully! (Simulated for Demo)');
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'ai', label: 'AI Settings', icon: Bot },
    { id: 'security', label: 'Security & Users', icon: Shield },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Configuration Center</h1>
        <p className="text-zinc-400 text-sm">Manage global application settings and AI configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          {activeTab === 'general' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-lg font-medium text-white">General Settings</h2>
              
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Application Name</label>
                <input 
                  type="text" 
                  value={config.appName} 
                  onChange={e => setConfig({...config, appName: e.target.value})}
                  className="w-full mt-1.5 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 text-white"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Support Email</label>
                <input 
                  type="email" 
                  value={config.supportEmail} 
                  onChange={e => setConfig({...config, supportEmail: e.target.value})}
                  className="w-full mt-1.5 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 text-white"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <h4 className="text-sm font-medium text-white">Maintenance Mode</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Disable access for non-admin users.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={config.maintenanceMode} onChange={e => setConfig({...config, maintenanceMode: e.target.checked})} />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-lg font-medium text-white">AI Settings</h2>
              
              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Default AI Provider</label>
                <select 
                  value={config.aiProvider} 
                  onChange={e => setConfig({...config, aiProvider: e.target.value})}
                  className="w-full mt-1.5 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 text-white"
                >
                  <option value="gemini">Google Gemini 3.6 Flash</option>
                  <option value="llama">Llama 3.1 70B (Groq)</option>
                  <option value="deepseek">DeepSeek Chat</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Max Output Tokens</label>
                <input 
                  type="number" 
                  value={config.aiMaxTokens} 
                  onChange={e => setConfig({...config, aiMaxTokens: parseInt(e.target.value)})}
                  className="w-full mt-1.5 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 text-white"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <h4 className="text-sm font-medium text-white">Enable AI Features</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Toggle global access to AI assistant and resume analysis.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={config.aiEnabled} onChange={e => setConfig({...config, aiEnabled: e.target.checked})} />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h2 className="text-lg font-medium text-white">Security & User Settings</h2>
              
              <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <h4 className="text-sm font-medium text-white">Allow Public Registration</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Allow new users to sign up from the register page.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={config.allowRegistration} onChange={e => setConfig({...config, allowRegistration: e.target.checked})} />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <h4 className="text-sm font-medium text-white">Require Email Verification</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Force email verification before first login.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={config.requireEmailVerification} onChange={e => setConfig({...config, requireEmailVerification: e.target.checked})} />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                </label>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  value={config.sessionTimeout} 
                  onChange={e => setConfig({...config, sessionTimeout: parseInt(e.target.value)})}
                  className="w-full mt-1.5 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-white/30 text-white"
                />
              </div>
            </motion.div>
          )}

          <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Configuration</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
