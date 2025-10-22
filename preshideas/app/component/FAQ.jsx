"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
	{
		question: "How many people are in the Digital PR team?",
		answer:
			"Our Digital PR team consists of a mix of strategists, creatives, and outreach specialists who collaborate to deliver impactful campaigns.",
	},
	{
		question: "How do you work with traditional PR teams?",
		answer:
			"We complement traditional PR teams by integrating digital insights and SEO strategies to maximize campaign reach and measurable impact.",
	},
	{
		question: "What kind of results should be expected from Digital PR?",
		answer:
			"Expect measurable results like backlinks, brand mentions, referral traffic, and improvements in search visibility and authority.",
	},
	{
		question: "How much does Digital PR cost?",
		answer:
			"Our pricing depends on campaign scope, goals, and duration — we tailor our approach to match your brand’s needs and scale.",
	},
	{
		question: "What key metrics do you report on for Digital PR?",
		answer:
			"We focus on metrics such as backlinks, domain authority improvements, organic traffic growth, and coverage across relevant publications.",
	},
	{
		question: "What do you do if Digital PR isn't driving organic growth/traffic?",
		answer:
			"We re-evaluate your strategy using analytics data, identify content gaps, and adjust our campaign focus to maximize performance.",
	},
	{
		question:
			"How fast can we see the impact of Digital PR and get results/coverage?",
		answer:
			"Results can start appearing within weeks, but long-term visibility and SEO authority build progressively with consistent campaigns.",
	},
	{
		question:
			"What if we can't be super fast or work in a regulated industry?",
		answer:
			"We adapt our campaign approach to comply with regulations while still finding creative opportunities to earn media and backlinks.",
	},
	{
		question: "How long does it take to run a digital PR campaign?",
		answer:
			"Typically, campaigns run for 3–6 months depending on goals, content development, and outreach scope.",
	},
	{
		question: "Do you do Digital PR training for inhouse brands?",
		answer:
			"Yes, we provide tailored training sessions to help inhouse teams understand digital PR principles, tools, and execution best practices.",
	},
];

export default function FAQSection() {
	const [openIndex, setOpenIndex] = useState(null);
	const reduceMotion = useReducedMotion();

	const toggle = (index) => {
		setOpenIndex((prev) => (prev === index ? null : index));
	};

	const handleKey = (e, index) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggle(index);
		}
	};

	const motionProps = reduceMotion
		? {
				initial: false,
				animate: { height: "auto", opacity: 1 },
				exit: { height: 0, opacity: 0 },
		  }
		: {
				initial: { height: 0, opacity: 0 },
				animate: { height: "auto", opacity: 1 },
				exit: { height: 0, opacity: 0 },
		  };

	return (
		<section className="bg-[#F4F4F2] text-black py-10 px-4 sm:py-16 sm:px-6 md:px-12 rounded-3xl">
			<div className="max-w-3xl mx-auto">
				{/* Heading */}
				<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-center md:text-left">
					Frequently asked questions
				</h2>

				{/* FAQ List */}
				<div className="flex flex-col gap-3 sm:gap-4">
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index;
						const contentId = `faq-content-${index}`;
						const buttonId = `faq-button-${index}`;

						return (
							<div
								key={index}
								className="bg-white rounded-2xl shadow-sm overflow-hidden"
							>
								<button
									id={buttonId}
									aria-expanded={isOpen}
									aria-controls={contentId}
									onClick={() => toggle(index)}
									onKeyDown={(e) => handleKey(e, index)}
									className="w-full flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 text-left text-sm sm:text-base md:text-lg font-medium hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
								>
									<span className="flex-1 pr-4">{faq.question}</span>
									<span className="flex-shrink-0">
										{isOpen ? (
											<Minus size={18} className="text-gray-500" />
										) : (
											<Plus size={18} className="text-gray-500" />
										)}
									</span>
								</button>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											key={contentId}
											id={contentId}
											role="region"
											aria-labelledby={buttonId}
											{...motionProps}
											transition={{
												duration: reduceMotion ? 0 : 0.28,
												ease: "easeInOut",
											}}
											className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-700 text-sm sm:text-base leading-relaxed"
										>
											{faq.answer}
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
