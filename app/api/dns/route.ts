import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name")?.trim();
  if (!name) {
    return NextResponse.json({ error: "Missing domain" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=A`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error("DNS lookup failed");
    }
    const data = await res.json();
    const record = data?.Answer?.find((item: { type: number; data: string }) => item.type === 1);
    const ip = record?.data || data?.Answer?.[0]?.data || null;
    if (!ip) {
      return NextResponse.json({ error: "No IP found" }, { status: 404 });
    }
    return NextResponse.json({ ip });
  } catch {
    return NextResponse.json({ error: "Failed to resolve domain" }, { status: 502 });
  }
}
