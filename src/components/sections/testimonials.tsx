"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Emma Lindström",
    role: "Interior Designer",
    location: "Stockholm",
    quote:
      "John furniture has become my go-to recommendation for clients seeking that perfect balance of form and function. The quality is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Architect",
    location: "Copenhagen",
    quote:
      "The attention to detail in every piece is remarkable. The Nordic Sofa has been the centerpiece of my living room for three years — still looks brand new.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sofia Bergman",
    role: "Homeowner",
    location: "Oslo",
    quote:
      "From ordering to delivery, the experience was seamless. The Fjord Dining Table is even more beautiful in person. Worth every penny.",
    rating: 5,
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Creative Director",
    location: "Helsinki",
    quote:
      "My studio desk from John transformed my work-from-home setup. Clean lines, great cable management, and solid as a rock.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal">
            What People Say
          </h2>
        </div>

        {/* Testimonial carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Quote icon */}
          <div className="absolute -top-4 left-0 md:left-8 z-0">
            <svg
              className="w-16 h-16 sm:w-20 sm:h-20 text-sand/50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179Z" />
            </svg>
          </div>

          <div className="relative h-[280px] md:h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[current].id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center text-center px-4 md:px-16"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-walnut"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl font-heading text-charcoal leading-relaxed mb-8">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="font-semibold text-charcoal">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-charcoal/50">
                    {testimonials[current].role} — {testimonials[current].location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-8 h-2 bg-walnut"
                    : "w-2 h-2 bg-sand hover:bg-walnut/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Nav arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <button
              onClick={() =>
                setCurrent(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              className="pointer-events-auto w-10 h-10 rounded-full bg-bone hover:bg-sand transition-colors flex items-center justify-center -translate-x-4"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-4 h-4 text-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              className="pointer-events-auto w-10 h-10 rounded-full bg-bone hover:bg-sand transition-colors flex items-center justify-center translate-x-4"
              aria-label="Next testimonial"
            >
              <svg
                className="w-4 h-4 text-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
