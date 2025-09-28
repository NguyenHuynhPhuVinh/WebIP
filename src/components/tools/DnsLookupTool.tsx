"use client";

import { useState } from "react";

interface DnsResult {
  [key: string]: string[] | object[];
}

export default function DnsLookupTool() {
  const [host, setHost] = useState("google.com");
  const [results, setResults] = useState<DnsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!host.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`/api/dns-lookup?host=${host.trim()}`);
      const data = await response.json();

      if (!response.ok || Object.keys(data).length === 0) {
        throw new Error(
          data.error || `Could not resolve any records for ${host}`
        );
      }
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderRecord = (record: any) => {
    if (typeof record === "string") {
      return record;
    }
    // For MX records
    return `priority: ${record.priority}, exchange: ${record.exchange}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">DNS Lookup</h2>
      <form onSubmit={handleLookup} className="flex gap-4 mb-6">
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
          {isLoading ? "Looking up..." : "Lookup"}
        </button>
      </form>
      <div className="bg-black rounded-lg p-4 font-mono text-sm min-h-[200px] overflow-x-auto">
        {isLoading && (
          <p className="text-gray-400 animate-pulse">
            Searching for records...
          </p>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {results && Object.keys(results).length > 0 && (
          <div className="space-y-2">
            {Object.entries(results).map(([type, records]) => (
              <div key={type}>
                <span className="text-cyan-400 font-bold">{type}:</span>
                {(Array.isArray(records) ? records : [records]).map(
                  (record, index) => (
                    <p key={index} className="pl-4 text-gray-300">
                      {renderRecord(record)}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
