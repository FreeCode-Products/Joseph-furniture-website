"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { getFeaturedProducts } from "@/lib/products";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";

const featuredProducts = getFeaturedProducts();

const productColors = [
  "bg-gradient-to-br from-sand/40 to-bone",
  "bg-gradient-to-br from-sage/30 to-sand/20",
  "bg-gradient-to-br from-bone to-sand/30",
  "bg-gradient-to-br from-walnut/10 to-bone",
  "bg-gradient-to-br from-sage/20 to-bone",
  "bg-gradient-to-br from-sand/30 to-sage/20",
];

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth - window.innerWidth;

      // Heading fade in
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Horizontal scroll
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white"
    >
      {/* Header */}
      <div ref={headingRef} className="absolute top-12 left-6 md:left-12 z-10">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70 mb-2">
          Handpicked
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-charcoal">
          Featured Pieces
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen gap-4 sm:gap-8 pl-4 sm:pl-6 md:pl-12 pr-[40vw] pt-28"
      >
        {featuredProducts.map((product, i) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="flex-shrink-0 group"
          >
            <div
              className={`relative w-[240px] sm:w-[320px] md:w-[400px] h-[350px] sm:h-[450px] md:h-[520px] rounded-2xl overflow-hidden ${productColors[i % productColors.length]} p-4 sm:p-6 flex flex-col justify-between transition-transform duration-500 group-hover:scale-[1.02]`}
            >
              {/* Decorative shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/20" />

              <div className="relative flex-1 rounded-2xl overflow-hidden">
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-charcoal/50 uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-charcoal">
                      {product.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(
                        buildProductWhatsAppUrl(product, { origin }),
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contact Us
                  </button>
                </div>

                {/* View button */}
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-charcoal/60 group-hover:text-walnut transition-colors">
                  <span>View Details</span>
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
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
