"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/gsap";

type LayerRefs = {
  outer: SVGGElement | null;
  inner: SVGGElement | null;
};

// Deterministic PRNG (mulberry32) so star positions match between server and
// client render — Math.random() here would cause a hydration mismatch.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  top: Math.round(rand() * 62),
  left: Math.round(rand() * 100),
  size: rand() < 0.85 ? 1 : rand() < 0.97 ? 2 : 3,
  duration: 2 + rand() * 3.5,
  delay: rand() * 5,
}));

export function MountainScene({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sunOuterRef = useRef<HTMLDivElement>(null);
  const sunInnerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const back = useRef<LayerRefs>({ outer: null, inner: null });
  const mid = useRef<LayerRefs>({ outer: null, inner: null });
  const front = useRef<LayerRefs>({ outer: null, inner: null });
  const figureRef = useRef<SVGGElement>(null);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // --- mouse parallax (horizontal drift, inner groups) ---
      const movers: { el: Element | null; x: number; y: number }[] = [
        { el: back.current.inner, x: 6, y: 3 },
        { el: mid.current.inner, x: 14, y: 6 },
        { el: front.current.inner, x: 26, y: 10 },
        { el: sunInnerRef.current, x: 18, y: 8 },
        { el: cloudsRef.current, x: 10, y: 0 },
        { el: starsRef.current, x: 4, y: 0 },
      ];

      const quickSetters = movers
        .filter((m) => m.el)
        .map((m) => ({
          x: gsap.quickTo(m.el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(m.el, "y", { duration: 0.9, ease: "power3.out" }),
          factorX: m.x,
          factorY: m.y,
        }));

      const handlePointerMove = (event: PointerEvent) => {
        const rect = root.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        quickSetters.forEach((setter) => {
          setter.x(-nx * setter.factorX);
          setter.y(-ny * setter.factorY);
        });
      };
      root.addEventListener("pointermove", handlePointerMove);

      // --- scroll parallax (vertical rise, outer groups) ---
      gsap.set(
        [back.current.outer, mid.current.outer, front.current.outer],
        { transformOrigin: "50% 100%" },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      tl.to(back.current.outer, { y: -30, scale: 1.02, ease: "none" }, 0)
        .to(mid.current.outer, { y: -70, scale: 1.05, ease: "none" }, 0)
        .to(front.current.outer, { y: -130, scale: 1.08, ease: "none" }, 0)
        .to(sunOuterRef.current, { y: -90, scale: 1.1, ease: "none" }, 0)
        .to(starsRef.current, { y: -20, opacity: 0, ease: "none" }, 0)
        .to(cloudsRef.current, { y: -60, opacity: 0, ease: "none" }, 0)
        .to(figureRef.current, { y: -10, scale: 1.04, ease: "none" }, 0);

      // --- gentle idle float for the figure ---
      if (figureRef.current) {
        gsap.to(figureRef.current, {
          y: "+=4",
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // --- shooting stars ---
      const shootingStarLoop = () => {
        if (!starsRef.current) return;
        const star = document.createElement("span");
        star.className =
          "pointer-events-none absolute h-px w-24 rounded-full bg-gradient-to-r from-white to-transparent";
        star.style.top = `${5 + Math.random() * 35}%`;
        star.style.left = `${50 + Math.random() * 45}%`;
        star.style.opacity = "0";
        star.style.transform = "rotate(-28deg)";
        starsRef.current.appendChild(star);
        gsap.fromTo(
          star,
          { x: 0, y: 0, opacity: 0 },
          {
            x: -220,
            y: 110,
            opacity: 1,
            duration: 0.9,
            ease: "power1.in",
            onComplete: () => {
              gsap.to(star, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => star.remove(),
              });
            },
          },
        );
      };
      const shootingInterval = window.setInterval(
        () => {
          if (Math.random() < 0.6) shootingStarLoop();
        },
        4500,
      );

      return () => {
        root.removeEventListener("pointermove", handlePointerMove);
        window.clearInterval(shootingInterval);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--sky-top) 0%, var(--sky-mid) 55%, var(--sky-bottom) 100%)",
          transition: "background 0.7s ease",
        }}
      />

      {/* stars (night only, fades via CSS var) */}
      <div
        ref={starsRef}
        className="absolute inset-0"
        style={{ opacity: "var(--star-opacity)", transition: "opacity 0.8s ease" }}
      >
        {STARS.map((s) => (
          <span
            key={s.id}
            className="star absolute rounded-full bg-white"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                "--star-duration": `${s.duration}s`,
                "--star-delay": `${s.delay}s`,
                "--star-min": 0.15,
                "--star-max": 0.95,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* clouds */}
      <div
        ref={cloudsRef}
        className="absolute inset-0"
        style={{ opacity: "var(--cloud-opacity)", transition: "opacity 0.7s ease" }}
      >
        <div
          className="cloud absolute left-[8%] top-[14%] h-10 w-40 rounded-full bg-white/70 blur-2xl"
          style={{ "--drift-duration": "46s" } as React.CSSProperties}
        />
        <div
          className="cloud absolute left-[55%] top-[8%] h-8 w-56 rounded-full bg-white/60 blur-2xl"
          style={{ "--drift-duration": "58s" } as React.CSSProperties}
        />
        <div
          className="cloud absolute left-[30%] top-[22%] h-6 w-32 rounded-full bg-white/50 blur-xl"
          style={{ "--drift-duration": "38s" } as React.CSSProperties}
        />
      </div>

      {/* sun / moon */}
      <div
        ref={sunOuterRef}
        className="absolute right-[14%] top-[12%] h-24 w-24 sm:h-28 sm:w-28"
      >
        <div ref={sunInnerRef} className="relative h-full w-full">
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: "var(--sun-glow)", transition: "background 0.7s ease" }}
          />
          <div
            className="absolute inset-[22%] rounded-full"
            style={{ background: "var(--sun-color)", transition: "background 0.7s ease" }}
          />
        </div>
      </div>

      {/* mountains */}
      <svg
        className="mountain-layer absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden
      >
        <g
          ref={(el) => {
            back.current.outer = el;
          }}
        >
          <g
            ref={(el) => {
              back.current.inner = el;
            }}
          >
            <path
              d="M0,600 L80,500 L160,560 L260,420 L340,500 L430,380 L520,470 L610,400 L700,480 L800,410 L900,490 L1000,430 L1100,500 L1200,440 L1300,510 L1400,460 L1500,520 L1600,480 L1600,900 L0,900 Z"
              fill="var(--mtn-back)"
            />
          </g>
        </g>

        <g
          ref={(el) => {
            mid.current.outer = el;
          }}
        >
          <g
            ref={(el) => {
              mid.current.inner = el;
            }}
          >
            <path
              d="M0,650 L120,560 L220,600 L340,480 L420,540 L520,380 L560,420 L640,270 L720,420 L800,340 L900,460 L980,380 L1080,520 L1180,440 L1280,560 L1400,500 L1500,580 L1600,540 L1600,900 L0,900 Z"
              fill="var(--mtn-mid)"
            />
            <path
              d="M640,270 L668,322 L654,317 L646,329 L634,317 L626,325 L612,322 Z"
              fill="var(--mtn-mid-snow)"
            />
            <path d="M520,380 L544,404 L530,400 L534,410 L494,428 Z" fill="var(--mtn-mid-snow)" />
            <path d="M800,340 L835,382 L818,374 L822,386 L768,372 Z" fill="var(--mtn-mid-snow)" />
          </g>
        </g>

        <g
          ref={(el) => {
            front.current.outer = el;
          }}
        >
          <g
            ref={(el) => {
              front.current.inner = el;
            }}
          >
            <path
              d="M0,820 L100,760 L220,800 L360,720 L500,780 L640,700 L760,760 L860,690 L980,750 L1100,700 L1220,770 L1360,710 L1500,780 L1600,740 L1600,900 L0,900 Z"
              fill="var(--mtn-front)"
            />
            {/* figure standing on the ridge */}
            <g ref={figureRef} transform="translate(796, 668)">
              <ellipse cx="10" cy="76" rx="16" ry="4" fill="var(--mtn-front)" opacity="0.5" />
              <path
                d="M10,0 c5,0 9,4 9,9 c0,5 -4,9 -9,9 c-5,0 -9,-4 -9,-9 c0,-5 4,-9 9,-9 Z"
                fill="var(--figure)"
              />
              <path
                d="M2,20 C2,17 6,15 10,15 C14,15 18,17 18,20 L19,46 C19,49 16,50 14,49 L12.5,50 L13,60 L15,72 L10,74 L7,60 L6.5,50 L7,49 L6,49 C4,50 1,49 1,46 Z"
                fill="var(--figure)"
              />
              <path d="M2,22 L-7,42 L-4,45 L4,28 Z" fill="var(--figure)" />
              <path d="M18,22 L27,40 L24,43 L16,28 Z" fill="var(--figure)" />
              <path d="M7,58 L4,74 L9,75 L12,60 Z" fill="var(--figure)" />
              <path d="M13,58 L16,74 L11,75 L10,60 Z" fill="var(--figure)" />
            </g>
          </g>
        </g>
      </svg>

      {/* subtle ground vignette */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </div>
  );
}
