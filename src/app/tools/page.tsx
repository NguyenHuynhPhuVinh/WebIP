"use client";

import { useState } from "react";
import PingTool from "@/components/tools/PingTool";
import DnsLookupTool from "@/components/tools/DnsLookupTool";
import PortScanTool from "@/components/tools/PortScanTool";
import WhoisTool from "@/components/tools/WhoisTool";

type Tool = "ping" | "dns-lookup" | "port-scan" | "whois";

const tools: { id: Tool; name: string; component: React.FC }[] = [
  { id: "ping", name: "Ping", component: PingTool },
  { id: "dns-lookup", name: "DNS Lookup", component: DnsLookupTool },
  { id: "port-scan", name: "Port Scanner", component: PortScanTool },
  { id: "whois", name: "WHOIS", component: WhoisTool },
];

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("ping");

  const ActiveToolComponent =
    tools.find((t) => t.id === activeTool)?.component || PingTool;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Công cụ Mạng</h1>
        <p className="text-gray-400 mt-2">
          Các tiện ích tương tác để chẩn đoán và khám phá mạng.
        </p>
      </div>

      <div className="flex justify-center border-b border-gray-700 mb-8">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-4 sm:px-6 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none ${
              activeTool === tool.id
                ? "border-b-2 border-blue-500 text-blue-400"
                : "border-b-2 border-transparent text-gray-400 hover:text-white hover:border-gray-500"
            }`}
          >
            {tool.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[400px]">
        <ActiveToolComponent />
      </div>
    </div>
  );
}
