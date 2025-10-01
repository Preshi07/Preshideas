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
    <section className="relative bg-[#f5f4f2] min-h-screen w-full px-6 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-6">
            <h1 className="text-[5vw] md:text-[6rem] font-bold leading-none text-black flex items-center">
              Our
              <span className="inline-block align-middle mx-4">
                <Image
                  src="/hero0.jpg"
                  alt="Service Highlight"
                  width={110}
                  height={110}
                  className="rounded-xl object-cover w-[110px] h-[110px]"
                />
              </span>
              Services
            </h1>
          </div>
          <a
            href="#all-services"
            className="bg-white px-8 py-4 rounded-full shadow-md border border-gray-200 font-medium text-lg text-black hover:bg-gray-100 transition whitespace-nowrap flex items-center"
          >
            View All Services <span className="ml-2">→</span>
          </a>
        </div>

        <hr className="border-gray-300 mb-8" />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          <div>
            {servicesLeft.map((service, idx) => (
              <div
                key={service.name}
                className="mb-8 relative cursor-pointer"
                onMouseEnter={() => setHoveredImage(service.image)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <h2 className="text-5xl md:text-6xl font-medium text-black mb-4 relative z-10">
                  {service.name}
                </h2>
                {idx < servicesLeft.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </div>
            ))}
          </div>
          <div>
            {servicesRight.map((service, idx) => (
              <div
                key={service.name}
                className="mb-8 relative cursor-pointer"
                onMouseEnter={() => setHoveredImage(service.image)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <h2 className="text-5xl md:text-6xl font-medium text-black mb-4 relative z-10">
                  {service.name}
                </h2>
                {idx < servicesRight.length - 1 && (
                  <hr className="border-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Background Image */}
      <AnimatePresence>
        {hoveredImage && (
          <motion.div
            key={hoveredImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Image
              src={hoveredImage}
              alt="Hover Background"
              fill
              className="object-cover rounded-[50%] blur-md opacity-70"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
