"use client";

import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, Play, Pause } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Counter from "../component/counter";
import { Button } from "@/components/ui/button";
import UniqueApproachSection from "../component/IntroApproachSection";
import TestimonialGallery from "../component/Client";
import NewsSection from "../component/newsSection"; 

// Animation variants for sections and items
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

interface HeroSectionProps {
  staffs: {
    src: string;
    alt?: string;
    name?: string;
    role?: string;
    bio?: string;
  }[];
}
interface LogoCarouselProps {
  logos: { src: string; alt: string }[];
}

interface ParallaxImageProps {
  className?: string;
}

interface StatItemProps {
  number: string;
  label: string;
  description: string;
  delay?: number;
}

const staffs = [
  {
    src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1200&q=80",
    alt: "Precious Iheanacho",
    name: "Precious Iheanacho",
    role: "Founder & CEO",
    bio: "B2B & Saas Writer | Content Marketing | Workflow Automation — 7+ years building brands.",
  },
  {
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    alt: "Carlos Nguyen",
    name: "Carlos Nguyen",
    role: "Head of Strategy",
    bio: "Turns insight into clear growth plans and measurable outcomes.",
  },
  {
    src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80",
    alt: "Maya Patel",
    name: "Maya Patel",
    role: "Creative Director",
    bio: "Design lead crafting stories and visual systems that scale.",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    alt: "Seidu Tesleem",
    name: "Seidu Tesleem",
    role: "Devloper",
    bio: "Builds reliable experiences and automations that keep teams moving.",
  },
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

const logos = [
  { src: "/logos/ecosatisfaction.png", alt: "Logo 1" },
  { src: "/logos/logo2.png", alt: "Logo 2" },
  { src: "/logos/logo3.png", alt: "Logo 3" },
  { src: "/logos/logo4.png", alt: "Logo 4" },
  { src: "/logos/logo5.png", alt: "Logo 5" },
  { src: "/logos/logo6.png", alt: "Logo 6" },
];

const cards=[
    {
      category: "Technology",
      image: "/article1.jpg",
      imageAlt: "Tech article",
      authors: [{ name: "John Doe", avatar: "/john.jpg" }],
      readTime: "5 min",
      title: "The Future of AI",
      link: "/blog/ai-future"
    },
    {
      category: "Design",
      image: "/article2.jpg",
      imageAlt: "Design article",
      authors: [{ name: "Jane Smith" }],
      readTime: "3 min",
      title: "Modern UI Trends",
      link: "/blog/ui-trends"
    },
    {
      category: "Design",
      image: "/article2.jpg",
      imageAlt: "Design article",
      authors: [{ name: "Jane Smith" }],
      readTime: "3 min",
      title: "Modern UI Trends",
      link: "/blog/ui-trends"
    }
  ]
function ParallaxImage({ className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}></motion.div>
  );
}

interface ScrollingBackgroundProps {
  images: (string | { src: string; alt?: string })[];
}

const ScrollingBackground = ({ images }: ScrollingBackgroundProps) => {
  // normalize input: turn strings into { src, alt }
  const normalized = images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : img
  );

  // Duplicate images for seamless loop
  const duplicatedImages = [...normalized, ...normalized];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="flex animate-scroll-left h-full">
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[45vw] sm:w-[35vw] md:w-[28vw] lg:w-[25vw] min-w-[200px] h-full px-1 sm:px-2"
          >
            <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
              <img
                src={image.src}
                alt={image.alt ?? ""}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = ({ staffs }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen h-screen w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Scrolling Background Images */}
      <ScrollingBackground images={staffs} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-[clamp(2.5rem,12vw,12rem)] sm:text-[clamp(3.5rem,13vw,12rem)] md:text-[clamp(5rem,15vw,12rem)] font-bold leading-[0.9] tracking-tight text-white mb-6 sm:mb-8 drop-shadow-2xl max-w-7xl">
          Senior Team
        </h1>
        <Button
          variant="default"
          size="lg"
          className="relative z-20 group text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 shadow-xl"
        >
          Meet The Risers
          <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
};

