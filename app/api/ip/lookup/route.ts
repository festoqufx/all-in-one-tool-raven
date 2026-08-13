import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type LookupResult = {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  timezone?: string;
  org?: string;
};

async function lookupWithIpWho(ip: string): Promise<LookupResult | null> {
  const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  if (data?.success === false) return { ip };
  return {
    ip: data.ip || ip,
    city: data.city,
    region: data.region,
    country: data.country_code,
    timezone: data.timezone?.id,
    org: data.connection?.isp,
  };
}

async function lookupWithIpApi(ip: string): Promise<LookupResult | null> {
  const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  if (data?.error) return { ip };
  return {
    ip: data.ip || ip,
    city: data.city,
    region: data.region,
    country: data.country,
    timezone: data.timezone,
    org: data.org,
  };
}

export async function GET(request: NextRequest) {
  const ip = request.nextUrl.searchParams.get("ip")?.trim();
  if (!ip) {
    return NextResponse.json({ error: "Missing ip" }, { status: 400 });
  }

  try {
    const details = (await lookupWithIpWho(ip)) ?? (await lookupWithIpApi(ip)) ?? { ip };
    return NextResponse.json(details);
  } catch {
    return NextResponse.json({ ip }, { status: 200 });
  }
}
