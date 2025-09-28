"use client";

import dynamic from "next/dynamic";

interface MapWrapperProps {
  lat: number;
  lon: number;
  ip: string;
}

// Thực hiện import động bên trong Client Component
const IpMap = dynamic(() => import("./IpMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#0f1a29] rounded-lg">
      <p>Đang tải bản đồ...</p>
    </div>
  ),
});

// Component này chỉ đơn giản là render IpMap đã được import động
export default function MapWrapper({ lat, lon, ip }: MapWrapperProps) {
  return <IpMap lat={lat} lon={lon} ip={ip} />;
}
