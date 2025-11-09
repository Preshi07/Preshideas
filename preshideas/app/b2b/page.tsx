"use client";

import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";
import PortfolioSection from "../component/portfolio";
import TestimonialGallery from "../component/Client";
import FAQSection from "../component/FAQ";

const B2Bslides = [
  {
    image: "/images/b2b-growth.jpg",
    title: "Lead Generation Engine",
    description:
      "We help B2B brands build predictable lead systems through optimized SEO, automation, and high-converting landing experiences.",
  },
  {
    image: "/images/b2b-data.jpg",
    title: "Data-Driven Marketing",
    description:
      "Turning insights into action — we design analytics pipelines that track performance and improve campaign efficiency by up to 70%.",
  },
  {
    image: "/images/b2b-trust.jpg",
    title: "Brand Authority & Trust",
    description:
      "Our content and digital strategy frameworks position your brand as a thought leader in your niche, driving credibility and organic growth.",
  },
  {
    image: "/images/b2b-automation.jpg",
    title: "Workflow Automation",
    description:
      "Reduce manual processes with smart automation tools that align marketing, sales, and customer success for seamless B2B collaboration.",
  },
];

const brandCards = [
  {
    title: "Brand Identity Design",
    image: "https://images.unsplash.com/photo-1587614382346-4ec71c17cdee?w=600",
    description:
      "We craft cohesive visual and verbal identities that make your business instantly recognizable across all channels.",
  },
  {
    title: "Market Positioning",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    description:
      "We analyze competitors and market gaps to define a clear position that resonates with your target audience.",
  },
  {
    title: "Content Strategy & Storytelling",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
    description:
      "We create impactful narratives that turn prospects into advocates and build lasting emotional connections.",
  },
  {
    title: "Customer Experience Mapping",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600",
    description:
      "Design data-driven customer journeys that enhance satisfaction, retention, and overall brand trust.",
  },
];

const portfolioItems = [
  {
    title: "Strategic Storytelling for B2B Growth",
    description:
      "We create long-form, research-backed content that resonates with your ideal clients. From whitepapers to case studies, our writing bridges insight and persuasion — turning complex ideas into compelling narratives that position your business as an authority.",
    image: "/images/b2b1.jpg",
  },
  {
    title: "Converting Knowledge into Leads",
    description:
      "Our B2B content framework nurtures leads through education and value. By aligning tone, structure, and SEO intent, we ensure every article builds trust and encourages deeper engagement across your marketing funnel.",
    image: "/images/b2b2.jpg",
  },
  {
    title: "Industry Thought Leadership",
    description:
      "We help brands establish their voice in the marketplace through industry-specific insights, executive ghostwriting, and data-driven storytelling — tailored to resonate with C-level audiences.",
    image: "/images/b2b3.jpg",
  },
  {
    title: "Optimized for Humans and Search",
    description:
      "Our SEO-first yet reader-friendly approach ensures your message ranks and converts. We blend clarity, structure, and storytelling into every piece of writing to maximize both visibility and value.",
    image: "/images/b2b4.jpg",
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

export default function B2BPage() {
  return (
    <section className="relative bg-neutral-50 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 py-16">
        {/* Header Section */}
        <StrategySection
          slides={B2Bslides}
          title="A smart B2B strategy that"
          highlight="drives sustainable business growth"
          subtitle="We combine performance marketing, automation, and modern SEO to help companies expand visibility, generate qualified leads, and close more deals — efficiently and at scale."
          buttonText="Explore Our B2B Projects →"
          buttonLink="/case-studies"
          duration={45}
        />

        {/* Metrics Section */}
        <MetricsSection
          metrics={[
            {
              from: 0,
              to: 180,
              suffix: "+",
              label: "B2B Brands Scaled Globally",
            },
            {
              from: 0,
              to: 92,
              suffix: "%",
              label: "Client Satisfaction Rate",
            },
            {
              from: 0,
              to: 4,
              suffix: "x",
              label: "Brand Visibility Growth",
            },
          ]}
          title="Elevate Your Brand. Amplify Market Trust."
          highlightText="Strategic positioning and storytelling that convert awareness into long-term partnerships."
          paragraphs={[
            "We help B2B companies clarify their message, strengthen their positioning, and build trust that fuels growth.",
            "Our brand strategy connects creative direction with market insight — aligning your identity, content, and communication with your audience’s goals.",
            "From product strategy to performance branding, we’ve helped 180+ organizations build market credibility and dominate their sectors.",
          ]}
          badge={{
            emoji: "🏢",
            title: "B2B GROWTH PARTNER",
            subtitle: "STRATEGIC BRAND LEADERS 2025",
          }}
        />

        {/* Brand Strategy Services Slider */}
        <MultiSlider
          cards={brandCards}
          scrollSpeed={1.2}
          bgGradient="bg-gradient-to-r from-orange-50 via-white to-pink-50"
          sectionTitle="Explore Our Brand Strategy Services"
        />

        <PortfolioSection
          heading="B2B Content Writing"
          subheading="Communicate Value. Convert Trust."
          note="Building meaningful conversations between businesses through words that work."
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
