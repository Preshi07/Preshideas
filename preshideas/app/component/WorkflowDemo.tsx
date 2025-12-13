"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateWorkflow } from '../../services/geminiService';
import { WorkflowStep, DemoState } from '../../types';

const WordReveal: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <motion.p 
      className="text-slate-600 text-xs mt-1 leading-relaxed"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { 
          transition: { staggerChildren: 0.02, delayChildren: delay } 
        }
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 2 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

export const WorkflowDemo: React.FC = () => {
  const [email, setEmail] = useState('');
  const [input, setInput] = useState('');
  const [state, setState] = useState<DemoState>(DemoState.IDLE);
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [emailError, setEmailError] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    if (!email.trim() || !email.includes('@')) {
      setEmailError(true);
      return;
    }
    
    setEmailError(false);
    setState(DemoState.LOADING);
    
    try {
      const result = await generateWorkflow(input);
      setSteps(result);
      setState(DemoState.SUCCESS);
    } catch (e) {
      setState(DemoState.ERROR);
    }
  };

  return (
    <section id="workflows" className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Context */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Intelligent Workflows</h2>
          <p className="text-slate-600 mb-8 text-lg">
            Stop building manually. Describe a business process, and our AI architect will map out the optimal automation logic instantly.
          </p>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl shadow-slate-200/50">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work Email <span className="text-slate-400 font-normal">(Required to save workflow)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(false);
                  }}
                  placeholder="name@company.com"
                  className={`w-full bg-white border ${emailError ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200'} rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all placeholder:text-slate-400`}
                />
                {emailError && <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What do you want to automate?
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. Onboard a new client from Stripe payment"
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all placeholder:text-slate-400"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={state === DemoState.LOADING}
                    className="bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-md sm:w-auto w-full"
                  >
                    {state === DemoState.LOADING ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <span>Generate</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="relative min-h-[400px] bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center overflow-hidden shadow-lg shadow-slate-200/40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/50 via-white to-white pointer-events-none" />
          
          {state === DemoState.IDLE && (
            <div className="text-center text-slate-400">
              <div className="mb-4 mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
                <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <p>Enter your details to generate a workflow...</p>
            </div>
          )}

          <div className="w-full max-w-md relative z-10 space-y-4">
            <AnimatePresence>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                >
                   {/* Connector Line */}
                  {index > 0 && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 24 }} 
                      transition={{ duration: 0.3, delay: (index * 0.15) - 0.1 }}
                      className="w-0.5 bg-slate-300 mx-auto my-1" 
                    />
                  )}
                  
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:border-primary-500/50 shadow-sm transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-mono font-bold text-primary-600 shrink-0 group-hover:bg-primary-50 transition-colors">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                        {step.title}
                        <span className="text-[10px] uppercase bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono border border-slate-200">
                          {step.tool}
                        </span>
                      </h4>
                      {/* Use WordReveal for the description to simulate generation */}
                      <WordReveal text={step.description} delay={0.2 + (index * 0.1)} />
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