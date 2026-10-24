import Link from "next/link";
import { ArrowUpRight, serviceIcons } from "@/components/icons";
import type { Service } from "@/lib/content";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <Link
      href={`/services#${service.slug}`}
      className="card-hover group relative flex min-h-[320px] flex-col justify-between border-r border-b border-line bg-void/30 p-7 sm:p-9 lg:p-10"
    >
      <div>
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
            {service.index} <span className="text-line-bright">/</span> 04
          </span>
          <span className="text-muted transition-colors duration-300 group-hover:text-acid">
            <Icon className="size-8" strokeWidth={1.1} />
          </span>
        </div>

        <h3 className="mt-8 font-display text-2xl font-medium tracking-[-0.03em] text-bone transition-colors duration-300 group-hover:text-acid sm:text-[1.75rem]">
          {service.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {service.short}
        </p>
      </div>

      <div>
        <ul className="mt-8 flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-dim transition-colors group-hover:border-line-bright group-hover:text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center justify-between border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
          <span className="transition-colors group-hover:text-bone">
            View capability
          </span>
          <span className="flex size-8 items-center justify-center border border-line text-muted transition-all duration-300 group-hover:border-acid group-hover:bg-acid group-hover:text-void">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
