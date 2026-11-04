import { isIP } from "node:net";

type IfconfigResponse = {
  city?: unknown;
  region_name?: unknown;
  country?: unknown;
  latitude?: unknown;
  longitude?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIfconfigResponse(value: unknown): value is IfconfigResponse {
  return isRecord(value);
}

function isValidLocation(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getVisitorIp(request: Request): string | undefined {
  const headers = request.headers;
  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("true-client-ip"),
    headers.get("fly-client-ip"),
    headers.get("x-nf-client-connection-ip"),
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for")?.split(",")[0],
  ];

  return candidates
    .map((candidate) => candidate?.trim())
    .find((candidate): candidate is string => !!candidate && isIP(candidate) !== 0);
}

export async function GET(request: Request) {
  const ip = getVisitorIp(request);
  if (!ip) {
    return Response.json(
      {
        error:
          "No client IP header received. Configure your hosting proxy to forward the visitor IP.",
      },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const url = new URL("https://ifconfig.co/json");
  url.searchParams.set("ip", ip);

  let data: IfconfigResponse | undefined;
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
      console.error("Visitor geolocation lookup failed:", response.status);
    } else {
      const result: unknown = await response.json();
      if (isIfconfigResponse(result)) {
        data = result;
      } else {
        console.error("Visitor geolocation lookup returned invalid JSON.");
      }
    }
  } catch (error) {
    console.error("Visitor geolocation lookup request failed:", error);
  }

  return Response.json(
    {
      ip,
      city: isValidLocation(data?.city) ? data.city : null,
      region_name: isValidLocation(data?.region_name)
        ? data.region_name
        : null,
      country: isValidLocation(data?.country) ? data.country : null,
      latitude: data?.latitude,
      longitude: data?.longitude,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