const LogoCarousel = ({ logos }: LogoCarouselProps) => {
  // Triple duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-white py-8 sm:py-10 md:py-12 overflow-hidden border-t border-gray-200">
      <div className="flex animate-scroll-left-fast">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-32 sm:w-40 md:w-48 h-16 sm:h-20 md:h-24 flex items-center justify-center px-4 sm:px-6 md:px-8"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="max-w-full max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamSection = ({
  staffs,
}: {
  staffs: {
    src: string;
    alt?: string;
    name?: string;
    role?: string;
    bio?: string;
  }[];
}) => {
  const featured = staffs && staffs.length ? staffs[0] : null;
  const others = staffs && staffs.length > 1 ? staffs.slice(1) : [];

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="relative z-10 max-w-8xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Featured profile - left */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/20">
                  {featured ? (
                    <img
                      src={featured.src}
                      alt={featured.alt ?? featured.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
              </div>

              <div className="w-full md:w-1/2 text-left text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {featured?.name ?? "Our Lead"}
                </h2>
                <p className="text-sm text-white/80 mb-4">
                  {featured?.role ?? "Lead"}
                </p>

                <p className="text-sm text-white/80 leading-relaxed mb-6">
                  {featured?.bio ??
                    "Experienced leader driving strategy and delivery."}
                </p>

                <div className="flex items-center gap-3">
                  <Button className="bg-black text-white px-5 py-2 rounded-full">
                    Contact
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-white/90 border border-white/10 px-4 py-2 rounded-full"
                  >
                    View All
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other profiles - right */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((s: any, idx: number) => (
                <motion.div
                  key={idx}
                  className="bg-white/6 backdrop-blur-sm border border-white/8 rounded-2xl p-3 flex items-start gap-3 hover:shadow-lg transition-transform"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={s.src}
                      alt={s.alt ?? s.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-white text-left">
                    <div className="font-semibold">{s.name ?? s.alt}</div>
                    <div className="text-xs text-white/80">{s.role}</div>
                    <div className="text-xs text-white/70 mt-1">{s.bio}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CARD_SIZE = "h-[360px] w-[500px]";

const StatItem = ({ number, label, description, delay = 0 }: StatItemProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const targetNumber = parseInt(number);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <div
      ref={ref}
      className={`group flex flex-col gap-4 transition-all duration-700 hover:scale-105 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider group-hover:text-foreground">
        {label}
      </p>

      <div className="flex items-baseline gap-1.5">
        <span className="text-8xl font-extralight">
          {isVisible ? count : 0}
        </span>
        <span className="text-4xl font-light text-muted-foreground/60">+</span>
      </div>

      <p className="text-base text-muted-foreground max-w-[220px] font-light leading-relaxed">
        {description}
      </p>
    </div>
  );
};

function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [retentionCount, setRetentionCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = 98 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 98) {
        setRetentionCount(98);
        clearInterval(timer);
      } else {
        setRetentionCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const clientAvatars = [
    { id: 1, initials: "JD", color: "bg-primary" },
    { id: 2, initials: "SK", color: "bg-secondary" },
    { id: 3, initials: "MR", color: "bg-accent" },
    { id: 4, initials: "AL", color: "bg-muted" },
  ];

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* CARD 1 */}
          <div
            className={`w-full ${CARD_SIZE} bg-white shadow-sm rounded-3xl p-10 flex flex-col justify-between`}
          >
            <StatItem
              number="8"
              label="Years of experience"
              description="Expertise that drives meaningful results."
            />
          </div>

          {/* CARD 2 (Black Card) */}
          <div
            ref={ref}
            className={`w-full ${CARD_SIZE} rounded-3xl p-10 shadow-xl bg-[#06070A] text-white border border-black/10 transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Avatars */}
            <div className="flex items-center gap-5 mb-6">
              <div className="flex -space-x-3">
                {clientAvatars.map((avatar) => (
                  <Avatar
                    key={avatar.id}
                    className={`w-10 h-10 border-2 border-[#06070A] rounded-full shadow ${avatar.color} hover:scale-110 transition-all`}
                  >
                    <AvatarFallback
                      className={`${avatar.color} text-white text-xs font-semibold`}
                    >
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>

              <div className="bg-white text-black px-4 py-1.5 rounded-xl text-sm font-semibold shadow-md">
                72+
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <div className="flex gap-1.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <p className="text-sm text-white/70">Happy clients worldwide</p>
            </div>

            {/* Main Number */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-light">
                  {isVisible ? retentionCount : 0}
                </span>
                <span className="text-4xl text-white/60">%</span>
              </div>
              <p className="text-white/70 mt-3 text-base leading-relaxed max-w-xs">
                Clients stay for our quality and results.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div
            className={`w-full ${CARD_SIZE} bg-white shadow-sm rounded-3xl p-10 flex flex-col justify-between`}
          >
            <StatItem
              number="100"
              label="Projects delivered"
              description="Creative solutions built with purpose."
              delay={200}
            />
          </div>

          {/* CARD 4 */}
          <div
            className={`w-full ${CARD_SIZE} bg-white shadow-sm rounded-3xl p-10 flex flex-col justify-between`}
          >
            <StatItem
              number="86"
              label="Brands transformed"
              description="From strategy to standout visuals."
              delay={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const [isPlaying, setIsPlaying] = useState(true);
  const goals = [
    "Clear and focused strategy",
    "Design that drives impact",
    "Collaboration without the chaos",
    "Outcomes that build momentum",
    "Smart solutions, tailored for you",
  ];

  // Provide local references in case any legacy markup references them
  const featured = staffs && staffs.length ? staffs[0] : null;
  const others = staffs && staffs.length > 1 ? staffs.slice(1) : [];

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16 relative z-10">
        {/* ... content unchanged ... (kept exactly as your original) */}
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

        {/* Header + rest unchanged */}
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
      </div>

      <div className="min-h-screen bg-white">
        <HeroSection staffs={staffs} />
        <LogoCarousel logos={logos} />
        <TeamSection staffs={staffs} />
      </div>

      <StatsSection />

     {/* <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16 relative z-10">*/}
        <motion.div
          className="text-right mb-6"
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

        <UniqueApproachSection
          sectionLabel="Who we are"
          heading="Our Philosophy"
          intro="Presh Ideas is a strategic content, digital PR, SEO, and automation agency helping brands communicate better, strengthen authority, and scale with clarity. We believe growth shouldn’t depend on guesswork. It should come from strong messaging, structured visibility, and the right systems working behind the scenes."
          images={[
            { url: "/about1.jpg", alt: "Our team" },
            { url: "/about2.jpg", alt: "Our office" },
          ]}
          strategies={[
            {
              bold: "Clarity:",
              description: "Because people only buy what they understand.",
            },
            {
              bold: "Credibility:",
              description: "Because trust drives decisions.",
            },
            {
              bold: "Consistency:",
              description: "Because visibility compounds.",
            },
            {
              bold: "Efficiency:",
              description: "Because automation scales what works.",
            },
          ]}
          footerText="Our work blends storytelling, organic growth, and smart systems to help you grow sustainably."
          ctaText="Learn More"
          ctaLink="/about"
        />

        <UniqueApproachSection
          // sectionLabel="Who we are"
          heading="Our Story"
          intro="Presh Ideas was built on a simple observation: Most brands are doing too much and achieving too little—because their message is unclear and their systems aren’t working. <br/> Instead of offering scattered marketing services, we created an integrated approach combining:"
          images={[
            { url: "/about1.jpg", alt: "Our team" },
            { url: "/about2.jpg", alt: "Our office" },
          ]}
          strategies={[
            {
              description: "Content strategy",
            },
            {
              description: "SEO",
            },
            {
              description: "Digital PR",
            },
            {
              description: "Growth systems",
            },
            {
              description: "Workflow automation & AI",
            },
          ]}
          footerText="This lets businesses build real authority, not temporary attention."
          ctaText="Learn More"
          ctaLink="/about"
        />

        {/* Dedicated Mission / Vision / Core Values section (two-column, matching other visuals) */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto rounded-2xl p-8">
            <div className="grid gap-8 lg:grid-cols-2 items-center bg-white rounded-2xl shadow-sm overflow-hidden">
              <motion.div
                className="p-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  To empower brands with powerful communication, intentional
                  visibility, and sustainable growth systems.
                </p>

                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  To become the most trusted partner for clarity-driven content,
                  organic brand visibility, and AI-powered digital
                  transformation.
                </p>
              </motion.div>

              <motion.div
                className="p-8 border-l border-gray-100 flex flex-col justify-between"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Our Core Values
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      Clarity
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      Credibility
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      Insight
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      Consistency
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      Innovation
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm">
                      Integrity
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="bg-black text-white px-6 py-3 rounded-full">
                    Work With Us
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/*
      </div>
        */}

      {/* Make animation rules global so child components pick them up */}
      <style jsx global>{`
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

        /* Scrolling background for doubled content (hero) */
        @keyframes scroll-left-2x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Scrolling for tripled content (logo carousel) */
        @keyframes scroll-left-3x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left-2x 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll-left-fast {
          animation: scroll-left-3x 16s linear infinite;
          will-change: transform;
        }
      `}</style>

      <TestimonialGallery
              title="Trusted by"
              highlight="industry"
              suffix="leaders"
              gallery={testimonials as any}
              interval={7000}
            />

            <NewsSection 
  heading="Latest Articles"
  headingImage={{ url: "/blog-icon.jpg", alt: "Blog" }}
  ctaText="View All Posts"
  ctaLink="/blog"
  cards={cards}
/>
    </section>
  );
}
