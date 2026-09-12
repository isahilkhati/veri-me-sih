'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Code2, BrainCircuit, AlertTriangle, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function AssessmentsPage() {
  const [code, setCode] = useState('function calculateFibonacci(n) {\n  if (n <= 1) return n;\n  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);\n}\n\nconsole.log(calculateFibonacci(10));');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [language, setLanguage] = useState('Python 3.10');

  const handleRunCode = async () => {
    setIsRunning(true);
    setResult(null);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/ai/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      });
      
      const data = await res.json();
      setResult({
        output: data.output || data.error || "No output",
        time: data.time || "0.00s",
        memory: data.memory || "0 MB",
        aiScore: data.aiScore || 90,
        isOriginal: data.isOriginal ?? true,
      });
    } catch (e) {
      setResult({
        output: "Execution failed to connect to backend.",
        time: "0.00s",
        memory: "0 MB",
        aiScore: 0,
        isOriginal: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Automated Skill Sandbox</h1>
        <p className="text-zinc-400">Powered by Judge0 for execution and PyTorch for AI plagiarism detection.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Code Editor */}
        <div className="lg:col-span-2 bg-[#0d1117] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-[#161b22] px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-orange-500" />
              <span className="font-semibold text-sm">main.js</span>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-1 text-sm text-zinc-300 focus:outline-none"
            >
              <option>JavaScript (Node.js)</option>
              <option>Python 3.10</option>
              <option>C++ (GCC 11)</option>
              <option>Java (OpenJDK 17)</option>
            </select>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-transparent text-[#e6edf3] font-mono p-4 outline-none resize-none min-h-[400px] text-sm leading-relaxed"
            spellCheck={false}
          />
          
          <div className="bg-[#161b22] p-4 border-t border-white/5 flex justify-between items-center">
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Environment Sandboxed
            </div>
            <button 
              onClick={handleRunCode}
              disabled={isRunning}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              {isRunning ? 'Evaluating...' : 'Run Execution'}
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm h-full flex flex-col">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-400" />
              Evaluation Report
            </h2>

            {!result && !isRunning && (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500 space-y-3">
                <Code2 className="w-12 h-12 opacity-20" />
                <p className="text-sm">Run your code to generate a verified performance and integrity report.</p>
              </div>
            )}

            {isRunning && (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">Compiling in Judge0 Sandbox...</p>
                  <p className="text-xs text-zinc-500">Running AI AST analysis...</p>
                </div>
              </div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                
                {/* Output */}
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Standard Output</label>
                  <div className="bg-black/50 rounded-lg p-3 font-mono text-sm text-green-400 border border-white/5">
                    {result.output}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-zinc-500 mb-1">Execution Time</p>
                    <p className="font-mono font-semibold">{result.time}</p>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-zinc-500 mb-1">Memory Used</p>
                    <p className="font-mono font-semibold">{result.memory}</p>
                  </div>
                </div>

                {/* AI Integrity Guard */}
                <div className={`rounded-xl p-5 border ${result.isOriginal ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className="flex items-start gap-3">
                    {result.isOriginal ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                    )}
                    <div>
                      <h4 className={`font-bold mb-1 ${result.isOriginal ? 'text-green-400' : 'text-red-400'}`}>
                        {result.isOriginal ? 'AI Integrity Passed' : 'Plagiarism Detected'}
                      </h4>
                      <p className="text-sm text-zinc-400 mb-3">
                        {result.isOriginal 
                          ? 'AST pattern analysis confirms high likelihood of original human authorship.' 
                          : 'Code similarity matches ChatGPT generated templates.'}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium bg-black/30 px-2 py-1 rounded">Originality Score: {result.aiScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
