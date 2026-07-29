import FadeIn from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <FadeIn>
        <span className="mb-4 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sky">
          <span className="h-1.5 w-1.5 rounded-full bg-sky" />
          {eyebrow}
        </span>
      </FadeIn>
      <FadeIn delay={0.08}>
        <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.16}>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted">
            {description}
          </p>
        </FadeIn>
      )}
    </div>
  );
}
