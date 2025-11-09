"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Target, Rocket } from "lucide-react";

const cards = [
  {
    title: "Innovation First",
    description:
      "We pioneer the strategies that define tomorrow's industry standards. Our forward-thinking approach ensures you're always ahead of the curve.",
    icon: Sparkles,
    gradient: "from-purple-500 via-purple-600 to-indigo-600",
    image: "/innovation.png",
  },
  {
    title: "Lightning Fast",
    description:
      "Speed meets precision in everything we do. Our streamlined processes deliver exceptional results without compromising on quality.",
    icon: Zap,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    image: "/speed.png",
  },
  {
    title: "Precision Targeting",
    description:
      "Data-driven strategies that hit the mark every time. We combine analytics with creativity to reach your exact audience.",
    icon: Target,
    gradient: "from-pink-500 via-rose-500 to-red-500",
    image: "/target.png",
  },
  {
    title: "Rapid Growth",
    description:
      "Scale your business with confidence. Our proven methodologies accelerate growth while maintaining sustainable momentum.",
    icon: Rocket,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: "/growth.png",
  },
];

export default function ScrollStackCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardCount = cards.length;

  return (
    <section
      ref={containerRef}
  
  style={{ minHeight: `${cardCount * 80}vh` }}
      className="relative bg-background"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-8xl mx-auto px-1 sm:px-4 md:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.1], [0, -50]),
            }}
            className="absolute top-4 sm:top-6 lg:top-8 left-0 right-0 text-center z-10 px-4"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-7 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              What We Offer
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[520px] lg:h-[580px] flex items-center justify-center">
            {cards.map((card, i) => {
              const Icon = card.icon;

              const start = i * (1 / cardCount);
              const end = start + 1 / cardCount;

              const y = useTransform(scrollYProgress, [start, end], [0, -600]);
              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.05],
                [1, 0.7]
              );

              return (
                <motion.div
                  key={i}
                  style={{ y, opacity, zIndex: cardCount - i }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-full max-w-6xl px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="relative bg-card border border-border/40 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg overflow-hidden backdrop-blur-sm">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-[0.03]`}
                      />
                      <div className="relative p-3 sm:p-5 md:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        {/* Left side */}
                        <div className="space-y-2 sm:space-y-4 md:space-y-6">
                          <div
                            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl md:rounded-2xl bg-gradient-to-br ${card.gradient}`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                          </div>
                          <h3 className="text-lg sm:text-xl md:text-3xl lg:text-5xl font-bold text-card-foreground">
                            {card.title}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                        {/* Right side */}
                        <div className="block">
                          <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-md sm:shadow-lg lg:shadow-xl mt-4 md:mt-0">
                            <Image
                              src={card.image}
                              alt={card.title}
                              width={500}
                              height={400}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-10 mix-blend-overlay`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
