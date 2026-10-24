import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Fingerprint,
  Lock,
  Mail,
  Mark,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { certifications, timeline, toolkit } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Spylink is an independent security studio working across penetration testing, digital forensics, and reverse engineering. Small team, deep work.",
};

const values = [
  {
    index: "01",
    title: "Independence",
    body: "No reseller agreements, no vendor quotas, no incentive to recommend a product. Our only output is the truth about your system.",
  },
  {
    index: "02",
    title: "Restraint",
    body: "The least invasive technique that proves the finding is the right one. Production stays up; evidence stays intact.",
  },
  {
    index: "03",
    title: "Precision",
    body: "A finding without reproduction steps is an opinion. We write for the engineer who has to fix it at 4 p.m. on a Friday.",
  },
  {
    index: "04",
    title: "Discretion",
    body: "Client names stay off the site. Data is encrypted, access is logged, and evidence is destroyed on an agreed schedule.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="03"
        label="About"
        title={
          <>
            Small team.
            <br />
            <span className="text-stroke">Sharp instruments.</span>
          </>
        }
        description="Spylink is an independent security studio. We test, investigate, and reverse engineer the systems that other people depend on — with the patience the work deserves."
        meta={[
          { label: "Founded", value: "2019" },
          { label: "Operators", value: "Senior only" },
          { label: "Based", value: "Remote" },
          { label: "Availability", value: "Q1 2027" },
        ]}
      />

      <section className="shell py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-dim">
              <span className="text-acid">01</span>
              <span className="h-px w-8 bg-line-bright" />
              Manifesto
            </p>

            <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.04em]">
              Security is not a product
              <br />
              you install. It is a property
              <br />
              of <span className="text-acid">how you build.</span>
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-sm leading-relaxed text-muted">
              <p>
                Most security work fails at the same place: the gap between the
                report and the change. A finding is only valuable if it survives
                the trip into an engineering backlog, gets prioritised against
                real product pressure, and is verified after the fix.
              </p>
              <p>
                We built Spylink around that gap. The engagements are deliberately
                small, the operators are the ones writing the report, and the
                retest is part of the deal. No account managers, no
                subcontractors, no forty-page PDFs that nobody reads.
              </p>
              <p>
                We work across offence, forensics, and reverse engineering
                because the questions overlap. The same person who finds the
                path in can explain how it would look in a timeline — and what
                detection would have caught it.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="#contact" className="btn btn-acid group">
                Work with us
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/services" className="btn btn-ghost">
                Review capabilities
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="corners relative overflow-hidden border border-line bg-panel/50">
              <div className="panel-grid absolute inset-0 opacity-60" aria-hidden />
              <div className="relative border-b border-line px-5 py-4">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                  <span>Operator profile</span>
                  <span className="text-acid">active</span>
                </div>
              </div>

              <div className="relative flex items-center justify-center border-b border-line py-10">
                <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-acid/50 to-transparent" />
                <div className="relative flex size-28 items-center justify-center border border-acid/30 bg-void/70">
                  <Mark className="size-16 text-acid" strokeWidth={0.8} />
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 border border-acid/40 bg-void px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-acid">
                    r00k
                  </span>
                </div>
              </div>

              <div className="relative space-y-3 p-5 font-mono text-[10px] uppercase tracking-[0.08em]">
                <ProfileRow label="Role" value="Principal operator" />
                <ProfileRow label="Focus" value="Offence · DFIR · RE" />
                <ProfileRow label="Certified" value="OSCP · GCFA · CISSP" />
                <ProfileRow label="Timezone" value="UTC+0" />
                <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
                  <span className="text-dim">PGP</span>
                  <span className="truncate text-acid">4A9F 2C1B 92A4 0F3E</span>
                </div>
              </div>
            </div>

            <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-dim">
              Identities are withheld by default. Full operator profiles and
              references are shared under NDA.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="shell py-20 sm:py-24">
          <SectionHeading
            index="02"
            eyebrow="Operating principles"
            title="How we hold the line."
            description="These are not values on a wall. They are the constraints we accept before an engagement starts."
          />

          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.index}
                className="group bg-void p-6 transition-colors hover:bg-panel sm:p-7"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-acid">
                  {value.index}
                </span>
                <h3 className="mt-5 font-display text-xl font-medium tracking-[-0.02em]">
                  {value.title}
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              index="03"
              eyebrow="Trajectory"
              title="A practice, not a product."
              description="Nine years of engagements, a handful of pivots, and a deliberate decision to stay small."
              stacked
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="group grid gap-4 border-b border-line py-6 sm:grid-cols-12"
                >
                  <div className="flex items-baseline gap-3 sm:col-span-3">
                    <span className="font-display text-2xl font-medium tracking-tight text-acid">
                      {item.year}
                    </span>
                    <span className="h-px flex-1 bg-line sm:hidden" />
                  </div>
                  <div className="sm:col-span-9">
                    <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-bone transition-colors group-hover:text-acid">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                Credentials
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certifications.map((certification) => (
                  <span
                    key={certification}
                    className="border border-line bg-panel/40 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted"
                  >
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink">
        <div className="shell py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow flex items-center gap-3 text-dim">
                <span className="text-acid">04</span>
                <span className="h-px w-8 bg-line-bright" />
                Toolkit
              </p>
              <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-medium leading-[1.02] tracking-[-0.035em]">
                Boring tools,
                <br />
                <span className="text-stroke">used well.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
                We are not loyal to a stack. These are the instruments we reach
                for most; the choice is always dictated by the target, not the
                sponsor.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
                {toolkit.map((tool, index) => (
                  <div
                    key={tool}
                    className="group flex items-center justify-between bg-void px-4 py-4 transition-colors hover:bg-panel"
                  >
                    <span className="font-mono text-[11px] text-bone transition-colors group-hover:text-acid">
                      {tool}
                    </span>
                    <span className="font-mono text-[8px] tracking-[0.14em] text-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 border border-line p-4 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                <span className="flex items-center gap-2">
                  <Fingerprint className="size-3.5 text-acid" />
                  Evidence handling
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="size-3.5 text-acid" />
                  Encrypted at rest
                </span>
                <span className="flex items-center gap-2">
                  <Check className="size-3.5 text-acid" />
                  Signed reports
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="shell scroll-mt-24 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-3 text-dim">
              <span className="text-acid">05</span>
              <span className="h-px w-8 bg-line-bright" />
              Contact
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[0.96] tracking-[-0.045em]">
              Tell us what
              <br />
              you&apos;re <span className="text-acid">protecting.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
              A short brief is enough: what the system does, what worries you,
              and when you need answers. You will speak to the operator who
              would run the work — not a sales team.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="mailto:hello@spylink.security?subject=Project%20brief"
                className="group flex items-center justify-between border border-line bg-panel/30 px-5 py-4 transition-colors hover:border-acid"
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-4 text-acid" />
                  <span className="font-mono text-xs text-bone">
                    hello@spylink.security
                  </span>
                </span>
                <ArrowUpRight className="size-4 text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acid" />
              </a>
              <div className="flex items-center justify-between border border-line px-5 py-4">
                <span className="flex items-center gap-3">
                  <Lock className="size-4 text-acid" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    PGP fingerprint
                  </span>
                </span>
                <span className="font-mono text-[10px] text-dim">
                  4A9F 2C1B 92A4 0F3E
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
              <span className="flex items-center gap-2">
                <span className="size-1 bg-acid" />
                Response &lt; 1 business day
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1 bg-acid" />
                NDA by default
              </span>
              <span className="flex items-center gap-2">
                <span className="size-1 bg-acid" />
                No obligation
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="border border-line bg-panel/30">
              <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
                <span>brief.template</span>
                <span className="text-acid">/ plaintext</span>
              </div>
              <div className="space-y-4 p-5 font-mono text-[11px] leading-relaxed">
                <BriefLine label="01 / system" value="What does it do, and who uses it?" />
                <BriefLine label="02 / surface" value="Hosts, apps, APIs, cloud accounts." />
                <BriefLine label="03 / concern" value="The scenario you want ruled out." />
                <BriefLine label="04 / constraint" value="Deadline, change freeze, compliance." />
                <BriefLine label="05 / contact" value="Who signs the scope and who fixes." />
              </div>
              <div className="border-t border-line p-5">
                <a
                  href="mailto:hello@spylink.security?subject=Project%20brief&body=01%20%2F%20System%3A%0A%0A02%20%2F%20Surface%3A%0A%0A03%20%2F%20Concern%3A%0A%0A04%20%2F%20Constraint%3A%0A%0A05%20%2F%20Contact%3A%0A"
                  className="btn btn-acid w-full"
                >
                  Open the brief
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-dim">
              <Fingerprint className="mt-0.5 size-3.5 shrink-0 text-acid/70" />
              Do not send credentials or live customer data in a first email.
              We will arrange an encrypted channel.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-dim">{label}</span>
      <span className="text-right text-bone">{value}</span>
    </div>
  );
}

function BriefLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="w-20 shrink-0 text-[9px] uppercase tracking-[0.1em] text-acid">
        {label}
      </span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
