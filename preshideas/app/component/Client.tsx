"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;   // Large project/context image
  profile: string; // Author avatar
}

interface TestimonialGalleryProps {
  title?: string;
  highlight?: string;
  suffix?: string;
  gallery: TestimonialItem[];
  interval?: number;
  logos?: string[];
}

export default function TestimonialGallery({
  title = "Recommended by",
  highlight = "category",
  suffix = "leaders",
  gallery = [],
  interval = 8000,
  logos = [],
}: TestimonialGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Handle slide changes
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  // Autoplay logic
  useEffect(() => {
    if (!autoPlay || !gallery.length) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, gallery.length, interval, nextSlide]);

  if (!gallery.length) return null;
  const item = gallery[current];

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="relative bg-[#06070A] text-white rounded-[2.5rem] overflow-hidden p-8 md:p-16 isolate">
        
        {/* Background Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* --- HEADER --- */}
        <div className="relative z-10 flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-yellow-400 fill-yellow-400"
              >
                ★
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            {title}{" "}
            <span className="relative inline-flex flex-col md:flex-row items-center justify-center align-middle gap-3 mx-1">
              <span className="italic font-serif text-white/80">{highlight}</span>
              
              {/* Animated Avatar in Header */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={item.profile}
                  initial={{ width: 0, opacity: 0, scale: 0 }}
                  animate={{ width: "auto", opacity: 1, scale: 1 }}
                  exit={{ width: 0, opacity: 0, scale: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="inline-block align-middle"
                >
                  <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-white/20 shadow-xl">
                    <AvatarImage src={item.profile} className="object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </motion.div>
              </AnimatePresence>
            </span>{" "}
            {suffix}
          </h2>
        </div>

        {/* --- MAIN SLIDER --- */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-stretch"
            >
              {/* Quote Card */}
              <div className="bg-white text-black rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-100 fill-gray-100 rotate-180" />
                
                <div className="relative z-10">
                   <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-4 pt-8 border-t border-gray-100">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.profile} />
                    <AvatarFallback>{item.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg">{item.author}</div>
                    <div className="text-gray-500 text-sm">{item.role}</div>
                  </div>
                </div>
              </div>

              {/* Image Card */}
              <div className="relative h-[300px] lg:h-auto rounded-3xl overflow-hidden group">
                 <motion.img
                   key={item.image}
                   src={item.image}
                   alt="Project result"
                   initial={{ scale: 1.2 }}
                   animate={{ scale: 1 }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Client Success Story
                 </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* --- CONTROLS --- */}
          <div className="mt-10 flex items-center justify-between">
            {/* Progress Bar */}
            <div className="flex-1 max-w-sm h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div
                 key={current} // Reset animation on slide change
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: interval / 1000, ease: "linear" }}
                 className="h-full bg-white"
               />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => { setAutoPlay(false); prevSlide(); }}
                className="rounded-full w-12 h-12 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => { setAutoPlay(false); nextSlide(); }}
                className="rounded-full w-12 h-12 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* --- LOGOS --- */}
        {logos.length > 0 && (
          <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm uppercase tracking-widest mb-6">As seen in</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {logos.map((logo, i) => (
                <span key={i} className="text-xl font-bold">{logo}</span> 
                // Note: Ideally these should be <img> tags if you have logo assets
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}