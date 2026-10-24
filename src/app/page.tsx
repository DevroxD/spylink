import Link from "next/link";
import { ArrowUpRight, FileText } from "@/components/icons";
import { ClosingCta } from "@/components/closing-cta";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import {
  articles,
  docs,
  entries,
  featuredEntry,
  principles,
  services,
} from "@/lib/content";
import { formatDate } from "@/lib/format";

export default function Home() {
  const latest = entries
    .filter((entry) => entry.slug !== featuredEntry.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />

      <section id="services" className="shell py-20 sm:py-24">
        <SectionHeading
          index="01"
          eyebrow="Capabilities"
          title={
            <>
              Four disciplines.
              <br />
              <span className="text-dim">One mission.</span>
            </>
          }
          description="Offence, defence, and the forensic truth in between. Each engagement is scoped to your threat model and delivered by the people who did the work."
          action={{ href: "/services", label: "All services" }}
        />

        <div className="mt-12 grid border-t border-l border-line sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="shell grid gap-12 py-20 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow flex items-center gap-3 text-dim">
              <span className="text-acid">02</span>
              <span className="h-px w-8 bg-line-bright" />
              Method
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,4.4vw,3.7rem)] font-medium leading-[0.98] tracking-[-0.04em]">
              Boring method.
              <br />
              <span className="text-stroke">Uncomfortable</span>
              <br />
              findings.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              There is no magic scanner and no secret exploit chain. Just
              careful scoping, patient manual testing, and the discipline to
              write down exactly what happened.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-ghost group">
                How we work
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-12 border border-line bg-panel/50 p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
                Operating note
              </p>
              <p className="mt-3 font-display text-lg leading-snug text-bone">
                &ldquo;If we cannot reproduce it, we do not report it. If we
                cannot explain it to a board, we have not finished.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="divide-y divide-line border-y border-line">
              {principles.map((principle) => (
                <div
                  key={principle.index}
                  className="group relative py-8 transition-colors duration-300 first:pt-6 last:pb-6"
                >
                  <div className="flex gap-6">
                    <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-acid">
                      {principle.index}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-bone transition-colors group-hover:text-acid sm:text-2xl">
                        {principle.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                        {principle.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 divide-x divide-line border border-line">
              {[
                { label: "Report", value: "Signed" },
                { label: "Retest", value: "Included" },
                { label: "Data", value: "Destroyed" },
              ].map((item) => (
                <div key={item.label} className="px-4 py-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-dim">
                    {item.label}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-acid">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="learn" className="shell py-20 sm:py-24">
        <SectionHeading
          index="03"
          eyebrow="Field notes"
          title={
            <>
              Knowledge is
              <br />
              a control.
            </>
          }
          description="Articles, methodology notes, and working documents from live engagements. Free to read, no gate, no trackers."
          action={{ href: "/learn", label: "Browse the archive" }}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Link
            href={`/learn/${featuredEntry.slug}`}
            className="card-hover group relative flex flex-col justify-between border border-line bg-panel/40 p-7 sm:p-10 lg:col-span-7"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                <span className="border border-acid/40 bg-acid/10 px-2 py-1 text-acid">
                  Featured
                </span>
                <span>{featuredEntry.category}</span>
                <span className="text-line-bright">/</span>
                <span>{featuredEntry.readTime}</span>
              </div>
              <h3 className="mt-8 max-w-xl font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.035em] text-bone transition-colors group-hover:text-acid">
                {featuredEntry.title}
              </h3>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted">
                {featuredEntry.excerpt}
              </p>
            </div>

            <div className="mt-10 flex items-end justify-between border-t border-line pt-5">
              <div className="flex flex-wrap gap-1.5">
                {featuredEntry.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center border border-line text-muted transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-void">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>

          <div className="border border-line lg:col-span-5">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
                Latest transmissions
              </p>
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-acid">
                <span className="size-1 rounded-full bg-acid" />
                live
              </span>
            </div>

            <div className="divide-y divide-line">
              {latest.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/learn/${entry.slug}`}
                  className="group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-panel-2"
                >
                  <span className="mt-0.5 text-dim">
                    <FileText className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
                      {entry.category}
                      <span className="text-line-bright">·</span>
                      {entry.readTime}
                    </span>
                    <span className="mt-1.5 block text-sm font-medium leading-snug text-bone transition-colors group-hover:text-acid">
                      {entry.title}
                    </span>
                    <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                      {formatDate(entry.date)}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
                </Link>
              ))}
            </div>

            <Link
              href="/learn"
              className="group flex items-center justify-between border-t border-line px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-acid"
            >
              All {articles.length} articles · {docs.length} docs
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
