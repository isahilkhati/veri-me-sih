const fs = require('fs');
const path = require('path');

const webSrc = path.join(__dirname, 'apps/web/src');

const files = {
  'app/dashboard/layout.tsx': `
import Link from 'next/link';
import { BookOpen, User, Briefcase, Settings, LogOut, MessageSquare, Bell } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col fixed h-full z-10">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <BookOpen className="h-6 w-6" />
            <span>IPRCRP</span>
          </div>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg bg-primary/5 text-primary">
            <User className="h-5 w-5" /> Overview
          </Link>
          <Link href="/dashboard/opportunities" className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Briefcase className="h-5 w-5" /> Opportunities
          </Link>
          <Link href="/dashboard/ai-assistant" className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <MessageSquare className="h-5 w-5" /> AI Assistant
          </Link>
          <Link href="/dashboard/notifications" className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5" /> Notifications
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button className="flex w-full items-center gap-3 p-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-5 w-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
`,
  'app/dashboard/page.tsx': `
export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Applications Submitted</h3>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Saved Opportunities</h3>
          <p className="text-3xl font-bold text-gray-900">5</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Profile Completion</h3>
          <p className="text-3xl font-bold text-green-600">85%</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-900">Recommended for You</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-600">AI-powered recommendations will appear here based on your profile.</p>
      </div>
    </div>
  );
}
`,
  'app/dashboard/ai-assistant/page.tsx': `
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
      // In real implementation, this hits our Express backend /api/ai/chat
      const res = await fetch('http://localhost:4000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setResponses(prev => [...prev, { role: 'assistant', content: data.response || 'Error processing request.' }]);
    } catch(err) {
      setResponses(prev => [...prev, { role: 'assistant', content: 'Connection failed.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="font-bold text-lg">AI Education & Career Assistant</h2>
        <p className="text-sm text-gray-500">Ask about careers, courses, internships, or resume reviews.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {responses.map((msg, i) => (
          <div key={i} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
            <div className={\`max-w-[80%] p-4 rounded-2xl \${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-gray-800'}\`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl animate-pulse">Thinking...</div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-gray-50 flex gap-4">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything..." 
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button onClick={handleSend} disabled={loading} className="rounded-full px-6">Send</Button>
      </div>
    </div>
  );
}
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(webSrc, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
}

console.log('Dashboards scaffolded.');
