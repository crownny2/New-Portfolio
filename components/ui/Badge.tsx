import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-sky/30 bg-sky/10 px-3 py-1 font-sans text-xs font-medium text-ink/80",
        className
      )}
    >
      {children}
    </span>
  );
}
