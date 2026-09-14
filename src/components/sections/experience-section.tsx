import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { education, experience } from "@/data/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />

      <ol className="space-y-10 border-l border-border pl-8">
        {experience.map((item, i) => (
          <Reveal as="li" key={`${item.company}-${i}`} delay={i * 0.08} className="relative">
            <span className="absolute -left-[2.32rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-semibold">
                {item.role} · {item.company}
              </h3>
              <span className="text-sm text-muted">{item.period}</span>
            </div>
            {item.location && (
              <p className="text-sm text-muted">{item.location}</p>
            )}
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted sm:text-base">
              {item.description.map((line, j) => (
                <li key={j}>{line}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>

      <div className="mt-16">
        <h3 className="font-display text-sm font-semibold tracking-wide uppercase text-muted">
          Education
        </h3>
        <ul className="mt-4 space-y-4">
          {education.map((item, i) => (
            <Reveal as="li" key={`${item.school}-${i}`} delay={i * 0.06}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="font-medium">{item.school}</span>
                <span className="text-sm text-muted">{item.period}</span>
              </div>
              <p className="text-sm text-muted">{item.degree}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
