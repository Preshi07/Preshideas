"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu, ChevronDown, ArrowRight } from "lucide-react";
// FIXED: Imported Variants type
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // FIXED: Explicitly typed variants to satisfy TypeScript
  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const menuItemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <>
      {/* --- DESKTOP NAVIGATION --- */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl hidden md:flex items-center justify-between px-8 py-4 transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg rounded-full text-gray-900 py-3"
              : "bg-transparent text-gray-900"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="relative w-50 h-18">
            <Image
              src="/logos/brand.png"
              alt="Preshideas"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
        </div>

        {/* Links */}
        <ul className="flex items-center space-x-8 text-sm font-medium">
          
          {/* Services Dropdown */}
          <li 
            className="relative group h-full flex items-center"
            onMouseEnter={() => setOpenDropdown("desktop-services")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="flex items-center space-x-1 hover:text-green-600 transition-colors py-2">
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDropdown === "desktop-services" ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Menu */}
            <AnimatePresence>
              {openDropdown === "desktop-services" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 overflow-hidden"
                >
                  <div className="flex">
                    {/* Links Column */}
                    <div className="w-1/2 p-4 space-y-1">
                      {[
                        { href: "/digital", label: "Digital Marketing" },
                        { href: "/seo", label: "SEO Optimization" },
                        { href: "/b2b", label: "B2B Writing" },
                        { href: "/automation", label: "Automation" },
                        { href: "/strategy", label: "AI Agent" },
                        { href: "/branding", label: "Brand Strategy" },
                      ].map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-green-600 transition-colors text-sm font-medium"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>

                    {/* Feature Image Column */}
                    <div className="w-1/2 bg-gray-50 rounded-xl p-4 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
                      <div className="relative h-32 w-full mb-4 overflow-hidden rounded-lg">
                         <Image
                           src="/dropdowns/services.jpg" 
                           alt="Service Highlight"
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Scale Faster</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Discover how our data-driven strategies drive real growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {/* Regular Links */}
          {["About", "Work", "Blog", "Webinar"].map((item) => (
            <li key={item}>
              <Link 
                href={`/${item.toLowerCase()}`} 
                className="hover:text-green-600 transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link
          href="/contact"
          className={`
            group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
            ${scrolled 
              ? "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg" 
              : "bg-white text-black hover:bg-gray-100 shadow-sm"
            }
          `}
        >
          Get In Touch
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.nav>

      {/* --- MOBILE NAVIGATION --- */}
      <nav
        className={`fixed top-4 left-4 right-4 z-50 flex md:hidden items-center justify-between px-6 py-3 transition-all duration-300 rounded-full
        ${
          scrolled || isOpen
            ? "bg-white/90 backdrop-blur-md shadow-lg border border-white/20"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="relative w-32 h-10">
          <Image
            src="/logos/brand.png"
            alt="Preshideas"
            fill
            className="object-contain object-left"
          />
        </Link>

        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full sm:w-[400px] h-full bg-white shadow-2xl flex flex-col overflow-y-auto"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Menu</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-900" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 px-6 py-8 space-y-6">
                
                {/* Mobile Services Accordion */}
                <div>
                  <button
                    onClick={() => toggleDropdown("services")}
                    className="flex items-center justify-between w-full text-2xl font-bold text-gray-900 mb-4"
                  >
                    Services
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "services" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-3 pl-4 border-l-2 border-gray-100 ml-1">
                          {[
                            { href: "/digital", label: "Digital Marketing" },
                            { href: "/seo", label: "SEO Optimization" },
                            { href: "/b2b", label: "B2B Writing" },
                            { href: "/automation", label: "Automation" },
                            { href: "/strategy", label: "AI Agent" },
                            { href: "/branding", label: "Brand Strategy" },
                          ].map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-lg font-medium text-gray-600 hover:text-green-600 transition-colors"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Links */}
                <ul className="space-y-6">
                  {["About", "Work", "Blog", "Webinar"].map((item, i) => (
                    <motion.li 
                      key={item}
                      custom={i}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link 
                        href={`/${item.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-all active:scale-95"
                >
                  Start a Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-400">© 2024 Preshideas Agency</p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}