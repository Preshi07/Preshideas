"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  Terminal, 
  Cpu, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  RefreshCw 
} from "lucide-react";
import { AgentConfig, DemoState } from "../../types";

// --- Utility Components ---

const Typewriter: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}> = ({ text, className = "", delay = 0, speed = 10, onComplete }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let currentText = "";
    let index = 0;
    setDisplay("");

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          currentText += text.charAt(index);
          setDisplay(currentText);
          index++;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed, onComplete]);

  return <span className={className}>{display}</span>;
};

// --- Main Component ---

export const AgentBuilder: React.FC = () => {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState<DemoState>(DemoState.IDLE);
  const [agent, setAgent] = useState<AgentConfig | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleBuild = async () => {
    if (!input.trim()) return;
    if (!email.trim() || !email.includes("@")) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setState(DemoState.LOADING);
    setAgent(null);

    try {
      const response = await fetch("/api/generate-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: input }),
      });

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();
      setAgent(data.config);
      setState(DemoState.SUCCESS);
    } catch (e) {
      console.error(e);
      setState(DemoState.ERROR);
    }
  };

  const handleCopy = () => {
    if (!agent) return;
    navigator.clipboard.writeText(JSON.stringify(agent, null, 2));
    setCopied(true);
  };

  return (
    <section id="agents" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4 uppercase tracking-wider">
            <Bot className="w-3 h-3" />
            AI Workforce
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Deploy Custom AI Agents
          </h2>
          <p className="text-slate-600 text-lg">
            Define the role, and our engine generates the system prompt, capabilities, and personality matrix instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: Configuration Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-6 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                Agent Parameters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(false);
                    }}
                    placeholder="name@company.com"
                    className={`w-full bg-slate-50 border ${
                      emailError ? "border-red-300" : "border-slate-200 focus:border-indigo-500"
                    } rounded-xl px-4 py-3 text-slate-900 transition-all`}
                  />
                  {emailError && <p className="text-xs text-red-500 mt-1">Required for deployment</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mission Objective</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. A Tier 1 Technical Support agent that specializes in troubleshooting WiFi routers and can verify warranty status via API."
                    className="w-full h-40 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl px-4 py-3 text-slate-900 resize-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <button
                  onClick={handleBuild}
                  disabled={state === DemoState.LOADING}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 group"
                >
                  {state === DemoState.LOADING ? (
                    <>
                      <RefreshCw className="animate-spin w-4 h-4" />
                      <span>Compiling Neural Weights...</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                      <span>Initialize Agent</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">SYSTEM STATUS</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${state === DemoState.LOADING ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
                  <span className="text-xs font-bold text-slate-700">
                    {state === DemoState.LOADING ? "PROCESSING" : "ONLINE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Terminal Output */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-8 bg-[#0c0e14] rounded-2xl shadow-2xl shadow-slate-300/50 overflow-hidden border border-slate-800 min-h-[600px] flex flex-col font-mono text-sm">
              
              {/* Terminal Header */}
              <div className="bg-[#1a1d24] px-4 py-3 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-slate-500 text-xs tracking-widest">agent_config.json</div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-6 relative overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                
                {/* IDLE STATE */}
                {state === DemoState.IDLE && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-30 select-none">
                    <Bot className="w-16 h-16 mb-4" />
                    <p>Awaiting Mission Parameters...</p>
                  </div>
                )}

                {/* LOADING STATE */}
                {state === DemoState.LOADING && (
                  <div className="space-y-2 font-mono">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400">
                      &gt; Initializing constructor sequence...
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-yellow-400">
                      &gt; Verifying credentials for {email}... <span className="text-green-500">[OK]</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-purple-400">
                      &gt; Synthesizing role definition...
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-slate-400">
                      &gt; Generating cognitive constraints...
                    </motion.div>
                    <div className="mt-4 w-2 h-4 bg-green-500 animate-pulse" />
                  </div>
                )}

                {/* ERROR STATE */}
                {state === DemoState.ERROR && (
                  <div className="text-red-400 p-4 border border-red-900/50 bg-red-900/10 rounded-lg">
                    <p className="font-bold mb-2">CRITICAL FAILURE</p>
                    <p>&gt; Error: Connection refused or timeout.</p>
                    <p>&gt; Hint: Check API connectivity.</p>
                  </div>
                )}

                {/* SUCCESS STATE */}
                {agent && state === DemoState.SUCCESS && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    
                    {/* Header Info */}
                    <div className="flex justify-between items-start border-b border-white/10 pb-4">
                      <div>
                        <div className="text-slate-500 text-xs mb-1">// AGENT IDENTITY</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                          <Typewriter text={agent.name} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400" />
                          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">v1.0</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="text-slate-500 hover:text-white transition-colors"
                        title="Copy Configuration"
                      >
                        {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Role */}
                    <div>
                      <div className="text-slate-500 text-xs mb-2">// PRIMARY DIRECTIVE</div>
                      <div className="text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">
                        <span className="text-indigo-400 font-bold">Role: </span>
                        <Typewriter text={agent.role} delay={200} speed={15} />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <div className="text-slate-500 text-xs mb-2">// BEHAVIORAL MATRIX</div>
                      <div className="space-y-2">
                        {agent.instructions.map((inst, i) => (
                          <div key={i} className="flex gap-3 text-slate-300">
                            <span className="text-slate-600 select-none">{(i + 1).toString().padStart(2, '0')}</span>
                            <span><Typewriter text={inst} delay={800 + (i * 600)} speed={10} /></span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div>
                      <div className="text-slate-500 text-xs mb-2">// CAPABILITY MODULES</div>
                      <div className="flex flex-wrap gap-2">
                        {agent.capabilities.map((cap, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 3 + (i * 0.2) }}
                            className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded text-indigo-300 text-xs font-medium"
                          >
                            {cap}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: 4.5 }}
                      className="text-green-500 pt-4 border-t border-white/10 mt-6"
                    >
                      &gt; Configuration compiled successfully.
                      <span className="animate-pulse">_</span>
                    </motion.div>

                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};