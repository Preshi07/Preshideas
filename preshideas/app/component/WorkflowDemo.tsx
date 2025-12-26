"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Sparkles,
  Download,
  Copy, // Added Copy icon for individual steps if needed
  RefreshCw,
  Zap,
  ArrowRight,
  ClipboardCheck,
  FileJson,
  Layers,
  ChevronRight,
} from "lucide-react";
import { WorkflowStep, DemoState } from "../../types";

// --- Utility Functions ---

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!navigator?.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
};

const downloadJSON = (filename: string, data: unknown) => {
  try {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};

// --- Sub-Components ---

const StepPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 uppercase tracking-wide">
    {label}
  </span>
);

const exampleTasks = [
  "Onboard a new client from Stripe payment",
  "Process customer support tickets and route to teams",
  "Generate weekly sales reports from CRM data",
];

export const WorkflowDemo: React.FC = () => {
  // Form State
  const [email, setEmail] = useState("");
  const [input, setInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [inputError, setInputError] = useState("");

  // Demo Logic State
  const [state, setState] = useState<DemoState>(DemoState.IDLE);
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // UI State
  const [toast, setToast] = useState<null | {
    type: "success" | "error";
    text: string;
  }>(null);

  // Toast Auto-Dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const activeStep = steps[activeIndex];

  // Memoized Summary
  const summary = useMemo(() => {
    if (!steps.length) return null;
    const tools = Array.from(new Set(steps.map((s) => s.tool))).slice(0, 5);
    return { tools, count: steps.length };
  }, [steps]);

  // Validation
  const validateInputs = useCallback((): boolean => {
    let ok = true;
    let newEmailError = "";
    let newInputError = "";

    if (!email.trim()) {
      newEmailError = "Email is required";
      ok = false;
    } else if (!isValidEmail(email)) {
      newEmailError = "Please enter a valid email";
      ok = false;
    }

    if (!input.trim()) {
      newInputError = "Description is required";
      ok = false;
    } else if (input.trim().length < 10) {
      newInputError = "Please provide more detail (min 10 chars)";
      ok = false;
    }

    setEmailError(newEmailError);
    setInputError(newInputError);
    return ok;
  }, [email, input]);

  // Handlers
  const handleGenerate = async () => {
    if (!validateInputs()) return;

    setState(DemoState.LOADING);
    setSteps([]);
    setActiveIndex(0);

    try {
      const response = await fetch("/api/generate-workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: input, email }), // Included email in payload just in case
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate workflow");
      }

      const wf: WorkflowStep[] = data.workflow || [];
      
      if (wf.length === 0) {
        throw new Error("No steps were generated. Please try a different prompt.");
      }

      setSteps(wf);
      setActiveIndex(0);
      setState(DemoState.SUCCESS);
      setToast({ type: "success", text: "Workflow generated successfully" });
    } catch (e: any) {
      console.error(e);
      setState(DemoState.ERROR);
      setToast({ type: "error", text: e?.message || "Generation failed. Please try again." });
    }
  };

  const handleReset = () => {
    setState(DemoState.IDLE);
    setSteps([]);
    setInput("");
    setActiveIndex(0);
    setEmailError("");
    setInputError("");
  };

  const handleCopyReadable = async () => {
    const txt = steps
      .map((s) => `${s.step}. ${s.title} [${s.tool}]\n   ${s.description}`)
      .join("\n\n");
    const success = await copyToClipboard(txt);
    if (success) setToast({ type: "success", text: "Workflow copied to clipboard" });
    else setToast({ type: "error", text: "Failed to copy" });
  };

  const handleCopyJSON = async () => {
    const success = await copyToClipboard(
      JSON.stringify({ email, task: input, workflow: steps }, null, 2)
    );
    if (success) setToast({ type: "success", text: "JSON copied to clipboard" });
    else setToast({ type: "error", text: "Failed to copy JSON" });
  };

  const handleDownload = () => {
    downloadJSON(`workflow-${new Date().toISOString().slice(0, 10)}.json`, {
      email,
      task: input,
      created: new Date().toISOString(),
      workflow: steps,
    });
    setToast({ type: "success", text: "Download started" });
  };

  const isLoading = state === DemoState.LOADING;

  return (
    <section
      id="workflows"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-xl shadow-xl border text-sm font-medium flex items-center gap-3
              ${
                toast.type === "success"
                  ? "bg-white border-emerald-100 text-emerald-700 shadow-emerald-100"
                  : "bg-white border-red-100 text-red-700 shadow-red-100"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/50 border border-primary-100 text-primary-700 text-xs font-bold mb-4 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-primary-700" />
            AI Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Design Intelligent Workflows
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Describe your business goal, and the AI will architect a clear, 
            step-by-step automation sequence tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Input Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/60 border border-slate-100">
              <div className="space-y-6">
                
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="name@company.com"
                    className={`w-full bg-slate-50 border ${
                      emailError
                        ? "border-red-300 focus:ring-red-100"
                        : "border-slate-200 focus:border-primary-500 focus:ring-primary-100"
                    } rounded-xl px-4 py-3 text-slate-900 transition-all outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  {emailError && (
                    <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {emailError}
                    </p>
                  )}
                </div>

                {/* Prompt Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Automation Goal
                  </label>
                  <textarea
                    value={input}
                    disabled={isLoading}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (inputError) setInputError("");
                    }}
                    placeholder="e.g. When a new lead fills out Typeform, add to HubSpot and alert Slack."
                    rows={5}
                    className={`w-full bg-slate-50 border ${
                      inputError
                        ? "border-red-300 focus:ring-red-100"
                        : "border-slate-200 focus:border-primary-500 focus:ring-primary-100"
                    } rounded-xl px-4 py-3 text-slate-900 resize-none transition-all outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  {inputError && (
                    <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {inputError}
                    </p>
                  )}

                  {/* Suggestion Chips */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exampleTasks.map((t, i) => (
                      <button
                        key={i}
                        type="button"
                        disabled={isLoading}
                        onClick={() => {
                          setInput(t);
                          setInputError("");
                        }}
                        className="text-[10px] md:text-xs font-medium bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-lg shadow-slate-900/10"
                >
                  {isLoading ? (
                    <RefreshCw className="animate-spin w-5 h-5 text-slate-400" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-yellow-300 fill-yellow-300/20" />
                  )}
                  {isLoading ? "Architecting..." : "Generate Workflow"}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Output Panel */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-8 border border-slate-200 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden bg-white h-[600px] flex flex-col">
              
              {/* Panel Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Workflow Output
                    </div>
                    <div className="text-xs text-slate-500">
                      {state === DemoState.SUCCESS && summary
                        ? `${summary.count} steps • ${summary.tools.join(", ")}`
                        : "AI Generated Blueprint"}
                    </div>
                  </div>
                </div>

                {state === DemoState.SUCCESS && (
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={handleCopyReadable}
                      className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                      title="Copy readable text"
                    >
                      <ClipboardCheck className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyJSON}
                      className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                      title="Copy JSON"
                    >
                      <FileJson className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                      title="Download JSON"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <div className="w-px h-8 bg-slate-100 mx-1" />
                    <button
                      type="button"
                      onClick={handleReset}
                      className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                      title="Reset"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Panel Body */}
              <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
                
                {/* Left Col: Step List */}
                <div className="bg-slate-50/50 border-r border-slate-100 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {state === DemoState.IDLE && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center mb-4">
                        <Sparkles className="w-7 h-7 text-slate-300" />
                      </div>
                      <h3 className="text-slate-900 font-semibold mb-1">Ready to Build</h3>
                      <p className="text-slate-500 text-xs max-w-[200px]">
                        Enter a prompt on the left to generate your automation steps.
                      </p>
                    </div>
                  )}

                  {state === DemoState.LOADING && (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                      <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mb-4" />
                      <div className="text-slate-600 font-medium text-sm">
                        Architecting workflow...
                      </div>
                      <div className="text-slate-400 text-xs mt-2">
                        Analyzing tools & dependencies
                      </div>
                    </div>
                  )}

                  {state === DemoState.SUCCESS && (
                    <div className="p-3 space-y-2">
                      {steps.map((s, i) => {
                        const active = i === activeIndex;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            className={`w-full text-left rounded-xl border transition-all p-3 flex items-start gap-3 relative overflow-hidden group
                              ${
                                active
                                  ? "bg-white border-primary-200 shadow-md shadow-primary-900/5 ring-1 ring-primary-100"
                                  : "bg-white/40 border-slate-200/60 hover:bg-white hover:border-slate-300 hover:shadow-sm"
                              }`}
                          >
                             {/* Active Indicator Bar */}
                             {active && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500" />
                             )}

                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                                active
                                  ? "bg-primary-100 text-primary-700"
                                  : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                              }`}
                            >
                              {s.step}
                            </div>
                            <div className="min-w-0 flex-1 py-0.5">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className={`font-bold text-sm truncate ${active ? "text-slate-900" : "text-slate-700"}`}>
                                  {s.title}
                                </div>
                              </div>
                              <StepPill label={s.tool} />
                            </div>
                            {active && <ChevronRight className="w-4 h-4 text-primary-300 absolute right-3 top-1/2 -translate-y-1/2" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Col: Step Details */}
                <div className="bg-white overflow-y-auto p-6 md:p-8 flex flex-col h-full">
                  {state !== DemoState.SUCCESS ? (
                    <div className="flex-1 flex items-center justify-center text-center opacity-40">
                      <Layers className="w-12 h-12 text-slate-300" />
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {activeStep && (
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col h-full"
                        >
                          {/* Detail Header */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-1 rounded">
                                Step {activeStep.step}
                              </span>
                              <div className="flex gap-2">
                                <span className="text-xs font-mono text-slate-400">
                                  ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                              {activeStep.title}
                            </h3>
                          </div>

                          {/* Detail Content */}
                          <div className="space-y-6 flex-1">
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Action Description
                              </h4>
                              <p className="text-slate-700 text-sm leading-relaxed">
                                {activeStep.description}
                              </p>
                            </div>

                            <div>
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                Implementation Notes
                              </h4>
                              <ul className="space-y-2">
                                {[
                                  `Configure ${activeStep.tool} API authentication`,
                                  "Set up error handling and retry logic (3x exp backoff)",
                                  "Log transaction ID for observability"
                                ].map((note, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Navigation Controls */}
                          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
                              disabled={activeIndex === 0}
                              className="text-sm font-medium text-slate-500 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
                            >
                              Previous Step
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setActiveIndex((i) => Math.min(steps.length - 1, i + 1))}
                              disabled={activeIndex === steps.length - 1}
                              className="group flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              Next Step
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};