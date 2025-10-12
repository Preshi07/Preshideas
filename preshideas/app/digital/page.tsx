"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Pause, Play, ArrowRight } from 'lucide-react';

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

interface Logo {
  name: string;
  img: string;
}

interface Card {
  title: string;
  image: string;
  description: string;
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
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold leading-tight"
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

const MultiSliderShowcase: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const logoScrollRef = useRef<HTMLDivElement>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const logoAnimationRef = useRef<number | null>(null);
  const cardAnimationRef = useRef<number | null>(null);

  const logos: Logo[] = [
    { name: 'Business Insider', img: 'https://logo.clearbit.com/businessinsider.com' },
    { name: 'Washington Post', img: 'https://logo.clearbit.com/washingtonpost.com' },
    { name: 'Daily Mail', img: 'https://logo.clearbit.com/dailymail.co.uk' },
    { name: 'Vogue', img: 'https://logo.clearbit.com/vogue.com' },
    { name: 'People', img: 'https://logo.clearbit.com/people.com' },
    { name: 'Forbes', img: 'https://logo.clearbit.com/forbes.com' },
    { name: 'TechCrunch', img: 'https://logo.clearbit.com/techcrunch.com' },
    { name: 'BBC', img: 'https://logo.clearbit.com/bbc.com' }
  ];

  const cards: Card[] = [
    {
      title: 'Press Office',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop',
      description: 'Professional media relations and press coverage management. We handle all aspects of your brand\'s media presence.'
    },
    {
      title: 'Digital PR Training',
      image: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600&h=400&fit=crop',
      description: 'We share what we know - it\'s literally in our values. We train others in PR and Digital PR from Lush Cosmetics, to Hendricks Gin, and stand on stages at conferences like BrightonSEO to lead Digital PR innovation.'
    },
    {
      title: 'Data Reports and Studies',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'In-depth market research and comprehensive data analysis. We create detailed reports based on the online market share of each country.'
    },
    {
      title: 'Creative Campaigns',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
      description: 'Innovative marketing strategies that capture attention and drive engagement across all digital platforms.'
    },
    {
      title: 'Brand Strategy',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      description: 'Comprehensive brand development and positioning strategies that resonate with your target audience.'
    },
    {
      title: 'Content Marketing',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop',
      description: 'Engaging content creation that tells your story and builds meaningful connections with your audience.'
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Logo Slider Section */}
      <div className="max-w-8xl mx-auto mb-16">
        <div className="bg-white p-8 overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Featured In</h2>

          <div
            ref={logoScrollRef}
            className="overflow-hidden"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-16 w-max">
              {duplicatedLogos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center min-w-[180px]"
                >
                  <div className="grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110">
                    <img
                      src={logo.img}
                      alt={logo.name}
                      className="h-12 w-auto object-contain"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/120x40/333/fff?text=${logo.name.split(' ')[0]}`;
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
      <div className="max-w-8xl mx-auto overflow-hidden">
        <div
          ref={cardScrollRef}
          className="flex gap-6 pb-8 overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedCards.map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-96 group"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{card.title}</h3>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredCard === idx ? '200px' : '0px',
                      opacity: hoveredCard === idx ? 1 : 0
                    }}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {hoveredCard !== idx && (
                    <div className="text-blue-600 font-medium">
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
      url: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=900&fit=crop',
      alt: 'Conference presentation'
    },
    {
      url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=900&fit=crop',
      alt: 'Digital marketing strategy'
    },
    {
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop',
      alt: 'Team collaboration'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=900&fit=crop',
      alt: 'Data analysis'
    }
  ],
  strategies = [
    {
      title: "PUSH",
      color: "blue",
      description: "You nearly always have a brand or product message you want to push to the world through PR and Media. Our push strategies include product PR, press office, data reports and studies, thought leadership and commentary. This is often a monthly tactic to push consistent messages, driving a dominant share of voice within your category."
    },
    {
      title: "PULL",
      color: "cyan",
      description: "Alongside this, we have an always-on pull strategy, pulling you into media moments that are happening. We track the media so you don't have to, reacting with products, commentary, data or fun creatives to stay relevant and IN culture. Speed is the key here."
    },
    {
      title: "POW",
      color: "purple",
      description: "And finally, pow moments. You can't lead a category without creating PR work people remember. We run bimonthly, quarterly or biannually PR campaigns, often tied with social and creators to drive brand demand at scale."
    }
  ],
  footerText = "All of these together drive category leaders, and we have case studies coming out of our ears to prove it.",
  ctaText = "All Digital PR Case Studies",
  ctaLink = "#",
  slideInterval = 5000,
  transitionDuration = 600
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
      blue: { text: 'text-lime-600', border: 'hover:border-lime-300' },
      cyan: { text: 'text-emerald-600', border: 'hover:border-emerald-300' },
      purple: { text: 'text-teal-600', border: 'hover:border-teal-300' },
      green: { text: 'text-green-600', border: 'hover:border-green-300' },
      red: { text: 'text-red-600', border: 'hover:border-red-300' },
      orange: { text: 'text-orange-600', border: 'hover:border-orange-300' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-lime-100 rounded-full filter blur-3xl opacity-30 -z-0" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-emerald-100 rounded-full filter blur-3xl opacity-30 -z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Image Slider */}
          <div className="relative order-2 lg:order-1" data-aos="fade-right">
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 transform transition-transform duration-500 hover:scale-[1.02] digital-slider-container"
              style={{ height: '400px', maxHeight: '500px' }}
            >

              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ${idx === currentImageIndex && !isTransitioning
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
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
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:scale-110" fill="currentColor" />
                ) : (
                  <Pause className="w-4 h-4 md:w-6 md:h-6 transition-transform group-hover:scale-110" fill="currentColor" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
                <div
                  className="h-full bg-gradient-to-r from-lime-400 to-emerald-500 transition-all"
                  style={{
                    width: isPaused ? `${(currentImageIndex / images.length) * 100}%` : '100%',
                    animation: isPaused ? 'none' : `progress ${slideInterval / 1000}s linear infinite`
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
                    className={`transition-all duration-300 rounded-full backdrop-blur-sm ${idx === currentImageIndex
                        ? 'bg-white w-8 md:w-10 h-2 md:h-2.5 shadow-lg'
                        : 'bg-white/40 w-2 md:w-2.5 h-2 md:h-2.5 hover:bg-white/70 hover:scale-125'
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
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2" data-aos="fade-left">
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
                      <span className={colorClasses.text}>{strategy.title}</span>
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

const DigitalPage = () => {
  return (
    <section className="relative bg-white">
      <div className="max-w-8xl mx-auto px-6 py-24">
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

        {/* Multi Slider Showcase */}
        <MultiSliderShowcase />

        {/* Unique Approach Section */}
        <UniqueApproachSection />
      </div>
    </section>
  );
};

export default DigitalPage;
