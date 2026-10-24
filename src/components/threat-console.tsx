import { Mark } from "@/components/icons";

export function ThreatConsole() {
  return (
    <div className="corners relative overflow-hidden border border-line bg-panel/70 shadow-[0_30px_120px_-40px_var(--shadow-acid)] backdrop-blur-sm">
      <div className="flex h-9 items-center justify-between border-b border-line px-3">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-line-bright" />
          <span className="size-1.5 rounded-full bg-line-bright" />
          <span className="size-1.5 rounded-full bg-acid/70" />
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
          ops.console <span className="text-line-bright">/</span>{" "}
          <span className="text-acid">live</span>
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
          aes-256
        </p>
      </div>

      <div className="p-4 sm:p-5">
        <div className="relative mx-auto aspect-square w-full max-w-[320px]">
          <div className="absolute inset-0 rounded-full border border-line" />
          <div className="absolute inset-[14%] rounded-full border border-line" />
          <div className="absolute inset-[30%] rounded-full border border-line" />
          <div className="absolute inset-[46%] rounded-full border border-line-bright" />
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line" />
          <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-line" />

          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="animate-radar absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_305deg,var(--radar-a)_338deg,var(--radar-b)_360deg)]" />
          </div>

          <span className="absolute left-[64%] top-[27%] size-1.5 rounded-full bg-acid shadow-[0_0_10px_2px_var(--radar-b)]" />
          <span className="absolute left-[32%] top-[63%] size-1.5 rounded-full bg-jade shadow-[0_0_10px_2px_var(--radar-jade)]" />
          <span className="absolute left-[46%] top-[38%] size-1 rounded-full bg-bone/70" />
          <span className="absolute left-[66%] top-[68%] size-1 rounded-full bg-bone/40" />

          <div className="absolute left-[64%] top-[27%] -translate-y-full pb-3">
            <p className="whitespace-nowrap border border-line bg-void/90 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-acid">
              edge-01
            </p>
          </div>
          <div className="absolute left-[32%] top-[63%] -translate-y-full pb-3">
            <p className="whitespace-nowrap border border-line bg-void/90 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.16em] text-jade">
              vault-02
            </p>
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-acid">
            <Mark className="size-7" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line font-mono">
          <Metric label="Surface" value="1,284" />
          <Metric label="Open crit" value="0" accent />
          <Metric label="MTTD" value="4m 12s" />
        </div>

        <div className="mt-4 space-y-1.5 font-mono text-[10px] leading-relaxed">
          <p className="text-dim">
            <span className="text-acid">$</span> ./recon --client example.com
          </p>
          <p className="text-muted">
            <span className="text-jade">[+]</span> 1,284 assets indexed · 3 exposed
          </p>
          <p className="text-muted">
            <span className="text-jade">[+]</span> findings triaged · report signed
          </p>
          <p className="text-dim">
            <span className="text-acid">$</span>{" "}
            <span className="animate-blink text-acid">▊</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="px-2 py-3 first:pl-0 last:pr-0">
      <p className="text-[8px] uppercase tracking-[0.16em] text-dim">{label}</p>
      <p
        className={`mt-1 text-sm tracking-tight ${accent ? "text-acid" : "text-bone"}`}
      >
        {value}
      </p>
    </div>
  );
}
