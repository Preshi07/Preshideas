"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Globe, Cpu, CheckCircle } from "lucide-react";

const slides = ["/hero0.png", "/hero1.png", "/hero3.png"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [calendlyReady, setCalendlyReady] = useState(false);
  const containerRef = useRef(null);

  // Paste your Calendly "Copy link" URL here
  const calendlyUrl = "https://calendly.com/seiduadaeiza06/new-meeting-1";

  // --- Mouse Physics for 3D Tilt ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = e.clientX - rect.left;
    const mouseYVal = e.clientY - rect.top;
    const xPct = mouseXVal / width - 0.5;
    const yPct = mouseYVal / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- Auto Slide ---
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start lg:justify-center overflow-x-hidden bg-[#0a0a0a] text-white selection:bg-[#00C96D]/30 pt-20 pb-12 lg:py-0"
    >
      {/* --- Animated Grid Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-20%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-[#00C96D]/10 rounded-full blur-[80px] lg:blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-[#2D79FF]/10 rounded-full blur-[80px] lg:blur-[120px]" />
      </div>

      {/* Grid Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* --- Left: Typography --- */}
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mx-auto lg:mx-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C96D]"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-gray-400">
              Agency 2.0
            </span>
          </motion.div>

          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Be Seen.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3"
              >
                <span>Be Trusted.</span>
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-[#00C96D]/20 text-[#00C96D]">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF] pb-2"
            >
              Unforgettable.
            </motion.div>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light px-2 sm:px-0">
            We help ambitious brands communicate better, grow smarter, and
            dominate search results with precision engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
            <button
              type="button"
              disabled={!calendlyReady}
              onClick={() =>
                window.Calendly.initPopupWidget({ url: calendlyUrl })
              }
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Start Project
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/work"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors w-full sm:w-auto"
            >
              Our Work
            </Link>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 font-mono">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Global Reach
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" /> AI Integrated
            </div>
          </div>
        </div>

        {/* --- Right: 3D Tilt Card --- */}
        <div className="relative flex justify-center perspective-1000 order-2 lg:order-2 mt-4 lg:mt-0">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full max-w-[420px] lg:max-w-[460px] xl:max-w-[500px] aspect-[4/5] rounded-3xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />

            <div className="absolute inset-0 bg-black">
              {slides.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === index ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={src}
                    alt="Project"
                    fill
                    className="object-cover opacity-80"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              style={{ z: 50 }}
              className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-[10px] text-[#00C96D] font-bold uppercase tracking-wider">
                    Featured Project
                  </p>
                  <p className="text-white font-semibold text-xs sm:text-sm">
                    Growth Automation System
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10 shrink-0">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute -z-10 top-4 -right-4 lg:top-6 lg:-right-6 w-full h-full border border-white/5 rounded-3xl" />
          <div className="absolute -z-20 top-8 -right-8 lg:top-12 lg:-right-12 w-full h-full border border-white/5 rounded-3xl" />
        </div>
      </div>

      {/* Calendly styles (important for popup visibility) */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setCalendlyReady(true)}
      />

      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
    </section>
  );
}
