import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { projects } from "@/data/profile";

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <SectionHeading title="Selected work" />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={project.title}
                delay={i * 0.08}
                className={
                  featured
                    ? "group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 lg:col-span-2"
                    : "group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                }
                style={
                  featured
                    ? {
                        background:
                          "linear-gradient(155deg, color-mix(in srgb, var(--accent) 14%, var(--background)), var(--background))",
                        boxShadow: "0 0 0 1px var(--border)",
                      }
                    : { background: "var(--background)" }
                }
              >
                <h3
                  className={
                    featured
                      ? "font-display text-2xl font-semibold transition-colors group-hover:text-accent sm:text-3xl"
                      : "font-display text-xl font-semibold transition-colors group-hover:text-accent"
                  }
                >
                  {project.title}
                </h3>
                <p
                  className={
                    featured
                      ? "mt-3 max-w-md text-base leading-relaxed text-muted"
                      : "mt-2 text-sm leading-relaxed text-muted sm:text-base"
                  }
                >
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-xs text-muted"
                      style={{ background: "var(--surface)" }}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
