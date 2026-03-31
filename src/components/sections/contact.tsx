"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "@/lib/gsap";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "468123456789";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      fieldsRef.current.forEach((field, i) => {
        if (!field) return;
        gsap.fromTo(
          field,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: field,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi, I'd like to get in touch!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 bg-charcoal overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-walnut/30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-sand/70">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white">
            Let&apos;s Create Your
            <br />
            <span className="text-sand">Perfect Space</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-lg mx-auto">
            Have a project in mind? Our design consultants are ready to help
            bring your vision to life.
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto"
        >
          <div ref={(el) => { fieldsRef.current[0] = el; }}>
            <label className="block text-sm text-white/60 mb-2">Name</label>
            <Input
              type="text"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-sand/50 h-12"
            />
          </div>
          <div ref={(el) => { fieldsRef.current[1] = el; }}>
            <label className="block text-sm text-white/60 mb-2">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-sand/50 h-12"
            />
          </div>
          <div
            ref={(el) => { fieldsRef.current[2] = el; }}
            className="md:col-span-2"
          >
            <label className="block text-sm text-white/60 mb-2">Message</label>
            <Textarea
              placeholder="Tell us about your project..."
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-sand/50 resize-none"
            />
          </div>
          <div
            ref={(el) => { fieldsRef.current[3] = el; }}
            className="md:col-span-2"
          >
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 rounded-full font-medium text-base transition-all duration-300 bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send via WhatsApp
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
