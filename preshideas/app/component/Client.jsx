"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function TestimonialGallery({
  title = "Recommended by",
  highlight = "category",
  suffix = "leaders",
  gallery = [],
  interval = 8000,
  logos = [],
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!gallery.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % gallery.length);
    }, interval);
    return () => clearInterval(timer);
  }, [gallery, interval]);

  if (!gallery.length) return null;
  const item = gallery[current];

  return (
    <section className="relative bg-[#0D0D0D] text-white rounded-3xl px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-20 overflow-hidden flex flex-col items-center">
      {/* Star Rating */}
      <div className="text-center mb-3 sm:mb-5">
        <div className="text-yellow-400 text-lg sm:text-xl tracking-widest">
          ★★★★★
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-10 leading-snug sm:leading-tight">
        {title} <br />
        <span className="inline-block relative mt-2">
          {highlight}
          <span className="hidden md:inline-block">
            <Image
              src={item.profile}
              alt="profile"
              width={55}
              height={55}
              className="absolute -right-12 top-1 rounded-full border-2 border-white"
            />
          </span>
          <span className="inline-block md:hidden ml-2 align-middle">
            <Image
              src={item.profile}
              alt="profile-mobile"
              width={32}
              height={32}
              className="rounded-full border-2 border-white inline-block"
            />
          </span>
        </span>{" "}
        {suffix}
      </h2>

      {/* Gallery Slider */}
      <div className="max-w-6xl w-full flex items-center justify-center px-1 sm:px-3 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.quote}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row items-stretch gap-5 sm:gap-8 w-full"
          >
            {/* Quote Card */}
            <div className="bg-white text-black p-6 sm:p-8 rounded-2xl flex flex-col justify-between flex-1 shadow-lg min-h-[180px] sm:min-h-[220px]">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                “{item.quote}”
              </p>
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src={item.profile}
                  alt={item.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {item.author}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{item.role}</p>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative flex-1 overflow-hidden rounded-2xl h-48 sm:h-60 md:h-72 lg:h-[400px]">
              <Image
                src={item.image}
                alt="testimonial brand"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Logos Section */}
      {logos.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-8 sm:mt-12">
          {logos.map((logo, i) => (
            <div
              key={i}
              className="border border-white/20 px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base tracking-wide"
            >
              {logo}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
