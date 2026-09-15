import { skills } from "@/data/profile";

const words = skills
  .filter((group) => group.category !== "Languages")
  .flatMap((group) => group.items);

export function MarqueeSection() {
  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-border bg-background py-6"
    >
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10">
            {words.map((word, i) => (
              <span
                key={`${copy}-${i}`}
                className="font-display flex items-center gap-10 text-2xl font-semibold tracking-tight text-muted/70 sm:text-4xl"
              >
                {word}
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
