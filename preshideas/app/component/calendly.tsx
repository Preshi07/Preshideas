import { ArrowRight } from "lucide-react";

export default function CTAButton() {
  return (
    <a
      href="https://calendly.com/seiduadaeiza06/30min" // REPLACE THIS
      target="_blank"
      rel="noopener noreferrer"
      className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
    >
      Start Project
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}