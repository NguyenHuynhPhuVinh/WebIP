"use client";

import { useState } from "react";

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-1 px-3 rounded-md transition-all duration-200"
    >
      {copied ? "Đã chép!" : "Sao chép"}
    </button>
  );
}
