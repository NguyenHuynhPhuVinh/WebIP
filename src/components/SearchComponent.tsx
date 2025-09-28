"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchComponent() {
  const [ip, setIp] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ip.trim()) {
      router.push(`/lookup/${ip.trim()}`);
      // Không cần reset input để người dùng thấy họ vừa tìm gì
    }
  };

  return (
    <div className="mb-8 max-w-lg mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Nhập địa chỉ IP hoặc tên miền để tra cứu..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-5 pr-28 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-[calc(100%-16px)] bg-blue-600 text-white px-5 rounded-md hover:bg-blue-700 font-bold text-sm transition-colors duration-200"
        >
          Tra cứu
        </button>
      </form>
    </div>
  );
}
