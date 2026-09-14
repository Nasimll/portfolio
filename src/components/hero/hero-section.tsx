"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { MountainScene } from "./mountain-scene";
import { KineticText } from "@/components/kinetic-text";
import { MagneticButton } from "@/components/magnetic-button";
import { profile } from "@/data/profile";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.querySelectorAll("[data-hero-fade]") ?? [], {
        y: 24,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background">
      <MountainScene className="absolute inset-0" />

      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 40%, rgba(0,0,0,0.38), transparent 70%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <p
          data-hero-fade
          className="font-display text-xs tracking-[0.35em] text-white/70 uppercase sm:text-sm"
        >
          {profile.location}
        </p>
        <KineticText
          as="h1"
          text={profile.name}
          trigger="mount"
          delay={0.2}
          stagger={0.1}
          className="font-display mt-2 w-full text-[clamp(2.75rem,11vw,8.5rem)] leading-[0.95] font-bold tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]"
        />
        <p
          data-hero-fade
          className="mt-6 max-w-xl text-base text-white/85 drop-shadow-sm sm:text-lg"
        >
          {profile.role}
        </p>
        <p data-hero-fade className="mt-2 max-w-md text-sm text-white/60 sm:text-base">
          {profile.tagline}
        </p>

        <div data-hero-fade className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href="#projects"
            className="inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
          >
            View my work
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="inline-block rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            Get in touch
          </MagneticButton>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70 transition hover:text-white"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
