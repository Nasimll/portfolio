import { KineticText } from "@/components/kinetic-text";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 sm:mb-14", className)}>
      <KineticText
        as="h2"
        text={title}
        className="font-display block text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl"
      />
    </div>
  );
}
