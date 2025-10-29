"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Metric = {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
};

type MetricsSectionProps = {
  metrics: Metric[];
  title: string;
  highlightText: string;
  paragraphs: string[];
  badge?: {
    emoji: string;
    title: string;
    subtitle: string;
  };
  gradient?: string;
};

/* ------------------------------
   Counter Component (Fixed)
---------------------------------*/
const Counter = ({
  from,
  to,
  duration = 2,
  prefix = "",
  suffix = "",
}: {
  from: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const [displayCount, setDisplayCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const current = from + (to - from) * progress;
        setDisplayCount(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, from, to, duration]);

  return (
    <span
      ref={ref}
      className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
    >
      {prefix}
      {Math.floor(displayCount).toLocaleString()}
      {suffix}
    </span>
  );
};

/* ------------------------------
   Metrics Section (Reusable)
---------------------------------*/
const MetricsSection = ({
  metrics,
  title,
  highlightText,
  paragraphs,
  badge,
  gradient = "from-blue-50/60 via-white to-green-50/60",
}: MetricsSectionProps) => {
  return (
    <section className="py-10 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Floating Motion Background Accent */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          x: [0, 20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-green-300/30 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-indigo-300/30 blur-3xl rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className={`bg-gradient-to-r ${gradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/30 backdrop-blur-sm`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Metrics Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 items-center text-center md:text-left">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:items-start gap-2 sm:gap-3"
              >
                <Counter
                  from={metric.from}
                  to={metric.to}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
                <p className="text-xs sm:text-sm text-gray-500">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Text Section */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-center md:text-left">
                {title}{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
                  {highlightText}
                </span>
              </h3>
            </div>

            <div className="text-gray-700 space-y-4 text-sm sm:text-base text-center md:text-left">
              {paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}

              {badge && (
                <div className="mt-6 inline-flex items-center justify-center md:justify-start gap-3 bg-white/60 border border-white/40 px-4 py-2 rounded-xl shadow-sm">
                  <span className="text-2xl">{badge.emoji}</span>
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold">{badge.title}</div>
                    <div className="text-gray-500">{badge.subtitle}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;
