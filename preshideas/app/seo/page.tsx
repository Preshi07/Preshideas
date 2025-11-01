"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";
import PortfolioSection from "../component/portfolio";
import TestimonialGallery from "../component/Client";
import { desc } from "framer-motion/client";
import FAQSection from "../component/FAQ";

const slides = [
  {
    title: "Parkview Estates",
    tag: "Real Estate",
    years: "2022–2025",
    image1:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "DriveRent",
    tag: "Car Leasing",
    years: "2023–2026",
    image1:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "SkyResorts",
    tag: "Travel & Holidays",
    years: "2022–2024",
    image1:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    image2:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
];

const cards = [
  {
    title: "AI-Powered Marketing",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600",
    description:
      "Automate your brand storytelling with real-time AI insights and content generation tools.",
  },
  {
    title: "Cybersecurity & Compliance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    description:
      "Real-time security monitoring and AI-driven compliance systems for your business.",
  },
  {
    title: "E-commerce Automation",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    description:
      "Streamline your sales, manage logistics, and track engagement effortlessly.",
  },
];

const portfolioItems = [
  {
    title: "Defend",
    description:
      "We strengthen and protect your brand’s digital presence by maintaining consistent identity and messaging. This ensures trust and authority across all platforms.",
  },
  {
    title: "Grow",
    description:
      "We identify and unlock new windows of opportunity — whether that’s building content for emerging trends, targeting underserved queries, or expanding into new verticals. From strengthening existing pillars to developing deeper topical authority, this phase is all about scalable growth.",
  },
  {
    title: "Innovate",
    description:
      "At PreshIdeas, innovation means building beyond the ordinary. From voice and AI to emerging platforms, we craft strategies that keep your brand discoverable and future-ready.",
  },
  {
    title: "Multi Channel SEO",
    description:
      "We connect your brand across channels — from search and social to video and voice — creating one seamless experience that drives visibility and engagement everywhere.",
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

const SlideCard = ({ title, tag, years, image1, image2 }: any) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] min-w-[85%] sm:min-w-[320px] md:min-w-[480px] lg:min-w-[560px]
                 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 flex-shrink-0 group"
    >
      <Image
        src={hovered ? image2 : image1}
        alt={title}
        fill
        className="object-cover transition-opacity duration-700"
        sizes="(max-width: 768px) 90vw, 50vw"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <p className="text-xs uppercase tracking-wider opacity-80">{tag}</p>
        <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
        <p className="text-xs opacity-80 mt-1">{years}</p>
      </div>
    </motion.div>
  );
};

