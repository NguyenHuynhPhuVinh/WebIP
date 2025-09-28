"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [ip, setIp] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (ip.trim()) {
      router.push(`/lookup/${ip.trim()}`);
      setIp("");
    }
  };

  return (
    <header className="w-full max-w-7xl">
      <div className="flex justify-between items-center py-2">
        <Link href="/" className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="#3b82f6"
            stroke="#fff"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          <span className="text-xl font-bold text-white">
            IP Programming Demo
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              placeholder="Từ khóa | Địa chỉ IP"
              className="bg-[#0f1a29] border border-gray-600 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 font-bold text-sm"
            >
              Tìm kiếm
            </button>
          </form>
        </div>
      </div>
      <nav className="flex items-center space-x-8 text-sm font-semibold border-t border-b border-gray-700 py-3 mt-2">
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-white border-b-2 border-blue-500 pb-3 -mb-[13px]"
              : "text-gray-300 hover:text-white"
          }
        >
          IP CỦA TÔI
        </Link>
        <Link
          href="/lookup"
          className={
            pathname.startsWith("/lookup")
              ? "text-white border-b-2 border-blue-500 pb-3 -mb-[13px]"
              : "text-gray-300 hover:text-white"
          }
        >
          TRA CỨU IP
        </Link>
      </nav>
    </header>
  );
}
