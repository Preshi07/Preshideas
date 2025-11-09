"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"

type FAQ = {
  question: string
  answer: string
}

type FAQSectionProps = {
  title?: string
  faqs?: FAQ[]
}

const FAQSection: React.FC<FAQSectionProps> = ({ title = "Frequently Asked Questions", faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 md:mb-4 text-center">{title}</h2>
          <p className="text-center text-sm sm:text-base md:text-lg text-foreground/70">
            Find answers to common questions about our services
          </p>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border rounded-lg md:rounded-xl overflow-hidden bg-card hover:border-accent/50 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-accent/5 transition-colors text-left gap-3"
              >
                <span className="text-base sm:text-lg md:text-lg font-semibold text-primary">{faq.question}</span>
                <span
                  className={`flex-shrink-0 text-lg md:text-xl transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 md:px-6 py-3 md:py-4 bg-accent/5 border-t border-border"
                >
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
