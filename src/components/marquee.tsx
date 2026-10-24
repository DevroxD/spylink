const words = [
  "Penetration testing",
  "Security audit",
  "Digital forensics",
  "Reverse engineering",
  "Incident response",
  "Detection engineering",
];

export function Marquee() {
  const strip = [...words, ...words];
  return (
    <div className="marquee relative overflow-hidden border-b border-line bg-ink py-4">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {strip.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="flex items-center gap-8 pr-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          >
            {word}
            <span className="text-acid">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
