"use client";

import ToolVisualization from "./ToolVisualization";
import { useState } from "react";

interface PingResult {
  type: "reply" | "error" | "info";
  message: string;
}

export default function PingTool() {
  const [host, setHost] = useState("google.com");
  const [results, setResults] = useState<PingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visualStatus, setVisualStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handlePing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim() || isLoading) return;

    setIsLoading(true);
    setVisualStatus("loading");
    setResults([]);

    setResults([{ type: "info", message: `Pinging ${host.trim()}...` }]);

    for (let i = 0; i < 4; i++) {
      try {
        const response = await fetch(`/api/ping?host=${host.trim()}`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setVisualStatus("success");

        setResults((prev) => [
          ...prev,
          {
            type: "reply",
            message: `Reply from ${data.ip}: time=${data.time}ms`,
          },
        ]);
      } catch (error: any) {
        setVisualStatus("error");
        setResults((prev) => [
          ...prev,
          {
            type: "error",
            message: `Request timed out or error: ${error.message}`,
          },
        ]);
        break;
      }
      // Add a delay between pings
      if (i < 3) await new Promise((res) => setTimeout(res, 1000));
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ping</h2>
      <form onSubmit={handlePing} className="flex gap-4 mb-6">
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="Nhập IP hoặc tên miền..."
          className="flex-grow bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? "Pinging..." : "Ping"}
        </button>
      </form>
      <ToolVisualization toolType="ping" status={visualStatus} />
      <div className="bg-black rounded-lg p-4 font-mono text-sm min-h-[200px] overflow-x-auto">
        {results.map((result, index) => (
          <p
            key={index}
            className={
              result.type === "error"
                ? "text-red-400"
                : result.type === "reply"
                ? "text-green-400"
                : "text-gray-300"
            }
          >
            {result.message}
          </p>
        ))}
        {isLoading && <p className="text-gray-400 animate-pulse">Pinging...</p>}
      </div>
    </div>
  );
}
