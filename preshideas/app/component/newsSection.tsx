import React from "react";
import { ArrowRight, Clock } from "lucide-react";

interface Author {
  name: string;
  avatar?: string;
}

interface NewsCard {
  category: string;
  image: string;
  imageAlt: string;
  authors: Author[];
  readTime: string;
  title: string;
  link: string;
}

interface NewsSectionProps {
  heading?: string;
  headingImage?: {
    url: string;
    alt: string;
  };
  ctaText?: string;
  ctaLink?: string;
  cards?: NewsCard[];
}

const NewsSection: React.FC<NewsSectionProps> = ({
  heading = "",
  headingImage,
  ctaText = "",
  ctaLink = "#",
  cards = [],
}) => {
  // Don't render if no cards provided
  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 md:mb-12 gap-4">
          {heading && (
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 flex items-center gap-4">
              {heading}
              {headingImage && (
                <img
                  src={headingImage.url}
                  alt={headingImage.alt}
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl object-cover inline-block"
                />
              )}
            </h2>
          )}
          {ctaText && (
            <a
              href={ctaLink}
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group whitespace-nowrap"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <a
              key={idx}
              href={card.link}
              className="group block bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge */}
                {card.category && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                    {card.category}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Authors and Read Time */}
                <div className="flex items-center justify-between gap-4">
                  {card.authors && card.authors.length > 0 && (
                    <div className="flex items-center gap-2">
                      {card.authors.map((author, authorIdx) => (
                        <div key={authorIdx} className="flex items-center gap-2">
                          {author.avatar && (
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          )}
                          <span className="text-sm text-gray-600">
                            {author.name}
                          </span>
                          {authorIdx < card.authors.length - 1 && (
                            <span className="text-gray-400">,</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  {card.readTime && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{card.readTime}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors">
                  {card.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile CTA */}
        {ctaText && (
          <div className="mt-8 sm:hidden flex justify-center">
            <a
              href={ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 group"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;