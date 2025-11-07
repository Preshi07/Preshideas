import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";

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

export default function BrandStrategy() {
  return (
    <section className="relative bg-neutral-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
      </div>
    </section>
  );
}
