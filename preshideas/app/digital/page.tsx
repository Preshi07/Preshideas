"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Pause, Play, ArrowRight } from "lucide-react";
import TestimonialGallery from "../component/Client";
import FAQSection from "../component/FAQ";
import PortfolioSection from "../component/portfolio";


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
		question: "What do you do if Digital PR isn't driving organic growth/traffic?",
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
		question:
			"What if we can't be super fast or work in a regulated industry?",
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
    <section className="py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="bg-gradient-to-r from-indigo-50/60 via-white to-pink-50/60 rounded-2xl sm:rounded-3xl 
                     p-6 sm:p-8 md:p-12 border border-white/30"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Metrics Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3">
              <Counter from={0} to={100} suffix="m" prefix="$" />
              <p className="text-xs sm:text-sm text-gray-500">
                Incremental value
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3">
              <Counter from={0} to={40} suffix="+" />
              <p className="text-xs sm:text-sm text-gray-500">
                Strong organic team
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-2 sm:gap-3">
              <Counter from={0} to={6} suffix="x" />
              <p className="text-xs sm:text-sm text-gray-500">
                ROI avg from SEO investment
              </p>
            </div>
          </div>

          {/* Main Text Content */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-center md:text-left">
                Grow visibility. Build trust. Win customers.{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
                  Unlock sustainable organic growth.
                </span>
              </h3>
            </div>

            <div className="text-gray-700 space-y-4 text-sm sm:text-base text-center md:text-left">
              <p>
                <span className="font-semibold text-gray-900">
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

              <div className="mt-6 inline-flex items-center justify-center md:justify-start gap-3 bg-white/60 border border-white/40 px-4 py-2 rounded-xl shadow-sm">
                <span className="text-2xl">🏆</span>
                <div className="text-xs sm:text-sm">
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
    const animateLoop = async (
      controls: any,
      distance: string,
      duration: number
    ) => {
      await controls.start({
        x: ["0%", `-${distance}`],
        transition: {
          x: { repeat: Infinity, repeatType: "loop", ease: "linear", duration },
        },
      });
    };
    animateLoop(logoControls, "50%", 28);
    animateLoop(cardControls, "50%", 34);
  }, [logoControls, cardControls]);

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden py-6">
          <motion.div
            animate={logoControls}
            className="flex gap-10 w-[200%] items-center opacity-90"
          >
            {[...logos, ...logos].map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center justify-center w-36 h-14 bg-white/60 rounded-lg p-2 shadow-inner"
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
          </motion.div>
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
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Logo Slider Section */}
      <div className="max-w-8xl mx-auto mb-16">
        <div className="bg-white p-8 overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
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
                      src={logo.img}
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
      <div className="max-w-8xl mx-auto overflow-hidden">
        <div
          ref={cardScrollRef}
          className="flex gap-6 pb-8 overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {card.title}
                  </h3>

                  <div
                    className="overflow-hidden transition-all duration-500"
                    style={{
                      maxHeight: hoveredCard === idx ? "200px" : "0px",
                      opacity: hoveredCard === idx ? 1 : 0,
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

      <div className="max-w-7xl mx-auto relative z-10">
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

const DigitalPage = () => {
  const slideVariant: Variants = {
    enter: { opacity: 0, x: 40, scale: 0.98 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -40, scale: 0.98 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-pink-50 text-gray-900">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              The Digital Marketing{" "}
              <span className="block md:inline bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
                Agency For Higher ROI
              </span>
            </h1>

            <p className="mt-6 text-gray-700 max-w-xl">
              Choose success with our gradient-driven motion agency — creative
              systems that turn attention into conversion. We design with
              empathy, ship with precision.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#book"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition-colors"
              >
                BOOK A CALL →
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="#services"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white font-semibold shadow-lg hover:bg-gray-900 transition-colors"
              >
                OUR SERVICES →
              </motion.a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-2 rounded-lg shadow-sm border border-white/30">
                ★★★★★ <span className="font-medium ml-1">4.9</span>
              </div>
              <div className="text-gray-500">Trusted by 500+ Brands</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center md:justify-end"
          >
            <div className="w-full max-w-[480px] rounded-3xl overflow-hidden bg-gradient-to-br from-teal-50/60 to-indigo-50/60 border border-white/30 mx-auto">
              <Image
                src="/others/trend.png"
                alt="Trusted brands"
                width={480}
                height={420}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

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
          // buttonText="View Case Studies →"
        />
        <FAQSection title="FAQs About PreshIdeas" faqs={faqs as any} />
      </section>
    </main>
  );
};

export default DigitalPage;
