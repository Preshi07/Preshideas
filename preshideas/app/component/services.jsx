"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const servicesLeft = [
  { name: "Digital PR", image: "/services/digital-pr.jpg" },
  { name: "Search & Growth Strategy", image: "/services/strategy.jpg" },
  { name: "Data & Insights", image: "/services/data.jpg" },
];

const servicesRight = [
  { name: "Organic Social & Content", image: "/services/social.jpg" },
  { name: "Content Experience", image: "/services/content.jpg" },
  { name: "Onsite SEO", image: "/services/seo.jpg" },
];

export default function Service() {
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <section className="relative bg-[#f5f4f2] min-h-screen w-full px-6 md:px-12 py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <h1 className="text-[10vw] md:text-[5rem] font-extrabold leading-tight bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
              Our
            </h1>
            <span className="inline-block">
              <Image
                src="/hero0.jpg"
                alt="Service Highlight"
                width={100}
                height={100}
                className="rounded-xl object-cover w-[80px] h-[80px] md:w-[110px] md:h-[110px]"
              />
            </span>
            <h1 className="text-[10vw] md:text-[5rem] font-extrabold leading-tight text-black">
              Services
            </h1>
          </div>
          <a
            href="#all-services"
            className="bg-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-md border border-gray-200 font-medium text-base md:text-lg text-black hover:bg-gray-100 transition whitespace-nowrap flex items-center"
          >
            View All Services <span className="ml-2">→</span>
          </a>
        </div>

        <hr className="border-gray-300 mb-12" />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {/* Left column */}
          <div>
            {servicesLeft.map((service, idx) => (
              <motion.div
                key={service.name}
                className="mb-10 relative cursor-pointer group"
                onMouseEnter={() => setHoveredImage(service.image)}
                onMouseLeave={() => setHoveredImage(null)}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h2 className="text-4xl md:text-5xl font-semibold text-black mb-4 relative z-10 group-hover:text-teal-600 transition-colors">
                  {service.name}
                </h2>
                {idx < servicesLeft.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div>
            {servicesRight.map((service, idx) => (
              <motion.div
                key={service.name}
                className="mb-10 relative cursor-pointer group"
                onMouseEnter={() => setHoveredImage(service.image)}
                onMouseLeave={() => setHoveredImage(null)}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h2 className="text-4xl md:text-5xl font-semibold text-black mb-4 relative z-10 group-hover:text-teal-600 transition-colors">
                  {service.name}
                </h2>
                {idx < servicesRight.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Background Image */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.35, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src={hoveredImage}
              alt="Hover Background"
              fill
              className="object-cover rounded-full blur-2xl opacity-70"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
