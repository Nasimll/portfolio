import { KineticText } from "@/components/kinetic-text";
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
    <div className={cn("mb-10 sm:mb-14", className)}>
      <Reveal y={12}>
        <p className="font-display text-xs tracking-[0.3em] text-accent uppercase">{eyebrow}</p>
      </Reveal>
      <KineticText
        as="h2"
        text={title}
        className="font-display mt-3 block text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl"
      />
    </div>
  );
}
