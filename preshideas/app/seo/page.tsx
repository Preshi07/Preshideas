"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Search,
  BarChart3,
  Globe,
  Zap,
} from "lucide-react";

// --- CONSTANTS ---
// Matches the Green -> Cyan -> Blue gradient
const BRAND_GRADIENT_TEXT =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";
const BRAND_GRADIENT_BG =
  "bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";

// --- TYPES ---
interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactElement; // Explicitly typed as ReactElement
  tags: string[];
}

// --- DATA ---
const SEO_SERVICES: ServiceItem[] = [
  {
    title: "Technical SEO",
    description:
      "Optimizing site architecture, speed, and crawlability for maximum indexation.",
    icon: <Zap className="w-6 h-6" />,
    tags: ["Core Web Vitals", "Schema Markup", "Site Audits"],
  },
  {
    title: "Content Strategy",
    description:
      "Data-driven content that answers user intent and builds topical authority.",
    icon: <Search className="w-6 h-6" />,
    tags: ["Keyword Research", "Editorial Planning", "On-Page Optimization"],
  },
  {
    title: "Link Building",
    description:
      "High-quality Digital PR and outreach to boost domain authority and trust.",
    icon: <Globe className="w-6 h-6" />,
    tags: ["Digital PR", "Outreach", "Guest Posting"],
  },
  {
    title: "Analytics & Reporting",
    description:
      "Transparent reporting that connects search performance to revenue growth.",
    icon: <BarChart3 className="w-6 h-6" />,
    tags: ["GA4 Setup", "Looker Studio", "Conversion Tracking"],
  },
];

const SEO_CASE_STUDIES = [
  {
    name: "EcoStay",
    metric: "+145% Organic Traffic",
    category: "Travel",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "FinFlow",
    metric: "3x Lead Gen",
    category: "SaaS",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "UrbanFit",
    metric: "#1 for 'Home Gym'",
    category: "E-commerce",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "LegalEase",
    metric: "+80% Local Search",
    category: "Professional Services",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
  },
];

// --- COMPONENTS ---

// 1. ULTIMATE SEO HERO
const SeoHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 bg-white overflow-hidden pt-32">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-gradient-to-tr from-[#00C96D]/10 via-[#00B5D1]/10 to-[#2D79FF]/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

      {/* Floating Abstract Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[20%] left-[10%] opacity-20 hidden md:block"
      >
        <div className="w-24 h-24 border border-[#00C96D] rounded-full flex items-center justify-center">
          <Search className="w-10 h-10 text-[#00C96D]" />
        </div>
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[20%] right-[10%] opacity-20 hidden md:block"
      >
        <div className="w-32 h-32 border border-[#2D79FF] rounded-xl rotate-12 flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-[#2D79FF]" />
        </div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Headline with Staggered Reveal */}
          <h1 className="text-[12vw] sm:text-[10vw] leading-[0.85] font-black tracking-tighter text-gray-900 mb-8 select-none">
            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="block hover:translate-x-4 transition-transform duration-500"
            >
              DOMINATE
            </motion.span>

            <motion.span
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`block pl-[5vw] ${BRAND_GRADIENT_TEXT} bg-[length:200%_auto] animate-shine hover:-translate-x-4 transition-transform duration-500`}
            >
              SEARCH
            </motion.span>

            <motion.span
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="block text-right hover:translate-x-4 transition-transform duration-500"
            >
              DRIVE
            </motion.span>

            <motion.span
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="block text-right pr-[5vw] text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400 hover:-translate-x-4 transition-transform duration-500"
            >
              REVENUE
            </motion.span>
          </h1>
        </motion.div>

        {/* Footer Info */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-12 md:mt-0 border-t border-gray-100 pt-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-xl text-gray-500 max-w-md leading-relaxed font-light"
          >
            We turn{" "}
            <strong className="text-gray-900 font-semibold">
              search engines
            </strong>{" "}
            into your most profitable growth channel. Technical precision meets
            creative strategy.
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="mt-8 md:mt-0 relative group cursor-pointer"
          >
            <div
              className={`absolute inset-0 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity ${BRAND_GRADIENT_BG}`}
            />
            <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-xl group-hover:scale-110 transition-transform">
              <ArrowDown className="w-6 h-6 text-[#00B5D1] animate-bounce" />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
        .animate-shine {
          animation: shine 6s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

// 2. SHOWREEL / DASHBOARD PREVIEW
const DashboardPreview = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] relative overflow-hidden group bg-[#0F1115]">
      <div className="absolute inset-0 opacity-80 group-hover:opacity-60 transition-opacity duration-700">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
          alt="SEO Analytics Dashboard"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative group/play cursor-pointer">
          <div className="absolute inset-0 bg-[#00C96D]/30 blur-xl rounded-full scale-150 animate-pulse" />
          <div className="relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center gap-3 transition-transform duration-500 group-hover/play:scale-105">
            <span className="w-3 h-3 bg-[#00C96D] rounded-full animate-pulse" />
            <span className="text-white font-mono font-bold tracking-widest">
              LIVE DATA
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 text-white">
        <p className="text-sm font-bold tracking-widest uppercase text-[#00C96D]">
          Data-Driven Decisions
        </p>
      </div>
    </div>
  );
};

