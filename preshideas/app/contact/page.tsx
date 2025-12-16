"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Briefcase,
  FileText,
  Check,
  Copy,
  MapPin,
  ArrowRight,
} from "lucide-react";

// --- Utility Components ---

const GridPattern = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
    style={{
      backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}
  />
);

const CopyableEmail = ({
  email,
  label,
  icon: Icon,
  dark = false,
}: {
  email: string;
  label: string;
  icon: any;
  dark?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`p-8 rounded-3xl relative overflow-hidden group transition-all duration-300 ${
        dark ? "bg-[#0a0a0a] text-white" : "bg-white border border-gray-200 hover:border-[#0a0a0a]"
      }`}
    >
      {dark && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e635] rounded-bl-[100%] -mr-8 -mt-8 opacity-20 blur-xl transition-transform group-hover:scale-125 duration-700" />
      )}
      
      <div className="flex justify-between items-start mb-4">
        <Icon className={dark ? "text-[#a3e635]" : "text-[#0a0a0a]"} size={28} />
        <button
          onClick={handleCopy}
          className={`p-2 rounded-full transition-colors ${
            dark ? "hover:bg-white/10" : "hover:bg-gray-100"
          }`}
          title="Copy email"
        >
          {copied ? (
            <Check size={18} className="text-[#a3e635]" />
          ) : (
            <Copy size={18} className={dark ? "text-gray-400" : "text-gray-500"} />
          )}
        </button>
      </div>
      
      <h4 className={`font-bold text-lg mb-1 ${dark ? "text-[#a3e635]" : "text-[#0a0a0a]"}`}>
        {label}
      </h4>
      <a
        href={`mailto:${email}`}
        className={`text-lg md:text-xl font-medium hover:underline underline-offset-4 break-words ${
          dark ? "text-white" : "text-[#0a0a0a]"
        }`}
      >
        {email}
      </a>
    </div>
  );
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="space-y-2 group">
    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide transition-colors group-focus-within:text-black">
      {label} {required && <span className="text-[#a3e635]">*</span>}
    </label>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#f8f8f8] border border-transparent text-black rounded-xl p-4 focus:outline-none focus:bg-white focus:border-[#0a0a0a] focus:ring-0 transition-all placeholder-gray-400 font-medium"
    />
  </div>
);

