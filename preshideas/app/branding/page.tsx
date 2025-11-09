import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";
import PortfolioSection from "../component/portfolio";
import TestimonialGallery from "../component/Client";
import FAQSection from "../component/FAQ";

const brandSlides = [
  {
    image: "/images/brand-identity.jpg",
    title: "Brand Positioning",
    description:
      "We help you define your unique value, differentiate from competitors, and build trust with the right audience through data-driven storytelling.",
  },
  {
    image: "/images/content-strategy.jpg",
    title: "Content & Communication",
    description:
      "Crafting content strategies that align your business goals with customer intent — across social media, web, and inbound funnels.",
  },
  {
    image: "/images/brand-growth.jpg",
    title: "Reputation & Growth",
    description:
      "From awareness to conversion, we design brand experiences that drive visibility, engagement, and long-term loyalty.",
  },
  {
    image: "/images/brand-insight.jpg",
    title: "Insight & Analytics",
    description:
      "Every decision backed by data — we use analytics to refine campaigns and maximize marketing ROI.",
  },
];

const brandCards = [
  {
    title: "Brand Identity Design",
    image: "https://images.unsplash.com/photo-1587614382346-4ec71c17cdee?w=600",
    description:
      "Crafting visual and verbal identities that reflect your company’s mission and connect deeply with your target audience.",
  },
  {
    title: "Market Positioning",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    description:
      "Define your brand’s unique value and stand out through data-backed positioning strategies built to dominate your niche.",
  },
  {
    title: "Content Strategy & Storytelling",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
    description:
      "We create purposeful narratives that elevate brand perception and build emotional connections that convert.",
  },
  {
    title: "Customer Experience Mapping",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600",
    description:
      "Design seamless customer journeys that drive engagement and loyalty across all brand touchpoints.",
  },
];

const portfolioItems = [
  {
    title: "Crafting Visual Identities",
    description:
      "We build brands that speak through visuals. Every logo, color, and font tells a story designed to evoke trust and emotion.",
    image: "/images/brand1.jpg",
  },
  {
    title: "Defining Brand Voice",
    description:
      "Your voice defines your perception. We help brands articulate their tone and messaging, ensuring consistency across every touchpoint.",
    image: "/images/brand2.jpg",
  },
  {
    title: "Strategic Positioning",
    description:
      "We develop positioning strategies that set your brand apart — defining your value, audience, and message in a crowded digital space.",
    image: "/images/brand3.jpg",
  },
  {
    title: "Experience-Driven Branding",
    description:
      "Our branding process focuses on emotion, consistency, and clarity — building experiences that create loyalty and lasting connections.",
    image: "/images/brand4.jpg",
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

export default function BrandStrategy() {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 py-16">
        <StrategySection
          slides={brandSlides}
          title="A brand strategy that"
          highlight="positions your business for impact"
          subtitle="We craft brand experiences that connect strategy, creativity, and performance — helping companies stand out, build trust, and drive consistent growth."
          buttonText="Explore Brand Projects →"
          buttonLink="/brand"
          duration={45}
        />

        <MetricsSection
          metrics={[
            { from: 0, to: 150, suffix: "+", label: "Brands Scaled" },
            { from: 0, to: 90, suffix: "%", label: "Client Retention Rate" },
            {
              from: 0,
              to: 3,
              suffix: "x",
              label: "Average Brand Visibility Boost",
            },
          ]}
          title="Transform Your Brand. Inspire Trust."
          highlightText="Build meaningful connections through strategy, identity, and storytelling."
          paragraphs={[
            "We help businesses create powerful brand identities that connect emotionally with their audience and drive measurable results.",
            "Our brand strategy approach combines research, positioning, and design to establish lasting credibility and visibility.",
            "From startups to established enterprises, we’ve guided 150+ brands toward stronger presence, clarity, and trust.",
          ]}
          badge={{
            emoji: "🏆",
            title: "BRAND EXCELLENCE AWARD",
            subtitle: "STRATEGIC INNOVATION 2024",
          }}
        />
        <MultiSlider
          cards={brandCards}
          scrollSpeed={1.2}
          bgGradient="bg-gradient-to-r from-orange-50 via-white to-pink-50"
          sectionTitle="Explore Our Brand Strategy Services"
        />

        <PortfolioSection
          heading="Branding & Identity"
          subheading="Designing Stories that Resonate"
          note="From identity to experience — we help you craft a brand people remember and trust."
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
        <FAQSection title="FAQs About PreshIdeas" faqs={faqs as any} />
      </div>
    </section>
  );
}
