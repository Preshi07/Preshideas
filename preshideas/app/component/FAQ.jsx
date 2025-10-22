"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How many people are in the Digital PR team?",
    answer:
      "Our Digital PR team consists of a mix of strategists, creatives, and outreach specialists who collaborate to deliver impactful campaigns.",
  },
  {
    question: "How do you work with traditional PR teams?",
    answer:
      "We complement traditional PR teams by integrating digital insights and SEO strategies to maximize campaign reach and measurable impact.",
  },
  {
    question: "What kind of results should be expected from Digital PR?",
    answer:
      "Expect measurable results like backlinks, brand mentions, referral traffic, and improvements in search visibility and authority.",
  },
  {
    question: "How much does Digital PR cost?",
    answer:
      "Our pricing depends on campaign scope, goals, and duration — we tailor our approach to match your brand’s needs and scale.",
  },
  {
    question: "What key metrics do you report on for Digital PR?",
    answer:
      "We focus on metrics such as backlinks, domain authority improvements, organic traffic growth, and coverage across relevant publications.",
  },
  {
    question: "What do you do if Digital PR isn't driving organic growth/traffic?",
    answer:
      "We re-evaluate your strategy using analytics data, identify content gaps, and adjust our campaign focus to maximize performance.",
  },
  {
    question:
      "How fast can we see the impact of Digital PR and get results/coverage?",
    answer:
      "Results can start appearing within weeks, but long-term visibility and SEO authority build progressively with consistent campaigns.",
  },
  {
    question:
      "What if we can't be super fast or work in a regulated industry?",
    answer:
      "We adapt our campaign approach to comply with regulations while still finding creative opportunities to earn media and backlinks.",
  },
  {
    question: "How long does it take to run a digital PR campaign?",
    answer:
      "Typically, campaigns run for 3–6 months depending on goals, content development, and outreach scope.",
  },
  {
    question: "Do you do Digital PR training for inhouse brands?",
    answer:
      "Yes, we provide tailored training sessions to help inhouse teams understand digital PR principles, tools, and execution best practices.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#F4F4F2] text-black py-24 px-6 md:px-12 rounded-3xl">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-10">FAQ's</h2>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-lg md:text-xl font-medium hover:bg-gray-50 transition"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <Minus size={20} className="text-gray-500" />
                  ) : (
                    <Plus size={20} className="text-gray-500" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-4 text-gray-700 text-base md:text-lg leading-relaxed"
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
