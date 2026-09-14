"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Splits text into words, each masked in an overflow-hidden wrapper, and
 * animates them in from below — either immediately on mount (hero) or when
 * scrolled into view (section headings).
 */
export function KineticText({
  text,
  as: Tag = "span",
  className,
  wordClassName,
  trigger = "scroll",
  delay = 0,
  stagger = 0.08,
}: {
  text: string;
  as?: "span" | "h1" | "h2";
  className?: string;
  wordClassName?: string;
  trigger?: "mount" | "scroll";
  delay?: number;
  stagger?: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-word]");

    if (prefersReducedMotion()) {
      gsap.set(targets, { y: 0, rotate: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: "110%", rotate: 4, opacity: 0 },
        {
          y: "0%",
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
          stagger,
          delay,
          scrollTrigger:
            trigger === "scroll"
              ? { trigger: root, start: "top 88%", toggleActions: "play none none reverse" }
              : undefined,
        },
      );
    }, root);

    return () => ctx.revert();
  }, [text, trigger, delay, stagger]);

  return (
    <Tag ref={rootRef as never} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span data-word className={cn("inline-block", wordClassName)}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
