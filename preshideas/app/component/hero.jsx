"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Globe, Cpu, CheckCircle } from "lucide-react";

const slides = ["/hero0.png", "/hero1.png", "/hero3.png"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // --- Mouse Physics for 3D Tilt ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
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
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] text-white selection:bg-[#00C96D]/30"
    >
      {/* --- Animated Grid Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        {/* Brand Color Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00C96D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#2D79FF]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* --- Left: Typography --- */}
        <div className="space-y-8 text-center lg:text-left pt-12 lg:pt-0">
          
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
            <span className="text-xs font-mono tracking-widest uppercase text-gray-400">
              Agency 2.0
            </span>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
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
                className="flex items-center justify-center lg:justify-start gap-3"
              >
                <span>Be Trusted.</span>
                <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-[#00C96D]/20 text-[#00C96D]">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]"
            >
              Unforgettable.
            </motion.div>
          </div>

          <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
            We help ambitious brands communicate better, grow smarter, and dominate search results with precision engineering.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              Start Project
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors">
              Our Work
            </button>
          </div>

          <div className="pt-4 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500 font-mono">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Global Reach
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" /> AI Integrated
            </div>
          </div>
        </div>

        {/* --- Right: 3D Tilt Card --- */}
        <div className="relative flex justify-center perspective-1000 my-12 lg:my-0">
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-[300px] sm:w-[350px] aspect-[4/5] rounded-3xl bg-gray-900 border border-white/10 shadow-2xl overflow-hidden group"
          >
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
            
            {/* Image Slideshow */}
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
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating UI Elements on top of image (Parallax feel) */}
            <motion.div 
              style={{ z: 50 }}
              className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-[#00C96D] font-bold uppercase tracking-wider">Featured Project</p>
                  <p className="text-white font-semibold text-sm">Growth Automation System</p>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/30 flex items-center justify-center bg-white/10">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.div>

          </motion.div>
          
          {/* Decorative Elements behind card */}
          <div className="absolute -z-10 top-8 -right-8 w-full h-full border border-white/5 rounded-3xl" />
          <div className="absolute -z-20 top-16 -right-16 w-full h-full border border-white/5 rounded-3xl" />
        </div>

      </div>
    </section>
  );
}