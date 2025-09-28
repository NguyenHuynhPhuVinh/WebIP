import { NextRequest, NextResponse } from "next/server";
import whois from "whois";
import { promisify } from "util";

const whoisLookup = promisify(whois.lookup);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Domain or IP query is required" },
      { status: 400 }
    );
  }

  try {
    const data = await whoisLookup(query);
    return NextResponse.json({ result: data });
  } catch (error: any) {
    // The library often returns errors as strings
    const errorMessage = typeof error === "string" ? error : error.message;
    return NextResponse.json(
      { error: `Could not get WHOIS data: ${errorMessage}` },
      { status: 500 }
    );
  }
}
