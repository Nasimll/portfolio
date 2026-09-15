import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
      <SectionHeading title="Let's build something" className="items-center text-center [&>*]:mx-auto" />
      <Reveal delay={0.1}>
        <p className="mx-auto max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          Open to AI engineering, product, and software engineering roles and
          collaborations. Reach out and let&apos;s talk.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 hover:opacity-90 active:scale-95"
        >
          <Mail className="h-4 w-4" />
          {profile.email}
        </a>
        {profile.phone && (
          <p className="mt-3 text-sm text-muted">
            <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
              {profile.phone}
            </a>
          </p>
        )}
        <div className="mt-8 flex justify-center gap-5 text-muted">
          {profile.social.github && (
            <a
              href={profile.social.github}
              aria-label="GitHub"
              className="transition hover:text-foreground"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          {profile.social.linkedin && (
            <a
              href={profile.social.linkedin}
              aria-label="LinkedIn"
              className="transition hover:text-foreground"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
