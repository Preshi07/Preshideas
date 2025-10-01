"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    title: "Pioneers",
    description:
      "We’re dedicated to creating the industry narrative that others follow 3 years from now...",
    color: "bg-black text-white",
    image: "/google.jpg",
  },
  {
    title: "Innovators",
    description:
      "We paved the path for creative SEO, Digital PR, and Social Search...",
    color: "bg-teal-200 text-black",
    image: "/innovation.jpg",
  },
  {
    title: "Leaders",
    description:
      "We’re on a mission to disrupt the status quo with award-winning campaigns...",
    color: "bg-white text-black",
    image: "/leaders.jpg",
  },
];

export default function ScrollStackCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-gray-100 flex items-center justify-center"
    >
      <div className="sticky top-20 flex flex-col items-center w-full max-w-3xl">
        {cards.map((card, i) => {
          // Move each card slightly upwards as you scroll
          const y = useTransform(scrollYProgress, [0, 1], [i * 50, -200]);
          const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

          return (
            <motion.div
              key={i}
              style={{ y, scale }}
              className={`absolute w-full p-8 rounded-2xl shadow-xl ${card.color}`}
            >
              <div className="flex flex-col gap-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <h2 className="text-3xl font-bold">{card.title}</h2>
                <p className="text-lg leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
