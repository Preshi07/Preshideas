"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import UniqueApproachSection from "../component/approachSection";

type Slide = {
  title: string;
  category: string;
  image: string;
};

type CounterProps = {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
};

type Card = {
  title: string;
  desc: string;
  image: string;
};

const slides: Slide[] = [
  { title: "Travelista", category: "Content Marketing", image: "/others/team002.png" },
  { title: "FitLife Studios", category: "Social Media Marketing", image: "/others/team0.png" },
  { title: "FreshNest", category: "Content Marketing", image: "/others/team1.png" },
  { title: "EcoKids", category: "Content Marketing", image: "/others/team00.png" },
  { title: "EcoWorld", category: "SEO Strategy", image: "/others/team01.png" },
];

const cards: Card[] = [
  {
    title: "Keyword Universe & Search Journeys",
    desc: "We integrate audience insight into keyword journeys and map out full paths from trigger to purchase.",
    image: "/hero3.png",
  },
  { title: "Content Strategy", desc: "Craft stories and campaigns that convert through creative data-driven insight.", image: "/seo.jpg" },
  { title: "Creative Positioning & Brand Strategy Playbooks", desc: "Define your visual and narrative identity that resonates with your audience.", image: "/hero1.png" },
  { title: "Audience Modelling", desc: "Build synthetic audiences to test creative performance and engagement at scale.", image: "/hero0.jpg" },
];

const logos = ["/logos/google.png", "/logos/bing.png", "/logos/youtube.png", "/logos/snapchat.png", "/logos/linkedin.png", "/logos/pinterest.png"];

// Smooth numeric counter (tweened)
const Counter = ({ from, to, duration = 1.6, suffix = "", prefix = "" }: CounterProps) => {
  const [value, setValue] = useState(from);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = null;
    const step = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const progress = Math.min((t - startRef.current) / (duration * 1000), 1);
      const current = Math.round(from + (to - from) * progress);
      setValue(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration]);

  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="text-indigo-400 font-medium">{prefix}</span>
      <span className="text-4xl md:text-5xl font-extrabold text-gray-900">{value}</span>
      <span className="text-indigo-400 font-medium">{suffix}</span>
    </span>
  );
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const MetricsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="bg-gradient-to-r from-indigo-50/60 via-white to-pink-50/60 rounded-3xl p-8 md:p-12 shadow-xl border border-white/30" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            <div className="flex flex-col gap-3">
              <Counter from={0} to={100} suffix="m" prefix="$" />
              <p className="text-sm text-gray-500">Incremental value</p>
            </div>

            <div className="flex flex-col gap-3">
              <Counter from={0} to={40} suffix="+" />
              <p className="text-sm text-gray-500">Strong organic team</p>
            </div>

            <div className="flex flex-col gap-3">
              <Counter from={0} to={6} suffix="x" />
              <p className="text-sm text-gray-500">ROI avg from SEO investment</p>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">Grow visibility. Build trust. Win customers. <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">Unlock sustainable organic growth.</span></h3>
            </div>

            <div className="text-gray-700 space-y-4">
              <p className="text-sm md:text-base"><span className="font-semibold text-gray-900">Your website is the first impression for Google</span> and the last impression for your customers—making it absolutely essential.</p>
              <p className="text-sm md:text-base">Our SEO team has successfully guided over <span className="font-semibold">200+ websites</span> in expanding their organic presence. We build <span className="font-semibold">crawlable, indexable</span> websites and craft a <span className="font-semibold">distinctive experience</span>.</p>
              <p className="text-sm md:text-base">We provide fully managed SEO that aligns with product strategy and engineering, prioritising performance and search experience optimisation.
              </p>

              <div className="mt-4 inline-flex items-center gap-3 bg-white/60 border border-white/40 px-4 py-2 rounded-xl shadow-sm">
                <span className="text-2xl">🏆</span>
                <div className="text-xs md:text-sm">
                  <div className="font-semibold">BEST LARGE SEARCH AGENCY</div>
                  <div className="text-gray-500">GLOBAL SEARCH AWARDS</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Channels = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const logoControls = useAnimation();
  const cardControls = useAnimation();

  useEffect(() => {
    const animateLoop = async (controls: any, distance: string, duration: number) => {
      await controls.start({ x: ["0%", `-${distance}`], transition: { x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration } } });
    };
    animateLoop(logoControls, "50%", 28);
    animateLoop(cardControls, "50%", 34);
  }, [logoControls, cardControls]);

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden py-6">
          <motion.div animate={logoControls} className="flex gap-10 w-[200%] items-center opacity-90">
            {[...logos, ...logos].map((src, i) => (
              <div key={i} className="flex-shrink-0 flex items-center justify-center w-36 h-14 bg-white/60 rounded-lg p-2 shadow-inner">
                <Image src={src} alt={`logo-${i}`} width={140} height={40} className="object-contain" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl">
          <motion.div animate={cardControls} className="flex gap-6 w-[200%] py-6">
            {[...cards, ...cards].map((card, idx) => (
              <motion.div key={idx} onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)} animate={{ scale: hovered === idx ? 1.03 : 1, y: hovered === idx ? -8 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="min-w-[320px] max-w-[380px] bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden cursor-pointer">
                <div className="relative h-52 md:h-60">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-semibold">{card.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function DigitalPage() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const slideVariant: Variants = {
    enter: { opacity: 0, x: 40, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -40, scale: 0.98 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 text-gray-900">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">The Digital Marketing <span className="block md:inline bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-indigo-600">Agency For Higher ROI</span></h1>

            <p className="mt-6 text-gray-700 max-w-xl">Choose success with our gradient-driven motion agency — creative systems that turn attention into conversion. We design with empathy, ship with precision.</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#book" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold shadow-lg">BOOK A CALL →</motion.a>
              <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href="#services" className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 bg-white/60 backdrop-blur-sm font-semibold">OUR SERVICES →</motion.a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg shadow-sm border border-white/30">★★★★★ <span className="font-medium ml-1">4.9</span></div>
              <div className="text-gray-500">Trusted by 500+ Brands</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex justify-center md:justify-end">
            <div className="w-[480px] h-[420px] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-pink-50/60 to-indigo-50/60 border border-white/30">
              <Image src="/others/trend.png" alt="Trusted brands" width={480} height={420} className="object-cover" />
            </div>
          </motion.div>
        </div>

        {/* Auto Scrolling Slider (Gradient cards) */}
        <div className="mt-16 relative overflow-hidden">
          <motion.div className="flex gap-6 md:gap-8" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
            {[...slides, ...slides].map((slide, idx) => (
              <motion.div key={idx} variants={slideVariant} initial="enter" animate="center" exit="exit" whileHover={{ scale: 1.02 }} className="min-w-[72%] sm:min-w-[300px] md:min-w-[380px] bg-white rounded-3xl shadow-xl overflow-hidden border border-white/30">
                <div className="relative h-56 md:h-72">
                  <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                </div>
                <div className="p-5 bg-gradient-to-r from-white to-white/80">
                  <p className="text-xs uppercase tracking-wide text-gray-500">{slide.category}</p>
                  <h3 className="mt-2 text-xl font-semibold">{slide.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        <MetricsSection />
        <Channels />
        <UniqueApproachSection />
      </section>
    </main>
  );
}
