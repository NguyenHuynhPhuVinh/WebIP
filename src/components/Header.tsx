"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-gray-700 sticky top-0 bg-gray-900/80 backdrop-blur-lg z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
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

        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
          <Link
            href="/"
            className={`transition-colors duration-200 ${
              pathname === "/"
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            IP CỦA TÔI
          </Link>
          <Link
            href="/lookup"
            className={`transition-colors duration-200 ${
              pathname.startsWith("/lookup")
                ? "text-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
          >
            TRA CỨU IP
          </Link>
        </nav>
      </div>
    </header>
  );
}
