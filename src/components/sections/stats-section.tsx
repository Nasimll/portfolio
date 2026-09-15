"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { stats } from "@/data/profile";

export function StatsSection() {
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) {
      numberRefs.current.forEach((el, i) => {
        if (el) el.textContent = `${stats[i].value}${stats[i].suffix}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = stats[i].value;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${stats[i].suffix}`;
          },
        });
      });
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-6 py-16 sm:grid-cols-4 sm:py-20">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center">
            <span
              ref={(el) => {
                numberRefs.current[i] = el;
              }}
              className="font-display block text-4xl font-semibold tabular-nums text-accent sm:text-5xl"
            >
              0{stat.suffix}
            </span>
            <p className="mt-2 text-xs tracking-wide text-muted uppercase sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
