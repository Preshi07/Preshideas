"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, PenTool, BarChart3, Briefcase, Users, FileText, Target } from "lucide-react";

// --- CONSTANTS ---
const BRAND_GRADIENT_TEXT = "text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";
const BRAND_GRADIENT_BG = "bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";

// --- DATA ---
const B2B_SERVICES = [
  {
    title: "Brand Strategy",
    description: "Defining your position in the market to differentiate and dominate.",
    icon: <Target className="w-6 h-6" />,
    tags: ["Positioning", "Value Prop", "Market Analysis"]
  },
  {
    title: "Content Marketing",
    description: "Educational content that nurtures leads and builds authority.",
    icon: <FileText className="w-6 h-6" />,
    tags: ["Whitepapers", "Blog Strategy", "Case Studies"]
  },
  {
    title: "Lead Generation",
    description: "Systems designed to capture high-intent prospects at scale.",
    icon: <Users className="w-6 h-6" />,
    tags: ["Funnel Design", "CRO", "Email Automation"]
  },
  {
    title: "Thought Leadership",
    description: "Elevating your executives into industry voices that matter.",
    icon: <PenTool className="w-6 h-6" />,
    tags: ["LinkedIn Growth", "Ghostwriting", "PR Strategy"]
  }
];

const B2B_CASE_STUDIES = [
  { name: "TechNova", result: "300% Pipeline Growth", category: "SaaS", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" },
  { name: "LogiChain", result: "$5M Revenue Influence", category: "Logistics", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80" },
  { name: "MediCore", result: "#1 in Healthcare IT", category: "HealthTech", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
  { name: "FinServe", result: "2x Retention Rate", category: "Fintech", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" }
];

// --- COMPONENTS ---

// 1. KINETIC HERO (B2B Focus)
const B2BHero = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 bg-white overflow-hidden pt-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-[#00C96D]/10 via-[#00B5D1]/10 to-[#2D79FF]/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[11vw] sm:text-[9vw] leading-[0.85] font-black tracking-tighter text-gray-900 mb-8">
            <span className="block">BUILD</span>
            <span className={`block pl-[5vw] ${BRAND_GRADIENT_TEXT}`}>
              TRUST
            </span>
            <span className="block text-right">CLOSE</span>
            <span className="block text-right pr-[5vw] text-gray-300">DEALS</span>
          </h1>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end mt-12 md:mt-0 border-t border-gray-200 pt-8">
          <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed">
            We turn complex B2B propositions into compelling narratives that drive revenue.
            Strategy, Content, and Growth.
          </p>
          <div className="animate-bounce mt-8 md:mt-0">
            <ArrowDown className="w-8 h-8 text-[#00B5D1]" />
          </div>
        </div>
      </div>
    </section>
  );
};

// 2. SHOWREEL / OFFICE PREVIEW
const OfficePreview = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group bg-[#0F1115]">
      <div className="absolute inset-0 opacity-70 group-hover:opacity-50 transition-opacity duration-700">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          alt="B2B Strategy Meeting"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative group/play cursor-pointer">
          <div className="absolute inset-0 bg-[#2D79FF]/30 blur-xl rounded-full scale-150 animate-pulse" />
          <div className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center gap-3 transition-transform duration-500 group-hover/play:scale-105">
            <Briefcase className="w-5 h-5 text-white" />
            <span className="text-white font-mono font-bold tracking-widest uppercase">The Playbook</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-8 text-white">
        <p className="text-sm font-bold tracking-widest uppercase text-[#2D79FF]">Strategic Partnership</p>
      </div>
    </div>
  );
};

// 3. EXPERTISE SECTION (Interactive Boardroom)
const B2BServices = () => {
  const [active, setActive] = useState(0);

  // Custom Visuals
  const renderVisual = (index: number) => {
    switch (index) {
      case 0: // Strategy (Target)
        return (
          <div className="w-full h-full flex items-center justify-center relative">
            {[100, 200, 300].map((size, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2, type: "spring" }}
                className="absolute border border-[#00B5D1]/30 rounded-full"
                style={{ width: size, height: size }}
              />
            ))}
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              className={`w-4 h-4 rounded-full ${BRAND_GRADIENT_BG} shadow-[0_0_30px_#00B5D1]`} 
            />
            <div className="absolute top-1/2 left-1/2 w-[1px] h-[150px] bg-gradient-to-b from-[#00B5D1] to-transparent -translate-x-1/2 -translate-y-1/2 origin-bottom rotate-45" />
          </div>
        );
      case 1: // Content (Documents)
        return (
          <div className="w-full h-full flex items-center justify-center relative perspective-1000">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 50, opacity: 0, rotateX: 20 }}
                animate={{ y: i * -20, opacity: 1 - i * 0.2, rotateX: 20 }}
                transition={{ delay: i * 0.1 }}
                className="absolute w-48 h-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl p-4 flex flex-col gap-2"
                style={{ zIndex: 3 - i }}
              >
                <div className="w-3/4 h-2 bg-white/20 rounded" />
                <div className="w-full h-2 bg-white/10 rounded" />
                <div className="w-full h-2 bg-white/10 rounded" />
                <div className="w-1/2 h-2 bg-white/10 rounded" />
              </motion.div>
            ))}
          </div>
        );
      case 2: // Lead Gen (Funnel)
        return (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
            {[80, 60, 40, 20].map((w, i) => (
              <motion.div
                key={i}
                initial={{ width: "0%" }}
                animate={{ width: `${w}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`h-12 rounded-lg ${BRAND_GRADIENT_BG} opacity-${90 - i * 20} flex items-center justify-center`}
              >
                <span className="text-white/50 text-xs font-mono">{100 - i * 25}%</span>
              </motion.div>
            ))}
          </div>
        );
      case 3: // Thought Leadership (Quote)
        return (
          <div className="w-full h-full flex items-center justify-center p-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl relative"
            >
              <div className="absolute -top-4 -left-4 text-6xl text-[#2D79FF] opacity-50">"</div>
              <p className="text-white/80 text-lg font-light leading-relaxed italic">
                Influence isn't just about reach. It's about resonance. We help leaders speak with clarity.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-600" />
                <div className="h-2 w-24 bg-gray-700 rounded" />
              </div>
            </motion.div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20 max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-gray-900 leading-[0.9]">
            Scale With <br/>
            <span className={BRAND_GRADIENT_TEXT}>Authority.</span>
          </h2>
          <p className="text-xl text-gray-500 leading-relaxed">
            B2B marketing doesn't have to be boring. We bring consumer-grade creativity to corporate strategy.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24">
          
          {/* LEFT: Visual */}
          <div className="hidden lg:block relative h-[600px] sticky top-32">
            <div className="w-full h-full rounded-[3rem] bg-[#0A0A0A] overflow-hidden relative shadow-2xl border border-gray-800 flex items-center justify-center">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#2D79FF]/10 blur-[120px] rounded-full" />
              <div className="relative z-10 w-full h-full p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    {renderVisual(active)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: List */}
          <div className="flex flex-col justify-center gap-6">
            {B2B_SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setActive(idx)}
                className={`group relative p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                  active === idx 
                    ? "bg-white border-transparent shadow-2xl shadow-blue-900/5 scale-[1.02]" 
                    : "bg-transparent border-gray-200 hover:bg-gray-50"
                }`}
              >
                {active === idx && <div className={`absolute inset-0 rounded-3xl p-[2px] ${BRAND_GRADIENT_BG} -z-10`} />}
                <div className={`absolute inset-0 rounded-3xl bg-white ${active === idx ? "m-[2px]" : ""}`} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl transition-colors ${
                      active === idx ? "bg-[#2D79FF]/10 text-[#2D79FF]" : "bg-gray-100 text-gray-500"
                    }`}>
                      {service.icon}
                    </div>
                    <ArrowUpRight className={`w-6 h-6 transition-transform ${
                      active === idx ? "rotate-45 text-[#2D79FF]" : "text-gray-300"
                    }`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${active === idx ? "text-gray-900" : "text-gray-700"}`}>{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-lg">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// 4. SELECTED WORKS (B2B Case Studies)
// 4. ENHANCED GROWTH STORIES (Asymmetrical Parallax Grid)
const B2BWorks = () => {
  return (
    <section className="py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <h2 className="text-[10vw] md:text-[7vw] font-bold leading-[0.8] tracking-tighter">
            GROWTH <br /> 
            <span className={BRAND_GRADIENT_TEXT}>STORIES</span>
          </h2>
          <div className="mt-8 md:mt-0 flex flex-col items-end">
            <p className="text-gray-400 max-w-xs text-right text-lg font-light">
              We don't deal in vanity metrics. <br/>
              We deal in <span className="text-white font-semibold">revenue</span>.
            </p>
            <div className="h-px w-24 bg-white/20 mt-6" />
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Item 1 (Large - 7 cols) */}
          <CaseStudyCard 
            colSpan="md:col-span-7"
            client="TechNova"
            category="SaaS / Enterprise"
            metric="300%"
            metricLabel="Pipeline Growth"
            image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            year="2024"
          />

          {/* Item 2 (Small - 5 cols) */}
          <CaseStudyCard 
            colSpan="md:col-span-5"
            client="LogiChain"
            category="Global Logistics"
            metric="$5.2M"
            metricLabel="Revenue Attributed"
            image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
            year="2023"
          />

          {/* Item 3 (Small - 5 cols) */}
          <CaseStudyCard 
            colSpan="md:col-span-5"
            client="MediCore"
            category="HealthTech"
            metric="#1"
            metricLabel="Market Share"
            image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
            year="2024"
          />

          {/* Item 4 (Large - 7 cols) */}
          <CaseStudyCard 
            colSpan="md:col-span-7"
            client="FinServe"
            category="Fintech"
            metric="2x"
            metricLabel="Retention Rate"
            image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
            year="2023"
          />

        </div>
      </div>
    </section>
  );
};

// Helper Component for Individual Cards
const CaseStudyCard = ({ colSpan, client, category, metric, metricLabel, image, year }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // Parallax Effect for Image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={ref}
      className={`${colSpan} group relative h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden cursor-pointer`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div style={{ y, scale: 1.1 }} className="w-full h-full relative">
          <Image
            src={image}
            alt={client}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale"
          />
        </motion.div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
        
        {/* Top Row */}
        <div className="flex justify-between items-start">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-sm font-medium tracking-wide">{year} Case Study</span>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
            <ArrowUpRight className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Bottom Info */}
        <div>
          {/* Metric (The Hero) */}
          <div className="overflow-hidden mb-2">
            <motion.h3 
              className={`text-6xl md:text-8xl font-bold tracking-tighter ${BRAND_GRADIENT_TEXT} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`}
            >
              {metric}
            </motion.h3>
          </div>
          
          <div className="h-px w-full bg-white/20 mb-6 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />

          <div className="flex justify-between items-end">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">{category}</p>
              <h4 className="text-3xl font-bold text-white">{client}</h4>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Impact</p>
              <p className="text-xl font-medium text-white">{metricLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// 5. RESPONSIVE PROCESS TIMELINE (Vertical Stack on Mobile)
const Process = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  // Transform for Desktop Horizontal Scroll only
  // We use a conditional check inside the style prop or just rely on CSS media queries to disable the transform effect if needed, 
  // but framer motion's useScroll is JS based. 
  // A cleaner way for responsive framer motion is to only apply the style on desktop.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative md:h-[300vh] bg-white py-24 md:py-0">
      
      <div className="md:sticky md:top-0 md:h-screen md:flex md:items-center md:overflow-hidden">
        
        {/* Container: Vertical Flex on Mobile, Horizontal Motion on Desktop */}
        <div className="md:hidden flex flex-col gap-12 px-6">
           {/* Mobile Header */}
           <div>
              <h2 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">Our Framework</h2>
              <p className="text-lg text-gray-600">From audit to automation, we build systems that generate revenue on autopilot.</p>
           </div>
           
           {/* Mobile Stacked Cards */}
           {[
              { step: "01", title: "Audit & Insight", desc: "Analyzing your market position and competitor gaps." },
              { step: "02", title: "Strategy", desc: "Developing a clear roadmap for content and conversion." },
              { step: "03", title: "Execution", desc: "Producing high-level assets and launching campaigns." },
              { step: "04", title: "Optimization", desc: "Refining based on data to maximize ROI." },
            ].map((item, i) => (
              <div key={i} className="w-full aspect-[4/5] bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between border border-gray-100 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-48 h-48 ${BRAND_GRADIENT_BG} opacity-5 blur-[60px] rounded-full`} />
                <span className="text-6xl font-bold text-gray-200">{item.step}</span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
           ))}
        </div>

        {/* Desktop View (Horizontal Scroll) */}
        <motion.div 
          style={{ x }} 
          className="hidden md:flex gap-16 px-16"
        >
          {/* Header Card */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
            <h2 className="text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Our Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-md">
              From audit to automation, we build systems that generate revenue on autopilot.
            </p>
          </div>

          {/* Desktop Cards */}
          {[
            { step: "01", title: "Audit & Insight", desc: "Analyzing your market position and competitor gaps." },
            { step: "02", title: "Strategy", desc: "Developing a clear roadmap for content and conversion." },
            { step: "03", title: "Execution", desc: "Producing high-level assets and launching campaigns." },
            { step: "04", title: "Optimization", desc: "Refining based on data to maximize ROI." },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[35vw] h-[60vh] bg-gray-50 rounded-[3rem] p-12 flex flex-col justify-between border border-gray-100 relative overflow-hidden group hover:border-[#2D79FF]/30 transition-colors"
            >
              <div className={`absolute top-0 right-0 w-64 h-64 ${BRAND_GRADIENT_BG} opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-500`} />
              <span className="text-8xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                {item.step}
              </span>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-4 group-hover:text-[#2D79FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
const B2BPageLayout = () => {
  return (
    <main className="bg-white text-gray-900 selection:bg-[#2D79FF]/20 selection:text-[#005f73]">
      <B2BHero />
      <OfficePreview />
      <div className="h-24" /> 
      <B2BServices />
      <B2BWorks />
      <Process />
      
      {/* Footer CTA */}
      <section className="py-32 px-6 text-center bg-gray-50 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-5 ${BRAND_GRADIENT_BG}`} />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
            Ready to scale <br /> your pipeline?
          </h2>
          <button className={`px-10 py-5 ${BRAND_GRADIENT_BG} text-white text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-blue-500/20`}>
            Book a Consultation
          </button>
        </div>
      </section>
    </main>
  );
};

export default B2BPageLayout;