// 3. SERVICE ACCORDION (SEO Services)
const Services = () => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Expertise</h2>
          <p className="text-gray-600 text-lg mb-12">
            A full-spectrum approach to organic growth. We handle the technical,
            the creative, and the analytical.
          </p>
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
            <div
              className={`absolute inset-0 opacity-20 ${BRAND_GRADIENT_BG}`}
            />
            <div className="flex items-center justify-center h-full text-gray-300">
              <BarChart3 className="w-32 h-32 opacity-20 text-[#00B5D1]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {SEO_SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={false}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                active === idx
                  ? "border-[#00B5D1] shadow-lg shadow-blue-500/10"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <button
                onClick={() => setActive(active === idx ? null : idx)}
                className={`w-full px-8 py-6 flex items-center justify-between text-left transition-colors ${
                  active === idx ? "bg-white" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`p-2 rounded-lg transition-colors ${
                      active === idx
                        ? "bg-[#00B5D1]/10 text-[#00B5D1]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {/* FIXED: Added type assertion to fix build error */}
                    {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, {
                      className: "w-5 h-5",
                    })}
                  </span>
                  <span
                    className={`text-xl font-bold ${
                      active === idx ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {service.title}
                  </span>
                </div>
                <ArrowUpRight
                  className={`w-5 h-5 transition-transform duration-300 ${
                    active === idx
                      ? "rotate-45 text-[#00B5D1]"
                      : "text-gray-400"
                  }`}
                />
              </button>

              <motion.div
                initial={{ height: 0 }}
                animate={{ height: active === idx ? "auto" : 0 }}
                className="overflow-hidden bg-white"
              >
                <div className="px-8 pb-8 pt-0">
                  <p className="text-lg leading-relaxed mb-6 text-gray-600">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide ${
                          active === idx
                            ? "bg-gradient-to-r from-[#00C96D]/10 to-[#2D79FF]/10 text-[#0070f3]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. SELECTED WORKS (SEO Case Studies)
const SelectedWorks = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-[8vw] md:text-[6vw] font-bold leading-none tracking-tighter">
            PROVEN <br />
            <span className={BRAND_GRADIENT_TEXT}>RESULTS</span>
          </h2>
          <div className="hidden md:block">
            <p className="text-gray-400 max-w-xs text-right">
              We don't just promise rankings. We deliver revenue.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {SEO_CASE_STUDIES.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className={`group cursor-pointer ${
                idx % 2 === 1 ? "md:mt-24" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 border border-white/10">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                {/* Result Overlay */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-[#00C96D] font-bold text-sm">
                    {item.metric}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center border-b border-white/20 pb-4">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-[#00B5D1] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#00B5D1] group-hover:border-[#00B5D1] group-hover:text-white transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. PROCESS (SEO Workflow)
const Process = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-16 px-16">
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
            <h2 className="text-6xl font-bold mb-6">How We Rank You</h2>
            <p className="text-xl text-gray-600 max-w-md">
              A systematic framework designed to outperform competitors and
              capture market share.
            </p>
          </div>

          {[
            {
              step: "01",
              title: "Audit & Strategy",
              desc: "Comprehensive technical analysis and competitor benchmarking.",
            },
            {
              step: "02",
              title: "Optimization",
              desc: "Fixing technical debt and optimizing on-page elements.",
            },
            {
              step: "03",
              title: "Content & Authority",
              desc: "Creating rank-worthy content and acquiring high-quality backlinks.",
            },
            {
              step: "04",
              title: "Scale & Maintain",
              desc: "Ongoing monitoring, reporting, and strategy refinement.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] md:w-[35vw] h-[60vh] bg-gray-50 rounded-[3rem] p-12 flex flex-col justify-between border border-gray-100 relative overflow-hidden group hover:border-[#00B5D1]/30 transition-colors"
            >
              <div
                className={`absolute top-0 right-0 w-64 h-64 ${BRAND_GRADIENT_BG} opacity-0 group-hover:opacity-10 blur-[80px] rounded-full transition-opacity duration-500`}
              />

              <span className="text-8xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                {item.step}
              </span>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-4 group-hover:text-[#00B5D1] transition-colors">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN PAGE COMPONENT ---
const SeoPageLayout = () => {
  return (
    <main className="bg-white text-gray-900 selection:bg-[#00B5D1]/20 selection:text-[#005f73]">
      <SeoHero />
      <DashboardPreview />
      <div className="h-24" />
      <Services />
      <SelectedWorks />
      <Process />

      {/* Footer CTA */}
      <section className="py-32 px-6 text-center bg-gray-50 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-5 ${BRAND_GRADIENT_BG}`} />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-8">
            Ready to climb <br /> the rankings?
          </h2>
          <button
            className={`px-10 py-5 ${BRAND_GRADIENT_BG} text-white text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-blue-500/20`}
          >
            Get Your Free Audit
          </button>
        </div>
      </section>
    </main>
  );
};

export default SeoPageLayout;