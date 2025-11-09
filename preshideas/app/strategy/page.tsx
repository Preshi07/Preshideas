import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";
import PortfolioSection from "../component/portfolio";
import TestimonialGallery from "../component/Client";
import FAQSection from "../component/FAQ";

const aiSlides = [
  {
    image: "/images/ai-agent-chat.jpg",
    title: "Intelligent Chat Agents",
    description:
      "We build AI-driven assistants that handle customer inquiries, automate sales, and provide real-time business insights through natural conversations.",
  },
  {
    image: "/images/ai-decision.jpg",
    title: "Decision Intelligence",
    description:
      "Empowering your business with predictive AI tools that optimize workflows and improve data-driven decision-making.",
  },
  {
    image: "/images/ai-integration.jpg",
    title: "Seamless Integration",
    description:
      "Integrate AI into your website, CRM, or WhatsApp to enhance engagement and streamline communication at scale.",
  },
  {
    image: "/images/ai-learning.jpg",
    title: "Continuous Learning Systems",
    description:
      "Our agents learn from every interaction, evolving with your brand to deliver smarter and more personalized experiences.",
  },
];

const aiCards = [
  {
    title: "Conversational AI Agents",
    image: "https://images.unsplash.com/photo-1665686301862-fd9c60c09401?w=600",
    description:
      "Deploy intelligent chat agents on your website, WhatsApp, or social media to handle inquiries 24/7 with natural communication.",
  },
  {
    title: "Predictive Intelligence Systems",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600",
    description:
      "Use AI to analyze behavior, forecast trends, and personalize user experiences in real time.",
  },
  {
    title: "Process Optimization Bots",
    image: "https://images.unsplash.com/photo-1581092588429-cc9a0aa2d816?w=600",
    description:
      "Automate repetitive workflows like data entry, reporting, and support ticketing with intelligent agents.",
  },
  {
    title: "AI-Powered Analytics",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600",
    description:
      "Gain actionable insights with AI dashboards that track performance and detect opportunities for growth.",
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

const portfolioItems = [
  {
    title: "Intelligent Agents Beyond Chat",
    description:
      "Our AI agents automate communication and decision-making across platforms — understanding intent, context, and behavior to deliver a personalized experience.",
    image: "/images/ai1.jpg",
  },
  {
    title: "Learning Systems that Adapt",
    description:
      "Using reinforcement learning and NLP, our AI agents continuously improve their accuracy, tone, and efficiency with every interaction.",
    image: "/images/ai2.jpg",
  },
  {
    title: "Integration with Business Tools",
    description:
      "We integrate AI agents with CRMs, analytics, and marketing stacks to streamline data-driven conversations and automate follow-ups.",
    image: "/images/ai3.jpg",
  },
  {
    title: "Scalable for Growth",
    description:
      "From startups to enterprises, our AI systems scale effortlessly, learning from new data and optimizing interactions in real time.",
    image: "/images/ai4.jpg",
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

export default function AIAgents() {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 py-16">
        <StrategySection
          slides={aiSlides}
          title="AI agents that"
          highlight="automate communication and scale intelligence"
          subtitle="We develop AI-powered agents that engage customers, manage data, and automate business processes — driving efficiency, precision, and 24/7 productivity."
          buttonText="See AI Solutions →"
          buttonLink="/ai"
          duration={50}
        />
        <MetricsSection
          metrics={[
            { from: 0, to: 300, suffix: "+", label: "AI Agents Deployed" },
            { from: 0, to: 98, suffix: "%", label: "Response Accuracy Rate" },
            {
              from: 0,
              to: 24,
              suffix: "/7",
              label: "Automated Support Availability",
            },
          ]}
          title="Empower Your Business with AI Agents."
          highlightText="Streamline communication, automate workflows, and enhance intelligence."
          paragraphs={[
            "Our AI agents are built to handle complex operations — from customer engagement to real-time decision-making — with unmatched accuracy.",
            "By integrating advanced natural language models, we enable your systems to learn, adapt, and perform better over time.",
            "We’ve deployed 300+ intelligent agents that help businesses save costs, boost response times, and scale effortlessly.",
          ]}
          badge={{
            emoji: "🤖",
            title: "AI INNOVATION LEADER",
            subtitle: "AUTOMATION EXCELLENCE 2025",
          }}
        />

        <MultiSlider
          cards={aiCards}
          scrollSpeed={1.4}
          bgGradient="bg-gradient-to-r from-blue-50 via-white to-indigo-50"
          sectionTitle="Explore Our AI Agent Solutions"
        />
        <PortfolioSection
          heading="AI Agents"
          subheading="Smart, Adaptive, and Always Learning"
          note="Enhancing customer experiences through autonomous intelligence and automation."
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
