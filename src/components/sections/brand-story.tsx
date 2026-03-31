"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function BrandStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Parallax image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Stagger text lines from right
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
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
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Image with parallax */}
        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 scale-125"
            style={{
              background:
                "linear-gradient(135deg, #D4C5B2 0%, #A8B5A0 50%, #F5F0EB 100%)",
            }}
          >
            {/* Abstract furniture shapes as placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Decorative circles representing craftsmanship */}
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-2 border-walnut/20" />
                <div className="absolute top-8 left-8 w-48 h-48 rounded-full border-2 border-walnut/10" />
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-walnut/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-sand/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-8">
          <p
            ref={(el) => { textRefs.current[0] = el; }}
            className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70"
          >
            Our Story
          </p>
          <h2
            ref={(el) => { textRefs.current[1] = el; }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal leading-tight"
          >
            Designed with purpose.
            <br />
            <span className="text-walnut">Crafted with care.</span>
          </h2>
          <p
            ref={(el) => { textRefs.current[2] = el; }}
            className="text-lg text-charcoal/60 leading-relaxed"
          >
            Born in Stockholm, Nörd brings together the best of Scandinavian
            design philosophy — simplicity, functionality, and an unwavering
            respect for natural materials.
          </p>
          <p
            ref={(el) => { textRefs.current[3] = el; }}
            className="text-lg text-charcoal/60 leading-relaxed"
          >
            Every piece in our collection is thoughtfully designed to bring
            warmth and character to your home. We work with sustainable forests,
            skilled artisans, and timeless design principles.
          </p>

          {/* Stats */}
          <div
            ref={(el) => { textRefs.current[4] = el; }}
            className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 border-t border-sand/50"
          >
            {[
              { number: "15+", label: "Years of craft" },
              { number: "200+", label: "Unique designs" },
              { number: "50k+", label: "Happy homes" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-heading font-bold text-walnut">
                  {stat.number}
                </p>
                <p className="text-sm text-charcoal/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
