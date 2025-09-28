import { NextRequest, NextResponse } from "next/server";
import dns from "dns/promises";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");

  if (!host) {
    return NextResponse.json({ error: "Host is required" }, { status: 400 });
  }

  try {
    const results: { [key: string]: any } = {};

    const resolveFunctions = {
      A: () => dns.resolve4(host),
      AAAA: () => dns.resolve6(host),
      MX: () => dns.resolveMx(host),
      CNAME: () => dns.resolveCname(host),
      NS: () => dns.resolveNs(host),
      TXT: () => dns.resolveTxt(host),
    };

    const promises = Object.entries(resolveFunctions).map(
      async ([type, func]) => {
        try {
          const data = await func();
          if (data && data.length > 0) {
            results[type] = data;
          }
        } catch (e: any) {
          // Ignore errors like NODATA, we just won't add the key
          if (e.code !== "ENODATA" && e.code !== "ENOTFOUND") {
            // We can log other errors if needed, but for the UI let's just skip
          }
        }
      }
    );

    await Promise.all(promises);

    // Reverse DNS lookup if host is an IP
    const ipRegex =
      /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$|([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}/;
    if (ipRegex.test(host)) {
      try {
        const ptr = await dns.reverse(host);
        if (ptr && ptr.length > 0) {
          results["PTR"] = ptr;
        }
      } catch (e) {
        // Ignore reverse lookup errors
      }
    }

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
