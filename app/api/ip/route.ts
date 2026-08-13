import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://api64.ipify.org?format=json", { cache: "no-store" });
    if (!res.ok) {
      throw new Error("ipify failed");
    }
    const data = await res.json();
    return NextResponse.json({ ip: data.ip as string });
  } catch {
    return NextResponse.json({ error: "Failed to resolve public IP" }, { status: 502 });
  }
}
