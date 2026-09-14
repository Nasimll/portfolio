import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { about, profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="About" title={about.heading} />
      <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg" delay={0.1}>
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="text-sm text-muted/80">
          Based in {profile.location}.
        </p>
      </Reveal>
    </section>
  );
}
