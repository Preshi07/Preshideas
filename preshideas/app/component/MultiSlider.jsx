"use client";
import { useEffect, useRef, useState } from "react";

/**
 * @typedef {Object} Card
 * @property {string} title
 * @property {string} image
 * @property {string} description
 */

/**
 * @param {{
 *   cards?: Card[],
 *   scrollSpeed?: number,
 *   bgGradient?: string,
 *   sectionTitle?: string
 * }} props
 */
const MultiSlider = ({
  cards = [],
  scrollSpeed = 1,
  bgGradient = "bg-gradient-to-r from-blue-50 via-white to-green-50",
  sectionTitle = "Our Services",
}) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardScrollRef = useRef(null);
  const cardAnimationRef = useRef(null);

  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const cardContainer = cardScrollRef.current;
    if (!cardContainer) return;

    let cardScrollPosition = 0;

    const animateCards = () => {
      cardScrollPosition += scrollSpeed;
      if (cardScrollPosition >= cardContainer.scrollWidth / 3) {
        cardScrollPosition = 0;
      }
      cardContainer.scrollLeft = cardScrollPosition;
      cardAnimationRef.current = requestAnimationFrame(animateCards);
    };

    cardAnimationRef.current = requestAnimationFrame(animateCards);

    return () => cancelAnimationFrame(cardAnimationRef.current);
  }, [scrollSpeed]);

  return (
    <div className={`min-h-screen ${bgGradient} p-8`}>
      {sectionTitle && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          {sectionTitle}
        </h2>
      )}

      <div className="max-w-7xl mx-auto overflow-hidden">
        <div
          ref={cardScrollRef}
          className="flex gap-6 pb-8 overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedCards.map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 sm:w-96 group"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    {card.title}
                  </h3>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredCard === idx ? "200px" : "0px",
                      opacity: hoveredCard === idx ? 1 : 0,
                    }}
                  >
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {card.description}
                    </p>
                  </div>

                  {hoveredCard !== idx && (
                    <div className="text-green-600 font-medium text-sm sm:text-base">
                      Hover to learn more →
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MultiSlider;
