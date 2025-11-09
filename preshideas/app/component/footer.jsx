"use client"

import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react"
import Link from "next/link"

const navigation = {
  company: [
    { name: "About", href: "#" },
    { name: "Culture", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Meet The Team", href: "#" },
  ],
  services: [
    { name: "Services", href: "#" },
    { name: "Work", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Case Studies", href: "#" },
  ],
  resources: [
    { name: "Blog", href: "#" },
    { name: "Webinars", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Newsletter", href: "#" },
  ],
  locations: [
    { name: "Sheffield", href: "#" },
    { name: "Manchester", href: "#" },
    { name: "London", href: "#" },
    { name: "New York", href: "#" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: () => <span className="text-sm font-bold">𝕏</span> },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "YouTube", href: "#", icon: Youtube },
  { name: "Instagram", href: "#", icon: Instagram },
]

const contactInfo = [
  { icon: Mail, text: "hello@company.com", href: "mailto:hello@company.com" },
  { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { icon: MapPin, text: "New York, NY", href: "#" },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-black text-white">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-72 w-72 rounded-full bg-[#a8f5e5]/5 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-8xl px-6 pb-10 pt-14 lg:px-8 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Newsletter + Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:col-span-5"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-tight text-white">Stay Connected</h3>
              <p className="text-sm text-white/60">
                Get the latest updates and insights delivered to your inbox.
              </p>

              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-5 pr-12 text-sm text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-[#a8f5e5]/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#a8f5e5]/20"
                />
                <button className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#a8f5e5] to-[#7de0cc] text-black shadow-md hover:scale-105 transition-transform">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white/50">Contact</h4>
              <div className="space-y-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.text}
                      href={item.href}
                      className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white group"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/5 group-hover:bg-white/10">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{item.text}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Social */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              <h4 className="text-xs font-medium uppercase tracking-wider text-white/50">
                Follow Us
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:border-[#a8f5e5]/30 hover:bg-white/10 hover:text-white transition-all"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-7 lg:gap-10">
            {Object.entries(navigation).map(([key, links], idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                className="space-y-4"
              >
                <h4 className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                <ul className="space-y-2">
                  {links.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group relative inline-block text-sm text-white/70 hover:text-white"
                      >
                        <span className="relative">
                          {item.name}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[#a8f5e5] to-transparent transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Branding */}
        <div className="mt-14 mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,8vw,6rem)] font-light leading-tight tracking-tighter text-white"
          >
            Preshideas
            <sup className="text-[0.3em] align-super font-normal">®</sup>
          </motion.h2>
          <p className="mt-4 text-base text-white/40 max-w-xl mx-auto">
            Empowering Your Vision with Innovative Digital Solutions
          </p>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/40">
            <span>© {new Date().getFullYear()} Preshideas.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>All rights reserved</span>
            <span className="hidden sm:inline text-white/20">•</span>
            {/* <span>Company Number 11955187</span> */}
            <span className="hidden md:inline text-white/20">•</span>
            {/* <span className="hidden md:inline"></span> */}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <Link href="#" className="text-white/40 hover:text-white/70">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link href="#" className="text-white/40 hover:text-white/70">
              Terms & Conditions
            </Link>
            <span className="text-white/20">•</span>
            <Link href="#" className="text-white/40 hover:text-white/70">
              Cookies
            </Link>
          </div>
        </motion.div>

        {/* Tiny credit */}
        <div className="mt-4 text-center text-[11px] text-white/30">
          Preshideas{" "}
          <Link href="#" className="hover:text-white/50 transition-colors">
            - Digital Agency {new Date().getFullYear()}
          </Link>
        </div>
      </div>
    </footer>
  )
}
