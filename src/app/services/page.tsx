import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Plus, serviceIcons } from "@/components/icons";
import { ClosingCta } from "@/components/closing-cta";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { engagements, faqs, process, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Penetration testing, security audits, digital forensics, and reverse engineering — scoped to your threat model and reported with evidence.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="01"
        label="Services"
        title={
          <>
            We find the flaws
            <br />
            <span className="text-stroke">before they do.</span>
          </>
        }
        description="Four capabilities, one operating standard: scope honestly, test by hand, prove every finding, and stay until the fix is verified."
        meta={[
          { label: "Response", value: "Within 24 hours" },
          { label: "Engagements", value: "Fixed or retainer" },
          { label: "Reporting", value: "Evidence-grade" },
          { label: "Coverage", value: "Remote & on-site" },
        ]}
      />

      <div className="shell">
        <nav
          aria-label="Service index"
          className="grid border-b border-line sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="group flex items-center justify-between border-b border-line px-0 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-acid sm:border-r sm:px-5 sm:first:pl-0 lg:border-b-0 lg:last:border-r-0"
            >
              <span className="flex items-center gap-3">
                <span className="text-dim group-hover:text-acid">{service.index}</span>
                {service.title}
              </span>
              <ArrowUpRight className="size-3.5 opacity-40 transition-all group-hover:opacity-100" />
            </a>
          ))}
        </nav>
      </div>

      {services.map((service, index) => {
        const Icon = serviceIcons[service.icon];
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={`scroll-mt-32 border-b border-line ${index % 2 === 1 ? "bg-ink" : ""}`}
          >
            <div className="shell py-16 sm:py-20">
              <div className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-6">
                  <div className="flex items-center justify-between border-b border-line pb-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                      Capability <span className="text-acid">{service.index}</span>
                    </span>
                    <span className="text-acid">
                      <Icon className="size-9" strokeWidth={1.1} />
                    </span>
                  </div>

                  <h2 className="mt-8 font-display text-[clamp(2.2rem,4.4vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.04em]">
                    {service.title}
                  </h2>
                  <p className="mt-3 font-display text-lg text-acid/90">
                    {service.short}
                  </p>
                  <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-line px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
                    {service.meta.map((item) => (
                      <div key={item.label} className="px-3 py-4 first:pl-0 last:pr-0">
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
                          {item.label}
                        </p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-bone">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
                  <div>
                    <h3 className="eyebrow text-dim">In scope</h3>
                    <ul className="mt-5 space-y-4">
                      {service.scope.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span className="mt-2 size-1 shrink-0 bg-line-bright" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="eyebrow text-dim">You receive</h3>
                    <ul className="mt-5 space-y-4">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <Check className="mt-0.5 size-4 shrink-0 text-acid" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-2">
                    <Link
                      href="/about#contact"
                      className="group flex items-center justify-between border border-line bg-panel/40 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-bone transition-colors hover:border-acid hover:text-acid"
                    >
                      Discuss a {service.title.toLowerCase()} engagement
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="shell py-20 sm:py-24">
        <SectionHeading
          index="02"
          eyebrow="Process"
          title="Five phases. No surprises."
          description="You always know where the engagement stands, what has been found, and what happens next. The retest is part of the work, not an upsell."
        />

        <div className="mt-12 grid border-t border-line md:grid-cols-5">
          {process.map((step) => (
            <div
              key={step.index}
              className="group relative border-b border-line py-6 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-acid">
                  {step.index}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                  {step.time}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.02em] transition-colors group-hover:text-acid">
                {step.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="shell py-20 sm:py-24">
          <SectionHeading
            index="03"
            eyebrow="Engagement models"
            title="Pick the shape of the work."
            description="Every engagement is priced after scoping — no per-finding billing, no surprise line items. The retest and closure letter are always included."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {engagements.map((model) => (
              <div
                key={model.name}
                className={`relative flex flex-col border p-7 sm:p-8 ${
                  model.featured
                    ? "border-acid/50 bg-acid/[0.04]"
                    : "border-line bg-panel/30"
                }`}
              >
                {model.featured ? (
                  <span className="absolute right-5 top-5 border border-acid/40 bg-acid/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-acid">
                    Most engaged
                  </span>
                ) : null}
                <p className="eyebrow text-dim">{model.price}</p>
                <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.03em]">
                  {model.name}
                </h3>
                <p className="mt-3 min-h-[60px] text-sm leading-relaxed text-muted">
                  {model.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                  {model.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-acid" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/about#contact"
                  className={`mt-8 flex items-center justify-between border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                    model.featured
                      ? "border-acid bg-acid text-void hover:bg-[var(--color-acid-hover)]"
                      : "border-line text-bone hover:border-acid hover:text-acid"
                  }`}
                >
                  Scope this engagement
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-xl font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-dim">
            All engagements include a signed scope, named operators, encrypted
            evidence handling, and a confidentiality agreement by default.
          </p>
        </div>
      </section>

      <section className="shell py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              index="04"
              eyebrow="Questions"
              title="Before you ask."
              description="The practical answers. If your question is not here, ask it directly — we reply within one business day."
              stacked
            />
            <Link
              href="/about#contact"
              className="btn btn-ghost mt-8"
            >
              Ask something else
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg tracking-[-0.01em] text-bone transition-colors group-hover:text-acid sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="flex size-8 shrink-0 items-center justify-center border border-line text-acid transition-all duration-300 group-open:rotate-45 group-open:border-acid">
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="05 / Next step"
        title="Ready to be tested?"
        description="Bring us the system you are least sure about. We will tell you what we can break, how long it will take, and what it will cost."
        secondary={{ href: "/learn", label: "Read our methodology" }}
      />
    </>
  );
}
