"use client";

import { useState } from "react";

export default function WhoisTool() {
  const [query, setQuery] = useState("google.com");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/whois?query=${query.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred");
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">WHOIS Lookup</h2>
      <form onSubmit={handleLookup} className="flex gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên miền hoặc IP..."
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
          <p className="text-gray-400 animate-pulse">Fetching WHOIS data...</p>
        )}
        {error && <p className="text-red-400">{error}</p>}
        {result && (
          <pre className="whitespace-pre-wrap text-gray-300">{result}</pre>
        )}
      </div>
    </div>
  );
}
