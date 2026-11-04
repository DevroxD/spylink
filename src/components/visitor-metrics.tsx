"use client";

import { useEffect, useState } from "react";

type VisitorResponse = {
  ip?: unknown;
  city?: unknown;
  region_name?: unknown;
  country?: unknown;
  latitude?: unknown;
  longitude?: unknown;
};

type VisitorInfo = {
  ip: string;
  location: string;
  coordinates: string;
};

type LookupState =
  | { status: "loading" }
  | { status: "success"; visitor: VisitorInfo }
  | { status: "error"; message: string };

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isVisitorResponse(data: unknown): data is VisitorResponse {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}

function formatCoordinates(latitude: unknown, longitude: unknown): string {
  if (
    typeof latitude !== "number" ||
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    typeof longitude !== "number" ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return "Unavailable";
  }

  const latDirection = latitude < 0 ? "S" : "N";
  const lonDirection = longitude < 0 ? "W" : "E";
  return `${Math.abs(latitude).toFixed(4)}° ${latDirection} ${Math.abs(longitude).toFixed(4)}° ${lonDirection}`;
}

function parseVisitorInfo(data: VisitorResponse): VisitorInfo {
  const locationParts = [data.city, data.region_name, data.country].filter(
    isNonEmptyString,
  );
  const ip = isNonEmptyString(data.ip) ? data.ip : "Unavailable";

  return {
    ip,
    location: locationParts.length ? locationParts.join(", ") : "Unavailable",
    coordinates: formatCoordinates(data.latitude, data.longitude),
  };
}

export function VisitorMetrics() {
  const [lookup, setLookup] = useState<LookupState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    let active = true;

    async function loadVisitorInfo() {
      try {
        const response = await fetch("/api/visitor-location", {
          signal: controller.signal,
        });

        if (!response.ok) {
          if (response.status === 503) {
            throw new Error(
              "Your host did not provide the visitor IP. Configure its proxy IP header.",
            );
          }
          throw new Error("Visitor location lookup unavailable.");
        }

        const data: unknown = await response.json();
        if (!isVisitorResponse(data)) {
          throw new Error("Visitor lookup returned an invalid response");
        }

        if (active) {
          setLookup({
            status: "success",
            visitor: parseVisitorInfo(data),
          });
        }
      } catch (error) {
        if (active) {
          setLookup({
            status: "error",
            message:
              controller.signal.aborted
                ? "Visitor lookup timed out."
                : error instanceof Error
                  ? error.message
                  : "Visitor location lookup unavailable.",
          });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void loadVisitorInfo();

    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  const visitor = lookup.status === "success" ? lookup.visitor : undefined;
  const unavailable = lookup.status === "error";
  const errorMessage =
    lookup.status === "error" ? lookup.message : "Visitor lookup unavailable.";
  const loading = lookup.status === "loading";

  return (
    <>
      <div
        className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line font-mono"
        aria-busy={loading}
        aria-live="polite"
      >
        <Metric
          label="Location"
          value={unavailable ? "Unavailable" : (visitor?.location ?? "Loading…")}
        />
        <Metric
          label="IP address"
          value={unavailable ? "Unavailable" : (visitor?.ip ?? "Loading…")}
          accent
        />
        <Metric
          label="Coordinates"
          value={
            unavailable
              ? "Unavailable"
              : (visitor?.coordinates ?? "Loading…")
          }
        />
        {unavailable && (
          <p className="col-span-3 py-2 text-[9px] text-dim">
            {errorMessage}
          </p>
        )}
      </div>
      <p className="mt-1 font-mono text-[8px] text-dim">
        Your public IP is sent to ifconfig.co for approximate location.
      </p>
    </>
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
    <div className="min-w-0 px-2 py-3 first:pl-0 last:pr-0">
      <p className="text-[8px] uppercase tracking-[0.16em] text-dim">{label}</p>
      <p
        className={`mt-1 break-words text-sm tracking-tight ${accent ? "text-acid" : "text-bone"}`}
      >
        {value}
      </p>
    </div>
  );
}
