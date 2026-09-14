import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { skills } from "@/data/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Skills" title="What I work with" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <h3 className="font-display text-sm font-semibold tracking-wide uppercase text-muted">
                {group.category}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
