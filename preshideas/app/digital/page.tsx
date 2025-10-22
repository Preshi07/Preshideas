"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ✅ Unified Card type
type CardData = {
  title: string;
  description: string;
  image: string;
};

// ✅ Testimonial data
const testimonials: CardData[] = [
  {
    title: "Orbit Electronics",
    description:
      "“The team delivered remarkable results — we saw a 70% lift in qualified leads within the first 3 months. Their communication and strategy are top-notch.”",
    image:
      "https://images.unsplash.com/photo-1616628198927-38f91f48d09e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Nimbus Tech",
    description:
      "“Partnering with them helped us scale faster than we imagined. From digital PR to technical SEO, everything was streamlined perfectly.”",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function DigitalPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    "How many people are in the Digital PR team?",
    "How do you work with traditional PR teams?",
    "What kind of results should be expected from Digital PR?",
    "How much does Digital PR cost?",
    "What key metrics do you report on for Digital PR?",
    "What do you do if Digital PR isn't driving organic growth/traffic?",
    "How fast can we see the impact of Digital PR and get results/coverage?",
    "What if we can't be super fast or work in a regulated industry?",
    "How long does it take to run a digital PR campaign?",
    "Do you do Digital PR training for inhouse brands?",
  ];

  return (
    <div className="flex flex-col gap-32">

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="bg-black text-white py-24 px-6 md:px-16 rounded-[2rem] relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              Recommended by <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">category leaders</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-md">
              Our partners trust us to deliver results that redefine industry benchmarks.
            </p>
            <div className="space-y-6">
              {testimonials.map((card, index) => (
                <div
                  key={index}
                  className="bg-white text-black p-6 rounded-2xl shadow-lg flex flex-col gap-3"
                >
                  <p className="text-gray-700">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{card.title}</span>
                    <button className="text-sm font-medium underline hover:text-gray-700">
                      View Case Study →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[500px] rounded-2xl overflow-hidden"
          >
            <Image
              src={testimonials[0].image}
              alt="testimonial visual"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="bg-[#F4F4F2] text-black py-24 px-6 md:px-12 rounded-3xl">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,2fr] gap-12 items-start">
          {/* Left heading */}
          <div>
            <h2 className="text-5xl font-semibold">FAQ's</h2>
          </div>

          {/* Right accordion */}
          <div className="space-y-4">
            {faqs.map((question, index) => (
              <div key={index} className="bg-white rounded-xl">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-medium text-lg focus:outline-none"
                >
                  {question}
                  <span className="text-2xl font-light">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-gray-600"
                  >
                    This is a placeholder answer for "{question}". You can update this text
                    to include your real FAQ answers.
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
