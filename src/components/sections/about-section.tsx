import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { about, profile } from "@/data/profile";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-16">
        <Reveal delay={0} className="flex flex-col items-center gap-4 sm:items-start">
          <div
            className="flex h-28 w-28 items-center justify-center rounded-full text-2xl font-semibold text-accent-foreground sm:h-32 sm:w-32"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent) 40%, transparent)",
              boxShadow: "0 0 0 1px var(--border), 0 20px 40px -20px var(--accent)",
            }}
          >
            {initials(profile.name)}
          </div>
          <div className="text-center text-sm text-muted sm:text-left">
            <p>{profile.location}</p>
            <p className="mt-1">{profile.email}</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="About" title={about.heading} className="mb-6" />
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg" delay={0.1}>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
