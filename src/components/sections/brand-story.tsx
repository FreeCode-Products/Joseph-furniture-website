"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/Ashok+Pillar/@13.0348594,80.2095938,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267c15401afc1:0x7acc871dc8f94f13!8m2!3d13.0348542!4d80.2121687!16s%2Fg%2F11fm_s8wsj";
const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps?q=13.0348542,80.2121687&z=17&output=embed";

export default function BrandStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Parallax image
      if (imageRef.current) {
        const isMobile = window.matchMedia("(max-width: 639px)").matches;
        gsap.to(imageRef.current, {
          yPercent: isMobile ? -8 : -20,
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
        <div className="relative h-[360px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-0 scale-[1.03] sm:scale-110"
          >
            <iframe
              title="Elshaddai Furnitures Location on Google Maps"
              src={GOOGLE_MAPS_EMBED_URL}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <a
                href={GOOGLE_MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 h-10 rounded-full bg-white/90 text-charcoal text-sm font-medium hover:bg-white transition-colors duration-300 shadow-md"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-6 sm:space-y-8">
          <p
            ref={(el) => { textRefs.current[0] = el; }}
            className="text-[11px] sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase text-walnut/70"
          >
            Our Story
          </p>
          <h2
            ref={(el) => { textRefs.current[1] = el; }}
            className="text-2xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal leading-tight"
          >
            Premium Teak & Country Wood
            <br />
            <span className="text-walnut">Manufacturers.</span>
          </h2>
          <p
            ref={(el) => { textRefs.current[2] = el; }}
            className="text-base sm:text-lg text-charcoal/60 leading-relaxed"
          >
            Elshaddai Furnitures brings you the best in wooden cots, sofas, dining tables, teapoy, and other handcrafted furniture.
          </p>
          <p
            ref={(el) => { textRefs.current[3] = el; }}
            className="text-base sm:text-lg text-charcoal/60 leading-relaxed italic"
          >
            &quot;For from him and through him and for him are all things. To him be
            the glory forever! Amen. Romans:11:36&quot;
          </p>

          {/* Stats */}
          <div
            ref={(el) => { textRefs.current[4] = el; }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-8 border-t border-sand/50"
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
