"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Briefcase,
  FileText,
  Check,
} from "lucide-react";

// Enhanced Form Components
const InputField = ({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="space-y-2 group">
    <label className="text-sm font-semibold text-gray-800 transition-colors group-focus-within:text-[#a3e635]">
      {label} {required && <span className="text-[#a3e635]">*</span>}
    </label>
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full bg-[#f4f4f4] text-black rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all placeholder-gray-400"
    />
  </div>
);

const SelectField = ({
  label,
  options,
  required = false,
}: {
  label: string;
  options: string[];
  required?: boolean;
}) => (
  <div className="space-y-2 group">
    <label className="text-sm font-semibold text-gray-800 transition-colors group-focus-within:text-[#a3e635]">
      {label} {required && <span className="text-[#a3e635]">*</span>}
    </label>
    <div className="relative">
      <select
        required={required}
        defaultValue=""
        className="w-full bg-[#f4f4f4] text-black rounded-xl p-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all cursor-pointer"
      >
        <option value="" disabled>
          Please select an option
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  </div>
);

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const locations = [
    { city: "Lagos, Nigeria", address: "Iponri, Surulere" },
    { city: "Lagos, Nigeria", address: "Mainland" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const services = [
    "Content Strategy & Content Production",
    "SEO Strategy, Technical SEO & On-Page Optimization",
    "Digital PR & Thought Leadership Development",
    "Digital Marketing & Funnel Setup",
    "Workflow Automation & AI Agents",
    "Social Media & LinkedIn Authority Growth",
  ];

  return (
    <>
      <section className="pt-32 pb-20 bg-[#f4f4f4] min-h-screen" id="contact">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header Section */}
          <motion.div
            className="max-w-4xl mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#a3e635] font-bold tracking-wider uppercase text-sm mb-2 block">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#0a0a0a] mb-6">
              Let’s Build Something That <br className="hidden md:block" />{" "}
              Moves Your Brand Forward
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              Whether you’re looking for content strategy, digital PR, SEO, or
              marketing systems that scale, this is where the conversation
              begins.
              <span className="block mt-4">
                At <strong className="text-[#0a0a0a]">Presh Ideas</strong>, we
                partner with brands that want clarity, consistency, and
                measurable growth. If that sounds like you, reach out and let’s
                explore how we can work together.
              </span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Column: Content Info */}
            <motion.div
              className="lg:col-span-7 space-y-16"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Services Section */}
              <section>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#0a0a0a]">
                  <Briefcase className="text-[#a3e635]" size={24} />
                  Work With a Growth-Driven Digital Agency
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Whether you need a long-term content partner, a full SEO
                  strategy, a digital PR campaign, or automated systems that
                  remove manual work, our team is here to help.
                </p>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h4 className="font-semibold mb-6 text-[#0a0a0a] border-b border-gray-100 pb-4">
                    Popular services you can inquire about:
                  </h4>
                  <ul className="space-y-3">
                    {services.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#a3e635] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Email Contact Section */}
              <section className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#0a0a0a] text-white p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#a3e635] rounded-bl-[100%] -mr-4 -mt-4 opacity-20 transition-transform group-hover:scale-110" />
                  <Mail className="mb-4 text-[#a3e635]" size={28} />
                  <h4 className="font-bold text-lg mb-2 text-[#a3e635]">
                    General Inquiries:
                  </h4>
                  <a
                    href="mailto:info@preshideas.com"
                    className="text-lg font-medium hover:underline underline-offset-4 break-words"
                  >
                    info@preshideas.com
                  </a>
                </div>
                <div className="bg-white border border-gray-200 p-8 rounded-3xl group hover:border-[#0a0a0a] transition-colors">
                  <FileText className="mb-4 text-[#0a0a0a]" size={28} />
                  <h4 className="font-bold text-lg mb-2 text-[#0a0a0a]">
                    Project Requests:
                  </h4>
                  <a
                    href="mailto:hello@preshideas.com"
                    className="text-lg font-bold text-[#0a0a0a] hover:text-[#a3e635] transition-colors break-words"
                  >
                    hello@preshideas.com
                  </a>
                </div>
                <p className="text-sm text-gray-500 md:col-span-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  We typically respond within 24–48 hours.
                </p>
              </section>

              {/* Process Section */}
              <section>
                <h3 className="text-2xl font-bold mb-8 text-[#0a0a0a]">
                  What Happens Next
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "We Review Your Request",
                      desc: "Our team assesses your goals and determines how best we can support you.",
                    },
                    {
                      title: "We Schedule a Discovery Call",
                      desc: "A 15–20 minute session to understand your needs and outline direction.",
                    },
                    {
                      title: "You Receive a Clear Proposal",
                      desc: "Strategy, timeline, and pricing—no guesswork.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-100 font-bold text-lg shrink-0 group-hover:border-[#a3e635] group-hover:bg-[#a3e635] group-hover:text-black transition-colors">
                        {i + 1}
                      </div>
                      <div className="pt-2">
                        <h4 className="font-bold text-lg text-[#0a0a0a]">
                          {step.title}
                        </h4>
                        <p className="text-gray-600 mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Us Section */}
              <section className="bg-[#f0fdf4] rounded-3xl p-8 md:p-10 border border-[#a3e635]/20">
                <h3 className="text-2xl font-bold mb-6 text-[#0a0a0a]">
                  Why Brands Choose Presh Ideas
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {[
                    "Strategy-first approach",
                    "High-quality content & systems",
                    "Proven SEO & visibility results",
                    "Strong thought leadership & PR",
                    "Automation & AI workflow expertise",
                    "Trusted by SaaS, tech & SMEs",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-800 font-medium"
                    >
                      <Check
                        size={20}
                        className="text-[#a3e635] shrink-0 mt-0.5"
                        strokeWidth={3}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </motion.div>

            {/* Right Column: Form (Sticky) */}
            <motion.div
              className="lg:col-span-5 sticky top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5 border border-gray-100">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-2 text-[#0a0a0a]">
                    Let’s Get You Connected
                  </h3>
                  <p className="text-gray-500">
                    Send Us a Message. Tell us briefly about your goals,
                    challenges, or the project you want support with.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                          label="First Name"
                          placeholder="John"
                          required
                        />
                        <InputField
                          label="Last Name"
                          placeholder="Doe"
                          required
                        />
                      </div>

                      <InputField
                        label="Email Address"
                        placeholder="john@company.com"
                        type="email"
                        required
                      />
                      <InputField
                        label="Company Name"
                        placeholder="Presh Ideas"
                        required
                      />

                      <SelectField
                        label="I'm Interested in..."
                        options={services}
                        required
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                          label="Region"
                          options={["UK", "USA", "Europe", "APAC", "Other"]}
                          required
                        />
                        <SelectField
                          label="Source"
                          options={[
                            "LinkedIn",
                            "Twitter/X",
                            "Search Engine",
                            "Referral",
                            "Event",
                          ]}
                          required
                        />
                      </div>

                      <div className="space-y-2 group">
                        <label className="text-sm font-semibold text-gray-800 transition-colors group-focus-within:text-[#a3e635]">
                          How can we help? *
                        </label>
                        <textarea
                          rows={4}
                          required
                          className="w-full bg-[#f4f4f4] text-black rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all resize-none placeholder-gray-400"
                          placeholder="Tell us a bit about your project..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0a0a0a] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            Sending...{" "}
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          </span>
                        ) : (
                          <>
                            Submit Message <ArrowUpRight size={20} />
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          delay: 0.2,
                        }}
                        className="w-24 h-24 bg-[#a3e635] rounded-full flex items-center justify-center text-black"
                      >
                        <CheckCircle2 size={48} />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-[#0a0a0a] mb-2">
                          Message Received!
                        </h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                          Thank you for contacting Presh Ideas. Our team will
                          review your inquiry and get back to you shortly.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-8 text-sm font-medium text-gray-500 hover:text-black underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Direct Start Footer */}
                {!isSubmitted && (
                  <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                    <p className="font-bold text-[#0a0a0a] mb-2 flex items-center justify-center gap-2">
                      Prefer a Direct Start?
                    </p>
                    <p className="text-xs text-gray-500 mb-4 max-w-xs mx-auto">
                      We also accept project briefs and RFP documents. Attach
                      them in your message or email directly.
                    </p>
                    <a
                      href="mailto:hello@preshideas.com"
                      className="text-[#0a0a0a] font-bold text-sm hover:text-[#a3e635] transition-colors inline-flex items-center gap-1"
                    >
                      hello@preshideas.com <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-20 text-center border-t border-gray-200 pt-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0a0a0a] mb-4">
              Let’s Build Your Next Growth Chapter
            </h2>
            <p className="text-xl text-gray-500">
              Your growth starts with one message. We’re here when you’re ready.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#f4f4f4] py-20 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <motion.h2
            className="text-xl font-medium mb-12 text-[#0a0a0a]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Office Locations
          </motion.h2>

          <div className="space-y-0">
            {locations.map((loc, index) => (
              <motion.div
                key={loc.address}
                className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-gray-300 last:border-0 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0a0a0a] group-hover:text-gray-600 transition-colors">
                  {loc.city}
                </h3>
                <p className="text-right text-lg md:text-xl text-[#1c1c1c] mt-4 md:mt-0 font-light max-w-xs capitalize">
                  {loc.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
