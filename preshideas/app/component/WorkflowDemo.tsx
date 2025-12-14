"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Sparkles,
  Download,
  Copy,
  RefreshCw,
  Zap,
  ArrowRight,
} from "lucide-react";
import { WorkflowStep, DemoState } from "../../types";

const WordReveal: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const words = text.split(" ");
  return (
    <motion.p
      className="text-slate-600 text-sm mt-2 leading-relaxed"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.02, delayChildren: delay },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 2 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const exampleTasks = [
  "Onboard a new client from Stripe payment",
  "Process customer support tickets and route to teams",
  "Generate weekly sales reports from CRM data",
];

export const WorkflowDemo: React.FC = () => {
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [state, setState] = useState<DemoState>(DemoState.IDLE);
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [emailError, setEmailError] = useState("");
  const [inputError, setInputError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  const validateInputs = (): boolean => {
    let isValid = true;
    if (!email.trim()) { setEmailError("Required"); isValid = false; }
    else if (!isValidEmail(email)) { setEmailError("Invalid"); isValid = false; }
    else setEmailError("");

    if (!input.trim()) { setInputError("Required"); isValid = false; }
    else if (input.trim().length < 10) { setInputError("More detail needed"); isValid = false; }
    else setInputError("");

    return isValid;
  };

  const handleGenerate = async () => {
    if (!validateInputs()) return;

    setState(DemoState.LOADING);
    setSteps([]);

    try {
      const response = await fetch("/api/generate-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: input }),
      });

      if (!response.ok) throw new Error("Failed to generate workflow");

      const data = await response.json();
      setSteps(data.workflow);
      setState(DemoState.SUCCESS);
      setTimeout(() => setSaved(true), 500);
    } catch (error) {
      setState(DemoState.ERROR);
    }
  };

  const handleReset = () => {
    setState(DemoState.IDLE);
    setSteps([]);
    setInput("");
    setCopied(false);
    setSaved(false);
  };

  const handleCopyWorkflow = () => {
    const txt = steps.map(s => `${s.step}. ${s.title} (${s.tool})\n   ${s.description}`).join("\n\n");
    navigator.clipboard.writeText(txt);
    setCopied(true);
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify({ email, task: input, workflow: steps }, null, 2);
    const url = URL.createObjectURL(new Blob([dataStr], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `workflow-${Date.now()}.json`;
    link.click();
  };

  return (
    <section id="workflows" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4 uppercase tracking-wider">
            <Zap className="w-3 h-3" />
            AI Architecture
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Design Intelligent Workflows
          </h2>
          <p className="text-slate-600 text-lg">
            Describe your business goal, and our AI will architect the perfect automation sequence.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: FORM */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-slate-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError(""); }}
                    placeholder="name@company.com"
                    className={`w-full bg-slate-50 border ${emailError ? "border-red-300" : "border-slate-200 focus:border-primary-500"} rounded-xl px-4 py-3 text-slate-900 transition-all`}
                  />
                  {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Automation Goal</label>
                  <textarea
                    value={input}
                    onChange={(e) => { setInput(e.target.value); if(inputError) setInputError(""); }}
                    placeholder="e.g. When a new lead fills out Typeform, add to HubSpot and alert Slack."
                    rows={5}
                    className={`w-full bg-slate-50 border ${inputError ? "border-red-300" : "border-slate-200 focus:border-primary-500"} rounded-xl px-4 py-3 text-slate-900 resize-none transition-all`}
                  />
                  {inputError && <p className="text-xs text-red-500 mt-1">{inputError}</p>}
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exampleTasks.map((t, i) => (
                      <button key={i} onClick={() => { setInput(t); setInputError(""); }} className="text-[10px] bg-slate-100 hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 px-2 py-1 rounded transition-all">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={state === DemoState.LOADING}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {state === DemoState.LOADING ? <RefreshCw className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5 text-yellow-300" />}
                  {state === DemoState.LOADING ? "Architecting..." : "Generate Workflow"}
                </button>
                
                <AnimatePresence>
                  {saved && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="flex justify-center text-green-600 text-sm gap-1 items-center overflow-hidden">
                      <CheckCircle className="w-4 h-4" /> Saved!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: VISUALIZER */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-8 bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/50 min-h-[600px] flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                {state === DemoState.SUCCESS && (
                  <div className="flex gap-2">
                    <button onClick={handleCopyWorkflow} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"><Copy className="w-4 h-4" /></button>
                    <button onClick={handleDownloadJSON} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600"><Download className="w-4 h-4" /></button>
                    <button onClick={handleReset} className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500"><RefreshCw className="w-4 h-4" /></button>
                  </div>
                )}
              </div>

              <div className="flex-1 p-8 bg-slate-50/50 relative overflow-y-auto max-h-[700px]">
                {state === DemoState.IDLE && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-slate-500 text-sm">Waiting for input...</p>
                  </div>
                )}

                <div className="max-w-md mx-auto relative z-10 space-y-4">
                  <AnimatePresence>
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative"
                      >
                        {index !== steps.length - 1 && (
                          <div className="absolute left-[27px] top-12 bottom-[-20px] w-0.5 border-l-2 border-dashed border-slate-300 z-0" />
                        )}
                        <div className="relative z-10 bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex gap-4 group">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 text-white flex flex-col items-center justify-center shadow-lg shadow-blue-200 shrink-0">
                            <span className="text-[10px] uppercase opacity-80 font-medium">Step</span>
                            <span className="text-xl font-bold leading-none">{step.step}</span>
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-slate-900">{step.title}</h4>
                              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase">{step.tool}</span>
                            </div>
                            <WordReveal text={step.description} delay={0.3 + index * 0.1} />
                          </div>
                        </div>
                        {index !== steps.length - 1 && (
                          <div className="absolute -bottom-6 left-[20px] w-4 h-4 bg-slate-50 rounded-full border border-slate-200 flex items-center justify-center z-20">
                            <ArrowRight className="w-2.5 h-2.5 text-slate-400 rotate-90" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};