"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";

const slides = [
  {
    title: "Parkview Estates",
    tag: "Real Estate",
    years: "2022–2025",
    image1:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "DriveRent",
    tag: "Car Leasing",
    years: "2023–2026",
    image1:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "SkyResorts",
    tag: "Travel & Holidays",
    years: "2022–2024",
    image1:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];

const cards = [
  {
    title: "AI-Powered Marketing",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600",
    description:
      "Automate your brand storytelling with real-time AI insights and content generation tools.",
  },
  {
    title: "Cybersecurity & Compliance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    description:
      "Real-time security monitoring and AI-driven compliance systems for your business.",
  },
  {
    title: "E-commerce Automation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    description:
      "Streamline your sales, manage logistics, and track engagement effortlessly.",
  },
];
const SlideCard = ({ title, tag, years, image1, image2 }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] min-w-[85%] sm:min-w-[320px] md:min-w-[480px] lg:min-w-[560px]
                 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 flex-shrink-0 group"
    >
      <Image
        src={hovered ? image2 : image1}
        alt={title}
        fill
        className="object-cover transition-opacity duration-700"
        sizes="(max-width: 768px) 90vw, 50vw"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-xs uppercase tracking-wider opacity-80">{tag}</p>
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-xs opacity-80 mt-1">{years}</p>
      </div>
    </motion.div>
  );
};
const SeoPage = () => {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-neutral-900 max-w-3xl">
              A powerful organic strategy that{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400">
                builds visibility & wins trust
              </span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Designed to drive real results, engagement, and business growth
              through performance-focused content and modern SEO.
            </p>
          </div>
        </div>

        {/* Sliding Cards */}
        <div className="mt-14 relative overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...slides, ...slides].map((slide, idx) => (
              <SlideCard key={idx} {...slide} />
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-black text-white text-sm md:text-base px-6 py-3 rounded-full hover:bg-neutral-800 transition">
            View All Case Studies →
          </button>
        </div>
      </div>

      {/* Soft edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none" />

      <MetricsSection
        metrics={[
          {
            from: 0,
            to: 120,
            prefix: "$",
            suffix: "M",
            label: "Revenue Growth",
          },
          { from: 0, to: 45, suffix: "+", label: "Expert Team Members" },
          { from: 0, to: 7, suffix: "x", label: "Average ROI" },
        ]}
        title="Empower Your Brand. Drive Engagement."
        highlightText="Achieve measurable success with data-driven strategies."
        paragraphs={[
          "We specialize in crafting performance-driven solutions that align with your business goals.",
          "Our team has empowered 200+ startups to build sustainable growth systems with SEO, AI, and creative design.",
          "Partner with us to scale smarter — not harder.",
        ]}
        badge={{
          emoji: "🚀",
          title: "TOP INNOVATIVE AGENCY",
          subtitle: "DIGITAL GROWTH AWARDS",
        }}
      />

      <MultiSlider
        // logos={logos}
        cards={cards}
        logoSpeed={1}
        cardSpeed={1.2}
        sectionTitle="Trusted By Leading Brands"
        bgGradient="bg-gradient-to-r from-blue-50 via-white to-green-50"
      />
    </section>
  );
};

export default SeoPage;
