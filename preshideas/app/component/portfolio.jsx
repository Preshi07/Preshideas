"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PortfolioSection({
  heading,
  subheading,
  note = "What you should hear...",
  slides = [],
  interval = 8000, // auto-slide interval
}) {
  const [active, setActive] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-8xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT CONTENT */}
        <div>
          {subheading && (
            <p className="text-sm text-gray-600 mb-4">{subheading}</p>
          )}

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight text-gray-900 mb-12 border-b border-gray-200 pb-8">
            {heading}
          </h1>

          <p className="text-gray-500 text-sm mb-6">{note}</p>

          {/* Titles & Descriptions */}
          <div className="divide-y divide-gray-200">
            {slides.map((slide, i) => (
              <div key={i} className="py-6">
                <button
                  onClick={() => setActive(i)}
                  className={`w-full text-left text-2xl font-medium transition-colors ${
                    active === i
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {slide.title}
                </button>

                {/* Show active description */}
                {active === i && (
                  <div className="mt-4 text-gray-700 text-base leading-relaxed max-w-3xl transition-opacity duration-300 ease-in-out">
                    {slide.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE / VISUAL AREA */}
        <div className="relative flex justify-center items-center h-[550px]">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`absolute transition-all duration-700 ease-in-out transform ${
                active === i
                  ? "opacity-100 translate-x-0 scale-100 z-20"
                  : "opacity-0 translate-x-8 scale-95 z-10"
              }`}
            >
              <div className="relative w-64 h-[500px] rounded-[2rem] shadow-2xl overflow-hidden border-8 border-gray-900 bg-black flex items-center justify-center">
                {/* Use image if available, fallback to text */}
                {slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-white text-lg font-semibold text-center p-4">
                    {slide.phone}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
