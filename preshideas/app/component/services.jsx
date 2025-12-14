"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- Data ---
const services = [
  { name: "Digital Marketing", category: "Growth", image: "/services/digital-pr.jpg" },
  { name: "Workflow Automation", category: "Tech", image: "/services/strategy.jpg" },
  { name: "AI Agent Building", category: "Engineering", image: "/services/data.jpg" },
  { name: "Digital PR", category: "Brand", image: "/services/social.jpg" },
  { name: "Content Writing", category: "Creative", image: "/services/content.jpg" },
  { name: "Organic Social", category: "Social", image: "/services/seo.jpg" },
];

export default function Service() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const sectionRef = useRef(null);
  
  // Cursor tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Physics for smooth movement
  const springConfig = { damping: 25, stiffness: 120 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Track mouse relative to the SECTION, not the window
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    
    // Get the exact position of the section on the screen
    const rect = sectionRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the section top-left corner
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    mouseX.set(relativeX);
    mouseY.set(relativeY);
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white min-h-screen w-full px-6 md:px-12 py-24 overflow-hidden selection:bg-[#00C96D]/20 group/container"
    >
      
      {/* --- Floating Image --- */}
      <motion.div
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        // Changed to 'absolute' so it stays inside the section
        className="absolute top-0 left-0 z-0 pointer-events-none hidden lg:block w-[250px] h-[320px] rounded-xl overflow-hidden shadow-2xl border-4 border-white"
      >
        <AnimatePresence mode="wait">
          {hoveredIdx !== null && (
            <motion.div
              key={hoveredIdx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full"
            >
              <Image
                src={services[hoveredIdx].image}
                alt={services[hoveredIdx].name}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="relative">
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "100%" }} 
              viewport={{ once: true }}
              className="absolute -top-6 left-0 h-1 bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]" 
            />
            <h1 className="text-[12vw] lg:text-[140px] font-bold leading-[0.9] tracking-tighter text-black mix-blend-difference">
              OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]">
                SERVICES
              </span>
            </h1>
          </div>

          <motion.a
            href="/services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-4 bg-black text-white px-8 py-5 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
          >
            View Full Catalog
            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </motion.a>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-black/10">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative border-b border-black/10 cursor-pointer z-10"
            >
              <div className="flex flex-col md:flex-row items-baseline justify-between py-12 px-2 md:px-6 transition-all duration-500 group-hover:px-10">
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-black/90 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00C96D] group-hover:to-[#00B5D1] transition-all duration-300">
                  {service.name}
                </h2>

                <div className="flex items-center gap-8 mt-4 md:mt-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-mono uppercase tracking-widest hidden md:block">
                    (0{idx + 1})
                  </span>
                  <span className="text-lg font-medium px-4 py-1 border border-black/20 rounded-full bg-white/50 backdrop-blur-sm">
                    {service.category}
                  </span>
                  <ArrowUpRight className="w-8 h-8 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                </div>
              </div>
              
              <div className="absolute inset-0 bg-white/80 -z-10 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out backdrop-blur-[2px]" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}