"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, Variants, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Pause, 
  Play, 
  ArrowRight, 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  Target 
} from "lucide-react";

// You can keep these imports if you have separate files, 
// but I have defined the FAQ section inline below to ensure it works standalone.
// import FAQSection from "../component/FAQ"; 

// --- TYPES ---
interface Card {
  title: string;
  desc?: string;
  description?: string;
  image: string;
  category?: string;
}

interface Slide {
  title: string;
  category: string;
  image: string;
}

interface Logo {
  name: string;
  img: string;
}

interface Strategy {
  title: string;
  color: string;
  description: string;
}

interface PortfolioSlide {
  title: string;
  description?: string;
  phone?: React.ReactNode;
}

interface ImageSlide {
  url: string;
  alt: string;
}

// --- CONSTANTS & DATA ---
const BRAND_GRADIENT = "bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";
const TEXT_GRADIENT = "bg-clip-text text-transparent bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";

const SLIDES: Slide[] = [
  { title: "Travelista", category: "Content Marketing", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80" },
  { title: "FitLife Studios", category: "Social Media", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80" },
  { title: "FreshNest", category: "Branding", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" },
  { title: "EcoKids", category: "Sustainability", image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=800&q=80" },
  { title: "EcoWorld", category: "SEO Strategy", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?w=800&q=80" },
];

const PORTFOLIO_SLIDES = [
  {
    title: "Presh-Ideas Everywhere",
    description: "Sometimes, just going to press with a story or hook isn't enough to drive demand at scale...",
    // Just the SCREEN CONTENT (the black background and icon), no borders or rounded corners
    phone: (
      <div className="w-full h-full bg-black flex items-center justify-center relative">
        <div className="text-center">
           {/* TikTok-ish Icon */}
           <svg className="w-20 h-20 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="currentColor">
             <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
           </svg>
           <p className="text-white text-lg font-bold">TikTok Trend</p>
        </div>
        {/* Optional UI elements to make it look like an app */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-around px-8">
           <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
           <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
           <div className="w-12 h-12 bg-white rounded-full -mt-2"></div>
           <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
           <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    title: "Presh-Ideas Live",
    description: "We help brands capture real-time moments and turn them into lasting impact through rapid response strategies.",
    // Just the SCREEN CONTENT
    phone: (
      <div className="w-full h-full bg-red-600 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-5xl font-bold mb-2">BBC</div>
          <div className="text-2xl font-bold tracking-[0.2em] bg-white text-red-600 px-2 py-1">NEWS</div>
          <div className="mt-8 text-sm font-medium opacity-80 uppercase tracking-widest">Live Coverage</div>
        </div>
      </div>
    ),
  },
];

const LOGOS: Logo[] = [
  { name: "Business Insider", img: "https://logo.clearbit.com/businessinsider.com" },
  { name: "Washington Post", img: "https://logo.clearbit.com/washingtonpost.com" },
  { name: "Daily Mail", img: "https://logo.clearbit.com/dailymail.co.uk" },
  { name: "Vogue", img: "https://logo.clearbit.com/vogue.com" },
  { name: "Forbes", img: "https://logo.clearbit.com/forbes.com" },
  { name: "TechCrunch", img: "https://logo.clearbit.com/techcrunch.com" },
];

const CARDS: Card[] = [
  {
    category: "Media",
    title: "Press Office",
    image: "https://images.unsplash.com/photo-1586281380384-e5d43616b9aa?w=800&q=80",
    description: "Professional media relations and press coverage management.",
  },
  {
    category: "Education",
    title: "Digital PR Training",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    description: "We share what we know. We train teams to lead Digital PR innovation.",
  },
  {
    category: "Analytics",
    title: "Data Reports",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    description: "In-depth market research and comprehensive data analysis.",
  },
  {
    category: "Strategy",
    title: "Creative Campaigns",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    description: "Innovative marketing strategies that capture attention.",
  },
  {
    category: "Branding",
    title: "Brand Strategy",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description: "Comprehensive brand development and positioning strategies.",
  },
];

const FAQS = [
  { question: "How many people are in the Digital PR team?", answer: "Our Digital PR team consists of a mix of strategists, creatives, and outreach specialists." },
  { question: "How do you work with traditional PR teams?", answer: "We complement traditional PR teams by integrating digital insights and SEO strategies." },
  { question: "How much does Digital PR cost?", answer: "Our pricing depends on campaign scope, goals, and duration tailored to your needs." },
  { question: "How fast can we see results?", answer: "Results can start appearing within weeks, but long-term visibility builds progressively." },
];

const APPROACH_IMAGES = [
  { url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=900&fit=crop", alt: "Strategy" },
  { url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=900&fit=crop", alt: "Digital" },
  { url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop", alt: "Team" },
];

const STRATEGIES = [
  { title: "PUSH", color: "blue", description: "You nearly always have a brand or product message you want to push to the world through PR and Media. Our push strategies include product PR, press office, data reports and studies." },
  { title: "PULL", color: "cyan", description: "Alongside this, we have an always-on pull strategy, pulling you into media moments that are happening. We track the media so you don't have to, reacting with products, commentary or data." },
  { title: "POW", color: "purple", description: "And finally, pow moments. You can't lead a category without creating PR work people remember. We run bimonthly, quarterly or biannually PR campaigns, often tied with social and creators." },
];

// --- HELPER COMPONENTS ---

const Counter = ({ from, to, duration = 1.6, suffix = "", prefix = "" }: { from: number; to: number; duration?: number; suffix?: string; prefix?: string }) => {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setValue(Math.floor(from + (to - from) * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="text-indigo-400 font-medium">{prefix}</span>
      <span className="text-4xl md:text-5xl font-extrabold text-white">{value}</span>
      <span className="text-indigo-400 font-medium">{suffix}</span>
    </span>
  );
};

// --- SECTION COMPONENTS ---

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-[#0F1115] text-white rounded-[3rem] overflow-hidden p-8 md:p-16 border border-white/10 shadow-2xl"
      >
        <div className="absolute inset-0 opacity-[0.07]" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
        />
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-b border-white/10 pb-12 mb-12">
            <div className="md:pr-12 md:border-r border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Value Generated</span>
              </div>
              <Counter from={0} to={100} prefix="$" suffix="m" />
              <p className="text-sm text-white/40 leading-relaxed">Incremental revenue generated for our partners.</p>
            </div>
            <div className="md:px-12 md:border-r border-white/10 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">Expert Team</span>
              </div>
              <Counter from={0} to={40} suffix="+" />
              <p className="text-sm text-white/40 leading-relaxed">Dedicated strategists & technical SEOs.</p>
            </div>
            <div className="md:pl-12 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-xs uppercase tracking-widest font-semibold">ROI Average</span>
              </div>
              <Counter from={0} to={6} suffix="x" />
              <p className="text-sm text-white/40 leading-relaxed">Average return on investment.</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-white mb-6">
                Grow visibility. <br/> 
                Build trust. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Win customers.
                </span>
              </h3>
            </div>
            <div className="space-y-8">
              <div className="text-lg text-white/70 leading-relaxed space-y-6">
                <p><strong className="text-white">Your website is the first impression for Google</strong> and the last impression for your customers.</p>
                <p>We provide fully managed SEO that aligns with product strategy and engineering, prioritising performance.</p>
              </div>
              <div className="inline-flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-4 rounded-2xl transition-colors cursor-default">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/20 text-2xl">🏆</div>
                <div>
                  <div className="font-bold text-white tracking-wide text-sm">BEST LARGE SEARCH AGENCY</div>
                  <div className="text-white/40 text-xs mt-0.5 font-medium tracking-widest uppercase">Global Search Awards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const MultiSliderShowcase: React.FC = () => {
  const duplicatedLogos = [...LOGOS, ...LOGOS, ...LOGOS];
  const duplicatedCards = [...CARDS, ...CARDS, ...CARDS];

  return (
    <div className="py-20 overflow-hidden relative selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto mb-20 px-4">
        <div className="text-center mb-10">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase">Trusted by Industry Leaders</h2>
        </div>
        <div className="relative w-full overflow-hidden mask-fade-sides">
          <div className="flex w-max animate-scroll-left gap-16 md:gap-24 hover:pause-animation">
            {duplicatedLogos.map((logo, idx) => (
              <div key={`logo-${idx}`} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300">
                <img src={logo.img} alt={logo.name} className="h-8 md:h-10 w-auto object-contain grayscale" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">Our Expertise</h2>
            <p className="text-gray-500 text-lg">Strategies that drive real growth.</p>
          </div>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-scroll-slow gap-6 px-4 hover:pause-animation">
            {duplicatedCards.map((card, idx) => (
              <div key={`card-${idx}`} className="group relative w-[280px] md:w-[360px] h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-gray-900 border border-gray-200 cursor-pointer shadow-xl">
                <div className="absolute inset-0 w-full h-full">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="absolute top-6 right-6 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ArrowUpRight className="text-white w-5 h-5" />
                    </div>
                  </div>
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-2 block">{card.category}</span>
                    <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{card.title}</h3>
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">
                      <div className="overflow-hidden">
                        <p className="text-white/70 text-sm leading-relaxed pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ENHANCED Unique Approach Section
const UniqueApproachSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % APPROACH_IMAGES.length), 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div className="relative py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={APPROACH_IMAGES[current].url}
                alt="Strategy"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Play/Pause Indicator */}
            <div className="absolute bottom-8 right-8 z-20">
               <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                 {isPaused ? <Play className="w-5 h-5 ml-1" /> : <Pause className="w-5 h-5" />}
               </button>
            </div>

            {/* Slider Dots */}
            <div className="absolute bottom-8 left-8 flex gap-2 z-20">
              {APPROACH_IMAGES.map((_, idx) => (
                <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-8 bg-white" : "w-2 bg-white/40"}`} />
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Our Unique Approach</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                How we run Digital PR for our clients
              </h2>
            </div>

            <div className="space-y-6">
              {STRATEGIES.map((strategy, idx) => (
                <div key={idx} className="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <h3 className={`text-xl font-bold mb-2 flex items-center gap-3 ${
                    strategy.color === 'blue' ? 'text-blue-600' : 
                    strategy.color === 'cyan' ? 'text-cyan-600' : 'text-purple-600'
                  }`}>
                    {strategy.title}
                    <span className="h-px flex-1 bg-gray-100 group-hover:bg-gray-200 transition-colors" />
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{strategy.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#" className="inline-flex items-center gap-2 text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                View All Case Studies <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

// Enhanced Portfolio Section
const PortfolioSection: React.FC<{ heading?: string; subheading?: string; slides?: PortfolioSlide[]; interval?: number }> = ({ 
  heading = "Our Portfolio", 
  subheading = "Showcasing our best work", 
  slides = [], 
  interval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const changeSlide = (newIndex: number) => {
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  };

  if (!slides.length) return null;
  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      
      {/* Dynamic Blurred Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-pink-50/80"
          >
             {/* Optional: Add abstract shapes that move slightly based on slide */}
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-200/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-green-50 border border-blue-100 text-green-600 text-xs font-bold tracking-widest uppercase mb-4">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              {heading || "Digital Experiences"}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              {subheading}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {currentSlideData.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-green-500 pl-6">
                    {currentSlideData.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {["Strategy", "Design", "Development"].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100 text-sm text-gray-600 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => changeSlide((currentSlide - 1 + slides.length) % slides.length)}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all group"
                    >
                      <ArrowRight className="w-5 h-5 rotate-180 transition-transform group-hover:-translate-x-1" />
                    </button>
                    <button 
                      onClick={() => changeSlide((currentSlide + 1) % slides.length)}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all group"
                    >
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                  
                  {/* Progress Line */}
                  <div className="flex-1 h-px bg-gray-200 max-w-[200px] relative overflow-hidden">
                    <motion.div 
                      key={currentSlide}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: interval / 1000, ease: "linear" }}
                      className="absolute inset-0 bg-black"
                    />
                  </div>
                  <span className="text-sm font-mono text-gray-400">
                    0{currentSlide + 1} / 0{slides.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: 3D Device Showcase */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
            <motion.div
              className="relative w-[300px] md:w-[340px] aspect-[9/19] bg-black rounded-[3.5rem] shadow-2xl border-[8px] border-gray-900 ring-1 ring-gray-900/50 overflow-hidden"
              initial={{ rotateY: 15, rotateX: 5 }}
              animate={{ rotateY: [15, -5, 15], rotateX: [5, -5, 5] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Screen Content */}
              <div className="absolute inset-0 bg-gray-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full"
                  >
                    {currentSlideData.phone}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Notch / Reflection Overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-30" />
            </motion.div>
            
            {/* Decorative blurred shadow */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-black/40 blur-2xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};

// Simple FAQ Component (Inline to prevent import errors)
const FAQSection = ({ title, faqs }: { title: string, faqs: { question: string, answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
              <span className={`transform transition-transform ${openIndex === idx ? "rotate-45" : ""}`}>+</span>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-gray-50">
                  <div className="p-6 pt-0 text-gray-600">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- MAIN PAGE ---
const DigitalPage = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 mb-8 border border-slate-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-slate-600">ROI-Focused Agency</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
              Digital Marketing <br />
              <span className={TEXT_GRADIENT}>for High Growth.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              We design creative systems that turn attention into conversion. Data-driven strategies, shipped with precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className={`px-8 py-4 rounded-full text-white font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform ${BRAND_GRADIENT}`}>
                Book a Strategy Call
              </button>
              <button className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                View Case Studies
              </button>
            </div>
          </motion.div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00C96D]/20 to-[#2D79FF]/20 rounded-full blur-[100px]" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white bg-white">
               <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
                  {/* Placeholder for Hero Dashboard Image */}
                  <div className="text-center">
                    <p className="text-gray-400 font-medium">Dashboard Preview</p>
                    <div className="mt-4 w-64 h-32 bg-gray-200 rounded-xl mx-auto"></div>
                    <div className="mt-4 flex gap-4 justify-center">
                       <div className="w-20 h-20 bg-blue-100 rounded-full"></div>
                       <div className="w-20 h-20 bg-green-100 rounded-full"></div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SLIDER */}
      <div className="mt-16 relative w-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-blue-500/5 to-transparent blur-3xl -z-10" />
        <div className="flex animate-scroll-left hover:pause-animation w-max gap-5 sm:gap-8 px-4">
          {[...SLIDES, ...SLIDES, ...SLIDES].map((slide, idx) => (
            <div key={`${slide.title}-${idx}`} className="relative min-w-[280px] sm:min-w-[350px] md:min-w-[400px] aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0 group cursor-pointer border border-white/10 bg-gray-900">
              <div className="absolute inset-0">
                <Image src={slide.image} alt={slide.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              </div>
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end items-start text-white">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-white/90">
                    {slide.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2 group-hover:text-blue-200 transition-colors">
                  {slide.title}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                   <span>Read case study</span>
                   <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. IMPACT METRICS */}
      <ImpactSection />

      {/* 4. EXPERTISE SHOWCASE */}
      <MultiSliderShowcase />

      {/* 5. APPROACH SECTION (Restored) */}
      <UniqueApproachSection />

      {/* 6. PORTFOLIO */}
      <PortfolioSection 
        heading="" 
        subheading="Products that competitors try to copy" 
        slides={PORTFOLIO_SLIDES} 
        interval={6000} 
      />

      {/* 7. FAQ */}
      <FAQSection title="FAQs About PreshIdeas" faqs={FAQS} />

      {/* --- GLOBAL STYLES --- */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @keyframes scroll-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }

        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-slow {
          animation: scroll-slow 60s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
        .mask-fade-sides {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </main>
  );
};

export default DigitalPage;