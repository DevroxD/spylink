import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  stacked = false,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  action?: { href: string; label: string };
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div className={`border-t border-line pt-6 ${className}`}>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        <span className="flex items-center gap-3">
          <span className="text-acid">{index}</span>
          <span className="h-px w-8 bg-line-bright" />
          {eyebrow}
        </span>
        {action ? (
          <Link
            href={action.href}
            className="group hidden items-center gap-2 text-muted transition-colors hover:text-acid sm:flex"
          >
            {action.label}
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </div>

      <div
        className={
          stacked
            ? ""
            : "mt-8 grid gap-6 lg:grid-cols-12 lg:items-end"
        }
      >
        <h2
          className={`font-display text-[clamp(2rem,4.6vw,3.9rem)] font-medium leading-[0.98] tracking-[-0.035em] ${
            stacked ? "mt-8" : "lg:col-span-7"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={
              stacked
                ? "mt-5 max-w-md text-sm leading-relaxed text-muted"
                : "max-w-md text-sm leading-relaxed text-muted lg:col-span-4 lg:col-start-9"
            }
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
