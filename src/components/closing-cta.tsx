import Link from "next/link";
import { ArrowUpRight, Mark } from "@/components/icons";

export function ClosingCta({
  eyebrow = "Next step",
  title = "Let's find what's hiding.",
  description = "Tell us what you are protecting and what keeps you up at night. We will come back with a scope, a timeline, and an honest opinion.",
  primary = { href: "/about#contact", label: "Start a conversation" },
  secondary = { href: "/services", label: "Review capabilities" },
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative z-10 overflow-hidden bg-acid text-void">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-void) 1px, transparent 1px), linear-gradient(to bottom, var(--color-void) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 opacity-15"
      >
        <Mark className="size-[420px]" strokeWidth={0.4} />
      </div>

      <div className="shell relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-void/60">
              <span className="size-1.5 bg-void" />
              {eyebrow}
            </p>
            <h2 className="mt-6 max-w-2xl font-display text-[clamp(2.4rem,5.6vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              {title}
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-sm leading-relaxed text-void/70">
              {description}
            </p>
            <div className="mt-7 flex flex-col gap-3">
              <Link
                href={primary.href}
                className="btn group w-full justify-between border border-void bg-void text-acid! hover:bg-void/90!"
              >
                {primary.label}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={secondary.href}
                className="btn w-full justify-center border border-void/30 text-void hover:border-void hover:bg-void/5"
              >
                {secondary.label}
              </Link>
            </div>
            <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-void/50">
              Response within one business day · NDA available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
