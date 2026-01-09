"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Users, ShieldCheck, BarChart3 } from "lucide-react";

// --- Data ---
const logos = [
  { src: "/logos/ecosatisfaction.png", alt: "Ecosatisfaction" },
  { src: "/logos/capitalone.png", alt: "Capital One" },
  { src: "/logos/redbull.png", alt: "Red Bull" },
  { src: "/logos/jd.png", alt: "JD" },
  { src: "/logos/kroger.png", alt: "Kroger" },
  { src: "/logos/hubspot.png", alt: "HubSpot" },
];

const stats = [
  { 
    value: "98%", 
    label: "faster time to market", 
    icon: Zap, 
    // Teal/Cyan
    color: "text-[#00B5D1]", 
    bg: "bg-[#00B5D1]/10" 
  },
  { 
    value: "300%", 
    label: "increase in SEO traffic", 
    icon: BarChart3, 
    // Blue
    color: "text-[#2D79FF]", 
    bg: "bg-[#2D79FF]/10" 
  },
  { 
    value: "6x", 
    label: "deployment efficiency", 
    icon: Sparkles, 
    // Green
    color: "text-[#00C96D]", 
    bg: "bg-[#00C96D]/10" 
  },
];

// --- Components ---

const LogoTicker = () => {
  return (
    <div className="relative w-full overflow-hidden mask-gradient-x py-10">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        className="flex gap-16 w-max"
        animate={{ x: "-50%" }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="relative h-12 w-32 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-pointer"
          >
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function BrandSlider() {
  return (
    <div className="bg-background min-h-screen relative overflow-hidden font-sans selection:bg-[#00C96D]/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#00000005_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 py-24 relative z-10">
        
        {/* --- Hero Section --- */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C96D]/5 border border-[#00C96D]/20 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C96D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C96D]"></span>
              </span>
              <span className="text-xs font-medium text-[#00C96D] uppercase tracking-wide">
                Powering Modern Brands
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Building Smarter <br />
              {/* BRAND GRADIENT */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]">
                Digital Systems
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              From content and SEO to automation and AI — we help you grow faster, 
              sharper, and smarter. Because great ideas deserve execution to match.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-[#000] text-white font-semibold text-sm hover:opacity-90 transition-all shadow-xl shadow-[#00C96D]/20 flex items-center gap-2"
              >
                Start your Project
                <ArrowRight className="w-4 h-4" />
              </motion.button> */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full border border-border bg-background/50 backdrop-blur-sm font-semibold text-sm hover:bg-muted transition-all"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>

          {/* --- Right Side: Floating Stats --- */}
          <div className="flex flex-col gap-5">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- Logo Ticker --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32 space-y-8"
        >
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Trusted by Industry Leaders
          </p>
          <LogoTicker />
        </motion.div>

        {/* --- Bottom Bento Grid --- */}
        <div className="border-t border-border pt-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Feature */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full flex flex-col justify-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00C96D] to-[#00B5D1] flex items-center justify-center mb-6 shadow-lg shadow-[#00C96D]/20">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Enterprise Grade <br/>Reliability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The platform for rapid progress. Let your team focus on shipping 
                  features instead of managing infrastructure with automated CI/CD 
                  and built-in testing.
                </p>
              </motion.div>
            </div>

            {/* Feature Cards */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#00C96D]/20 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2D79FF]" />
                  Seamless Teamwork
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Built-in comments, preview deployments, and slack notifications keep everyone aligned.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#00C96D]/20 transition-all"
              >
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#00C96D]" />
                  Instant Rollbacks
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ship with total confidence. If something breaks, revert to a stable state in milliseconds.
                </p>
              </motion.div>
              
              <div className="sm:col-span-2 p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B5D1]/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-[#00C96D]/20" />
                <div className="relative z-10 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Global Edge Network</h3>
                    <p className="text-slate-400 text-sm max-w-md">
                      Your content is cached and served from 35+ regions worldwide, ensuring <span className="text-[#00C96D]">sub-50ms</span> latency for every user.
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}