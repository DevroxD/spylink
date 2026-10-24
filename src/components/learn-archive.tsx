"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  FileText,
  Search,
  Terminal,
} from "@/components/icons";
import type { Entry } from "@/lib/content";
import { formatDate } from "@/lib/format";

const categoryList = [
  "All",
  "Offensive",
  "Defensive",
  "Forensics",
  "Reverse Engineering",
] as const;

export function LearnArchive({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categoryList)[number]>("All");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of entries) {
      map.set(entry.category, (map.get(entry.category) ?? 0) + 1);
    }
    return map;
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesCategory = category === "All" || entry.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        entry.title,
        entry.excerpt,
        entry.category,
        entry.level,
        ...entry.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query, category]);

  const filteredArticles = filtered.filter((entry) => entry.kind === "article");
  const filteredDocs = filtered.filter((entry) => entry.kind === "doc");

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
        <label className="group relative flex w-full max-w-md items-center gap-3 border border-line bg-panel/40 px-4 py-3 transition-colors focus-within:border-acid/60">
          <Search className="size-4 shrink-0 text-dim" />
          <span className="sr-only">Search the archive</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive…"
            className="w-full bg-transparent font-mono text-xs tracking-[0.04em] text-bone placeholder:text-dim focus:outline-none"
          />
          <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-dim sm:inline">
            {filtered.length} results
          </span>
        </label>

        <div className="flex flex-wrap gap-1.5">
          {categoryList.map((item) => {
            const active = category === item;
            const count =
              item === "All" ? entries.length : (counts.get(item) ?? 0);
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={`flex items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "border-acid bg-acid text-void"
                    : "border-line text-muted hover:border-line-bright hover:text-bone"
                }`}
              >
                {item}
                <span
                  className={`text-[8px] ${active ? "text-void/60" : "text-dim"}`}
                >
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-b border-line py-20 text-center">
          <Terminal className="size-8 text-dim" />
          <p className="mt-5 font-display text-2xl tracking-tight">
            No signal on that frequency.
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Nothing matches &ldquo;{query}&rdquo; in {category.toLowerCase()}.
            Try a broader term or reset the filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="btn btn-ghost mt-6"
          >
            Reset filters
          </button>
        </div>
      ) : null}

      {filteredArticles.length > 0 ? (
        <div id="articles" className="scroll-mt-28 pt-10">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em]">
              Articles
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                {String(filteredArticles.length).padStart(2, "0")}
              </span>
            </h2>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-dim sm:inline">
              Long-form · technical
            </span>
          </div>

          <div className="mt-6 border-t border-line">
            {filteredArticles.map((entry, index) => (
              <Link
                key={entry.slug}
                href={`/learn/${entry.slug}`}
                className="group grid gap-4 border-b border-line py-7 transition-colors hover:bg-panel/30 sm:grid-cols-12 sm:gap-6 sm:px-3"
              >
                <div className="flex items-center justify-between sm:col-span-1">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-dim transition-colors group-hover:text-acid">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim sm:hidden">
                    {entry.readTime}
                  </span>
                </div>

                <div className="sm:col-span-8">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                    <span className="text-acid">{entry.category}</span>
                    <span className="text-line-bright">/</span>
                    <span>{entry.level}</span>
                    <span className="text-line-bright">/</span>
                    <span>{formatDate(entry.date)}</span>
                  </div>

                  <h3 className="mt-3 max-w-2xl font-display text-xl font-medium leading-snug tracking-[-0.02em] text-bone transition-colors group-hover:text-acid sm:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {entry.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:col-span-3 sm:flex-col sm:items-end sm:justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
                    {entry.readTime}
                  </span>
                  <span className="flex size-9 items-center justify-center border border-line text-muted transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-void">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {filteredDocs.length > 0 ? (
        <div id="docs" className="scroll-mt-28 pt-14">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em]">
              Field docs
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                {String(filteredDocs.length).padStart(2, "0")}
              </span>
            </h2>
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-dim sm:inline">
              Templates · SOPs · baselines
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filteredDocs.map((entry) => (
              <Link
                key={entry.slug}
                href={`/learn/${entry.slug}`}
                className="card-hover group flex flex-col border border-line bg-panel/30 p-6"
              >
                <div className="flex items-start justify-between">
                  <span className="flex items-center gap-2 border border-line px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                    <FileText className="size-3" />
                    doc
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                    {entry.readTime}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium leading-snug tracking-[-0.02em] text-bone transition-colors group-hover:text-acid">
                  {entry.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {entry.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                  <span>Updated {formatDate(entry.date)}</span>
                  <span className="flex items-center gap-2 text-muted transition-colors group-hover:text-acid">
                    Open
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
