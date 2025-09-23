"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = ["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"]; // background images

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden rounded-3xl">
      {/* Background Slider */}
      <AnimatePresence>
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
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        {/* Awards row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-6 text-xs font-medium"
        >
          <span>#1 MOST RECOMMENDED CONTENT MARKETING AGENCY</span>
          {/* add award logos here */}
        </motion.div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          We Create
          <br />
          <span className="inline-flex items-center">
            Category
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="mx-2 inline-block rounded-xl overflow-hidden"
            >
              <Image
                src="/redbull.png"
                alt="Red Bull"
                width={70}
                height={70}
                className="rounded-xl"
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
          className="mt-4 text-lg md:text-xl"
        >
          on every searchable platform
        </motion.p>

        {/* Bottom left text */}
        <div className="absolute bottom-6 left-6 text-sm text-gray-200 max-w-sm text-left">
          Organic media planners creating, distributing & optimising{" "}
          <span className="font-bold">search-first content</span> for SEO,
          Social, PR
        </div>

        {/* Bottom right text */}
        <div className="absolute bottom-6 right-6 text-sm text-gray-200 text-right">
          4 Global Offices serving <br /> UK, USA (New York) & EU
        </div>
      </div>
    </section>
  );
}
