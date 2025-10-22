"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const slides = [
  {
    quote:
      "Preshideas at Seven's creative approach to SEO and digital PR is what has attracted us to them and they've already proved the value they bring to us in fuelling digital growth for the PLT brand internationally.",
    author: "Matt Holmes",
    role: "Head of Digital PLT",
    image:
      "https://images.unsplash.com/photo-1616628198927-38f91f48d09e?auto=format&fit=crop&w=1600&q=80",
    profile:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Carrie and her team delivered great results for us over a two year period. Preshideas are a pleasure to work with and are without a doubt one of, if not, the best agencies in the industry.",
    author: "Luke Williams",
    role: "Founder, Just My Look",
    image:
      "https://images.unsplash.com/photo-1598300188699-1c66a86c2f9a?auto=format&fit=crop&w=1600&q=80",
    profile:
      "https://images.unsplash.com/photo-1603415526960-f7e0328f8ed1?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Working with Preshideas has been a game changer for our growth. Their creativity and timing help us lead in a competitive category.",
    author: "Sarah Johnson",
    role: "Brand Director, PrettyLittleThing",
    image:
      "https://images.unsplash.com/photo-1596496052311-72b3b06c7e96?auto=format&fit=crop&w=1600&q=80",
    profile:
      "https://images.unsplash.com/photo-1616627455659-48b764fa1b9e?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative bg-[#0D0D0D] text-white rounded-3xl px-6 md:px-12 py-20 overflow-hidden flex flex-col items-center">
      {/* Star Rating */}
      <div className="text-center mb-6">
        <div className="text-yellow-400 text-xl tracking-widest">★★★★★</div>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-14 leading-tight">
        Recommended by <br />
        <span className="inline-block relative">
          category
          <Image
            src={slide.profile}
            alt="profile"
            width={50}
            height={50}
            className="absolute -right-12 top-1 rounded-full border-2 border-white"
          />
        </span>{" "}
        leaders
      </h2>

      {/* Slide Container */}
      <div className="max-w-6xl w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.quote}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="flex flex-col lg:flex-row items-stretch gap-8 w-full"
          >
            {/* Quote Card */}
            <div className="bg-white text-black p-8 md:p-10 rounded-2xl flex flex-col justify-between flex-1 shadow-lg">
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                “{slide.quote}”
              </p>

              <div className="flex items-center gap-3">
                <Image
                  src={slide.profile}
                  alt={slide.author}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{slide.author}</p>
                  <p className="text-sm text-gray-600">{slide.role}</p>
                </div>
              </div>
            </div>

            {/* Image & Button */}
            <div className="relative flex-1 overflow-hidden rounded-2xl">
              <Image
                src={slide.image}
                alt="testimonial brand"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 right-4">
                <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-100 transition">
                  View Case Study →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Brand Logos */}
      <div className="flex flex-wrap justify-center gap-4 mt-14">
        <div className="border border-white/20 px-5 py-2 rounded-xl text-sm tracking-wide">
          GAME
        </div>
        <div className="border border-white/20 px-5 py-2 rounded-xl text-sm tracking-wide">
          JUSTMYLOOK
        </div>
        <div className="border border-white/20 px-5 py-2 rounded-xl text-sm tracking-wide">
          PRETTYLITTLETHING
        </div>
      </div>
    </section>
  );
}
