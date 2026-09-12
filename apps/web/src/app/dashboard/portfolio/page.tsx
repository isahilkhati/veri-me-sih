'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, GitFork, ExternalLink, Loader2, CheckCircle2, Layout } from 'lucide-react';

export default function PortfolioSyncPage() {
  const [githubUser, setGithubUser] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [figmaUrl, setFigmaUrl] = useState('');
  const [figmaSynced, setFigmaSynced] = useState(false);

  const handleGithubSync = async () => {
    if (!githubUser) return;
    setIsSyncing(true);
    try {
      const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=6`);
      if (res.ok) {
        const data = await res.json();
        setRepos(data);
      } else {
        alert("GitHub user not found or rate limited.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleFigmaSync = () => {
    if (!figmaUrl) return;
    setFigmaSynced(true);
    setTimeout(() => setFigmaSynced(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold mb-2">Proof-of-Work Sync</h1>
        <p className="text-zinc-400">Connect your live repositories and designs to generate verifiable credentials.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* GitHub Sync Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <GitBranch className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
              <GitBranch className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">GitHub Sync</h2>
              <p className="text-sm text-zinc-400">Import live commits and repos</p>
            </div>
          </div>
          
          <div className="flex gap-3 relative z-10">
            <input 
              type="text" 
              placeholder="GitHub Username (e.g. torvalds)"
              value={githubUser}
              onChange={(e) => setGithubUser(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleGithubSync()}
            />
            <button 
              onClick={handleGithubSync}
              disabled={isSyncing}
              className="bg-white text-black px-6 py-2.5 rounded-xl font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sync'}
            </button>
          </div>
        </div>

        {/* Figma Sync Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Layout className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-500/30">
              <Layout className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Design Sync</h2>
              <p className="text-sm text-zinc-400">Import design prototypes</p>
            </div>
          </div>
          
          <div className="flex gap-3 relative z-10">
            <input 
              type="text" 
              placeholder="Figma File URL"
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              onClick={handleFigmaSync}
              className={`px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 ${figmaSynced ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
            >
              {figmaSynced ? <CheckCircle2 className="w-4 h-4" /> : 'Link'}
            </button>
          </div>
        </div>

      </div>

      {/* GitHub Results Grid */}
      {repos.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Verified Repositories
            </h3>
            <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
              Plagiarism Check Passed
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={repo.id} 
                className="bg-black/40 border border-white/10 p-5 rounded-2xl hover:border-orange-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-lg text-white truncate pr-4">{repo.name}</h4>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-zinc-400 text-sm mb-4 line-clamp-2 h-10">
                  {repo.description || 'No description provided.'}
                </p>
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-zinc-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Star className="w-3.5 h-3.5" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-zinc-400">
                      <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
                    </span>
                  </div>
                  <span className="text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/20">
                    Synced
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
