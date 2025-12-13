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
} from "lucide-react";
import { generateWorkflow } from "../../services/geminiService";
import { WorkflowStep, DemoState } from "../../types";

// Word reveal animation component
const WordReveal: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const words = text.split(" ");
  return (
    <motion.p
      className="text-slate-600 text-xs mt-1 leading-relaxed"
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

// Email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Quick example suggestions
const exampleTasks = [
  "Onboard a new client from Stripe payment",
  "Process customer support tickets and route to teams",
  "Generate weekly sales reports from CRM data",
  "Monitor social media mentions and alert marketing team",
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

  // Auto-hide success messages
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

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!input.trim()) {
      setInputError("Please describe what you want to automate");
      isValid = false;
    } else if (input.trim().length < 10) {
      setInputError("Please provide more details (at least 10 characters)");
      isValid = false;
    } else {
      setInputError("");
    }

    return isValid;
  };

  const handleGenerate = async () => {
    if (!validateInputs()) return;

    setState(DemoState.LOADING);
    setSteps([]);

    try {
      const result = await generateWorkflow(input);
      setSteps(result);
      setState(DemoState.SUCCESS);

      // Auto-save indication
      setTimeout(() => setSaved(true), 500);
    } catch (error) {
      setState(DemoState.ERROR);
      console.error("Generation failed:", error);
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
    const workflowText = steps
      .map(
        (step) =>
          `${step.step}. ${step.title} (${step.tool})\n   ${step.description}`
      )
      .join("\n\n");

    navigator.clipboard.writeText(workflowText);
    setCopied(true);
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(
      { email, task: input, workflow: steps },
      null,
      2
    );
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `workflow-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const useExampleTask = (task: string) => {
    setInput(task);
    setInputError("");
  };

  return (
    <section
      id="workflows"
      className="py-16 bg-slate-50 border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Input Form */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary-600" />
            <h2 className="text-3xl font-bold text-slate-900">
              Intelligent Workflows
            </h2>
          </div>

          <p className="text-slate-600 mb-6 text-lg">
            Stop building manually. Describe a business process, and our AI
            architect will map out the optimal automation logic instantly.
          </p>

          {/* Quick Examples */}
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-700 mb-2">
              Try an example:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleTasks.map((task, idx) => (
                <button
                  key={idx}
                  onClick={() => useExampleTask(task)}
                  className="text-xs bg-white border border-slate-200 hover:border-primary-500 hover:bg-primary-50 text-slate-700 px-3 py-1.5 rounded-full transition-all"
                >
                  {task}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work Email <span className="text-red-500">*</span>
                  <span className="text-slate-400 font-normal ml-2">
                    (to save your workflow)
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="name@company.com"
                  className={`w-full bg-white border ${
                    emailError
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-slate-200"
                  } rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all placeholder:text-slate-400`}
                />
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {emailError}
                  </motion.p>
                )}
              </div>

              {/* Task Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What do you want to automate?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (inputError) setInputError("");
                  }}
                  placeholder="e.g., When a customer signs up, send a welcome email, create a CRM entry, and notify the sales team"
                  rows={3}
                  className={`w-full bg-white border ${
                    inputError
                      ? "border-red-400 ring-2 ring-red-100"
                      : "border-slate-200"
                  } rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all placeholder:text-slate-400 resize-none`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.metaKey) handleGenerate();
                  }}
                />
                {inputError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {inputError}
                  </motion.p>
                )}
                <p className="text-xs text-slate-400 mt-1.5">
                  Press Cmd+Enter to generate
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleGenerate}
                  disabled={state === DemoState.LOADING}
                  className="flex-1 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  {state === DemoState.LOADING ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Workflow
                    </>
                  )}
                </button>

                {steps.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg font-semibold transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {saved && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Workflow saved to {email}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow Visualization */}
        <div className="relative min-h-[500px] bg-white rounded-2xl border border-slate-200 p-8 flex flex-col overflow-hidden shadow-lg shadow-slate-200/40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-white to-white pointer-events-none" />

          {/* Export Actions */}
          {steps.length > 0 && state === DemoState.SUCCESS && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 flex gap-2 mb-4"
            >
              <button
                onClick={handleCopyWorkflow}
                className="flex items-center gap-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-all border border-slate-200"
              >
                {copied ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                onClick={handleDownloadJSON}
                className="flex items-center gap-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-all border border-slate-200"
              >
                <Download className="w-3 h-3" />
                Export JSON
              </button>
            </motion.div>
          )}

          {/* Idle State */}
          {state === DemoState.IDLE && (
            <div className="flex-1 flex items-center justify-center text-center text-slate-400 relative z-10">
              <div>
                <div className="mb-4 mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                  <svg
                    className="w-8 h-8 opacity-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <p className="font-medium">Ready to generate your workflow</p>
                <p className="text-sm mt-1">Fill in the form to get started</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {state === DemoState.ERROR && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center text-center relative z-10"
            >
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold text-red-900 mb-2">
                  Generation Failed
                </h3>
                <p className="text-sm text-red-700 mb-4">
                  We couldn't generate your workflow. Please try again or try a
                  different description.
                </p>
                <button
                  onClick={handleReset}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}

          {/* Workflow Steps */}
          <div className="flex-1 w-full max-w-md mx-auto relative z-10 space-y-4">
            <AnimatePresence>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                  {/* Connector Line */}
                  {index > 0 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 24 }}
                      transition={{ duration: 0.3, delay: index * 0.15 - 0.1 }}
                      className="w-0.5 bg-gradient-to-b from-slate-300 to-slate-200 mx-auto my-1"
                    />
                  )}

                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:border-primary-500/50 hover:shadow-md shadow-sm transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm flex items-start gap-2 mb-1">
                        <span className="flex-1">{step.title}</span>
                      </h4>
                      <span className="inline-block text-[10px] uppercase bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-mono border border-slate-200 mb-2">
                        {step.tool}
                      </span>
                      <WordReveal
                        text={step.description}
                        delay={0.2 + index * 0.1}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
