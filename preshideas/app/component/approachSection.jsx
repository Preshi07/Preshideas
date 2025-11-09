import React, { useState, useEffect } from "react";
import { Pause, Play, ArrowRight } from "lucide-react";

const UniqueApproachSection = ({
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
      description:
        "You nearly always have a brand or product message you want to push to the world through PR and Media. Our push strategies include product PR, press office, data reports and studies, thought leadership and commentary. This is often a monthly tactic to push consistent messages, driving a dominant share of voice within your category.",
    },
    {
      title: "PULL",
      description:
        "Alongside this, we have an always-on pull strategy, pulling you into media moments that are happening. We track the media so you don't have to, reacting with products, commentary, data or fun creatives to stay relevant and IN culture. Speed is the key here.",
    },
    {
      title: "POW",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="relative bg-white py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Image Slider */}
          <div className="relative order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]"
              style={{ height: "500px" }}
            >
              {images.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    idx === currentImageIndex && !isTransitioning
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Pause/Play Button */}
              <button
                onClick={togglePause}
                className="absolute bottom-6 right-6 bg-gradient-to-br from-cyan-400 to-green-400 hover:from-cyan-500 hover:to-green-500 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl z-10 backdrop-blur-sm"
                aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
              >
                {isPaused ? (
                  <Play className="w-5 h-5" fill="currentColor" />
                ) : (
                  <Pause className="w-5 h-5" fill="currentColor" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-green-400 transition-all shadow-lg"
                  style={{
                    width: isPaused
                      ? `${((currentImageIndex + 1) / images.length) * 100}%`
                      : "100%",
                    animation: isPaused
                      ? "none"
                      : `progress ${slideInterval / 1000}s linear infinite`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Header */}
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-wider uppercase text-gray-500">
                {sectionLabel}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {heading}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {subheading}
              </p>
            </div>

            {/* Strategy Items */}
            <div className="space-y-6 pt-4">
              {strategies.map((strategy, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {strategy.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-4 space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg">
                {footerText}
              </p>
              <a
                href={ctaLink}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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

export default UniqueApproachSection;