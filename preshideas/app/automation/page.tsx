import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";
import PortfolioSection from "../component/portfolio";
import TestimonialGallery from "../component/Client";
import FAQSection from "../component/FAQ";

const automationSlides = [
  {
    image: "/images/workflow-automation.jpg",
    title: "Workflow Automation",
    description:
      "Simplify daily operations with systems that reduce manual work, eliminate errors, and boost productivity across teams.",
  },
  {
    image: "/images/financial-automation.jpg",
    title: "Financial & Business Processes",
    description:
      "From invoicing to reconciliation, our automation tools integrate seamlessly with your existing platforms to enhance speed and accuracy.",
  },
  {
    image: "/images/marketing-automation.jpg",
    title: "Marketing Automation",
    description:
      "We set up automated campaigns that nurture leads, personalize customer journeys, and increase conversion without extra effort.",
  },
  {
    image: "/images/ops-automation.jpg",
    title: "Operational Efficiency",
    description:
      "We connect systems and data pipelines, ensuring smooth operations across your business — saving time and scaling smarter.",
  },
];

const automationCards = [
  {
    title: "Workflow Automation",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?w=600",
    description:
      "Eliminate bottlenecks and automate complex workflows to save time and boost efficiency across teams.",
  },
  {
    title: "E-commerce Optimization",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    description:
      "Streamline your product management, logistics, and customer experience with automation systems that scale with your business.",
  },
  {
    title: "CRM & Lead Automation",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600",
    description:
      "Enhance customer relationship management with automated follow-ups, segmentation, and lead tracking.",
  },
  {
    title: "Financial & Reporting Automation",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=600",
    description:
      "Integrate accounting, reporting, and analytics tools for real-time business insights and reduced manual work.",
  },
];

const portfolioItems = [
  {
    title: "Workflow Automation for Efficiency",
    description:
      "We streamline your operations by automating repetitive tasks, freeing your team to focus on high-value strategy. From CRM integration to smart notifications, we ensure seamless digital flow.",
    image: "/images/auto1.jpg",
  },
  {
    title: "No-Code Process Design",
    description:
      "We build scalable no-code automation that connects your apps, manages data, and eliminates manual errors — empowering non-developers to manage complex workflows.",
    image: "/images/auto2.jpg",
  },
  {
    title: "Integrating AI with Operations",
    description:
      "Our automation solutions pair machine learning with business logic to anticipate actions, detect anomalies, and trigger personalized workflows in real time.",
    image: "/images/auto3.jpg",
  },
  {
    title: "End-to-End Business Flow",
    description:
      "From marketing automation to financial reconciliations, we create cohesive ecosystems that keep your business moving — smarter, faster, and better connected.",
    image: "/images/auto4.jpg",
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

export default function AutomationStrategy() {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 py-16">
        <StrategySection
          slides={automationSlides}
          title="An automation strategy that"
          highlight="connects systems and powers performance"
          subtitle="We help businesses automate repetitive tasks and streamline workflows — creating connected operations that save time, reduce cost, and drive smarter growth."
          buttonText="Discover Automation Tools →"
          buttonLink="/automation"
          duration={40}
        />

        <MetricsSection
          metrics={[
            { from: 0, to: 85, suffix: "%", label: "Process Efficiency Gain" },
            { from: 0, to: 120, suffix: "+", label: "Workflows Automated" },
            {
              from: 0,
              to: 5,
              suffix: "x",
              label: "Operational Speed Increase",
            },
          ]}
          title="Automate. Optimize. Scale."
          highlightText="Unlock efficiency through smart automation and system integration."
          paragraphs={[
            "We design automation solutions that reduce manual effort, minimize errors, and create seamless collaboration between your tools and teams.",
            "From finance operations to marketing workflows, our systems are built to simplify complexity and drive results.",
            "With 120+ automated workflows delivered, we’ve helped businesses save time, cut costs, and grow sustainably.",
          ]}
          badge={{
            emoji: "⚙️",
            title: "AUTOMATION PARTNER",
            subtitle: "PRODUCTIVITY AWARDS 2025",
          }}
        />
        <MultiSlider
          cards={automationCards}
          scrollSpeed={1.3}
          bgGradient="bg-gradient-to-r from-green-50 via-white to-cyan-50"
          sectionTitle="Explore Our Automation Solutions"
        />

        <PortfolioSection
          heading="Automation Systems"
          subheading="Simplifying the Complex"
          note="Empower your team with smart workflows designed to save time and drive growth."
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
