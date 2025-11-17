"use client";

import React, { useState } from "react";
import { ArrowRight, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(true);
  const goals = [
    "Clear and focused strategy",
    "Design that drives impact",
    "Collaboration without the chaos",
    "Outcomes that build momentum",
    "Smart solutions, tailored for you",
  ];

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Background decorative text */}
      {/* <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.008] leading-none animate-pulse">
        <span className="text-[28rem] font-bold text-gray-900 block -mt-20">Presh</span>
      </div> */}

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16 relative z-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 xl:gap-20 items-start">
          {/* Left side content */}
          <div className="space-y-8 lg:space-y-12 pt-8 lg:pt-16">
            {/* Main headline with stagger animation */}
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out]">
                  We craft{" "}
                </span>
                <span className="font-serif italic font-light inline-block animate-[fadeInUp_0.6s_ease-out_0.5s_both]">
                  PreshIdeas
                </span>
                <span className="inline-block animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
                  {" "}
                  that change the game
                </span>
              </h1>
            </div>

            {/* Description and CTA */}
            <div className="max-w-xl space-y-6 lg:space-y-8 pt-4 animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
              <div className="flex items-start gap-5">
                <svg
                  className="w-6 h-6 lg:w-7 lg:h-7 mt-1 flex-shrink-0 animate-spin"
                  style={{ animationDuration: "8s" }}
                  viewBox="0 0 64 64"
                  fill="currentColor"
                >
                  <path d="m1 32 25 6 6 25 6-25 25-6-25-6-6-25-6 25z" />
                </svg>
                <p className="text-base lg:text-lg leading-relaxed">
                  <span className="text-gray-900">
                    We're a team of designers, developers, and strategists
                    bringing bold ideas to{" "}
                  </span>
                  <span className="text-gray-500">
                    life with purpose, passion, and unforgettable execution.
                  </span>
                </p>
              </div>

              <button className="group relative bg-black text-white pl-7 pr-3 py-3 rounded-full flex items-center gap-4 hover:pl-8 transition-all hover:shadow-2xl">
                <span className="font-medium text-sm lg:text-base">
                  Get started
                </span>
                <div className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-black" />
                </div>
              </button>
            </div>

            {/* Coordinates */}
            <div className="pt-8 lg:pt-12 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <p className="text-xs lg:text-sm text-gray-700">
                (21.0278° N, 105.8342° E)
              </p>
            </div>
          </div>

          {/* Right side video/image */}
          <div className="flex flex-col justify-start items-end pt-0 lg:pt-32 animate-[fadeInRight_0.8s_ease-out_0.2s_both]">
            <div className="relative w-full max-w-sm lg:max-w-md group/video">
              {/* Rotating text circle - "Enjoy the view" */}
              <div className="absolute -top-12 -left-12 w-32 h-32 z-20">
                <div
                  className="w-full h-full animate-spin"
                  style={{ animationDuration: "20s" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text
                      className="text-[10px] fill-gray-900 font-semibold uppercase tracking-widest"
                      style={{ letterSpacing: "0.1em" }}
                    >
                      <textPath href="#circlePath" startOffset="0%">
                        ENJOY THE VIEW • ENJOY THE VIEW •
                      </textPath>
                    </text>
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-900 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Video container */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transition-all duration-500 ring-1 ring-gray-200/50">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/video:translate-x-full transition-transform duration-[1500ms] ease-in-out pointer-events-none z-10"></div>

                {/* Video element */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover/video:scale-[1.08] transition-transform duration-700 ease-out"
                  poster="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=1000&fit=crop&q=90"
                >
                  <source
                    src="https://assets.mixkit.co/videos/preview/mixkit-couple-watching-tv-together-4642-large.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Vignette effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none"></div>

                {/* Animated border glow */}
                <div className="absolute inset-0 opacity-0 group-hover/video:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-white/30 animate-pulse"></div>
                </div>

                {/* Play/Pause button with enhanced design */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute bottom-5 right-5 lg:bottom-6 lg:right-6 w-12 h-12 lg:w-14 lg:h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)] hover:scale-110 hover:rotate-90 transition-all duration-300 border border-gray-100 z-20"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900 fill-gray-900 transition-all" />
                  ) : (
                    <Play className="w-4 h-4 lg:w-5 lg:h-5 text-gray-900 fill-gray-900 ml-0.5 transition-all" />
                  )}
                </button>

                {/* Corner accent */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/40 rounded-tl-lg opacity-0 group-hover/video:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-20 lg:right-24 w-8 h-8 border-r-2 border-b-2 border-white/40 rounded-br-lg opacity-0 group-hover/video:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm text-black">
            <motion.span
              className="text-lg"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              ✦
            </motion.span>
            <span>Not just another agency</span>
          </div>
        </motion.div>

        {/* Main Title - Right Aligned */}
        <motion.div
          className="text-right mb-20"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight inline-block">
            Turning{" "}
            <span className="font-serif italic font-normal">Vision</span> into
            <br />
            <span className="font-bold">reality</span>
          </h1>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column - Image Card */}
          <motion.div
            className="lg:col-span-4 relative rounded-3xl overflow-hidden bg-black h-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=1000&fit=crop"
              alt="Team collaboration"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            <motion.div
              className="absolute bottom-10 left-10 right-10 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="text-xl mb-8 leading-relaxed font-light">
                Every great project begins with a simple conversation — let's
                start yours.
              </p>
              <div className="border-t border-white/30 pt-6">
                <p className="text-base">
                  <span className="font-bold">Amanda</span>{" "}
                  <span className="text-white/70">Founder & CEO</span>
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Columns - Mission & Goals */}
          <div className="lg:col-span-8 grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-black">
                Our mission
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                To empower brands through{" "}
                <span className="font-semibold text-black">bold design</span>,{" "}
                <span className="font-semibold text-black">
                  strategic thinking
                </span>
                , and{" "}
                <span className="font-semibold text-black">
                  digital experiences
                </span>{" "}
                that inspire action and create lasting impact. To help{" "}
                <span className="font-semibold text-black">businesses</span>{" "}
                stand out through thoughtful branding and{" "}
                <span className="font-semibold text-black">
                  high-performance digital solutions
                </span>{" "}
                rooted in creativity and clarity.
              </p>

              {/* CTA Button */}
              <motion.button
                className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 mt-8"
                whileHover={{ scale: 1.05, backgroundColor: "#1f1f1f" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Meet our team
                <motion.span
                  className="text-xl"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Goals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-black">Our goal</h2>
              <ul className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-base text-gray-600"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-black font-bold mt-0.5">•</span>
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
