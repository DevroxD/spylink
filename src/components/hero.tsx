import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "@/components/icons";
import { ThreatConsole } from "@/components/threat-console";
import { stats } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow-acid),transparent_65%)] blur-2xl"
      />

      <div className="shell relative">
        <div className="grid gap-12 pt-14 pb-12 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-16 xl:pt-24">
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
              <span className="flex items-center gap-2 border border-line px-2.5 py-1.5">
                <span className="relative flex size-1.5 text-acid">
                  <span className="size-1.5 rounded-full bg-acid" />
                  <span className="dot-ping absolute inset-0 rounded-full" />
                </span>
                Open for engagements
              </span>
              <span className="hidden sm:inline">Offensive security · Forensics · RE</span>
            </div>

            <h1 className="mt-8 font-display text-[clamp(3.1rem,8vw,7.9rem)] font-medium leading-[0.88] tracking-[-0.055em]">
              <span className="reveal block">Security</span>
              <span className="reveal delay-1 text-stroke block">and Privacy</span>
              <span className="reveal delay-2 block">
                for your <span className="text-acid">link.</span>
              </span>
            </h1>

            <p className="reveal delay-3 mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              We assure the total security for your systems and infrastructures —
              through adversary-led testing, forensic precision, and engineering
              that holds when it matters.
            </p>

            <div className="reveal delay-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/services" className="btn btn-acid group">
                Explore services
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/learn" className="btn btn-ghost group">
                Read the field notes
                <ArrowDown className="size-4 -rotate-90 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="reveal delay-4 mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              <span className="flex items-center gap-2">
                <span className="size-1 bg-acid" />
                No scanners. No theatre.
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1 bg-acid" />
                Evidence over adjectives
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1 bg-acid" />
                NDA by default
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-2">
            <div className="animate-drift">
              <ThreatConsole />
            </div>
            
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-b border-line py-6 pr-6 md:border-b-0 md:border-r md:pl-6 md:first:pl-0 md:last:border-r-0"
            >
              <p className="font-display text-3xl font-medium tracking-tight text-bone sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-line py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
          <span className="flex items-center gap-2">
            <span className="h-px w-10 bg-line-bright" />
            Scroll to investigate
          </span>
          <span className="hidden sm:inline">40.7128° N / 74.0060° W</span>
          <ArrowDown className="size-3.5 text-acid" />
        </div>
      </div>
    </section>
  );
}
