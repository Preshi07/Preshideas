"use client";

import StrategySection from "../component/StrategySection";
import MetricsSection from "../component/MetricsSection";
import MultiSlider from "../component/MultiSlider";

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

export default function B2BPage() {
  return (
    <section className="relative bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16">
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
      </div>
    </section>
  );
}