const SelectField = ({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) => (
  <div className="space-y-2 group">
    <label className="text-sm font-bold text-gray-700 uppercase tracking-wide transition-colors group-focus-within:text-black">
      {label} {required && <span className="text-[#a3e635]">*</span>}
    </label>
    <div className="relative">
      <select
        required={required}
        defaultValue=""
        className="w-full bg-[#f8f8f8] border border-transparent text-black rounded-xl p-4 pr-10 appearance-none focus:outline-none focus:bg-white focus:border-[#0a0a0a] focus:ring-0 transition-all cursor-pointer font-medium"
      >
        <option value="" disabled>
          Select an option...
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>
);

// --- Main Component ---

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const locations = [
    { city: "Lagos, Nigeria", address: "Iponri, Surulere", region: "West Africa" },
    { city: "Lagos, Nigeria", address: "Mainland Operations", region: "West Africa" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const services = [
    "Content Strategy & Production",
    "Technical SEO & Optimization",
    "Digital PR & Thought Leadership",
    "Marketing Funnel Development",
    "Workflow Automation & AI",
    "Social Authority Growth",
  ];

  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans selection:bg-[#a3e635] selection:text-black">
      <section className="relative pt-32 pb-20 overflow-hidden" id="contact">
        <GridPattern />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Header Section */}
          <motion.div
            className="max-w-4xl mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"/>
              <span className="text-xs font-bold tracking-wider uppercase text-gray-800">
                Contact Us
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[#0a0a0a] mb-8 leading-[0.95]">
              Let’s Build Your <br />
              <span className="relative inline-block">
                Next Chapter
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#a3e635]" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl font-light">
              We partner with brands seeking clarity, consistency, and measurable growth. 
              Ready to scale your content, SEO, or digital systems?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            {/* Left Column: Content Info */}
            <motion.div
              className="lg:col-span-7 space-y-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Contact Cards */}
              <section className="grid md:grid-cols-2 gap-6">
                <CopyableEmail 
                  email="info@preshideas.com" 
                  label="General Inquiries" 
                  icon={Mail} 
                  dark 
                />
                <CopyableEmail 
                  email="hello@preshideas.com" 
                  label="New Projects" 
                  icon={FileText} 
                />
                
                <div className="md:col-span-2 flex items-center gap-3 text-sm font-medium text-gray-500 bg-white/50 w-fit px-4 py-2 rounded-full border border-gray-200/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  Response time: Typically within 24–48 hours.
                </div>
              </section>

              {/* Services Section */}
              <section>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#0a0a0a]">
                  <Briefcase className="text-[#a3e635]" size={24} strokeWidth={3} />
                  How We Drive Growth
                </h3>
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200 hover:border-gray-300 transition-colors">
                  <p className="text-gray-600 mb-8 text-lg max-w-2xl">
                    Whether you need a long-term content partner or automated systems that remove manual work, we have the expertise.
                  </p>
                  <div className="grid md:grid-cols-2 gap-y-4 gap-x-8">
                    {services.map((item) => (
                      <div key={item} className="flex items-start gap-3 group">
                        <div className="mt-1.5 w-5 h-5 rounded-full bg-[#f4f4f4] flex items-center justify-center shrink-0 group-hover:bg-[#a3e635] transition-colors">
                            <Check size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-gray-700 font-medium group-hover:text-black transition-colors">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Process Section */}
              <section>
                <h3 className="text-2xl font-bold mb-10 text-[#0a0a0a]">
                  What Happens Next
                </h3>
                <div className="relative border-l-2 border-gray-200 ml-4 space-y-12 pb-2">
                  {[
                    {
                      title: "Review & Analysis",
                      desc: "Our team assesses your goals and determines the best strategic fit.",
                    },
                    {
                      title: "Discovery Session",
                      desc: "A focused 20-minute call to align on needs and project direction.",
                    },
                    {
                      title: "Proposal & Roadmap",
                      desc: "You receive a clear strategy, timeline, and pricing breakdown.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="relative pl-12 group">
                        {/* Timeline Dot */}
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-300 group-hover:border-[#a3e635] group-hover:scale-125 transition-all duration-300" />
                      
                      <h4 className="font-bold text-xl text-[#0a0a0a] mb-2 group-hover:text-[#a3e635] transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>

            {/* Right Column: Form (Sticky) */}
            <motion.div
              className="lg:col-span-5 sticky top-8 z-20"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden">
                {/* Decorative top gradient */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#a3e635] via-green-400 to-[#a3e635]" />

                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-3 text-[#0a0a0a] tracking-tight">
                    Start a Conversation
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base">
                    Tell us about your project. We usually spot opportunities others miss.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, filter: "blur(10px)" }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="First Name" placeholder="Jane" required />
                        <InputField label="Last Name" placeholder="Doe" required />
                      </div>

                      <InputField
                        label="Work Email"
                        placeholder="jane@company.com"
                        type="email"
                        required
                      />
                      
                      <SelectField
                        label="Service Interest"
                        options={services}
                        required
                      />

                      <div className="space-y-2 group">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-wide transition-colors group-focus-within:text-black">
                          Project Details *
                        </label>
                        <textarea
                          rows={4}
                          required
                          className="w-full bg-[#f8f8f8] border border-transparent text-black rounded-xl p-4 focus:outline-none focus:bg-white focus:border-[#0a0a0a] focus:ring-0 transition-all resize-none placeholder-gray-400 font-medium"
                          placeholder="What are your main goals and challenges?"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0a0a0a] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#a3e635] hover:text-black transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                      >
                         <span className="relative z-10 flex items-center gap-2">
                            {isSubmitting ? (
                            <>
                                Sending... <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                            </>
                            ) : (
                            <>
                                Send Message <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                            )}
                         </span>
                      </button>
                      
                      <p className="text-xs text-center text-gray-400 mt-4">
                        Protected by reCAPTCHA and the Google Privacy Policy.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-24 h-24 bg-[#a3e635] rounded-full flex items-center justify-center text-black shadow-lg shadow-green-200"
                      >
                        <CheckCircle2 size={48} strokeWidth={2.5} />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-[#0a0a0a] mb-3">
                          Received!
                        </h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                          We've got your details. Expect an email from our team regarding the next steps within 24 hours.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 px-6 py-2 rounded-full border border-gray-200 text-sm font-bold hover:bg-black hover:text-white transition-colors"
                      >
                        Send another request
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="bg-white py-24 border-t border-gray-200 relative">
        <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <motion.h2 
                    className="text-4xl md:text-5xl font-bold text-[#0a0a0a] tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Global <span className="text-gray-300">/</span> Local
                </motion.h2>
                <p className="text-gray-500 max-w-md">
                    Operating remotely with strategic hubs to serve clients across West Africa, Europe, and North America.
                </p>
            </div>

          <div className="border-t border-gray-200">
            {locations.map((loc, index) => (
              <motion.div
                key={loc.address}
                className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-gray-200 cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4 md:gap-8 transition-transform duration-500 group-hover:translate-x-4">
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#f4f4f4] text-gray-400 group-hover:bg-[#a3e635] group-hover:text-black transition-colors">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <h3 className="text-3xl md:text-5xl font-bold text-[#0a0a0a] mb-2">
                        {loc.city}
                        </h3>
                        <p className="text-gray-500 text-lg flex items-center gap-2">
                            {loc.address} 
                            <span className="w-1 h-1 rounded-full bg-gray-300" /> 
                            {loc.region}
                        </p>
                    </div>
                </div>
                
                <div className="mt-6 md:mt-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-2 text-[#0a0a0a] font-bold">
                    View on Map <ArrowRight size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;