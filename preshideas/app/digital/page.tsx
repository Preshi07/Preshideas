"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Pause, Play, ArrowRight } from "lucide-react";
import TestimonialGallery from "../component/Client";
import FAQSection from "../component/FAQ";
// import PortfolioSection from "../component/portfolio";

// Define interfaces and types
interface Card {
  title: string;
  desc?: string;
  description?: string;
  image: string;
}

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

interface Logo {
  name: string;
  img: string;
}

interface ImageSlide {
  url: string;
  alt: string;
}

interface Strategy {
  title: string;
  color: string;
  description: string;
}

type PortfolioSlide = {
  title: string;
  description?: string;
  phone?: React.ReactNode;
};

type PortfolioSectionProps = {
  heading?: string;
  subheading?: string;
  slides?: PortfolioSlide[];
  interval?: number;
};

interface UniqueApproachSectionProps {
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  images?: ImageSlide[];
  strategies?: Strategy[];
  footerText?: string;
  ctaText?: string;
  ctaLink?: string;
  slideInterval?: number;
  transitionDuration?: number;
}

type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  faqs?: FAQ[];
};

// --- CONSTANTS ---
const BRAND_GRADIENT =
  "bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";
const TEXT_GRADIENT =
  "bg-clip-text text-transparent bg-gradient-to-r from-[#00C96D] via-[#00B5D1] to-[#2D79FF]";

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
  { title: "EcoWorld", category: "SEO Strategy", image: "/others/team01.png" },
];

