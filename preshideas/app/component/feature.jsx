"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll } from "framer-motion"

const works = [
  {
    title: "AI Automation",
    years: "2023–2025",
    img: "/automation.jpg",
    description: "Streamlining workflows with intelligent automation",
    tags: ["AI", "Automation", "Workflow"],
  },
  {
    title: "Branding",
    years: "2025",
    img: "/brand.jpg",
    description: "Creating memorable brand identities",
    tags: ["Design", "Identity", "Strategy"],
  },
  {
    title: "SEO Content",
    years: "2025",
    img: "/seo.jpg",
    description: "Optimizing content for search visibility",
    tags: ["SEO", "Content", "Marketing"],
  },
  {
    title: "Digital Experience",
    years: "2024–2025",
    img: "/seo.jpg",
    description: "Crafting engaging digital experiences",
    tags: ["UX", "Design", "Development"],
  },
  {
    title: "Product Strategy",
    years: "2024",
    img: "/seo.jpg",
    description: "Building products that users love",
    tags: ["Strategy", "Product", "Growth"],
  },
]

export default function Feature() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Safe index clamp
  const safeIndex = Math.min(activeIndex, works.length - 1)

  // Track scroll position relative to sections
  useEffect(() => {
    const sections = document.querySelectorAll(".work-section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index))
          }
        })
      },
      { threshold: 0.6 },
    )

    sections.forEach((sec) => observer.observe(sec))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="dark bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left sticky text */}
          <div className="relative lg:border-r border-border/50">
            <div className="sticky top-0 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 lg:py-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs md:text-sm uppercase mb-8 tracking-[0.2em] text-muted-foreground font-mono">
                  Featured Work
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                {works[safeIndex] && (
                  <motion.div
                    key={safeIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-balance leading-[1.1] tracking-tight text-[var(--primary)]">
                        {works[safeIndex].title}
                      </h2>
                      <p className="text-muted-foreground text-base md:text-lg font-mono tracking-wide">
                        [{works[safeIndex].years}]
                      </p>
                    </div>

                    <p className="text-foreground/80 text-lg md:text-xl max-w-md leading-relaxed">
                      {works[safeIndex].description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {works[safeIndex].tags.map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-4 py-1.5 text-sm border border-border/50 rounded-full text-muted-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-3 pt-8">
                      <span className="text-sm font-mono text-muted-foreground">
                        {String(safeIndex + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 h-px bg-border/30 relative overflow-hidden max-w-[120px]">
                        <motion.div
                          className="absolute inset-0 bg-accent"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5 }}
                          style={{ transformOrigin: "left" }}
                        />
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">
                        {String(works.length).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right scrolling images */}
          <div className="flex flex-col">
            {works.map((work, i) => (
              <section
                key={i}
                data-index={i}
                className="work-section min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-16"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-[70vh] md:h-[75vh] relative group"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={work.img || "/placeholder.svg"}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Floating number */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -left-4 md:-left-8 top-8 text-6xl md:text-8xl font-bold text-accent/10 font-mono"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.div>
                </motion.div>
              </section>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex flex-col gap-12 px-6 py-12">
          {works.map((work, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={work.img || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--primary)]">{work.title}</h2>
                <p className="text-sm text-muted-foreground font-mono">[{work.years}]</p>
                <p className="mt-2 text-foreground/80">{work.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs border border-border/50 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
