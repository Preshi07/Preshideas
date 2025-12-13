"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { generateAgentConfig } from "../../services/geminiService";
import { AgentConfig, DemoState } from "../../types";

const Typewriter: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}> = ({ text, className = "", delay = 0, speed = 15 }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let currentText = "";
    let index = 0;

    // Reset display when text changes (e.g. new generation)
    setDisplay("");

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          currentText += text.charAt(index);
          setDisplay(currentText);
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return <span className={className}>{display}</span>;
};

export const AgentBuilder: React.FC = () => {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState<DemoState>(DemoState.IDLE);
  const [agent, setAgent] = useState<AgentConfig | null>(null);
  const [emailError, setEmailError] = useState(false);

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
      const result = await generateAgentConfig(input);
      setAgent(result);
      setState(DemoState.SUCCESS);
    } catch (e) {
      setState(DemoState.ERROR);
    }
  };

  return (
    <section id="agents" className="py-16 relative overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
          Deploy Custom Agents
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Define the role, and we generate the system prompt, capabilities, and
          personality for your AI workforce.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 flex flex-col md:flex-row min-h-[550px]">
          {/* Input Panel */}
          <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-slate-200 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Agent Parameters
            </h3>

            <div className="space-y-4 flex-1">
              <div>
                <label className="text-xs text-slate-600 mb-1 block">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(false);
                  }}
                  placeholder="name@company.com"
                  className={`w-full bg-white border ${
                    emailError ? "border-red-400" : "border-slate-200"
                  } rounded-lg p-3 text-sm text-slate-900 focus:ring-1 focus:ring-primary-500 focus:outline-none placeholder:text-slate-400`}
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 mb-1 block">
                  Mission Objective
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. A support agent that specializes in troubleshooting WiFi routers and can schedule technician visits."
                  className="w-full h-32 bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-900 focus:ring-1 focus:ring-primary-500 focus:outline-none resize-none placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={handleBuild}
                disabled={state === DemoState.LOADING}
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {state === DemoState.LOADING
                  ? "Compiling Agent..."
                  : "Initialize Agent"}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    state === DemoState.LOADING
                      ? "bg-yellow-500 animate-pulse"
                      : "bg-green-500"
                  }`}
                />
                <span className="text-xs text-slate-600 font-mono">
                  System {state === DemoState.LOADING ? "Processing" : "Online"}
                </span>
              </div>
            </div>
          </div>

          {/* Output Terminal - Keeping dark for contrast and 'tech' feel */}
          <div className="w-full md:w-2/3 bg-[#0c0e14] p-8 font-mono text-sm relative overflow-y-auto">
            {state === DemoState.IDLE && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                <svg
                  className="w-12 h-12 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <p>Ready to compile...</p>
              </div>
            )}

            {state === DemoState.LOADING && (
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-primary-400"
                >
                  &gt; Verifying credentials for {email}...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-blue-400"
                >
                  &gt; Analyzing mission parameters...
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="text-purple-400"
                >
                  &gt; Constructing cognitive architecture...
                </motion.div>
                <div className="w-3 h-5 bg-slate-500 animate-pulse inline-block" />
              </div>
            )}

            {agent && state === DemoState.SUCCESS && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-slate-500">Agent Name:</span>
                    <Typewriter
                      text={agent.name}
                      className="text-primary-400 ml-2 font-bold"
                      delay={200}
                    />
                  </div>
                  <div className="bg-slate-800 px-2 py-1 rounded text-xs text-slate-300">
                    v1.0.0
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-2">
                    // Role Definition
                  </span>
                  <p className="text-white">
                    <Typewriter text={agent.role} delay={600} />
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 block mb-2">
                    // System Instructions
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    {agent.instructions.map((inst, i) => (
                      <li key={i}>
                        <Typewriter
                          text={inst}
                          delay={1500 + i * 800}
                          speed={10}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-slate-500 block mb-2">
                    // Active Capabilities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((cap, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3 + i * 0.2 }}
                        className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-md text-blue-300 text-xs"
                      >
                        {cap}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4.5 }}
                  className="pt-4 text-green-500"
                >
                  &gt; Agent configuration ready for deployment.
                  <span className="animate-pulse ml-1">_</span>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
