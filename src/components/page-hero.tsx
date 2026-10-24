export function PageHero({
  index,
  label,
  title,
  description,
  meta = [],
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  description: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow-acid),transparent_65%)] blur-2xl"
      />
      <div className="shell relative py-14 sm:py-16 lg:py-20">
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          <span className="text-acid">{index}</span>
          <span className="h-px w-8 bg-line-bright" />
          <span>{label}</span>
          <span className="text-line-bright">/</span>
          <span>Spylink</span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="font-display text-[clamp(2.6rem,6.4vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.05em] lg:col-span-8">
            {title}
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted lg:col-span-4">
            {description}
          </p>
        </div>

        {meta.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 border-t border-line sm:grid-cols-4">
            {meta.map((item) => (
              <div
                key={item.label}
                className="border-b border-line py-4 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
                  {item.label}
                </p>
                <p className="mt-1.5 font-display text-lg tracking-tight text-bone">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
