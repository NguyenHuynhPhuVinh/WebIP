import { headers } from "next/headers";
import MapWrapper from "@/components/MapWrapper";
import CopyButton from "@/components/CopyButton";
import React from "react";

interface IpInfo {
  status: string;
  message?: string;
  country: string;
  regionName: string;
  city: string;
  lat: number;
  lon: number;
  isp: string;
  org: string;
  query: string;
}

const isIPv4 = (ip: string) => {
  return /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip);
};

export default async function Home() {
  const headersList = await headers();
  // Lấy IP từ header, ưu tiên x-forwarded-for. Dùng 8.8.8.8 làm dự phòng.
  let ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();

  // Khi chạy ở local (development), IP sẽ là địa chỉ nội bộ (reserved range).
  // Chúng ta sẽ dùng một IP công khai để test, khi deploy thì ip thật sẽ được dùng.
  if (process.env.NODE_ENV === "development" || !ip) {
    ip = "8.8.8.8"; // Google DNS IP, dùng để demo
  }

  let ipInfo: IpInfo | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,isp,org,query`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      throw new Error("Không thể kết nối đến dịch vụ IP.");
    }
    const data = await res.json();
    if (data.status === "fail") {
      throw new Error(data.message || "Không thể lấy thông tin IP.");
    }
    ipInfo = data;
  } catch (e: any) {
    error = e.message || "Đã xảy ra lỗi không xác định.";
  }

  return (
    <>
      {error ? (
        <div className="text-red-400 text-center bg-red-900/50 p-4 rounded-lg">
          {error}
        </div>
      ) : ipInfo ? (
        <div className="space-y-8">
          {/* IP Address Hero Section */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center relative">
            <h1 className="text-sm text-gray-400 mb-2">
              Địa chỉ IP công khai của bạn
            </h1>
            <p className="text-3xl sm:text-4xl font-bold text-blue-400 font-mono tracking-wider break-all">
              {ipInfo.query}
            </p>
            <CopyButton textToCopy={ipInfo.query} />
          </div>

          {/* Main Info Grid */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Left Column: Details */}
            <div className="md:col-span-3 space-y-8">
              {/* Location Info */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Thông tin vị trí</h2>
                <div className="space-y-3">
                  <InfoItem
                    icon="location"
                    label="Thành phố"
                    value={ipInfo.city}
                  />
                  <InfoItem
                    icon="map"
                    label="Khu vực"
                    value={ipInfo.regionName}
                  />
                  <InfoItem
                    icon="globe"
                    label="Quốc gia"
                    value={ipInfo.country}
                  />
                </div>
              </div>

              {/* Network Info */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Thông tin nhà mạng</h2>
                <div className="space-y-3">
                  <InfoItem
                    icon="wifi"
                    label="Nhà mạng (ISP)"
                    value={ipInfo.isp}
                  />
                  <InfoItem
                    icon="building"
                    label="Tổ chức"
                    value={ipInfo.org}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Map */}
            <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-4">Vị trí trên bản đồ</h2>
              <div className="w-full flex-grow h-64 md:h-auto rounded-md overflow-hidden">
                <MapWrapper
                  lat={ipInfo.lat}
                  lon={ipInfo.lon}
                  ip={ipInfo.query}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">Đang tải thông tin IP...</div>
      )}
    </>
  );
}

const ICONS: { [key: string]: React.ReactElement } = {
  location: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  map: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6V4a1 1 0 011-1h2a1 1 0 011 1v3m-4 13l4-2m0 0l4-2m-4 2v-6m0-6l4-2m0 0l4 2m-4-2v6m0 6l4 2"
      />
    </svg>
  ),
  globe: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l.586-.586a2 2 0 012.828 0l2 2a2 2 0 010 2.828l-2 2a2 2 0 01-2.828 0l-2-2a2 2 0 010-2.828zM14 11V3m0 0a2 2 0 012-2h.5a2 2 0 012 2v.5"
      />
    </svg>
  ),
  wifi: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071a10 10 0 0114.142 0M1.394 8.536a15 15 0 0121.212 0"
      />
    </svg>
  ),
  building: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
};

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center text-sm">
      <div className="flex items-center w-1/3 text-gray-400">
        <span className="mr-2 text-gray-500">{ICONS[icon]}</span>
        <span>{label}</span>
      </div>
      <div className="w-2/3 font-medium text-gray-200">{value}</div>
    </div>
  );
}
