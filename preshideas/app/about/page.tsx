"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#f5f5f5] text-center px-6">
      <div className="relative">
        <h1 className="text-[clamp(3rem,12vw,8rem)] font-bold leading-[0.9] text-black">
          Nice to
          <br />
          meet{" "}
          <span className="relative inline-block align-middle">
            {/* Centered image inside text */}
            <Image
              src="/person.png" // <-- replace with your image path
              alt="Person holding sign"
              width={140}
              height={140}
              className="rounded-2xl inline-block mx-2 shadow-lg"
            />
          </span>
          you
        </h1>
      </div>

      <p className="mt-10 text-lg md:text-2xl text-black/80 max-w-2xl">
        If you were heading where we’re heading, you’d Rise at Seven too
      </p>
    </section>
  );
}
