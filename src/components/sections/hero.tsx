"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";

const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-sand border-t-walnut animate-spin" />
    </div>
  ),
});

const headingWords = ["Curated", "Furniture", "for", "Modern", "Living"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !modelContainerRef.current) return;

    const section = sectionRef.current;
    const model = modelContainerRef.current;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / (rect.height * 0.5), 0), 1);
      model.style.opacity = String(1 - progress);
      model.style.transform = `scale(${1 - progress * 0.2})`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-cream via-bone to-cream pt-20 sm:pt-24 pb-12"
    >
      {/* Decorative grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left: Text */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70"
            >
              Scandinavian Design Studio
            </motion.p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] text-charcoal">
              {headingWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.1,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-lg text-charcoal/60 max-w-md leading-relaxed"
          >
            Timeless pieces that blend form and function. Each item is built to
            last, designed to inspire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 sm:px-8 sm:py-4 rounded-full text-sm sm:text-base font-medium hover:bg-walnut transition-colors group"
            >
              Explore Collection
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/#about"
              className="text-charcoal/60 font-medium hover:text-walnut transition-colors"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        {/* Right: 3D Model */}
        <div ref={modelContainerRef} className="relative h-[280px] sm:h-[400px] lg:h-[600px]">
          <ModelViewer
            modelType="chair"
            autoRotate
            className="w-full h-full"
            environmentPreset="apartment"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase text-charcoal/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-5 h-5 text-charcoal/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
