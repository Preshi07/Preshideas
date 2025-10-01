"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Sparkles } from "lucide-react"

export default function ScrollTextSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const buttonY = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"])

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-[55vh] overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background"
    >
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ring/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div style={{ x, opacity, scale }} className="relative z-10">
        <h1 className="text-[12vw] md:text-[15vw] font-bold leading-none whitespace-nowrap text-balance">
          <span className="bg-gradient-to-r from-teal-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
            Ready to Rise
          </span>
        </h1>

        {/* <motion.div
          className="absolute -top-8 -right-8 text-accent"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-12 h-12 md:w-16 md:h-16" />
        </motion.div> */}
      </motion.div>

      <motion.button
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 group"
        style={{
          y: buttonY,
          rotate,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-xl group-hover:bg-accent/50 transition-all duration-300" />

          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-accent/90 to-ring/90 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-accent/20 group-hover:border-accent/40 transition-all duration-300">
            <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>

          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent/30 border-t-accent"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>
      </motion.button>
    </section>
  )
}
