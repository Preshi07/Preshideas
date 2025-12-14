"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Target, Rocket } from "lucide-react";

// --- Data ---
const cards = [
  {
    title: "Innovation First",
    description:
      "We pioneer the strategies that define tomorrow's industry standards. Our forward-thinking approach ensures you're always ahead of the curve.",
    icon: Sparkles,
    // Matching the Green from your image
    color: "text-[#00C96D]", 
    bg: "bg-[#00C96D]/10",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", 
  },
  {
    title: "Lightning Fast",
    description:
      "Speed meets precision in everything we do. Our streamlined processes deliver exceptional results without compromising on quality.",
    icon: Zap,
    // Matching the Cyan/Teal from your image
    color: "text-[#00B5D1]",
    bg: "bg-[#00B5D1]/10",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    title: "Precision Targeting",
    description:
      "Data-driven strategies that hit the mark every time. We combine analytics with creativity to reach your exact audience.",
    icon: Target,
    // Matching the Blue from your image
    color: "text-[#2D79FF]",
    bg: "bg-[#2D79FF]/10",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Rapid Growth",
    description:
      "Scale your business with confidence. Our proven methodologies accelerate growth while maintaining sustainable momentum.",
    icon: Rocket,
    // A blend to finish the sequence
    color: "text-indigo-600",
    bg: "bg-indigo-600/10",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function ScrollStackCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-slate-50 font-sans">
      {/* Header Section - Tighter spacing, matching specific gradient */}
      <div className="pt-16 pb-8 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* The Specific Gradient from your image: Green -> Cyan -> Blue */}
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]">Rise</span>
          </h2>
          <p className="mt-3 text-slate-500 max-w-lg mx-auto text-base">
            Comprehensive solutions designed to elevate your business.
          </p>
        </motion.div>
      </div>

      {/* Cards Container */}
      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto px-4 pb-12">
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <Card
              key={i}
              i={i}
              {...card}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              totalCards={cards.length}
            />
          );
        })}
      </div>
    </section>
  );
}

const Card = ({
  i,
  title,
  description,
  icon: Icon,
  color,
  bg,
  image,
  progress,
  range,
  targetScale,
  totalCards,
}) => {
  const container = useRef(null);
  
  const scale = useTransform(progress, range, [1, targetScale]);
  // Cards stack much tighter now (top-24 instead of top-0 + huge height)
  
  return (
    <div
      ref={container}
      className="h-[400px] flex items-start justify-center sticky top-24 mb-4"
    >
      <motion.div
        style={{
          scale,
          // Stacking offset is much smaller (15px) to reduce spacing
          top: `calc(${i * 15}px)`,
        }}
        className="relative flex flex-col items-center w-full origin-top"
      >
        <div className="relative w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
          
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 relative z-10 h-full min-h-[350px]">
            
            {/* Content Side */}
            <div className="flex flex-col justify-center space-y-4">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="pt-2">
                <button className={`text-sm font-bold ${color} hover:opacity-80 transition-opacity flex items-center gap-1`}>
                  Learn more &rarr;
                </button>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-48 md:h-auto rounded-xl overflow-hidden shadow-inner group">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};