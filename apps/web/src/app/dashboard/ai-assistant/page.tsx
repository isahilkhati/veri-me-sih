"use client";

import React, { useState, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';
import { 
  Send, Paperclip, Mic, MicOff, Volume2, VolumeX, 
  Sparkles, Brain, Layers, Search, Globe, Loader2, 
  X, FileText, Play, Square, ChevronDown, Bot, User, Check
} from 'lucide-react';

// --- Types ---
type Role = 'user' | 'ai';
type MediaType = 'image' | 'pdf' | 'audio' | null;

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  modelId?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
}

interface AIModel {
  id: string;
  name: string;
  icon: React.FC<any>;
  color: string;
  available: boolean;
}

interface Attachment {
  file: File;
  previewUrl: string;
  type: MediaType;
}

// --- Constants & Config ---
const MODELS: Omit<AIModel, 'available'>[] = [
  { id: 'gemini', name: 'Gemini 2.5 Flash', icon: Sparkles, color: 'text-blue-400' },
  { id: 'llama', name: 'Llama 3.1 70B', icon: Brain, color: 'text-purple-400' },
  { id: 'mixtral', name: 'Mixtral 8x7B', icon: Layers, color: 'text-orange-400' },
  { id: 'deepseek', name: 'DeepSeek V3', icon: Search, color: 'text-green-400' },
  { id: 'qwen', name: 'Qwen 2.5 72B', icon: Globe, color: 'text-pink-400' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/ai` : "http://localhost:4000/api/ai";

// --- Markdown Parser ---
const renderMarkdown = (text: string) => {
  if (!text) return { __html: '' };
  
  let html = text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-black/50 p-3 rounded-lg my-3 overflow-x-auto border border-white/10 text-sm font-mono text-gray-200"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 text-pink-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em class="italic text-gray-300">$1</em>')
    // Lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc my-1">$1</li>')
    // Line breaks
    .replace(/\n/g, '<br />');

  return { __html: html };
};

// --- Main Component ---
export default function AIAssistantPage() {
  // State
  const [models, setModels] = useState<AIModel[]>(
    MODELS.map(m => ({ ...m, available: true })) // default true, updated on mount
  );
  const [selectedModel, setSelectedModel] = useState<string>(MODELS[0].id);
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const supabase = createClient();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // --- Effects ---
  useEffect(() => {
    fetchModels();
    setupSpeechRecognition();
    
    // Cleanup speech synth on unmount
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const fetchModels = async () => {
    try {
      const res = await fetch(`${API_BASE}/models`);
      if (res.ok) {
        const data = await res.json();
        // Assuming data returns { models: string[] } of available model IDs
        if (data.models && Array.isArray(data.models)) {
          setModels(prev => prev.map(m => ({
            ...m,
            available: data.models.includes(m.id)
          })));
        }
      }
    } catch (err) {
      console.warn("Could not fetch models, using defaults", err);
    }
  };

  const setupSpeechRecognition = () => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              setInput(prev => prev + event.results[i][0].transcript + ' ');
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Handlers ---
  const handleSend = async (e?: FormEvent) => {
    e?.preventDefault();
    if ((!input.trim() && !attachment) || isTyping) return;

    setError(null);
    const newMessageId = Date.now().toString();
    
    // Prepare message with local preview
    const userMessage: Message = {
      id: newMessageId,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      mediaUrl: attachment?.previewUrl, // temporary until uploaded
      mediaType: attachment?.type
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsTyping(true);
    
    const currentAttachment = attachment;
    setAttachment(null); // clear immediately for UX

    try {
      let finalMediaUrl = '';
      
      // Upload file if exists
      if (currentAttachment) {
        const formData = new FormData();
        formData.append('file', currentAttachment.file);
        
        const uploadRes = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          body: formData
        });
        
        if (!uploadRes.ok) throw new Error("File upload failed");
        const uploadData = await uploadRes.json();
        finalMediaUrl = uploadData.url || '';
        
        // Update user message with real URL
        setMessages(prev => prev.map(m => 
          m.id === newMessageId ? { ...m, mediaUrl: finalMediaUrl } : m
        ));
      }

      // Prepare chat history
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const { data: { session } } = await supabase.auth.getSession();
      
      const chatRes = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
        },
        body: JSON.stringify({
          prompt: userMessage.content,
          model: selectedModel,
          history,
          conversationId,
          ...(finalMediaUrl ? { mediaUrl: finalMediaUrl } : {})
        })
      });

      if (!chatRes.ok) throw new Error("Chat request failed");
      const chatData = await chatRes.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: chatData.response || chatData.content || "No response.",
        timestamp: new Date(),
        modelId: selectedModel
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'ai',
        content: `**Error:** Failed to get response. Please try again.`,
        timestamp: new Date(),
        modelId: selectedModel
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let type: MediaType = null;
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.type === 'application/pdf') type = 'pdf';
    else if (file.type.startsWith('audio/')) type = 'audio';

    if (type) {
      const previewUrl = URL.createObjectURL(file);
      setAttachment({ file, previewUrl, type });
    } else {
      setError("Unsupported file type. Please upload images, PDFs, or audio.");
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const toggleSpeechOutput = (messageId: string, text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    } else {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text.replace(/[#*`_]/g, '')); // Strip markdown
      utterance.onend = () => setSpeakingMessageId(null);
      utterance.onerror = () => setSpeakingMessageId(null);
      window.speechSynthesis.speak(utterance);
      setSpeakingMessageId(messageId);
    }
  };

  // --- Render Helpers ---
  const activeModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <div className="flex flex-col h-screen -m-8 bg-[#050505] text-white overflow-hidden relative">
      
      {/* Header / Model Selector */}
      <header className="flex-none p-4 flex items-center justify-between border-b border-white/5 bg-white/5 backdrop-blur-xl z-20">
        <div className="relative">
          <button 
            onClick={() => setIsModelSelectorOpen(!isModelSelectorOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <activeModel.icon className={`w-5 h-5 ${activeModel.color}`} />
            <span className="font-medium text-sm">{activeModel.name}</span>
            <ChevronDown className="w-4 h-4 text-white/50" />
          </button>

          <AnimatePresence>
            {isModelSelectorOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-2 w-64 p-2 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl z-50"
              >
                {models.map(model => (
                  <button
                    key={model.id}
                    disabled={!model.available}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setIsModelSelectorOpen(false);
                    }}
                    title={!model.available ? "API key not configured" : ""}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                      model.id === selectedModel ? 'bg-white/10' : 'hover:bg-white/5'
                    } ${!model.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <model.icon className={`w-5 h-5 ${model.color}`} />
                      <span className="text-sm font-medium">{model.name}</span>
                    </div>
                    {model.id === selectedModel && <Check className="w-4 h-4 text-white/70" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="text-xs text-white/40 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Secure AI Session
        </div>
      </header>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-500/10 border-b border-red-500/20 text-red-400 text-sm p-3 text-center flex justify-between items-center"
          >
            <span>{error}</span>
            <button onClick={() => setError(null)} className="p-1 hover:bg-white/10 rounded">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
              <activeModel.icon className={`w-10 h-10 ${activeModel.color}`} />
            </div>
            <p className="text-lg font-medium tracking-tight text-white/50">How can I help you today?</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isAI = msg.role === 'ai';
            const msgModel = models.find(m => m.id === msg.modelId) || activeModel;
            
            return (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex flex-col max-w-[85%] md:max-w-[75%] ${isAI ? 'items-start' : 'items-end'}`}>
                  
                  {isAI && (
                    <div className="flex items-center gap-2 mb-1.5 ml-1">
                      <msgModel.icon className={`w-3.5 h-3.5 ${msgModel.color}`} />
                      <span className="text-xs text-white/40">{msgModel.name}</span>
                    </div>
                  )}

                  <div className={`group relative p-4 rounded-2xl ${
                    isAI 
                      ? 'bg-white/10 border border-white/5 text-gray-200 rounded-tl-sm' 
                      : 'bg-white text-black rounded-tr-sm'
                  }`}>
                    
                    {/* Media Attachments */}
                    {msg.mediaUrl && (
                      <div className="mb-3">
                        {msg.mediaType === 'image' && (
                          <img src={msg.mediaUrl} alt="uploaded" className="max-w-full rounded-lg border border-black/10 max-h-64 object-cover" />
                        )}
                        {msg.mediaType === 'pdf' && (
                          <a href={msg.mediaUrl} target="_blank" rel="noreferrer" className={`flex items-center gap-2 p-3 rounded-xl border ${isAI ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} hover:opacity-80 transition-opacity`}>
                            <FileText className="w-6 h-6" />
                            <span className="text-sm font-medium underline">View PDF Document</span>
                          </a>
                        )}
                        {msg.mediaType === 'audio' && (
                          <audio src={msg.mediaUrl} controls className={`h-10 w-full max-w-[250px] ${!isAI && 'invert'}`} />
                        )}
                      </div>
                    )}

                    {/* Text Content */}
                    <div 
                      className="text-[15px] leading-relaxed break-words"
                      dangerouslySetInnerHTML={renderMarkdown(msg.content)} 
                    />

                    {/* Quick Actions (AI only) */}
                    {isAI && (
                      <button 
                        onClick={() => toggleSpeechOutput(msg.id, msg.content)}
                        className="absolute -right-10 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
                        title={speakingMessageId === msg.id ? "Stop reading" : "Read aloud"}
                      >
                        {speakingMessageId === msg.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  
                  <span className="text-[10px] text-white/30 mt-1 mx-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}

        {/* Loading State */}
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex flex-col items-start max-w-[85%]">
              <div className="flex items-center gap-2 mb-1.5 ml-1">
                <activeModel.icon className={`w-3.5 h-3.5 ${activeModel.color} animate-pulse`} />
                <span className="text-xs text-white/40">{activeModel.name} is thinking...</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-white/50" />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="flex-none p-4 bg-gradient-to-t from-[#050505] to-transparent z-10 pt-10">
        <div className="max-w-4xl mx-auto relative">
          
          {/* Attachment Preview */}
          <AnimatePresence>
            {attachment && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute -top-16 left-0 flex items-center gap-3 p-2 rounded-xl bg-[#111] border border-white/10 shadow-lg"
              >
                {attachment.type === 'image' ? (
                  <div className="w-10 h-10 rounded border border-white/10 overflow-hidden">
                    <img src={attachment.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center border border-white/10">
                    {attachment.type === 'pdf' ? <FileText className="w-5 h-5 text-red-400" /> : <Play className="w-5 h-5 text-blue-400" />}
                  </div>
                )}
                <div className="text-xs text-white/70 max-w-[150px] truncate">
                  {attachment.file.name}
                </div>
                <button 
                  onClick={() => setAttachment(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors ml-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form 
            onSubmit={handleSend}
            className={`flex items-end gap-2 p-2 rounded-3xl transition-all duration-200 border bg-[#0f0f0f] ${
              isRecording ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10 hover:border-white/20'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept="image/*,application/pdf,audio/*"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors flex-none"
              title="Attach File"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                handleInputResize();
              }}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening..." : "Message AI..."}
              disabled={isTyping}
              className="flex-1 max-h-48 py-3 bg-transparent text-white placeholder:text-white/30 resize-none outline-none text-[15px] disabled:opacity-50"
              rows={1}
            />

            <div className="flex items-center gap-1 p-1 flex-none mb-1">
              <button
                type="button"
                onClick={toggleVoiceInput}
                disabled={isTyping}
                className={`p-2.5 rounded-full transition-all flex items-center justify-center ${
                  isRecording 
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                    : 'hover:bg-white/10 text-white/50 hover:text-white disabled:opacity-50'
                }`}
                title="Voice Input"
              >
                {isRecording ? (
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <Square className="relative h-4 w-4 fill-current" />
                  </span>
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              <button
                type="submit"
                disabled={(!input.trim() && !attachment) || isTyping}
                className="p-2.5 rounded-full bg-white text-black hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-white transition-all flex items-center justify-center"
                title="Send Message"
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-0.5" />}
              </button>
            </div>
          </form>
          
          <div className="text-center mt-3 text-[10px] text-white/30 font-medium">
            AI can make mistakes. Check important info.
          </div>
        </div>
      </footer>
    </div>
  );
}
