"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQSection({
  title = "Frequently Asked Questions",
  faqs = [],
}) {
  const [openIndex, setOpenIndex] = useState(null);
  const reduceMotion = useReducedMotion();

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKey = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(index);
    }
  };

  const motionProps = reduceMotion
    ? {
        initial: false,
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
      }
    : {
        initial: { height: 0, opacity: 0 },
        animate: { height: "auto", opacity: 1 },
        exit: { height: 0, opacity: 0 },
      };

  return (
    <section className="bg-[#F4F4F2] text-black py-10 px-4 sm:py-14 sm:px-6 md:px-12 rounded-3xl">
      <div className="max-w-3xl mx-auto w-full">
        {/* Section Header */}
        <h2 className="text-center md:text-left text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 leading-tight">
          {title}
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-content-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* FAQ Button */}
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => handleKey(e, index)}
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 
												text-left text-base sm:text-lg font-medium 
												hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 
												focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
                >
                  <span className="flex-1 pr-4 break-words">
                    {faq.question}
                  </span>

                  {/* Animated Icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex-shrink-0"
                  >
                    {isOpen ? (
                      <Minus size={20} className="text-gray-500" />
                    ) : (
                      <Plus size={20} className="text-gray-500" />
                    )}
                  </motion.span>
                </button>

                {/* Animated Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={contentId}
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      {...motionProps}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: "easeInOut",
                      }}
                      className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 text-sm sm:text-base leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
