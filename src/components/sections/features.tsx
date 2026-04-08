"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 7.07l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
    title: "Sustainable Materials",
    description: "FSC-certified wood and eco-friendly fabrics. Every piece is sourced responsibly.",
    stat: "100%",
    statLabel: "Sustainable",
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547Z",
    title: "Handcrafted Quality",
    description: "Expert artisans bring decades of experience to every joint, curve, and finish.",
    stat: "200+",
    statLabel: "Artisans",
  },
  {
    icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
    title: "Free Delivery",
    description: "Complimentary white-glove delivery and assembly on all orders over $500.",
    stat: "Free",
    statLabel: "Shipping",
  },
  {
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    title: "10-Year Warranty",
    description: "We stand behind our craftsmanship. Full structural warranty on every piece.",
    stat: "10",
    statLabel: "Year Warranty",
  },
];

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(numericTarget) && numericTarget > 0;

  useEffect(() => {
    if (!isInView || !isNumeric) return;
    let start = 0;
    const end = numericTarget;
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / end), 16);
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, numericTarget, isNumeric]);

  if (!isNumeric) {
    return <span ref={ref}>{target}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {target.includes("+") ? "+" : ""}
      {suffix}
    </span>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70">
            Why John
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal">
            Built Different
          </h2>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-xl bg-sage/20 flex items-center justify-center mb-6"
                >
                  <svg
                    className="w-7 h-7 text-walnut"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={feature.icon}
                    />
                  </svg>
                </motion.div>

                {/* Stat */}
                <div className="mb-4">
                  <p className="text-3xl font-heading font-bold text-walnut">
                    <AnimatedCounter target={feature.stat} />
                  </p>
                  <p className="text-xs text-charcoal/40 uppercase tracking-wider">
                    {feature.statLabel}
                  </p>
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-charcoal/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
