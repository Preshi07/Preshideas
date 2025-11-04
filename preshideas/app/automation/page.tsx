import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";

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

export default function AutomationStrategy() {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
      </div>
    </section>
  );
}
