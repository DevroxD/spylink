import Link from "next/link";
import { ArrowUpRight, Mark } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="shell relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--glow-acid),transparent_60%)]"
      />
      <div className="relative">
        <span className="mx-auto flex size-16 items-center justify-center border border-line text-acid">
          <Mark className="size-9" />
        </span>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-dim">
          Error 404 · signal lost
        </p>
        <h1 className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.9] tracking-[-0.05em]">
          No route
          <br />
          <span className="text-stroke">to this host.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
          The page you requested does not resolve. It may have moved, been
          retired, or never existed in the first place.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-acid group">
            Return home
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link href="/learn" className="btn btn-ghost">
            Browse the archive
          </Link>
        </div>
        <p className="mt-10 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
          $ traceroute /requested/path <span className="text-acid">→ no response</span>
        </p>
      </div>
    </section>
  );
}