const seoFaqs = [
  {
    question: "What is SEO and why is it important for my business?",
    answer:
      "SEO (Search Engine Optimization) is the process of improving your website’s visibility on search engines like Google. At PreshIdeas, we use modern SEO strategies to help your business rank higher, attract more visitors, and increase conversions organically.",
  },
  {
    question: "How does PreshIdeas improve website SEO performance?",
    answer:
      "We start with a full site audit to identify technical and content gaps. Then we optimize keywords, metadata, internal links, and site speed — ensuring your site follows Google’s best practices. We also use analytics tools to track performance and adjust strategies for long-term growth.",
  },
  {
    question: "How long does it take to see SEO results?",
    answer:
      "SEO is a gradual process — most websites begin to see noticeable ranking improvements within 3 to 6 months. At PreshIdeas, we combine SEO with brand strategy and content marketing to help you see results faster and sustain growth.",
  },
  {
    question: "Do you offer local SEO for businesses?",
    answer:
      "Yes. PreshIdeas helps businesses optimize for local searches using Google Business Profile optimization, local citations, and geo-targeted keywords so your brand gets discovered in your area and beyond.",
  },
  {
    question: "Can SEO work alongside paid advertising?",
    answer:
      "Absolutely. SEO and paid ads complement each other. While SEO builds long-term visibility, ads provide instant exposure. PreshIdeas helps balance both to maximize your traffic and ROI.",
  },
  {
    question: "Does PreshIdeas write SEO-friendly content?",
    answer:
      "Yes. Our content creation team writes blog posts, web copy, and landing pages optimized for search engines. Each piece is tailored to your brand’s tone, target audience, and keyword strategy to attract organic traffic.",
  },
  {
    question: "What SEO tools does PreshIdeas use?",
    answer:
      "We use trusted tools like Google Search Console, Ahrefs, SEMrush, and PageSpeed Insights to analyze your performance, keywords, and backlinks — ensuring your website stays competitive in search results.",
  },
  {
    question: "Can I track my SEO progress with PreshIdeas?",
    answer:
      "Yes. We provide detailed SEO reports showing your ranking improvements, keyword performance, site analytics, and growth trends. You’ll always know how your SEO investment is performing.",
  },
  {
    question: "Is SEO a one-time project or ongoing?",
    answer:
      "SEO is an ongoing process. Search algorithms and competitors change constantly, so regular optimization keeps your site ahead. PreshIdeas provides continuous SEO maintenance to ensure lasting success.",
  },
  {
    question: "Does PreshIdeas offer eCommerce SEO?",
    answer:
      "Definitely. We help eCommerce stores optimize product pages, improve load times, and structure categories for search visibility — making your products easier to find and buy online.",
  },
];

const SeoPage = () => {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-neutral-900 max-w-3xl">
              A powerful organic strategy that{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400">
                builds visibility & wins trust
              </span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Designed to drive real results, engagement, and business growth
              through performance-focused content and modern SEO.
            </p>
          </div>
        </div>

        {/* Sliding Cards */}
        <div className="mt-14 relative overflow-hidden">
          <motion.div
            className="flex gap-6 md:gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...slides, ...slides].map((slide, idx) => (
              <SlideCard key={idx} {...slide} />
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="bg-black text-white text-sm md:text-base px-6 py-3 rounded-full hover:bg-neutral-800 transition">
            View All Case Studies →
          </button>
        </div>
      </div>

      {/* Soft edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none" />

      <MetricsSection
        metrics={[
          {
            from: 0,
            to: 120,
            prefix: "$",
            suffix: "M",
            label: "Revenue Growth",
          },
          { from: 0, to: 45, suffix: "+", label: "Expert Team Members" },
          { from: 0, to: 7, suffix: "x", label: "Average ROI" },
        ]}
        title="Empower Your Brand. Drive Engagement."
        highlightText="Achieve measurable success with data-driven strategies."
        paragraphs={[
          "We specialize in crafting performance-driven solutions that align with your business goals.",
          "Our team has empowered 200+ startups to build sustainable growth systems with SEO, AI, and creative design.",
          "Partner with us to scale smarter — not harder.",
        ]}
        badge={{
          emoji: "🚀",
          title: "TOP INNOVATIVE AGENCY",
          subtitle: "DIGITAL GROWTH AWARDS",
        }}
      />

      <MultiSlider
        cards={cards}
        scrollSpeed={1.2}
        bgGradient="bg-gradient-to-r from-blue-50 via-white to-green-50"
        sectionTitle="Explore Our Services"
      />

      <PortfolioSection
        heading="Building the Most Discoverable Brands"
        subheading="Scaling organic revenue"
        note="What you should hear..."
        slides={portfolioItems as any}
      />

      <TestimonialGallery
        title="Trusted by"
        highlight="industry"
        suffix="leaders"
        gallery={testimonials as any}
        interval={7000}
        // logos={[
        //   "/logos/jd.png",
        //   "/logos/prettylittlething.png",
        //   "/logos/kwalee.png",
        //   "/logos/compare-and-recycle.png",
        // ]}
      />

      <FAQSection title="FAQs About PreshIdeas" faqs={seoFaqs as any} />
    </section>
  );
};

export default SeoPage;
