"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale" | "none";

interface ScrollSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
  id?: string;
  delay?: number;
}

export default function ScrollSection({
  children,
  animation = "fade-up",
  className = "",
  id,
  delay = 0,
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || animation === "none") return;

    const el = sectionRef.current;

    const fromVars: gsap.TweenVars = { duration: 1, ease: "power3.out", delay };
    const toVars: gsap.TweenVars = { duration: 1, ease: "power3.out", delay };

    switch (animation) {
      case "fade-up":
        fromVars.opacity = 0;
        fromVars.y = 60;
        toVars.opacity = 1;
        toVars.y = 0;
        break;
      case "fade-left":
        fromVars.opacity = 0;
        fromVars.x = -80;
        toVars.opacity = 1;
        toVars.x = 0;
        break;
      case "fade-right":
        fromVars.opacity = 0;
        fromVars.x = 80;
        toVars.opacity = 1;
        toVars.x = 0;
        break;
      case "scale":
        fromVars.opacity = 0;
        fromVars.scale = 0.9;
        toVars.opacity = 1;
        toVars.scale = 1;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, fromVars);

      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        end: "top 20%",
        onEnter: () => gsap.to(el, toVars),
        onEnterBack: () => gsap.to(el, toVars),
        once: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animation, delay]);

  return (
    <section ref={sectionRef} id={id} className={className}>
      {children}
    </section>
  );
}
