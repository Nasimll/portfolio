import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 sm:mb-14", className)}>
      <p className="font-display text-xs tracking-[0.3em] text-accent uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
