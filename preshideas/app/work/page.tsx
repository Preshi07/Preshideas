"use client";

import React, { useState } from "react";
import { Grid, List, Search, TrendingUp, ArrowUpRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface CaseStudy {
  image: string;
  imageAlt: string;
  company: string;
  companyIcon?: string;
  title: string;
  dateRange: string;
  link: string;
  hoverTitle?: string;
  hoverColor?: string;
}

interface FilterOption {
  label: string;
  value: string;
}

interface CaseStudiesSectionProps {
  heading?: string;
  headingImage?: {
    url: string;
    alt: string;
  };
  description?: string;
  industryFilters?: FilterOption[];
  typeFilters?: FilterOption[];
  caseStudies?: CaseStudy[];
}

// Custom Dropdown component
const Dropdown: React.FC<{
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}> = ({ options, value, onChange, placeholder }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded border border-border hover:border-foreground/20 transition-colors">
        {options.find(opt => opt.value === value)?.label || placeholder}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  heading = "The Problems We Solve",
  headingImage,
  description = "Clients globally come to us with either one of these problems: Demand or Discovery. We drive search demand or discovery for brands with ambitions to be category leaders.",
  industryFilters = [
    { label: "By Industry", value: "all" },
    { label: "Gaming", value: "gaming" },
    { label: "Beauty", value: "beauty" },
    { label: "B2B", value: "b2b" },
    { label: "Home/Interior", value: "home" },
    { label: "Travel", value: "travel" },
    { label: "Ecomm/Retail", value: "ecomm" },
    { label: "Finance", value: "finance" },
    { label: "Fashion", value: "fashion" },
    { label: "Automotive", value: "automotive" },
    { label: "Food/Hospitality/Drink", value: "food" },
    { label: "Sports Betting", value: "sports" },
    { label: "Health", value: "health" },
    { label: "EdTech", value: "edtech" },
    { label: "Technology", value: "technology" },
    { label: "Education", value: "education" },
  ],
  typeFilters = [
    { label: "By Type", value: "all" },
    { label: "Newsjacking", value: "newsjacking" },
    { label: "Reactive PR", value: "reactive-pr" },
    { label: "Creators", value: "creators" },
    { label: "Social", value: "social" },
    { label: "PR Campaigns", value: "pr-campaigns" },
  ],
  caseStudies = [
    {
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=800&fit=crop",
      imageAlt: "Luxury car campaign",
      company: "Carrental",
      title: "SIXT",
      dateRange: "[2023-2025]",
      link: "#",
      hoverTitle: "An extra 3m clicks regionally through SEO",
      hoverColor: "#CD853F",
    },
    {
      image: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=1200&h=800&fit=crop",
      imageAlt: "eSIM technology",
      company: "Esims",
      title: "Leading E Sim brand globally",
      dateRange: "[2024-2025]",
      link: "#",
      hoverTitle: "Dominated global search rankings in 47 countries",
      hoverColor: "#4A5568",
    },
    {
      image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=1200&h=800&fit=crop",
      imageAlt: "Fashion retail campaign",
      company: "Fashion",
      title: "Global Fashion Retailer",
      dateRange: "[2024-2025]",
      link: "#",
      hoverTitle: "250% increase in organic traffic year over year",
      hoverColor: "#9B59B6",
    },
    {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
      imageAlt: "Gaming platform",
      company: "Gaming",
      title: "Leading Gaming Platform",
      dateRange: "[2023-2024]",
      link: "#",
      hoverTitle: "10M+ new users acquired through content strategy",
      hoverColor: "#E74C3C",
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
      imageAlt: "B2B SaaS solution",
      company: "Technology",
      title: "Enterprise SaaS Leader",
      dateRange: "[2024-2025]",
      link: "#",
      hoverTitle: "Scaled from 100K to 2M monthly organic visitors",
      hoverColor: "#3498DB",
    },
    {
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&h=800&fit=crop",
      imageAlt: "Food delivery service",
      company: "Food & Drink",
      title: "Premium Food Delivery",
      dateRange: "[2023-2025]",
      link: "#",
      hoverTitle: "Achieved #1 rankings for 500+ high-value keywords",
      hoverColor: "#F39C12",
    },
  ],
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  return (
    <section className="py-12 md:py-40 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 md:mb-16">
          {/* Heading with embedded image */}
          <div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
              {heading.split(" ").map((word, idx) => (
                <React.Fragment key={idx}>
                  {word === "We" && headingImage ? (
                    <>
                      {word}
                      <img
                        src={headingImage.url}
                        alt={headingImage.alt}
                        className="inline-block w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover mx-2 align-middle"
                      />
                    </>
                  ) : (
                    <>{word} </>
                  )}
                </React.Fragment>
              ))}
            </h2>
          </div>

          {/* Description */}
          <div className="flex items-center">
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-t border-border pt-8">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm text-muted-foreground">Filter</span>

            {/* Industry Filter */}
            <Dropdown
              options={industryFilters}
              value={selectedIndustry}
              onChange={setSelectedIndustry}
              placeholder="By Industry"
            />

            {/* Type Filter */}
            <Dropdown
              options={typeFilters}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="By Type"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-muted/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${viewMode === "list"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${viewMode === "grid"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div
          className={`grid gap-6 md:gap-8 ${viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
            }`}
        >
          {caseStudies.map((study, idx) => (
            <a
              key={idx}
              href={study.link}
              className="group relative block rounded-3xl overflow-hidden bg-card border border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={study.image}
                  alt={study.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Company Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full z-10">
                  {study.companyIcon && (
                    <Search className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {study.company}
                  </span>
                  <TrendingUp className="w-4 h-4" />
                </div>

                {/* Hover Overlay */}
                {study.hoverTitle && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6 md:p-8"
                    style={{ backgroundColor: study.hoverColor || '#CD853F' }}
                  >
                    <div className="flex-1 flex items-center">
                      <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                        {study.hoverTitle}
                      </h4>
                    </div>
                    <div className="flex justify-end">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cyan-300 flex items-center justify-center">
                        <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-black" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {study.dateRange}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;