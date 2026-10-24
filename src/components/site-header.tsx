"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Close, Mark, Menu } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/", label: "Home", index: "00" },
  { href: "/services", label: "Services", index: "01" },
  { href: "/learn", label: "Learn", index: "02" },
  { href: "/about", label: "About", index: "03" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-line bg-void/80 md:block">
        <div className="shell flex h-9 items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
          <p className="flex items-center gap-2">
            <span className="relative inline-flex size-1.5 text-acid">
              <span className="size-1.5 rounded-full bg-acid" />
              <span className="dot-ping absolute inset-0 rounded-full" />
            </span>
            Independent security studio — engagements open
          </p>
          <p className="hidden items-center gap-6 lg:flex">
            <span>Est. 2019</span>
            <span className="text-line-bright">/</span>
            <span>Remote · Worldwide</span>
            <span className="text-line-bright">/</span>
            <span className="text-acid">GPT-7C1B · 92A4 · 0F3E</span>
          </p>
        </div>
      </div>

      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-void/85 backdrop-blur-xl"
            : "border-transparent bg-void/40 backdrop-blur-sm"
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Spylink home"
          >
            <span className="text-acid transition-transform duration-500 group-hover:rotate-90">
              <Mark className="size-8" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-[0.14em]">
                SPYLINK
              </span>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-dim">
                security studio
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors ${
                    active ? "text-acid" : "text-muted hover:text-bone"
                  }`}
                >
                  <span className="mr-2 text-[9px] text-dim transition-colors group-hover:text-acid">
                    {item.index}
                  </span>
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-px h-px bg-acid transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/about#contact"
              className="btn btn-ghost hidden min-h-10! px-5! sm:inline-flex"
            >
              Start a project
              <span className="size-1.5 rounded-full bg-acid" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex size-10 items-center justify-center border border-line text-bone transition-colors hover:border-acid hover:text-acid md:hidden"
            >
              {open ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        inert={!open}
        className={`fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-line bg-void/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="shell flex flex-col py-6" aria-label="Mobile">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between border-b border-line py-6"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-dim">{item.index}</span>
                  <span
                    className={`font-display text-4xl tracking-tight ${
                      active ? "text-acid" : "text-bone"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
                <span className="font-mono text-xs text-dim transition-colors group-hover:text-acid">
                  ↗
                </span>
              </Link>
            );
          })}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/about#contact"
              onClick={() => setOpen(false)}
              className="btn btn-acid w-full"
            >
              Start a project
            </Link>
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-dim">
              Available for select engagements.
              <br />
              Response within one business day.
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
