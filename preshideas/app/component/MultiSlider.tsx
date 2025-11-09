"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ✅ Define card type
type Card = {
  title: string;
  image: string;
  description: string;
};

type MultiSliderProps = {
  cards?: Card[];
  scrollSpeed?: number;
  sectionTitle?: string;
  bgGradient?: string;
};

export default function MultiSlider({
  cards = [],
  scrollSpeed = 0.5,
  sectionTitle = "Explore Our Features",
  bgGradient = "bg-gradient-to-br from-white via-gray-50 to-blue-50",
}: MultiSliderProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const duplicated = [...cards, ...cards, ...cards];
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect touch
  useEffect(() => {
    const touch =
      typeof window !== "undefined" &&
      (("ontouchstart" in window) ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches);
    setIsTouch(touch);
  }, []);

  // Continuous scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollPos = 0;

    const autoScroll = () => {
      scrollPos += scrollSpeed;
      if (scrollPos >= container.scrollWidth / 3) scrollPos = 0;
      container.scrollLeft = scrollPos;
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    const stopScroll = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        animationRef.current = requestAnimationFrame(autoScroll);
      }, 3000);
    };

    container.addEventListener("touchstart", stopScroll);
    container.addEventListener("wheel", stopScroll);
    container.addEventListener("mouseenter", stopScroll);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      container.removeEventListener("touchstart", stopScroll);
      container.removeEventListener("wheel", stopScroll);
      container.removeEventListener("mouseenter", stopScroll);
    };
  }, [scrollSpeed]);

  return (
    <section
      className={`relative w-full min-h-[80vh] py-5 sm:py-20 px-4 sm:px-8 ${bgGradient}`}
    >
      {/* Title */}
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 tracking-tight">
          {sectionTitle}
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Scroll or tap to explore — designed for both touch and desktop.
        </p>
      </div>

      {/* Slider */}
      <div className="overflow-hidden max-w-8xl mx-auto">
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {duplicated.map((card, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-start w-64 sm:w-80 md:w-96 group transition-all duration-500"
              onMouseEnter={() => !isTouch && setHovered(i)}
              onMouseLeave={() => !isTouch && setHovered(null)}
              onClick={() =>
                isTouch ? setHovered((p) => (p === i ? null : i)) : null
              }
            >
              {/* Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 group-hover:scale-[1.03] border border-gray-100">
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                    {card.title}
                  </h3>

                  <div
                    className={`transition-all duration-500 text-gray-600 text-sm leading-relaxed ${
                      hovered === i
                        ? "opacity-100 max-h-48"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {card.description}
                  </div>

                  {hovered !== i && (
                    <div className="text-green-600 text-xs sm:text-sm font-medium mt-3">
                      {isTouch ? "Tap to read more →" : "Hover to read more →"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
