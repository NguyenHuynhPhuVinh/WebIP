"use client";

import ToolVisualization from "./ToolVisualization";
import { useState } from "react";

interface PortResult {
  port: number;
  status: "open" | "closed";
}

const commonPorts = [
  { port: 21, name: "FTP" },
  { port: 22, name: "SSH" },
  { port: 25, name: "SMTP" },
  { port: 80, name: "HTTP" },
  { port: 110, name: "POP3" },
  { port: 143, name: "IMAP" },
  { port: 443, name: "HTTPS" },
  { port: 3306, name: "MySQL" },
  { port: 5432, name: "PostgreSQL" },
  { port: 8080, name: "HTTP Alt" },
];

export default function PortScanTool() {
  const [host, setHost] = useState("google.com");
  const [selectedPorts, setSelectedPorts] = useState<number[]>([80, 443]);
  const [results, setResults] = useState<PortResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visualStatus, setVisualStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handlePortToggle = (port: number) => {
    setSelectedPorts((prev) =>
      prev.includes(port) ? prev.filter((p) => p !== port) : [...prev, port]
    );
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim() || selectedPorts.length === 0 || isLoading) return;

    setIsLoading(true);
    setVisualStatus("loading");
    setError(null);
    setResults([]);

    try {
      const response = await fetch(
        `/api/port-scan?host=${host.trim()}&ports=${selectedPorts.join(",")}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred");
      }
      setResults(data);
      setVisualStatus("success");
    } catch (err: any) {
      setVisualStatus("error");
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Port Scanner</h2>
      <form onSubmit={handleScan}>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="Nhập IP hoặc tên miền..."
            className="flex-grow bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <button
            type="submit"
            disabled={isLoading || selectedPorts.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? "Scanning..." : "Scan Ports"}
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Select common ports to scan:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {commonPorts.map(({ port, name }) => (
              <label
                key={port}
                className="flex items-center space-x-2 bg-gray-900 p-2 rounded-md cursor-pointer hover:bg-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedPorts.includes(port)}
                  onChange={() => handlePortToggle(port)}
                  className="form-checkbox h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm">
                  {port} <span className="text-gray-400">({name})</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </form>

      <ToolVisualization toolType="port-scan" status={visualStatus} />
      <div className="bg-black rounded-lg p-4 font-mono text-sm min-h-[200px] overflow-x-auto">
        {isLoading && (
          <p className="text-gray-400 animate-pulse">Scanning ports...</p>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {results.length > 0 && (
          <div className="space-y-1">
            {results.map(({ port, status }) => (
              <p key={port}>
                Port {port}:{" "}
                <span
                  className={
                    status === "open" ? "text-green-400" : "text-red-400"
                  }
                >
                  {status.toUpperCase()}
                </span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
