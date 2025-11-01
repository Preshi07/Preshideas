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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardScrollRef = useRef(null);
  const cardAnimationRef = useRef(null);

  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (("ontouchstart" in window) ||
        window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches);
    setIsTouchDevice(Boolean(isTouch));
  }, []);

  useEffect(() => {
    const cardContainer = cardScrollRef.current;
    if (!cardContainer) return;

    // For touch devices, enable native swipe + snap and skip auto animation
    if (isTouchDevice) {
      cardContainer.style.scrollBehavior = "smooth";
      // animation disabled for touch — rely on native swipe
      return;
    }

    let cardScrollPosition = 0;

    const animateCards = () => {
      // pause animation while a card is hovered (desktop)
      if (hoveredCard !== null) {
        cardAnimationRef.current = requestAnimationFrame(animateCards);
        return;
      }

      cardScrollPosition += scrollSpeed;
      // reset when we've scrolled one set (we duplicated cards 3x)
      if (cardScrollPosition >= cardContainer.scrollWidth / 3) {
        cardScrollPosition = 0;
      }
      cardContainer.scrollLeft = cardScrollPosition;
      cardAnimationRef.current = requestAnimationFrame(animateCards);
    };

    cardAnimationRef.current = requestAnimationFrame(animateCards);

    return () => cancelAnimationFrame(cardAnimationRef.current);
  }, [scrollSpeed, hoveredCard, isTouchDevice]);

  return (
    <div className={`min-h-screen ${bgGradient} p-6 sm:p-8`}>
      {sectionTitle && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-10">
          {sectionTitle}
        </h2>
      )}

      <div className="max-w-7xl mx-auto overflow-hidden">
        <div
          ref={cardScrollRef}
          // overflow-x-auto on mobile for native swipe; hidden for desktop where auto animation runs
          className="flex gap-6 pb-8 overflow-x-auto sm:overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedCards.map((card, idx) => (
            <div
              key={idx}
              // responsive widths and snap alignment for smooth mobile swiping
              className="flex-shrink-0 w-72 sm:w-80 md:w-96 group snap-start"
              onMouseEnter={() => !isTouchDevice && setHoveredCard(idx)}
              onMouseLeave={() => !isTouchDevice && setHoveredCard(null)}
              onClick={() =>
                isTouchDevice && setHoveredCard((prev) => (prev === idx ? null : idx))
              }
              role={isTouchDevice ? "button" : undefined}
              tabIndex={isTouchDevice ? 0 : undefined}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl">
                <div className="relative h-44 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3">
                    {card.title}
                  </h3>

                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      // make description toggle work on touch (tap) and hover on desktop
                      maxHeight: hoveredCard === idx ? "220px" : "0px",
                      opacity: hoveredCard === idx ? 1 : 0,
                    }}
                  >
                    <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base">
                      {card.description}
                    </p>
                  </div>

                  {hoveredCard !== idx && (
                    <div className="text-green-600 font-medium text-sm sm:text-base mt-2">
                      {isTouchDevice ? "Tap to learn more →" : "Hover to learn more →"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* hide scrollbars visually while keeping native scrolling on mobile */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MultiSlider;
