"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** A link/button that gently pulls toward the cursor when nearby. */
export function MagneticButton({
  href,
  className,
  children,
  strength = 0.4,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      setX(relX * strength);
      setY(relY * strength);
    };
    const handleLeave = () => {
      setX(0);
      setY(0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength]);

  return (
    <a ref={ref} href={href} className={cn(className)}>
      {children}
    </a>
  );
}
