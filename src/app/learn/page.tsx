import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "@/components/icons";
import { ClosingCta } from "@/components/closing-cta";
import { LearnArchive } from "@/components/learn-archive";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  articles,
  docs,
  entries,
  featuredEntry,
} from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Articles, methodology notes, and field documents on offensive security, detection engineering, digital forensics, and reverse engineering.",
};

const standards = [
  {
    index: "01",
    title: "Tested, then written",
    body: "Every command in a guide has been run in a lab. Every technique has a source and a limit.",
  },
  {
    index: "02",
    title: "No sponsored content",
    body: "No vendor placements, no affiliate links, no paywalled methodology. The archive stays free.",
  },
  {
    index: "03",
    title: "Living documents",
    body: "Docs are revised as tools and defaults change. The revision date is always on the page.",
  },
];

export default function LearnPage() {
  return (
    <>
      <PageHero
        index="02"
        label="Learn"
        title={
          <>
            The field
            <br />
            <span className="text-stroke">notes.</span>
          </>
        }
        description="Working knowledge from the lab and the engagement room — offensive technique, detection engineering, forensics, and reverse engineering. Free to read, written for practitioners."
        meta={[
          { label: "Articles", value: String(articles.length).padStart(2, "0") },
          { label: "Field docs", value: String(docs.length).padStart(2, "0") },
          { label: "Updated", value: "Weekly" },
          { label: "Access", value: "Free · No gate" },
        ]}
      />

      <section className="shell pt-14 sm:pt-16">
        <Link
          href={`/learn/${featuredEntry.slug}`}
          className="card-hover group relative block border border-line bg-panel/30 p-7 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_right,var(--glow-acid),transparent_70%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                <span className="flex items-center gap-2 border border-acid/40 bg-acid/10 px-2 py-1 text-acid">
                  <span className="size-1 rounded-full bg-acid" />
                  Featured transmission
                </span>
                <span>{featuredEntry.category}</span>
                <span className="text-line-bright">/</span>
                <span>{featuredEntry.level}</span>
                <span className="text-line-bright">/</span>
                <span>{featuredEntry.readTime}</span>
              </div>

              <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.8rem)] font-medium leading-[0.98] tracking-[-0.04em] text-bone transition-colors group-hover:text-acid">
                {featuredEntry.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                {featuredEntry.excerpt}
              </p>
            </div>

            <div className="lg:col-span-3 lg:col-start-10">
              <div className="border-t border-line pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                  Published
                </p>
                <p className="mt-1 font-mono text-xs text-bone">
                  {formatDate(featuredEntry.date)}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {featuredEntry.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center border border-line text-muted transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-void">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="shell py-16 sm:py-20">
        <SectionHeading
          index="01"
          eyebrow="Archive"
          title="Read the work."
          description="Filter by discipline or search across titles, tags, and summaries. Everything here comes from real practice — sanitised where it needs to be."
        />
        <div className="mt-10">
          <LearnArchive entries={entries} />
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="shell py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="eyebrow flex items-center gap-3 text-dim">
                <span className="text-acid">02</span>
                <span className="h-px w-8 bg-line-bright" />
                Editorial standard
              </p>
              <h2 className="mt-6 font-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1] tracking-[-0.035em]">
                Written by the
                <br />
                <span className="text-stroke">people who ran it.</span>
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
              {standards.map((item) => (
                <div key={item.index} className="border border-line bg-panel/30 p-5">
                  <span className="font-mono text-[9px] tracking-[0.18em] text-acid">
                    {item.index}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium leading-snug tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20">
        <div className="grid border border-line lg:grid-cols-12">
          <div className="border-b border-line p-7 sm:p-10 lg:col-span-7 lg:border-b-0 lg:border-r">
            <p className="eyebrow flex items-center gap-3 text-dim">
              <FileText className="size-4 text-acid" />
              Transmission
            </p>
            <h2 className="mt-6 max-w-lg font-display text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1] tracking-[-0.035em]">
              One useful email
              <br />
              a month. Nothing else.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
              A short dispatch on something we learned the hard way — a new
              technique, a forensic artefact, a detection that finally worked.
              No marketing, no FUD, no trackers.
            </p>
          </div>

          <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-4 lg:col-start-9">
            <div className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-dim">
              <p className="text-muted">Available by request.</p>
              <p className="mt-4">
                Send an empty message with the subject{" "}
                <span className="text-bone">field notes</span> and we will add
                you to the next dispatch.
              </p>
            </div>
            <a
              href="mailto:hello@spylink.security?subject=field%20notes"
              className="btn btn-acid mt-8 w-full"
            >
              Request the dispatch
              <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
              Unsubscribe in one reply · No list sharing
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="03 / Apply it"
        title="Theory is cheap. Testing is not."
        description="Reading about attack paths is useful. Finding them in your own systems is what changes your risk. We can do both."
        primary={{ href: "/services", label: "Explore services" }}
        secondary={{ href: "/about", label: "Meet the studio" }}
      />
    </>
  );
}
