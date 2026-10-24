import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  FileText,
  Mark,
} from "@/components/icons";
import { ClosingCta } from "@/components/closing-cta";
import { entries } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const instant = false;

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);

  if (!entry) {
    return { title: "Not found" };
  }

  return {
    title: entry.title,
    description: entry.excerpt,
    openGraph: {
      title: entry.title,
      description: entry.excerpt,
      type: "article",
      publishedTime: entry.date,
      tags: entry.tags,
    },
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default async function EntryPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const entry = entries.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  const related = entries
    .filter((item) => item.slug !== entry.slug)
    .sort((a, b) => {
      const aScore = a.category === entry.category ? 1 : 0;
      const bScore = b.category === entry.category ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow-acid),transparent_65%)] blur-2xl"
          />
          <div className="shell relative py-12 sm:py-16">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim"
            >
              <Link href="/learn" className="transition-colors hover:text-acid">
                Learn
              </Link>
              <span className="text-line-bright">/</span>
              <span className="text-acid">{entry.category}</span>
              <span className="text-line-bright">/</span>
              <span>{entry.kind === "doc" ? "Field doc" : "Article"}</span>
            </nav>

            <div className="mt-10 grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                  <span className="flex items-center gap-2 border border-acid/40 bg-acid/10 px-2 py-1 text-acid">
                    <FileText className="size-3" />
                    {entry.kind === "doc" ? "Working document" : "Field note"}
                  </span>
                  <span>{entry.level}</span>
                  <span className="text-line-bright">/</span>
                  <span>{formatDate(entry.date)}</span>
                  <span className="text-line-bright">/</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {entry.readTime}
                  </span>
                </div>

                <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.3rem,5.6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.045em]">
                  {entry.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
                  {entry.excerpt}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                  Filed under
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/learn"
                className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-acid"
              >
                <ArrowRight className="size-3.5 rotate-180" />
                Back to archive
              </Link>
            </div>
          </div>
        </header>

        <div className="shell py-14 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <div className="prose-custom text-[15px]">
                {entry.sections.map((section, index) => {
                  const id = slugify(section.heading);
                  return (
                    <section key={section.heading} className="article-body">
                      <h2 id={id} className="flex gap-4">
                        <span className="mt-2 font-mono text-xs tracking-[0.16em] text-acid">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{section.heading}</span>
                      </h2>

                      {section.body?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}

                      {section.bullets ? (
                        <ul>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}

                      {section.code ? (
                        <figure className="my-6 overflow-hidden border border-line bg-void">
                          <figcaption className="flex items-center justify-between border-b border-line px-4 py-2.5">
                            <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                              <span className="flex gap-1">
                                <span className="size-1.5 rounded-full bg-line-bright" />
                                <span className="size-1.5 rounded-full bg-line-bright" />
                                <span className="size-1.5 rounded-full bg-acid/60" />
                              </span>
                              {section.code.label}
                            </span>
                            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-acid/70">
                              shell
                            </span>
                          </figcaption>
                          <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">
                            {section.code.lines.map((line, lineIndex) => (
                              <div key={lineIndex} className="flex gap-4">
                                <span className="w-4 shrink-0 select-none text-right text-dim">
                                  {lineIndex + 1}
                                </span>
                                <code
                                  className={
                                    line.trimStart().startsWith("#")
                                      ? "text-dim"
                                      : "text-bone"
                                  }
                                >
                                  {line || " "}
                                </code>
                              </div>
                            ))}
                          </pre>
                        </figure>
                      ) : null}
                    </section>
                  );
                })}
              </div>

              <div className="mt-14 border-t border-line pt-8">
                <div className="flex flex-col gap-6 border border-line bg-panel/40 p-6 sm:flex-row sm:items-center">
                  <span className="flex size-12 shrink-0 items-center justify-center border border-acid/40 bg-acid/10 text-acid">
                    <Mark className="size-7" />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-base font-medium tracking-tight">
                      Spylink Research
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      Field notes from an independent security studio working
                      across offensive testing, digital forensics, and reverse
                      engineering.
                    </p>
                  </div>
                  <Link href="/about" className="btn btn-ghost shrink-0">
                    About the studio
                  </Link>
                </div>
              </div>
            </div>

            <aside className="min-w-0 lg:col-span-3 lg:col-start-10">
              <div className="lg:sticky lg:top-28">
                <div className="border border-line bg-panel/30 p-5">
                  <p className="eyebrow text-dim">On this page</p>
                  <nav className="mt-5">
                    <ol className="space-y-3">
                      {entry.sections.map((section, index) => (
                        <li key={section.heading}>
                          <a
                            href={`#${slugify(section.heading)}`}
                            className="group flex gap-3 text-[13px] leading-snug text-muted transition-colors hover:text-acid"
                          >
                            <span className="font-mono text-[9px] tracking-[0.12em] text-dim group-hover:text-acid">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            {section.heading}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                <div className="mt-4 border border-line p-5">
                  <p className="eyebrow text-dim">Document</p>
                  <dl className="mt-4 space-y-3 font-mono text-[10px] uppercase tracking-[0.1em]">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-dim">Type</dt>
                      <dd className="text-bone">
                        {entry.kind === "doc" ? "Field doc" : "Article"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-dim">Level</dt>
                      <dd className="text-bone">{entry.level}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-dim">Length</dt>
                      <dd className="text-bone">{entry.readTime}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-dim">Updated</dt>
                      <dd className="text-bone">{formatDate(entry.date)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-4 border border-line p-5">
                  <p className="eyebrow text-dim">Need this in practice?</p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    We run these techniques against real systems every week.
                  </p>
                  <Link
                    href="/about#contact"
                    className="group mt-4 flex items-center justify-between border border-line px-3 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-acid hover:text-acid"
                  >
                    Scope an engagement
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-ink">
        <div className="shell py-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
              Related transmissions
            </h2>
            <Link
              href="/learn"
              className="group hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-acid sm:flex"
            >
              All notes
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/learn/${item.slug}`}
                className="card-hover group flex flex-col border border-line bg-void/40 p-6"
              >
                <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                  <span>{item.category}</span>
                  <span>{item.readTime}</span>
                </div>
                <h3 className="mt-5 flex-1 font-display text-lg font-medium leading-snug tracking-[-0.02em] text-bone transition-colors group-hover:text-acid">
                  {item.title}
                </h3>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                  <span>{formatDate(item.date)}</span>
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Keep going"
        title="Found this useful? Put it to work."
        description="We apply these methods to real systems, with a scope, a timeline, and evidence you can hand to an auditor or a board."
        primary={{ href: "/services", label: "See services" }}
        secondary={{ href: "/learn", label: "Back to learn" }}
      />
    </>
  );
}
