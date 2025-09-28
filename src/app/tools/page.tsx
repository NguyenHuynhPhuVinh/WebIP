"use client";

import { useState } from "react";

// Giả sử chúng ta sẽ tạo thêm các component công cụ khác trong tương lai
// import PortScannerTool from '@/components/tools/PortScannerTool';
// import DnsLookupTool from '@/components/tools/DnsLookupTool';
import PingTool from "@/components/tools/PingTool";

type Tool = "ping"; // | 'port-scan' | 'dns-lookup';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>("ping");

  const renderTool = () => {
    switch (activeTool) {
      case "ping":
        return <PingTool />;
      // case 'port-scan':
      //   return <PortScannerTool />;
      // case 'dns-lookup':
      //   return <DnsLookupTool />;
      default:
        return <PingTool />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Công cụ Mạng</h1>
        <p className="text-gray-400 mt-2">
          Các tiện ích tương tác để chẩn đoán và khám phá mạng.
        </p>
      </div>
      {/* Trong tương lai có thể thêm thanh điều hướng cho các công cụ khác */}
      {/* <div className="flex justify-center border-b border-gray-700"> ... </div> */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[400px]">
        {renderTool()}
      </div>
    </div>
  );
}
