"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface Slide {
  title: string;
  category: string;
  image: string;
}

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const slides: Slide[] = [
  {
    title: "Travelista",
    category: "Content Marketing",
    image: "/others/team002.png",
  },
  {
    title: "FitLife Studios",
    category: "Social Media Marketing",
    image: "/others/team0.png",
  },
  {
    title: "FreshNest",
    category: "Content Marketing",
    image: "/others/team1.png",
  },
  {
    title: "EcoKids",
    category: "Content Marketing",
    image: "/others/team00.png",
  },
  {
    title: "EcoWorld",
    category: "SEO Strategy",
    image: "/others/team01.png",
  },
];

const Counter = ({
  from,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
}: CounterProps) => {
  const [value, setValue] = useState(from);
  const ref = useRef(0);

  useEffect(() => {
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const current = Math.floor(progress * (to - from) + from);

      if (current !== ref.current) {
        ref.current = current;
        setValue(current);
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [from, to, duration]);

  return (
    <span>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

const MetricsSection = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Metrics */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-black">
              <Counter from={0} to={100} suffix="m" prefix="$" />
            </h2>
            <p className="mt-2 text-gray-600 text-lg font-medium">
              Incremental value
            </p>
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-black">
              <Counter from={0} to={40} suffix="+" />
            </h2>
            <p className="mt-2 text-gray-600 text-lg font-medium">
              Strong organic team
            </p>
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-black">
              <Counter from={0} to={6} suffix="x" />
            </h2>
            <p className="mt-2 text-gray-600 text-lg font-medium">
              ROI avg from SEO investment
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-20 grid md:grid-cols-2 gap-16">
          {/* Left heading */}
          <motion.h3
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Grow visibility. Build trust. Win customers. <br /> Unlock
            sustainable organic growth.
          </motion.h3>

          {/* Right text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-gray-700 text-lg"
          >
            <p>
              <span className="font-semibold text-black">
                Your website is the first impression for Google
              </span>{" "}
              and the last impression for your customers—making it absolutely
              essential.
            </p>
            <p>
              Our SEO team has successfully guided over{" "}
              <span className="font-semibold">200+ websites</span> in expanding
              their organic presence. Our focus is clear: develop{" "}
              <span className="font-semibold">crawlable, indexable</span>{" "}
              websites, deliver a distinctive{" "}
              <span className="font-semibold">experience</span> that competitors
              cannot easily replicate, and ensure{" "}
              <span className="font-semibold">performance</span> that sets new
              industry standards.
            </p>
            <p>
              We provide a fully managed SEO solution that aligns seamlessly
              with your product strategy. By collaborating closely with
              development teams, we build a prioritised roadmap strengthened by
              shared expertise. We also specialise in{" "}
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                search experience optimisation
              </span>
              .
            </p>

            {/* Award */}
            <div className="pt-6 font-bold text-xl flex items-center gap-2">
              <span>🏆</span>
              <p>
                BEST LARGE SEARCH AGENCY <br /> AT GLOBAL SEARCH AWARDS
              </p>
              <span>🏆</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DigitalPage = () => {
  return (
    <section className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              The Digital Marketing <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
                Agency For Higher ROI
              </span>
            </h1>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-yellow-500 text-xl">★★★★★</span>
              <p className="text-lg font-medium">
                4.9 <span className="text-gray-500">/ 5.0</span>
              </p>
              <span className="text-gray-400">• Trusted by 500+ Brands</span>
            </div>
            <p className="text-gray-600 mt-6 max-w-lg">
              Choose success with our digital marketing agency, dedicated to
              delivering higher ROI that propels your business to new heights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#book"
                className="px-8 py-3 rounded-full bg-black text-white font-semibold shadow hover:bg-gray-900 transition text-center"
              >
                BOOK A CALL →
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#services"
                className="px-8 py-3 rounded-full border border-gray-400 text-gray-800 font-semibold hover:bg-gray-100 transition text-center"
              >
                OUR SERVICES →
              </motion.a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center md:justify-end"
          >
            <Image
              src="/others/trend.png"
              alt="Trusted brands"
              width={480}
              height={420}
              className="rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        </div>

        {/* Auto Scrolling Slider */}
        <div className="mt-24 overflow-hidden relative">
          <motion.div
            className="flex gap-6 sm:gap-8 md:gap-10"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 240, // 4 minutes loop
              ease: "linear",
            }}
          >
            {[...slides, ...slides].map((slide, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="min-w-[75%] sm:min-w-[320px] md:min-w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[400px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {slide.category}
                  </p>
                  <h3 className="font-semibold text-xl mt-2">{slide.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade overlays */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Metrics Section */}
        <MetricsSection />
      </div>
    </section>
  );
};

export default DigitalPage;
