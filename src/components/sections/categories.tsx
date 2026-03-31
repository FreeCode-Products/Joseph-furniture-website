"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { categories } from "@/lib/products";

const categoryColors = [
  "from-sand/80 to-sage/40",
  "from-bone to-sand/60",
  "from-sage/40 to-bone",
  "from-walnut/20 to-sand/40",
  "from-sage/60 to-sand/30",
];

const categoryIcons = [
  // Sofa
  "M3 18h18v-2a2 2 0 0 0-2-2h-1V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v5H5a2 2 0 0 0-2 2v2Z",
  // Bed
  "M2 17V7h2v4h16V7h2v10h-2v-2H4v2H2Zm4-6h12V9a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2Z",
  // Kitchen utensils
  "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2l-4 6 4 6M15 22h6",
  // Desk
  "M4 6h16v2H4V6Zm0 10h16v2H4v-2Zm2-10v10M18 6v10M8 12h8",
  // Tree (outdoor)
  "M12 2L7 10h3v4H7l5 8 5-8h-3v-4h3L12 2Z",
];

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="categories" className="py-20 sm:py-28 lg:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70">
            Browse by Room
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal">
            Find Your Style
          </h2>
          <p className="text-lg text-charcoal/50 max-w-2xl mx-auto">
            Explore our curated collections designed for every room in your home
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className={`relative bg-gradient-to-br ${categoryColors[i]} p-5 sm:p-6 lg:p-8 ${
                  i === 0 ? "h-64 lg:h-72" : "h-56 lg:h-64"
                } flex flex-col justify-end`}
              >
                {/* Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-charcoal/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={categoryIcons[i]}
                    />
                  </svg>
                </div>

                {/* Decorative shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700" />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-charcoal/60">{cat.description}</p>
                </div>

                {/* Arrow on hover */}
                <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-charcoal flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg
                    className="w-4 h-4 text-white"
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
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
