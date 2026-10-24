import Link from "next/link";
import { ArrowUpRight, Mark } from "@/components/icons";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
];

const capabilities = [
  { href: "/services#penetration-testing", label: "Penetration testing" },
  { href: "/services#security-audit", label: "Security audit" },
  { href: "/services#digital-forensics", label: "Digital forensics" },
  { href: "/services#reverse-engineering", label: "Reverse engineering" },
];

const resources = [
  { href: "/learn#articles", label: "Articles" },
  { href: "/learn#docs", label: "Field docs" },
  { href: "/learn/engagement-scoping-checklist", label: "Scoping checklist" },
  { href: "/about#contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink">
      <div className="shell pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-acid">
                <Mark className="size-9" />
              </span>
              <span className="font-display text-xl font-semibold tracking-[0.14em]">
                SPYLINK
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              An independent security studio working across offensive testing,
              digital forensics, and reverse engineering. Small team, deep work,
              evidence over adjectives.
            </p>
            <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              <span className="relative flex size-1.5 text-acid">
                <span className="size-1.5 rounded-full bg-acid" />
                <span className="dot-ping absolute inset-0 rounded-full" />
              </span>
              All systems nominal
              <span className="mx-2 text-line-bright">·</span>
              <span>UTC 00:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <FooterColumn title="Navigate" links={navigation} />
            <FooterColumn title="Capabilities" links={capabilities} />
            <FooterColumn title="Resources" links={resources} />
          </div>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              © 2026 Spylink — All rights reserved
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              <span>No cookies</span>
              <span>No trackers</span>
              <a
                href="mailto:hello@spylink.security"
                className="link-sweep text-bone transition-colors hover:text-acid"
              >
                hello@spylink.security
              </a>
              <a
                href="#top"
                className="flex items-center gap-1 text-acid transition-opacity hover:opacity-70"
              >
                Back to top
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="shell overflow-hidden border-t border-line pt-10 pb-6"
      >
        <p className="text-stroke select-none whitespace-nowrap font-display text-[19vw] font-bold leading-[1.1] tracking-[-0.055em] opacity-40">
          SPYLINK
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="eyebrow text-dim">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-acid"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
