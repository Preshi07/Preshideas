import React, { useState, useEffect } from "react";
import { Play, Pause, ArrowRight } from "lucide-react";

interface Image {
  url: string;
  alt: string;
}

interface Strategy {
  title?: string;
  bold?: string;
  description: string;
}

interface UniqueApproachSectionProps {
  sectionLabel?: string;
  heading?: string;
  intro?: string;
  images?: Image[];
  strategies?: Strategy[];
  footerText?: string;
  ctaText?: string;
  ctaLink?: string;
  slideInterval?: number;
  transitionDuration?: number;
}

const UniqueApproachSection: React.FC<UniqueApproachSectionProps> = ({
  sectionLabel = "",
  intro = "",
  heading = "",
  images = [],
  strategies = [],
  footerText = "",
  ctaText = "",
  ctaLink = "#",
  slideInterval = 5000,
  transitionDuration = 800,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, transitionDuration);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [isPaused, images.length, slideInterval, transitionDuration]);

  const togglePause = (): void => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Side - Image Slider */}
          {images.length > 0 && (
            <div className="relative order-2 lg:order-1 lg:sticky lg:top-24">
              <div className="relative rounded-3xl overflow-hidden bg-gray-200 shadow-2xl group">
                <div className="relative aspect-[4/5] lg:aspect-[3/4] bg-gray-300">
                  {images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        idx === currentImageIndex && !isTransitioning
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}

                  {/* Pause/Play Button - Always visible */}
                  <button
                    onClick={togglePause}
                    className="absolute bottom-6 right-6 bg-white/95 hover:bg-white backdrop-blur-sm text-gray-900 rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 z-20"
                    aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                  >
                    {isPaused ? (
                      <Play className="w-5 h-5 fill-current" />
                    ) : (
                      <Pause className="w-5 h-5 fill-current" />
                    )}
                  </button>

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium z-20">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Right Side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Section Label */}
            {sectionLabel && (
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-medium text-gray-600 tracking-wide uppercase">
                  {sectionLabel}
                </p>
              </div>
            )}

            {/* Heading */}
            {heading && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                {heading}
              </h2>
            )}

            {/* Intro */}
            {intro.length > 0 && (
              <p className="text-xl text-gray-700 leading-relaxed font-light">
                {intro}
              </p>
            )}

            {/* Strategies List */}
            {strategies.length > 0 && (
              <div className="space-y-6 pt-4">
                {strategies.map((strategy, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 group hover:translate-x-1 transition-all duration-300"
                  >
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-7 h-7 rounded bg-gray-900 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-base lg:text-lg leading-relaxed pt-0.5">
                      {strategy.title && (
                        <span className="font-semibold">
                          {strategy.title} -{" "}
                        </span>
                      )}
                      <strong>{strategy.bold}</strong> {strategy.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="space-y-6 pt-4">
              {footerText && (
                <p className="text-gray-900 text-base lg:text-lg leading-relaxed font-medium">
                  {footerText}
                </p>
              )}

              {ctaText && (
                <a
                  href={ctaLink}
                  className="inline-flex items-center gap-2 text-gray-900 font-medium text-base group/link transition-all duration-300 hover:gap-3"
                >
                  {ctaText}
                  <ArrowRight className="w-5 h-5 transition-all duration-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueApproachSection;
