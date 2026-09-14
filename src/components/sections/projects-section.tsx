import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/profile";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <SectionHeading eyebrow="Projects" title="Selected work" />
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              delay={i * 0.08}
              className="group rounded-2xl border border-border p-6 transition hover:border-accent/50 hover:shadow-lg"
            >
              <h3 className="font-display text-xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-background px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 text-sm">
                {project.href && (
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                  >
                    Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    className="inline-flex items-center gap-1 font-medium text-muted hover:text-foreground"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> Code
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
