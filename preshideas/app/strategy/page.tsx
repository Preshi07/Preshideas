import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";

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

export default function AIAgents() {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
      </div>
    </section>
  );
}
