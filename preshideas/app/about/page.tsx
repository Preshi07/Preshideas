"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  ArrowRight,
  Play,
  Pause,
  Star,
  ArrowUpRight,
  CheckCircle2,
  ArrowLeft,
  Quote,
} from "lucide-react";
// FIXED: Added 'Variants' and 'AnimatePresence' to imports
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Custom component imports
import UniqueApproachSection from "../component/IntroApproachSection";
import NewsSection from "../component/newsSection";

// --- ANIMATION VARIANTS (FIXED: Typed as Variants) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// --- SUB-COMPONENTS ---

const ScrollingBackground = ({ images }: { images: any[] }) => {
  const displayImages = [...images, ...images, ...images];

  return (
    <div className="w-full py-12 overflow-hidden bg-white">
      <div className="flex animate-scroll-left hover:pause-animation">
        {displayImages.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-2 w-[280px] sm:w-[350px] md:w-[400px]"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
              <img
                src={img.src}
                alt={img.alt || "Team member"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold text-lg">{img.name}</p>
                <p className="text-white/80 text-sm">{img.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LogoCarousel = ({ logos }: { logos: { src: string; alt: string }[] }) => {
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-white py-12 border-y border-gray-100 relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="flex overflow-hidden group">
        <div className="flex animate-scroll-left-fast group-hover:pause-animation gap-12 sm:gap-20 px-10">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamHighlight = ({ staffs }: { staffs: any[] }) => {
  const featured = staffs[0];
  const others = staffs.slice(1);

  return (
    <section className="relative w-full py-24 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16 md:flex justify-between items-end"
        >
          <div>
            <Badge
              variant="outline"
              className="mb-4 text-white/70 border-white/20"
            >
              The Squad
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Risers
              </span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-white/60 max-w-md text-right">
            A collective of strategists, creators, and developers obsessed with
            growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm hover:border-white/20 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-gray-800 relative group">
                <img
                  src={featured?.src}
                  alt={featured?.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <Badge className="w-fit mb-3 bg-blue-600 hover:bg-blue-700">
                  Lead
                </Badge>
                <h3 className="text-3xl font-bold mb-1">{featured?.name}</h3>
                <p className="text-blue-300 font-medium mb-4">
                  {featured?.role}
                </p>
                <p className="text-white/70 leading-relaxed mb-6">
                  {featured?.bio}
                </p>
                <Button variant="secondary" className="w-fit rounded-full">
                  Connect on LinkedIn <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {others.map((member: any, idx: number) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/10 group-hover:border-white/30">
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-white/70 line-clamp-2">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BentoStats = () => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 98;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Experience Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-gray-50 rounded-[2rem] p-10 flex flex-col justify-between hover:shadow-lg transition-shadow border border-gray-100 min-h-[350px]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-500">Experience</h3>
              <p className="text-sm text-gray-400 mt-1">
                Market tested strategies
              </p>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          <div className="mt-8">
            <span className="text-7xl md:text-8xl font-bold tracking-tighter text-gray-900">
              8
            </span>
            <span className="text-3xl text-gray-400 ml-2">Years</span>
            <p className="text-xl text-gray-600 mt-4 max-w-md leading-relaxed">
              Driving meaningful results across Europe and beyond through SEO,
              PR, and content.
            </p>
          </div>
        </motion.div>

        {/* Retention Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-1 md:row-span-2 bg-[#06070A] rounded-[2rem] p-8 flex flex-col justify-between text-white relative overflow-hidden group min-h-[450px]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-blue-500/20 blur-[80px] group-hover:bg-blue-500/30 transition-colors" />

          <div className="relative z-10">
            <div className="flex -space-x-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-xs font-bold"
                >
                  {["JD", "MK", "AL", "TR"][i - 1]}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-white text-black flex items-center justify-center text-xs font-bold">
                +72
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Client Retention</h3>
            <p className="text-white/60 text-sm">
              Clients stay for our quality and results.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <div className="flex items-baseline">
              <span className="text-7xl font-bold">{count}</span>
              <span className="text-4xl text-blue-400">%</span>
            </div>
          </div>
        </motion.div>

        {/* Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50/50 border border-blue-100 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center hover:bg-blue-50 transition-colors min-h-[250px]"
        >
          <h3 className="text-5xl font-bold text-blue-900 mb-2">100+</h3>
          <p className="text-blue-700/80 font-medium">Projects Delivered</p>
        </motion.div>

        {/* Brands Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-purple-50/50 border border-purple-100 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center hover:bg-purple-50 transition-colors min-h-[250px]"
        >
          <h3 className="text-5xl font-bold text-purple-900 mb-2">86</h3>
          <p className="text-purple-700/80 font-medium">Brands Transformed</p>
        </motion.div>
      </div>
    </section>
  );
};

// --- ENHANCED TESTIMONIAL GALLERY COMPONENT ---
interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  image: string;
  profile: string;
}

interface TestimonialGalleryProps {
  title?: string;
  highlight?: string;
  suffix?: string;
  gallery: TestimonialItem[];
  interval?: number;
  logos?: string[];
}

function TestimonialGallery({
  title = "Recommended by",
  highlight = "category",
  suffix = "leaders",
  gallery = [],
  interval = 8000,
  logos = [],
}: TestimonialGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  }, [gallery.length]);

  useEffect(() => {
    if (!autoPlay || !gallery.length) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, gallery.length, interval, nextSlide]);

  if (!gallery.length) return null;
  const item = gallery[current];

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="relative bg-[#06070A] text-white rounded-[2.5rem] overflow-hidden p-8 md:p-16 isolate">
        {/* Background Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* --- HEADER --- */}
        <div className="relative z-10 flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-yellow-400 fill-yellow-400"
              >
                ★
              </motion.div>
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight">
            {title}{" "}
            <span className="relative inline-flex flex-col md:flex-row items-center justify-center align-middle gap-3 mx-1">
              <span className="italic font-serif text-white/80">
                {highlight}
              </span>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={item.profile}
                  initial={{ width: 0, opacity: 0, scale: 0 }}
                  animate={{ width: "auto", opacity: 1, scale: 1 }}
                  exit={{ width: 0, opacity: 0, scale: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  className="inline-block align-middle"
                >
                  <Avatar className="w-12 h-12 md:w-16 md:h-16 border-2 border-white/20 shadow-xl">
                    <AvatarImage src={item.profile} className="object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </motion.div>
              </AnimatePresence>
            </span>{" "}
            {suffix}
          </h2>
        </div>

        {/* --- MAIN SLIDER --- */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-stretch"
            >
              {/* Quote Card */}
              <div className="bg-white text-black rounded-3xl p-8 md:p-12 flex flex-col justify-between shadow-2xl relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-100 fill-gray-100 rotate-180" />

                <div className="relative z-10">
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-tight">
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-4 pt-8 border-t border-gray-100">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.profile} />
                    <AvatarFallback>{item.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg">{item.author}</div>
                    <div className="text-gray-500 text-sm">{item.role}</div>
                  </div>
                </div>
              </div>

              {/* Image Card */}
              <div className="relative h-[300px] lg:h-auto rounded-3xl overflow-hidden group">
                <motion.img
                  key={item.image}
                  src={item.image}
                  alt="Project result"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Client Success Story
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* --- CONTROLS --- */}
          <div className="mt-10 flex items-center justify-between">
            {/* Progress Bar */}
            <div className="flex-1 max-w-sm h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                key={current}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: interval / 1000, ease: "linear" }}
                className="h-full bg-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setAutoPlay(false);
                  prevSlide();
                }}
                className="rounded-full w-12 h-12 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setAutoPlay(false);
                  nextSlide();
                }}
                className="rounded-full w-12 h-12 border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function About() {
  const [isPlaying, setIsPlaying] = useState(true);

  const staffs = [
    {
      src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80",
      name: "Precious Iheanacho",
      role: "Founder & CEO",
      bio: "B2B & Saas Writer | Content Marketing | Workflow Automation — 7+ years building brands.",
    },
    {
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
      name: "Seun",
      role: "Head of Strategy",
      bio: "Turns insight into clear growth plans and measurable outcomes.",
    },
    {
      src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
      name: "Violet Okonkwo",
      role: "Creative Director",
      bio: "Design lead crafting stories and visual systems that scale.",
    },
    {
      src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
      name: "Seidu Tesleem",
      role: "Developer",
      bio: "Builds reliable experiences and automations that keep teams moving.",
    },
  ];

  const logos = [
    { src: "/logos/ecosatisfaction.png", alt: "Logo 1" },
    { src: "/logos/logo2.png", alt: "Logo 2" },
    { src: "/logos/logo3.png", alt: "Logo 3" },
    { src: "/logos/logo4.png", alt: "Logo 4" },
    { src: "/logos/logo5.png", alt: "Logo 5" },
    { src: "/logos/logo6.png", alt: "Logo 6" },
  ];

  const testimonials = [
    {
      quote:
        "We are a proud partner of Preshideas. They've delivered tangible organic results across Europe and gone above and beyond using creativity for holistic impact.",
      author: "Tim Giles",
      role: "Head of SEO, JD Sports",
      image:
        "https://images.unsplash.com/photo-1606813902781-82e6937f1f49?auto=format&fit=crop&w=1600&q=80",
      profile:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=200&q=80",
    },
    {
      quote:
        "Preshideas' creative approach to SEO and PR brought immense value and fueled digital growth for our brand.",
      author: "Matt Holmes",
      role: "Head of Digital, PLT",
      image:
        "https://images.unsplash.com/photo-1616628198927-38f91f48d09e?auto=format&fit=crop&w=1600&q=80",
      profile:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  ];

  const cards = [
    {
      category: "Technology",
      image: "/article1.jpg",
      imageAlt: "Tech article",
      authors: [{ name: "John Doe", avatar: "/john.jpg" }],
      readTime: "5 min",
      title: "The Future of AI",
      link: "/blog/ai-future",
    },
    {
      category: "Design",
      image: "/article2.jpg",
      imageAlt: "Design article",
      authors: [{ name: "Jane Smith" }],
      readTime: "3 min",
      title: "Modern UI Trends",
      link: "/blog/ui-trends",
    },
    {
      category: "Design",
      image: "/article2.jpg",
      imageAlt: "Design article",
      authors: [{ name: "Jane Smith" }],
      readTime: "3 min",
      title: "Modern UI Trends",
      link: "/blog/ui-trends",
    },
  ];

  return (
    <main className="relative w-full bg-white overflow-hidden selection:bg-black selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 px-6 md:px-12 max-w-[1500px] mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 xl:gap-24 items-center">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 text-sm font-medium text-gray-500"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for new projects
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tight text-gray-900"
            >
              We craft <br />
              <span className="font-serif font-light italic text-gray-500">
                PreshIdeas
              </span>{" "}
              <br />
              that scale.
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4"
            >
              <Button
                size="lg"
                className="rounded-full h-14 px-8 text-base group bg-black hover:bg-gray-800 transition-all"
              >
                Start a Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-xs lg:text-sm text-gray-700">
                (21.0278° N, 105.8342° E)
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Video/Interactive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="absolute -top-12 -left-12 w-32 h-32 z-20 hidden md:block">
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
                      GAIN GROWTH • GAIN GROWTH •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-900 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                poster="/preview.png"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-couple-watching-tv-together-4642-large.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute bottom-6 right-6 z-20">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-1" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INFINITE TEAM SCROLL */}
      <ScrollingBackground images={staffs} />

      {/* 3. LOGO CAROUSEL */}
      <LogoCarousel logos={logos} />

      {/* 4. PHILOSOPHY & STORY SECTION */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex justify-end"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-right">
            Turning{" "}
            <span className="font-serif italic text-gray-400">Vision</span> into{" "}
            <br />
            <span className="font-bold text-black">Reality</span>
          </h1>
        </motion.div>

        <div className="space-y-32">
          {/* --- 01. PHILOSOPHY --- */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-9xl font-bold text-gray-100/50 absolute -translate-y-12 -translate-x-6 -z-10 select-none">
                01
              </span>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-black"></div>
                <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                  Who We Are
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Philosophy
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Presh Ideas is a strategic content, digital PR, SEO, and
                automation agency helping brands communicate better, strengthen
                authority, and scale with clarity. We believe growth shouldn’t
                depend on guesswork. It should come from strong messaging,
                structured visibility, and the right systems working behind the
                scenes.
              </p>

              <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                {[
                  {
                    bold: "Clarity:",
                    text: "Because people only buy what they understand.",
                  },
                  {
                    bold: "Credibility:",
                    text: "Because trust drives decisions.",
                  },
                  {
                    bold: "Consistency:",
                    text: "Because visibility compounds.",
                  },
                  {
                    bold: "Efficiency:",
                    text: "Because automation scales what works.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                    <p className="text-sm text-gray-600">
                      <strong className="text-black block mb-0.5">
                        {item.bold}
                      </strong>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border-l-4 border-black">
                <p className="text-gray-900 font-medium italic">
                  "Our work blends storytelling, organic growth, and smart
                  systems to help you grow sustainably."
                </p>
              </div>
            </motion.div>

            {/* Right: Visual Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] w-full"
            >
              {/* Back Image */}
              <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80"
                  alt="Strategy Meeting"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Front Image (Floating) */}
              <div className="absolute bottom-0 left-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                  alt="Teamwork"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>

          {/* --- 02. STORY (Reversed Layout) --- */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Visual (Single Large with Tags) */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Our Story"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                {/* Floating Label */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur px-6 py-3 rounded-full shadow-lg">
                  <p className="font-semibold text-sm tracking-wide">
                    EST. 2018
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-9xl font-bold text-gray-100/50 absolute -translate-y-12 -translate-x-6 -z-10 select-none">
                02
              </span>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-black"></div>
                <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
                  The Origin
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <div className="text-lg text-gray-600 leading-relaxed mb-8 space-y-4">
                <p>
                  Presh Ideas was built on a simple observation: Most brands are
                  doing too much and achieving too little—because their message
                  is unclear and their systems aren’t working.
                </p>
                <p>
                  Instead of offering scattered marketing services, we created
                  an integrated approach combining:
                </p>
              </div>

              {/* Integrated Approach Tags */}
              <div className="flex flex-wrap gap-3 mb-10">
                {[
                  "Content Strategy",
                  "SEO & Visibility",
                  "Digital PR",
                  "Growth Systems",
                  "Workflow Automation & AI",
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white transition-colors rounded-lg text-sm font-medium cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-t border-gray-100 pt-8">
                <p className="text-sm font-medium text-gray-500 max-w-xs">
                  This lets businesses build real authority, not temporary
                  attention.
                </p>
                <Button className="rounded-full px-8" size="lg">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <TeamHighlight staffs={staffs} />

      {/* 6. STATS (Bento Grid) */}
      <BentoStats />

      {/* 7. MISSION & VALUES (Enhanced Bento Layout) */}
      <section className="px-6 pb-24 max-w-7xl mx-auto mt-24">
        <div className="relative bg-gray-50/80 rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden border border-gray-100">
          {/* Decorative Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Mission & Vision */}
            <div className="flex flex-col gap-6">
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-target"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To empower brands with powerful communication, intentional
                  visibility, and sustainable growth systems that operate on
                  autopilot.
                </p>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-compass"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the most trusted partner for clarity-driven content,
                  organic brand visibility, and AI-powered digital
                  transformation.
                </p>
              </motion.div>
            </div>

            {/* Right Column: Values & CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0D0D0D] text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Core Values</h3>
                  <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/70">
                    DNA
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Clarity",
                    "Credibility",
                    "Insight",
                    "Consistency",
                    "Innovation",
                    "Integrity",
                  ].map((val, idx) => (
                    <motion.div
                      key={val}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-default border border-white/5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-white/90">
                        {val}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-white/60 text-sm mb-4">
                  Ready to build something lasting?
                </p>
                <Button
                  className="w-full h-12 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-semibold text-base group"
                  size="lg"
                >
                  Work With Us
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF & NEWS */}
      <div className="bg-black text-white">
        <TestimonialGallery
          title="Trusted by"
          highlight="industry"
          suffix="leaders"
          gallery={testimonials as any}
          interval={7000}
        />
      </div>

      <div className="py-24 bg-white">
        <NewsSection
          heading="Latest Articles"
          headingImage={{ url: "/blog-icon.jpg", alt: "Blog" }}
          ctaText="View All Posts"
          ctaLink="/blog"
          cards={cards}
        />
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        @keyframes scroll-left-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-left-fast {
          animation: scroll-left-fast 20s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
}
