"use client";

import { motion } from "framer-motion";
import React from "react";

// Define the type for a single slide
type Slide = {
  image: string;
  title: string;
  description: string;
};

// Props for the StrategySection component
type StrategySectionProps = {
  title?: string;
  highlight?: string;
  subtitle?: string;
  slides?: Slide[]; // 👈 define the slides array type here
  buttonText?: string;
  buttonLink?: string;
  duration?: number;
};

// Typed SlideCard component
const SlideCard: React.FC<Slide> = ({ image, title, description }) => {
  return (
    <div className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] flex-shrink-0 bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-100 hover:shadow-md transition">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-neutral-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

// Typed StrategySection component
const StrategySection: React.FC<StrategySectionProps> = ({
  title = "A powerful organic strategy that",
  highlight = "builds visibility & wins trust",
  subtitle = "Designed to drive real results, engagement, and business growth through performance-focused content and modern SEO.",
  slides = [],
  buttonText = "View All Case Studies →",
  buttonLink = "#",
  duration = 40,
}) => {
  return (
    <section className="max-w-8xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-neutral-900 max-w-3xl">
            {title}{" "}
            <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              {highlight}
            </span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">{subtitle}</p>
        </div>
      </div>

      <div className="mt-14 relative overflow-hidden">
        <motion.div
          className="flex gap-6 md:gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
        >
          {[...slides, ...slides].map((slide, idx) => (
            <SlideCard
              key={idx}
              image={slide.image}
              title={slide.title}
              description={slide.description}
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href={buttonLink}
          className="bg-black text-white text-sm md:text-base px-6 py-3 rounded-full hover:bg-neutral-800 transition"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default StrategySection;
