import { NextRequest, NextResponse } from "next/server";
import dns from "dns";
import { promisify } from "util";

const resolve = promisify(dns.resolve);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");

  if (!host) {
    return NextResponse.json({ error: "Host is required" }, { status: 400 });
  }

  try {
    const startTime = Date.now();

    // Step 1: Resolve hostname to IP if it's not an IP already
    let ip;
    try {
      const addresses = await resolve(host);
      ip = addresses[0];
    } catch (e) {
      // If it fails, maybe the host is already an IP. We'll let fetch try.
      ip = host;
    }

    // Step 2: Simulate ping by fetching a small resource (headers only)
    // We use a known open port (80/443). This simulates TCP-based reachability.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2-second timeout

    await fetch(`http://${host}`, {
      method: "HEAD",
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);
    const endTime = Date.now();
    const time = endTime - startTime;

    return NextResponse.json({ ip, time });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Could not reach host: ${error.message}` },
      { status: 500 }
    );
  }
}
