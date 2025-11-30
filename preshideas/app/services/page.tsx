"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const services = [
  {
    title: "Digital Marketing",
    desc: "Grow your brand with data‑driven marketing campaigns built to convert.",
    image: "/services/digital-pr.jpg",
    features: ["SEO Optimization", "PPC Campaigns", "Analytics & Reporting"],
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    icon: "📈",
    stats: { growth: "+340%", clients: "250+" },
  },
  {
    title: "Workflow Automation",
    desc: "Automate repetitive tasks, streamline processes, and boost efficiency.",
    image: "/services/strategy.jpg",
    features: ["Process Mapping", "Integration Setup", "Custom Workflows"],
    gradient: "from-purple-400 via-pink-500 to-red-500",
    icon: "⚙️",
    stats: { growth: "+280%", clients: "180+" },
  },
  {
    title: "AI Agent Building",
    desc: "Deploy intelligent AI systems to automate complex decision‑making.",
    image: "/services/data.jpg",
    features: ["Custom AI Models", "API Integration", "Training & Support"],
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    icon: "🤖",
    stats: { growth: "+420%", clients: "120+" },
  },
  {
    title: "Digital PR",
    desc: "Strengthen your online presence with strategic publicity.",
    image: "/services/social.jpg",
    features: ["Media Outreach", "Brand Partnerships", "Crisis Management"],
    gradient: "from-orange-400 via-red-500 to-pink-600",
    icon: "📢",
    stats: { growth: "+190%", clients: "310+" },
  },
  {
    title: "Content Writing",
    desc: "High‑quality content crafted for engagement and SEO ranking.",
    image: "/services/content.jpg",
    features: ["Blog Posts", "Copy Writing", "Technical Content"],
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    icon: "✍️",
    stats: { growth: "+260%", clients: "400+" },
  },
  {
    title: "Organic Social Content",
    desc: "Build community and engagement with authentic social content.",
    image: "/services/seo.jpg",
    features: ["Content Calendar", "Community Management", "Brand Voice"],
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    icon: "💬",
    stats: { growth: "+310%", clients: "290+" },
  },
];

export default function ServicePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="relative bg-black text-white overflow-hidden">
      {/* Animated Mesh Background */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
            `,
            backgroundSize: "200% 200%",
          }}
        />
        
        {/* Animated Grid */}
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <motion.section
        style={{ opacity, scale }}
        className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-16 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-full"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Transform Your Business Today
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black leading-none mb-8"
          >
            <span className="block">Services That</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Spark Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Cutting-edge solutions powered by AI, automation, and creativity. 
            We don't just build services—we engineer experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg shadow-2xl"
            >
              Explore Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full font-bold text-lg"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { value: "500+", label: "Projects Delivered", icon: "🚀" },
              { value: "98%", label: "Client Satisfaction", icon: "⭐" },
              { value: "24/7", label: "Expert Support", icon: "💬" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-purple-500/50 transition-all duration-300">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Bento Grid Services */}
      <section className="relative z-10 px-6 md:px-16 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Our Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium solutions crafted with precision and powered by innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onHoverStart={() => {
                setActiveIndex(i);
                setIsHovering(true);
              }}
              onHoverEnd={() => setIsHovering(false)}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Animated Border */}
              <motion.div
                animate={activeIndex === i && isHovering ? {
                  rotate: 360,
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
              />

              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 group-hover:border-transparent rounded-3xl p-8 h-full transition-all duration-500">
                {/* Icon with Glow */}
                <motion.div
                  animate={activeIndex === i && isHovering ? {
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1],
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="relative w-20 h-20 mb-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className={`relative w-full h-full bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-4xl`}>
                    {service.icon}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.stats.growth}
                    </div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.stats.clients}
                    </div>
                    <div className="text-xs text-gray-500">Clients</div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center`}>
                    →
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Horizontal Scroll Showcase */}
      <section className="relative z-10 py-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20 px-6"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
        </motion.div>

        <div className="flex gap-6 px-6 overflow-x-auto scrollbar-hide pb-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative flex-shrink-0 w-[400px] h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/80 mb-4">{service.desc}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full font-semibold inline-flex items-center gap-2"
                  >
                    View Project <span>→</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Immersive CTA */}
      <section className="relative z-10 mx-6 md:mx-16 my-32 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative px-8 md:px-20 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              Ready to Level Up?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
              Join 500+ companies already transforming their business with our innovative solutions
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl"
              >
                Start Your Project
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white rounded-full font-bold text-lg"
              >
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}