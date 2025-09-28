import { NextRequest, NextResponse } from "next/server";
import net from "net";

const checkPort = (
  host: string,
  port: number
): Promise<{ port: number; status: "open" | "closed" }> => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 2000;

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve({ port, status: "open" });
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve({ port, status: "closed" });
    });

    socket.on("error", () => {
      socket.destroy();
      resolve({ port, status: "closed" });
    });

    socket.connect(port, host);
  });
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const host = searchParams.get("host");
  const portsString = searchParams.get("ports");

  if (!host) {
    return NextResponse.json({ error: "Host is required" }, { status: 400 });
  }

  if (!portsString) {
    return NextResponse.json({ error: "Ports are required" }, { status: 400 });
  }

  const ports = portsString
    .split(",")
    .map((p) => parseInt(p.trim(), 10))
    .filter((p) => !isNaN(p) && p > 0 && p < 65536);

  if (ports.length === 0 || ports.length > 20) {
    return NextResponse.json(
      { error: "Invalid or too many ports specified (max 20)." },
      { status: 400 }
    );
  }

  const results = await Promise.all(ports.map((port) => checkPort(host, port)));
  return NextResponse.json(results);
}