const portfolioSlides = [
  {
    title: "Presh-Ideas Everywhere",
    description:
      "Sometimes, just going to press with a story or hook isn't enough to drive demand at scale...",
    phone: (
      <div className="relative w-64 h-[550px] bg-black rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <svg
            className="w-16 h-16 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <p className="text-white text-sm font-medium">TikTok</p>
        </div>
      </div>
    ),
  },
  {
    title: "Presh-Ideas Live",
    description:
      "We help brands capture real-time moments and turn them into lasting impact through rapid response strategies and live activation.",
    phone: (
      <div className="relative w-64 h-[550px] bg-red-600 rounded-[3rem] shadow-2xl overflow-hidden border-8 border-black">
        <div className="absolute inset-0 bg-red-600 flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-4xl font-bold mb-2">BBC</div>
            <div className="text-white text-2xl font-bold tracking-wider">
              NEWS
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const cards: Card[] = [
  {
    title: "Keyword Universe & Search Journeys",
    desc: "We integrate audience insight into keyword journeys and map out full paths from trigger to purchase.",
    image: "/hero3.png",
  },
  {
    title: "Content Strategy",
    desc: "Craft stories and campaigns that convert through creative data-driven insight.",
    image: "/seo.jpg",
  },
  {
    title: "Creative Positioning & Brand Strategy Playbooks",
    desc: "Define your visual and narrative identity that resonates with your audience.",
    image: "/hero1.png",
  },
  {
    title: "Audience Modelling",
    desc: "Build synthetic audiences to test creative performance and engagement at scale.",
    image: "/hero0.jpg",
  },
];

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
    question:
      "What do you do if Digital PR isn't driving organic growth/traffic?",
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
    question: "What if we can't be super fast or work in a regulated industry?",
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

const logos = [
  "/logos/google.png",
  "/logos/bing.png",
  "/logos/youtube.png",
  "/logos/snapchat.png",
  "/logos/linkedin.png",
  "/logos/pinterest.png",
];

// Smooth numeric counter (tweened)
const Counter = ({
  from,
  to,
  duration = 1.6,
  suffix = "",
  prefix = "",
}: CounterProps) => {
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
      <span className="text-4xl md:text-5xl font-extrabold text-gray-900">
        {value}
      </span>
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
    <section className="py-16 md:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <motion.div
          className="bg-gradient-to-br from-accent/5 via-background to-accent/10 rounded-3xl 
                     p-8 md:p-16 border border-accent/10 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Metrics Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 items-center text-center md:text-left mb-12">
            <div className="flex flex-col items-center md:items-start gap-3">
              <Counter from={0} to={100} suffix="m" prefix="$" />
              <p className="text-sm text-muted-foreground">Incremental value</p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <Counter from={0} to={40} suffix="+" />
              <p className="text-sm text-muted-foreground">
                Strong organic team
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <Counter from={0} to={6} suffix="x" />
              <p className="text-sm text-muted-foreground">
                ROI avg from SEO investment
              </p>
            </div>
          </div>

          {/* Main Text Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight text-primary mb-6">
                Grow visibility. Build trust. Win customers.{" "}
                <span className="block text-accent">
                  Unlock sustainable organic growth.
                </span>
              </h3>
            </div>

            <div className="text-foreground space-y-5 text-base leading-relaxed">
              <p>
                <span className="font-semibold text-primary">
                  Your website is the first impression for Google
                </span>{" "}
                and the last impression for your customers — making it
                absolutely essential.
              </p>
              <p>
                Our SEO team has successfully guided over{" "}
                <span className="font-semibold">200+ websites</span> in
                expanding their organic presence. We build{" "}
                <span className="font-semibold">crawlable, indexable</span>{" "}
                websites and craft a{" "}
                <span className="font-semibold">distinctive experience</span>.
              </p>
              <p>
                We provide fully managed SEO that aligns with product strategy
                and engineering, prioritising performance and search experience
                optimisation.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 bg-card border border-accent/20 px-5 py-3 rounded-full shadow-lg">
                <span className="text-2xl">🏆</span>
                <div className="text-xs">
                  <div className="font-semibold text-primary">
                    BEST LARGE SEARCH AGENCY
                  </div>
                  <div className="text-muted-foreground text-xs">
                    GLOBAL SEARCH AWARDS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ===== Channels Section (Responsive Auto Slide) =====
const Channels = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = window.innerWidth < 640 ? 0.3 : 0.7; // slower on mobile
    let scrollPos = 0;

    const animate = () => {
      if (!isPaused && container) {
        scrollPos += scrollSpeed;
        container.scrollLeft = scrollPos;

        // reset when reaching the end
        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0;
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  return (
    <section className="mt-12">
      <div className="max-w-8xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Featured In
        </h2>
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-10 overflow-hidden"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[...logos, ...logos].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-36 h-14 bg-white/60 rounded-lg p-2 shadow-inner flex items-center justify-center"
            >
              <Image
                src={src}
                alt={`logo-${i}`}
                width={140}
                height={40}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MultiSliderShowcase: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const logoScrollRef = useRef<HTMLDivElement>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const logoAnimationRef = useRef<number | null>(null);
  const cardAnimationRef = useRef<number | null>(null);

  const logos: Logo[] = [
    {
      name: "Business Insider",
      img: "https://logo.clearbit.com/businessinsider.com",
    },
    {
      name: "Washington Post",
      img: "https://logo.clearbit.com/washingtonpost.com",
    },
    { name: "Daily Mail", img: "https://logo.clearbit.com/dailymail.co.uk" },
    { name: "Vogue", img: "https://logo.clearbit.com/vogue.com" },
    { name: "People", img: "https://logo.clearbit.com/people.com" },
    { name: "Forbes", img: "https://logo.clearbit.com/forbes.com" },
    { name: "TechCrunch", img: "https://logo.clearbit.com/techcrunch.com" },
    { name: "BBC", img: "https://logo.clearbit.com/bbc.com" },
  ];

  const cards: Card[] = [
    {
      title: "Press Office",
      image:
        "https://images.unsplash.com/photo-1586281380384-e5d43616b9aa?w=600&h=400&fit=crop",
      description:
        "Professional media relations and press coverage management. We handle all aspects of your brand's media presence.",
    },
    {
      title: "Digital PR Training",
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600&h=400&fit=crop",
      description:
        "We share what we know - it's literally in our values. We train others in PR and Digital PR from Lush Cosmetics, to Hendricks Gin, and stand on stages at conferences like BrightonSEO to lead Digital PR innovation.",
    },
    {
      title: "Data Reports and Studies",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      description:
        "In-depth market research and comprehensive data analysis. We create detailed reports based on the online market share of each country.",
    },
    {
      title: "Creative Campaigns",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      description:
        "Innovative marketing strategies that capture attention and drive engagement across all digital platforms.",
    },
    {
      title: "Brand Strategy",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      description:
        "Comprehensive brand development and positioning strategies that resonate with your target audience.",
    },
    {
      title: "Content Marketing",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
      description:
        "Engaging content creation that tells your story and builds meaningful connections with your audience.",
    },
  ];

  // Duplicate arrays for seamless loop
  const duplicatedLogos: Logo[] = [...logos, ...logos, ...logos];
  const duplicatedCards: Card[] = [...cards, ...cards, ...cards];

  useEffect(() => {
    const logoContainer = logoScrollRef.current;
    const cardContainer = cardScrollRef.current;

    let logoScrollPosition = 0;
    let cardScrollPosition = 0;

    const animateLogos = (): void => {
      if (logoContainer) {
        logoScrollPosition += 1; // 1 pixel per frame for smooth 1sec speed

        // Reset position for seamless loop
        if (logoScrollPosition >= logoContainer.scrollWidth / 3) {
          logoScrollPosition = 0;
        }

        logoContainer.scrollLeft = logoScrollPosition;
      }
      logoAnimationRef.current = requestAnimationFrame(animateLogos);
    };

    const animateCards = (): void => {
      if (cardContainer) {
        cardScrollPosition += 1; // 1 pixel per frame for smooth 1sec speed

        // Reset position for seamless loop
        if (cardScrollPosition >= cardContainer.scrollWidth / 3) {
          cardScrollPosition = 0;
        }

        cardContainer.scrollLeft = cardScrollPosition;
      }
      cardAnimationRef.current = requestAnimationFrame(animateCards);
    };

    logoAnimationRef.current = requestAnimationFrame(animateLogos);
    cardAnimationRef.current = requestAnimationFrame(animateCards);

    return () => {
      if (logoAnimationRef.current) {
        cancelAnimationFrame(logoAnimationRef.current);
      }
      if (cardAnimationRef.current) {
        cancelAnimationFrame(cardAnimationRef.current);
      }
    };
  }, []);

  const handleLogoMouseEnter = (): void => {
    if (logoAnimationRef.current) {
      cancelAnimationFrame(logoAnimationRef.current);
    }
  };

  const handleLogoMouseLeave = (): void => {
    const logoContainer = logoScrollRef.current;
    if (!logoContainer) return;

    let logoScrollPosition = logoContainer.scrollLeft;

    const animateLogos = (): void => {
      if (logoContainer) {
        logoScrollPosition += 1;
        if (logoScrollPosition >= logoContainer.scrollWidth / 3) {
          logoScrollPosition = 0;
        }
        logoContainer.scrollLeft = logoScrollPosition;
      }
      logoAnimationRef.current = requestAnimationFrame(animateLogos);
    };

    logoAnimationRef.current = requestAnimationFrame(animateLogos);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      {/* Logo Slider Section */}
      <div className="max-w-8xl mx-auto mb-16 px-4">
        <div className="bg-card p-8 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
            Featured In
          </h2>

          <div
            ref={logoScrollRef}
            className="overflow-hidden"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-16 w-max">
              {duplicatedLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center min-w-[180px]"
                >
                  <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
                    <img
                      src={logo.img || "/placeholder.svg"}
                      alt={logo.name}
                      className="h-12 w-auto object-contain"
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/120x40/333/fff?text=${
                          logo.name.split(" ")[0]
                        }`;
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards Slider Section */}
      <div className="max-w-8xl mx-auto overflow-hidden px-4">
        <div
          ref={cardScrollRef}
          className="flex gap-6 pb-8 overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedCards.map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-full sm:w-80 md:w-96 group"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-card rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform group-hover:shadow-2xl group-hover:scale-105 border border-border">
                {/* Responsive image height - smaller on mobile, larger on desktop */}
                <div className="relative h-40 sm:h-56 md:h-64 overflow-hidden">
                  <img
                    src={card.image || "/placeholder.svg"}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  {/* Responsive text sizes for mobile/tablet/desktop */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">
                    {card.title}
                  </h3>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredCard === idx ? "200px" : "0px",
                      opacity: hoveredCard === idx ? 1 : 0,
                    }}
                  >
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {hoveredCard !== idx && (
                    <div className="text-xs sm:text-sm bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-medium">
                      Hover to learn more →
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

const UniqueApproachSection: React.FC<UniqueApproachSectionProps> = ({
  sectionLabel = "Our unique approach",
  heading = "How we run Digital PR for our clients",
  subheading = "At Rise at Seven, we have a multi-strategy approach to using PR to move consumers down the funnel and own their category.",
  images = [
    {
      url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=900&fit=crop",
      alt: "Conference presentation",
    },
    {
      url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=900&fit=crop",
      alt: "Digital marketing strategy",
    },
    {
      url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop",
      alt: "Team collaboration",
    },
    {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=900&fit=crop",
      alt: "Data analysis",
    },
  ],
  strategies = [
    {
      title: "PUSH",
      color: "blue",
      description:
        "You nearly always have a brand or product message you want to push to the world through PR and Media. Our push strategies include product PR, press office, data reports and studies, thought leadership and commentary. This is often a monthly tactic to push consistent messages, driving a dominant share of voice within your category.",
    },
    {
      title: "PULL",
      color: "cyan",
      description:
        "Alongside this, we have an always-on pull strategy, pulling you into media moments that are happening. We track the media so you don't have to, reacting with products, commentary, data or fun creatives to stay relevant and IN culture. Speed is the key here.",
    },
    {
      title: "POW",
      color: "purple",
      description:
        "And finally, pow moments. You can't lead a category without creating PR work people remember. We run bimonthly, quarterly or biannually PR campaigns, often tied with social and creators to drive brand demand at scale.",
    },
  ],
  footerText = "All of these together drive category leaders, and we have case studies coming out of our ears to prove it.",
  ctaText = "All Digital PR Case Studies",
  ctaLink = "#",
  slideInterval = 5000,
  transitionDuration = 600,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isPaused, images.length, slideInterval, transitionDuration]);

  const togglePause = (): void => {
    setIsPaused(!isPaused);
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { text: string; border: string } } = {
      blue: { text: "text-lime-600", border: "hover:border-lime-300" },
      cyan: { text: "text-emerald-600", border: "hover:border-emerald-300" },
      purple: { text: "text-teal-600", border: "hover:border-teal-300" },
      green: { text: "text-green-600", border: "hover:border-green-300" },
      red: { text: "text-red-600", border: "hover:border-red-300" },
      orange: { text: "text-orange-600", border: "hover:border-orange-300" },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-lime-100 rounded-full filter blur-3xl opacity-30 -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-30 -z-0" />

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image Slider */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 transform transition-transform duration-500 hover:scale-[1.02] digital-slider-container"
              style={{ height: "400px", maxHeight: "500px" }}
            >
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ${
                    idx === currentImageIndex && !isTransitioning
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  style={{ zIndex: idx === currentImageIndex ? 1 : 0 }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              ))}

              {/* Pause/Play Button */}
              <button
                onClick={togglePause}
                className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-gray-900 rounded-full p-3 md:p-4 shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-12 z-10 group"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? (
                  <Play
                    className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:scale-110"
                    fill="currentColor"
                  />
                ) : (
                  <Pause
                    className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:scale-110"
                    fill="currentColor"
                  />
                )}
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
                <div
                  className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all"
                  style={{
                    width: isPaused
                      ? `${(currentImageIndex / images.length) * 100}%`
                      : "100%",
                    animation: isPaused
                      ? "none"
                      : `progress ${slideInterval / 1000}s linear infinite`,
                  }}
                />
              </div>

              {/* Dots Indicator */}
              <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setCurrentImageIndex(idx);
                        setIsTransitioning(false);
                      }, 300);
                    }}
                    className={`transition-all duration-300 rounded-full backdrop-blur-sm ${
                      idx === currentImageIndex
                        ? "bg-white w-8 md:w-10 h-2 md:h-2.5 shadow-lg"
                        : "bg-white/40 w-2 md:w-2.5 h-2 md:h-2.5 hover:bg-white/70 hover:scale-125"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-black/30 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium z-10">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full filter blur-2xl opacity-30 -z-10" />
          </div>

          {/* Right Side - Content */}
          <div
            className="space-y-6 md:space-y-8 order-1 lg:order-2"
            data-aos="fade-left"
          >
            <div>
              <div className="inline-block">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 text-xs md:text-sm font-bold tracking-wider uppercase mb-3 md:mb-4 flex items-center gap-2">
                  <span className="w-6 md:w-8 h-0.5 bg-gradient-to-r from-lime-600 to-emerald-600"></span>
                  {sectionLabel}
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                {heading}
              </h2>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed font-light">
                {subheading}
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              {strategies.map((strategy, idx) => {
                const colorClasses = getColorClasses(strategy.color);
                return (
                  <div
                    key={idx}
                    className={`group bg-white/50 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/50 ${colorClasses.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 flex items-center gap-2">
                      <span className={colorClasses.text}>
                        {strategy.title}
                      </span>
                      <span className="text-gray-400">—</span>
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {strategy.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 md:pt-6">
              <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                {footerText}
              </p>
              <a
                href={ctaLink}
                className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold px-6 md:px-8 py-4 md:py-5 rounded-full shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 group text-sm md:text-base"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  heading = "Our Portfolio",
  subheading = "Showcasing our best work",
  slides = [],
  interval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (slides.length === 0) return;

    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [slides.length, interval]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 sm:px-6 bg-card/50 rounded-2xl md:rounded-3xl">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-12"
        >
          {heading && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 md:mb-4">
              {heading}
            </h2>
          )}
          <p className="text-sm sm:text-base md:text-lg text-foreground/70">
            {subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Slides Navigation */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2 md:mb-3">
                {currentSlideData.title}
              </h3>
              {currentSlideData.description && (
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">
                  {currentSlideData.description}
                </p>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6">
              <button
                onClick={handlePrevious}
                className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all text-lg md:text-xl"
                aria-label="Previous slide"
              >
                ←
              </button>

              <div className="flex gap-1.5 md:gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`rounded-full transition-all ${
                      idx === currentSlide
                        ? "bg-accent w-6 md:w-8 h-2.5 md:h-3"
                        : "bg-accent/30 w-2.5 h-2.5 md:w-3 md:h-3 hover:bg-accent/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all text-lg md:text-xl"
                aria-label="Next slide"
              >
                →
              </button>
            </div>

            {/* Slide Counter */}
            <div className="text-xs md:text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </div>
          </motion.div>

          {/* Phone/Image Display */}
          <motion.div
            key={`phone-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            {currentSlideData.phone}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DigitalPage = () => {
  const slideVariant: Variants = {
    enter: { opacity: 0, x: 40, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -40, scale: 0.98 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 text-gray-900">
      <section className="max-w-8xl mx-auto px-6 py-24">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 mb-8 border border-slate-200">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  ROI-Focused Agency
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
                Digital Marketing <br />
                <span className={TEXT_GRADIENT}>for High Growth.</span>
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                We design creative systems that turn attention into conversion.
                Data-driven strategies, shipped with precision.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className={`px-8 py-4 rounded-full text-white font-bold shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform ${BRAND_GRADIENT}`}
                >
                  Book a Strategy Call
                </button>
                <button className="px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                  View Case Studies
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6 border-t border-slate-100 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative"
                    >
                      {/* Use a simple colored div if image config is not set */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-slate-900">
                    Trusted by 500+ brands
                  </p>
                  <div className="flex text-yellow-400 text-xs">★★★★★</div>
                </div>
              </div>
            </motion.div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00C96D]/20 to-[#2D79FF]/20 rounded-full blur-[100px]" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white"
              >
                <Image
                  src="/others/trend.png"
                  alt="Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Auto Scrolling Slider (Responsive Gradient Cards) */}
        <div className="mt-10 relative overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...slides, ...slides].map((slide, idx) => (
              <motion.div
                key={idx}
                variants={slideVariant}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover={{ scale: 1.02 }}
                className="min-w-[85%] xs:min-w-[280px] sm:min-w-[320px] md:min-w-[380px] lg:min-w-[420px]
                   bg-white rounded-3xl shadow-xl overflow-hidden border border-white/30 flex-shrink-0"
              >
                <div className="relative h-48 sm:h-56 md:h-72">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-5 bg-gradient-to-r from-white to-white/80">
                  <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500">
                    {slide.category}
                  </p>
                  <h3 className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                    {slide.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient fade edges */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-20 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-20 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        <MetricsSection />

        {/* Multi Slider Showcase */}
        <MultiSliderShowcase />

        {/* Unique Approach Section */}
        <UniqueApproachSection />

        {/* Portfolio preview */}
        <PortfolioSection
          heading=""
          subheading="Products that competitors try to copy"
          slides={portfolioSlides as any}
          interval={6000}
        />
        <FAQSection title="FAQs About PreshIdeas" faqs={faqs as any} />
      </section>
    </main>
  );
};

export default DigitalPage;
