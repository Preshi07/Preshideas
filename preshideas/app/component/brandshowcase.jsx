"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Users } from "lucide-react"

const logos = [
  { src: "/logos/ecosatisfaction.png", alt: "Ecosatisfaction" },
  { src: "/logos/capitalone.png", alt: "Capital One" },
  { src: "/logos/redbull.png", alt: "Red Bull" },
  { src: "/logos/jd.png", alt: "JD" },
  { src: "/logos/kroger.png", alt: "Kroger" },
  { src: "/logos/hubspot.png", alt: "HubSpot" },
]

const stats = [
  { value: "98%", label: "faster time to market", icon: Zap },
  { value: "300%", label: "increase in SEO", icon: Sparkles },
  { value: "6x", label: "faster to build + deploy", icon: ArrowRight },
]

const features = [
  {
    title: "Lightning Fast",
    description: "Deploy in seconds with our optimized infrastructure",
  },
  {
    title: "Scale Globally",
    description: "Reach users worldwide with edge network distribution",
  },
  {
    title: "Team Collaboration",
    description: "Built-in tools for seamless team workflows",
  },
]

export default function BrandSlider() {
  return (
    <div className="bg-background text-foreground min-h-screen grid-pattern overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16 py-16 lg:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 lg:mb-40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column - Hero Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Powering the modern web</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-8 text-balance">
                Driving Demand &{" "}
                <span className="bg-gradient-to-r from-accent via-purple-400 to-accent bg-clip-text text-transparent">
                  Discovery
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl text-pretty">
                Your team's toolkit to stop configuring and start innovating. Securely build, deploy, and scale the best
                web experiences.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <motion.a
                  href="#our-story"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 rounded-full bg-foreground text-background font-semibold text-base hover:bg-foreground/90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-foreground/20"
                >
                  Get a demo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="#our-services"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-full border border-border font-semibold text-base hover:bg-muted hover:border-muted-foreground/30 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore the Product
                </motion.a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                    className="space-y-2"
                  >
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="gradient-border group cursor-default"
                  >
                    <div className="relative p-8 lg:p-10 rounded-2xl bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div className="text-base lg:text-lg text-muted-foreground">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Brand Slider Section */}
        <div className="relative mb-24 lg:mb-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm mb-4">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                Trusted by Industry Leaders
              </span>
            </div>
          </motion.div>

          {/* Slider Container */}
          <div className="relative py-12 overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-48 lg:w-64 z-10 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent" />
            <div className="absolute right-0 top-0 h-full w-48 lg:w-64 z-10 pointer-events-none bg-gradient-to-l from-white via-white/90 to-transparent" />

            {/* Scrolling Track */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}>
              <div className="animate-scroll flex items-center gap-20 lg:gap-28">
                {[...logos, ...logos, ...logos].map((logo, idx) => (
                  <div
                    key={idx}
                    className="logo-shimmer flex-shrink-0 flex items-center justify-center min-w-[180px] lg:min-w-[220px] h-20 lg:h-24 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-110"
                  >
                    <Image
                      src={logo.src || "/placeholder.svg"}
                      alt={logo.alt}
                      width={160}
                      height={90}
                      className="object-contain w-auto h-14 lg:h-18"
                      priority={idx < logos.length}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="pt-20 lg:pt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-sm uppercase tracking-widest text-accent font-semibold">Collaboration</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
                    Faster iteration.
                    <br />
                    More innovation.
                  </h2>
                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
                    The platform for rapid progress. Let your team focus on shipping features instead of managing
                    infrastructure with automated CI/CD, built-in testing, and integrated collaboration.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="lg:pl-12 space-y-8"
              >
                <div className="p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-border transition-colors duration-300">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Make teamwork seamless.</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Tools for your team and stakeholders to share feedback and iterate faster.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 hover:border-accent/40 transition-colors duration-300">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ship with confidence.</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Preview deployments, instant rollbacks, and comprehensive analytics give you complete control.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
