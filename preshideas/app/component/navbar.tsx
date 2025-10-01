"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl hidden md:flex 
        items-center justify-between px-6 py-2 transition-all duration-300
        ${
          scrolled
            ? "bg-gradient-to-r from-gray-200/90 via-gray-300/80 to-gray-200/90 backdrop-blur-md rounded-full shadow-md"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logos/brand.png"
              alt="Preshideas"
              width={150}
              height={100}
              priority
              className="h-22 w-30"
            />
          </Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-6 text-sm text-gray-900 font-medium relative">
          {/* Services mega dropdown */}
          <li className="relative group">
            <button className="flex items-center space-x-1">
              <span>Services</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Mega menu */}
            <div className="absolute top-full left-0 mt-2 hidden group-hover:flex bg-white rounded-xl shadow-lg p-6 w-[500px] z-50">
              {/* Left side list */}
              <div className="w-1/2 flex flex-col space-y-3 text-gray-700">
                <Link href="/services/seo" className="hover:text-black">
                  SEO
                </Link>
                <Link href="/services/content" className="hover:text-black">
                  Content
                </Link>
                <Link href="/services/branding" className="hover:text-black">
                  Branding
                </Link>
                <Link href="/services/strategy" className="hover:text-black">
                  Strategy
                </Link>
              </div>
              {/* Right side image */}
              <div className="w-1/2 flex items-center justify-center">
                <Image
                  src="/dropdowns/services.jpg"
                  alt="Services Preview"
                  width={400}
                  height={150}
                  className="rounded-lg object-cover shadow"
                />
              </div>
            </div>
          </li>

          {/* About mega dropdown */}
          <li className="relative group">
            <button className="flex items-center space-x-1">
              <span>About</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 hidden group-hover:flex bg-white rounded-xl shadow-lg p-6 w-[500px] z-50">
              <div className="w-1/2 flex flex-col space-y-3 text-gray-700">
                <Link href="/about/company" className="hover:text-black">
                  Company
                </Link>
                <Link href="/about/team" className="hover:text-black">
                  Team
                </Link>
                <Link href="/about/culture" className="hover:text-black">
                  Culture
                </Link>
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <Image
                  src="/dropdowns/about.jpg"
                  alt="About Preview"
                  width={200}
                  height={150}
                  className="rounded-lg object-cover shadow"
                />
              </div>
            </div>
          </li>

          <li>
            <Link href="/work">Work</Link>
          </li>
          <li>
            <Link href="/careers">Careers</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/webinar">Webinar</Link>
          </li>
        </ul>

        {/* Button */}
        <Link
          href="/contact"
          className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          Get In Touch ↗
        </Link>
      </nav>

      {/* Mobile Navbar Button */}
      <nav
        className={`fixed top-6 left-4 right-4 z-50 flex items-center justify-between 
        md:hidden px-4 py-1 transition-all duration-300
        ${
          scrolled
            ? "bg-gradient-to-r from-gray-200/90 via-gray-300/80 to-gray-200/90 backdrop-blur-md rounded-full shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logos/brand.png"
              alt="Rise at Seven"
              width={200}
              height={100}
              priority
              className="h-20 w-20"
            />
          </Link>
        </div>

        {/* Hamburger */}
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-gradient-to-b from-gray-900/80 to-black/80 
                text-white flex-1 flex flex-col p-6 rounded-3xl m-2"
            >
              {/* Header with Close */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Image
                    src="/logos/brand.png"
                    alt="Rise at Seven"
                    width={120}
                    height={40}
                    priority
                    className="h-10 w-auto"
                  />
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Links */}
              <ul className="flex flex-col space-y-6 text-2xl font-bold">
                <li>
                  <button
                    onClick={() => toggleDropdown("services")}
                    className="flex items-center justify-between w-full"
                  >
                    Services{" "}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openDropdown === "services" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "services" && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 mt-2 space-y-2 text-lg font-normal"
                      >
                        <li>
                          <Link href="/services/seo">SEO</Link>
                        </li>
                        <li>
                          <Link href="/services/content">Content</Link>
                        </li>
                        <li>
                          <Link href="/services/branding">Branding</Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <li>
                  <button
                    onClick={() => toggleDropdown("about")}
                    className="flex items-center justify-between w-full"
                  >
                    About{" "}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        openDropdown === "about" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === "about" && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-4 mt-2 space-y-2 text-lg font-normal"
                      >
                        <li>
                          <Link href="/about/company">Company</Link>
                        </li>
                        <li>
                          <Link href="/about/team">Team</Link>
                        </li>
                        <li>
                          <Link href="/about/culture">Culture</Link>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <li>
                  <Link href="/work">Work</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/webinar">Webinar</Link>
                </li>
              </ul>

              {/* Bottom Button */}
              <div className="mt-auto">
                <Link
                  href="/contact"
                  className="block text-center bg-white text-black py-3 rounded-full font-medium"
                >
                  Get In Touch ↗
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
