"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Terminal,
  Cpu,
  Copy,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { AgentConfig, DemoState } from "../../types";

/** ---------- Utils ---------- */

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function downloadJSON(filename: string, data: unknown) {
  const dataStr = JSON.stringify(data, null, 2);
  const url = URL.createObjectURL(new Blob([dataStr], { type: "application/json" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

/** Typewriter with correct cleanup */
const Typewriter: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}> = ({ text, className = "", delay = 0, speed = 10, onComplete }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let mounted = true;
    let idx = 0;
    let interval: number | undefined;
    let timeout: number | undefined;

    setDisplay("");

    timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        if (!mounted) return;
        if (idx < text.length) {
          idx++;
          setDisplay(text.slice(0, idx));
        } else {
          if (interval) window.clearInterval(interval);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      mounted = false;
      if (timeout) window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [text, delay, speed, onComplete]);

  return <span className={className}>{display}</span>;
};

/** ---------- Main ---------- */

const exampleIdeas = [
  "A Tier-1 Support agent for WiFi routers that can check warranty status via API and draft replies in a friendly tone.",
  "A Sales qualifying agent that scores inbound leads, asks 3 discovery questions, and books calls if qualified.",
  "An Ops agent that monitors failed Stripe payments, retries with backoff, and notifies Slack with customer context.",
];

export const AgentBuilder: React.FC = () => {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState<DemoState>(DemoState.IDLE);
  const [agent, setAgent] = useState<AgentConfig | null>(null);

  const [emailError, setEmailError] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const [toast, setToast] = useState<null | { type: "success" | "error"; text: string }>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const status = useMemo(() => {
    if (state === DemoState.LOADING) return { dot: "bg-yellow-400 animate-pulse", label: "PROCESSING" };
    if (state === DemoState.ERROR) return { dot: "bg-red-500", label: "ERROR" };
    if (state === DemoState.SUCCESS) return { dot: "bg-green-500", label: "READY" };
    return { dot: "bg-slate-500", label: "IDLE" };
  }, [state]);

  const validate = () => {
    let ok = true;

    if (!email.trim()) {
      setEmailError("Required for deployment");
      ok = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email");
      ok = false;
    } else setEmailError("");

    if (!input.trim()) {
      setInputError("Describe what the agent should do");
      ok = false;
    } else if (input.trim().length < 20) {
      setInputError("Add a bit more detail (at least 20 characters)");
      ok = false;
    } else setInputError("");

    return ok;
  };

  const handleBuild = async () => {
    if (!validate()) return;

    setState(DemoState.LOADING);
    setAgent(null);

    try {
      const response = await fetch("/api/generate-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate agent config");
      }

      setAgent(data.config);
      setState(DemoState.SUCCESS);
      setToast({ type: "success", text: "Agent config generated." });
    } catch (e: any) {
      console.error(e);
      setState(DemoState.ERROR);
      setToast({ type: "error", text: e?.message || "Generation failed." });
    }
  };

  const handleCopy = async () => {
    if (!agent) return;
    await copyText(JSON.stringify(agent, null, 2));
    setToast({ type: "success", text: "Copied JSON." });
  };

  const handleDownload = () => {
    if (!agent) return;
    downloadJSON(`agent-${(agent.name || "config").toLowerCase()}-${Date.now()}.json`, agent);
    setToast({ type: "success", text: "Downloaded JSON." });
  };

  return (
    <section id="agents" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm flex items-center gap-2
              ${
                toast.type === "success"
                  ? "bg-white border-emerald-200 text-emerald-700"
                  : "bg-white border-red-200 text-red-700"
              }`}
          >
            {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

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
            Define the mission. Get a structured agent config you can ship.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Configuration */}
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
                      if (emailError) setEmailError("");
                    }}
                    placeholder="name@company.com"
                    className={`w-full bg-slate-50 border ${
                      emailError ? "border-red-300" : "border-slate-200 focus:border-indigo-500"
                    } rounded-xl px-4 py-3 text-slate-900 transition-all outline-none focus:ring-4 focus:ring-indigo-100`}
                  />
                  {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mission Objective</label>
                  <textarea
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (inputError) setInputError("");
                    }}
                    placeholder="e.g. A Tier 1 Technical Support agent that specializes in troubleshooting WiFi routers..."
                    className={`w-full h-40 bg-slate-50 border ${
                      inputError ? "border-red-300" : "border-slate-200 focus:border-indigo-500"
                    } rounded-xl px-4 py-3 text-slate-900 resize-none transition-all outline-none focus:ring-4 focus:ring-indigo-100 placeholder:text-slate-400`}
                  />

                  {inputError && <p className="text-xs text-red-500 mt-1">{inputError}</p>}

                  <div className="mt-3 flex flex-wrap gap-2">
                    {exampleIdeas.map((idea, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setInput(idea);
                          setInputError("");
                        }}
                        className="text-[10px] bg-slate-100 hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 px-2 py-1 rounded transition-all flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        Example {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBuild}
                  disabled={state === DemoState.LOADING}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-70 flex items-center justify-center gap-2 group"
                >
                  {state === DemoState.LOADING ? (
                    <>
                      <RefreshCw className="animate-spin w-4 h-4" />
                      <span>Compiling…</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-4 h-4 text-green-400 group-hover:text-green-300" />
                      <span>Initialize Agent</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-mono">SYSTEM STATUS</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                  <span className="text-xs font-bold text-slate-700">{status.label}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-indigo-500 mt-0.5" />
              <p>
                Your API keys should stay server-side. This demo calls <code>/api/generate-agent</code> so secrets never
                reach the browser.
              </p>
            </div>
          </div>

          {/* RIGHT: Terminal Output (enhanced layout) */}
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

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!agent}
                    className="text-slate-500 hover:text-white transition-colors disabled:opacity-40"
                    title="Copy JSON"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!agent}
                    className="text-slate-500 hover:text-white transition-colors disabled:opacity-40"
                    title="Download JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-1 p-6 relative overflow-y-auto max-h-[640px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {/* IDLE */}
                {state === DemoState.IDLE && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-30 select-none">
                    <Bot className="w-16 h-16 mb-4" />
                    <p>Awaiting Mission Parameters…</p>
                  </div>
                )}

                {/* LOADING */}
                {state === DemoState.LOADING && (
                  <div className="space-y-2">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400">
                      &gt; Boot sequence…
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-yellow-400"
                    >
                      &gt; Validating requester: {email || "<no-email>"}…{" "}
                      <span className="text-green-500">[OK]</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-purple-400"
                    >
                      &gt; Generating role + directives…
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.9 }}
                      className="text-slate-400"
                    >
                      &gt; Compiling capability modules…
                    </motion.div>
                    <div className="mt-4 w-2 h-4 bg-green-500 animate-pulse" />
                  </div>
                )}

                {/* ERROR */}
                {state === DemoState.ERROR && (
                  <div className="text-red-300 p-4 border border-red-900/50 bg-red-900/10 rounded-lg">
                    <p className="font-bold mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> CRITICAL FAILURE
                    </p>
                    <p>&gt; Error: request failed.</p>
                    <p>&gt; Hint: check your API route logs and provider model name.</p>
                  </div>
                )}

                {/* SUCCESS */}
                {agent && state === DemoState.SUCCESS && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {/* Identity bar */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-4">
                      <div>
                        <div className="text-slate-500 text-xs mb-1">// AGENT IDENTITY</div>
                        <div className="text-xl font-bold text-white flex items-center gap-2">
                          <Typewriter
                            text={agent.name}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                            speed={12}
                          />
                          <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            v1.0
                          </span>
                        </div>
                      </div>
                      <div className="text-slate-500 text-xs">
                        // status: <span className="text-green-400">compiled</span>
                      </div>
                    </div>

                    {/* Two-column layout */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Role */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-slate-500 text-xs mb-2">// PRIMARY DIRECTIVE</div>
                        <div className="text-slate-300 leading-relaxed">
                          <span className="text-indigo-400 font-bold">Role:</span>{" "}
                          <Typewriter text={agent.role} delay={150} speed={14} />
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-slate-500 text-xs mb-2">// CAPABILITY MODULES</div>
                        <div className="flex flex-wrap gap-2">
                          {agent.capabilities.map((cap, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.08 }}
                              className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded text-indigo-300 text-xs font-medium"
                            >
                              {cap}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="text-slate-500 text-xs mb-3">// BEHAVIORAL MATRIX</div>
                      <div className="space-y-2">
                        {agent.instructions.map((inst, i) => (
                          <div key={i} className="flex gap-3 text-slate-300">
                            <span className="text-slate-600 select-none">
                              {(i + 1).toString().padStart(2, "0")}
                            </span>
                            <span className="leading-relaxed">
                              <Typewriter text={inst} delay={450 + i * 260} speed={9} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      className="text-green-500 pt-2"
                    >
                      &gt; Configuration compiled successfully.<span className="animate-pulse">_</span>
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