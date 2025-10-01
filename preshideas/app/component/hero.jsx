"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = ["/hero0.png", "/hero1.png", "/hero3.png"];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index]}
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
          {/* Sleek Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-12">
        {/* Awards row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-4 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wide text-gray-200"
        >
          <span>#1 Most Recommended Content Marketing Agency</span>
          {/* You can drop award logos here */}
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-md">
          We Create
          <br />
          <span className="inline-flex items-center">
            Category
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="mx-2 inline-block rounded-lg overflow-hidden"
            >
              <Image
                src="/hero1.png"
                alt="Branding"
                width={50}
                height={50}
                className="rounded-lg sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px]"
              />
            </motion.div>
            Leaders
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-4 text-sm sm:text-lg md:text-xl text-gray-200 max-w-xl"
        >
          on every searchable platform
        </motion.p>

        {/* Bottom text area */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:justify-between gap-3 text-xs sm:text-sm text-gray-300">
          {/* Bottom left text */}
          <div className="text-left sm:max-w-xs">
            Organic media planners creating, distributing & optimising{" "}
            <span className="font-bold">search-first content</span> for SEO,
            Social, PR
          </div>

          {/* Bottom right text */}
          <div className="text-right">
            4 Global Offices serving <br /> NIGERIA
          </div>
        </div>
      </div>
    </section>
  );
}
