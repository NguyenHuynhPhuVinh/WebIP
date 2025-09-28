import { headers } from "next/headers";
import MapWrapper from "../components/MapWrapper";

interface IpInfo {
  status: string;
  message?: string;
  country: string;
  regionName: string;
  city: string;
  lat: number;
  lon: number;
  isp: string;
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
      `http://ip-api.com/json/${ip}?fields=status,message,country,regionName,city,lat,lon,isp,query`,
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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 font-sans">
      <header className="w-full max-w-7xl">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-3">
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
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="Từ khóa | Địa chỉ IP"
                className="bg-[#0f1a29] border border-gray-600 rounded-md py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button className="absolute right-0 top-0 h-full bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 font-bold text-sm">
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        <nav className="flex items-center space-x-8 text-sm font-semibold border-t border-b border-gray-700 py-3 mt-2">
          <a
            href="#"
            className="text-white border-b-2 border-blue-500 pb-3 -mb-[13px]"
          >
            IP CỦA TÔI
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            TRA CỨU IP
          </a>
        </nav>
      </header>

      <main className="w-full max-w-7xl flex-grow mt-6 bg-[#0f1a29] p-6 sm:p-8 rounded-lg">
        {error ? (
          <div className="text-red-400 text-center bg-red-900/50 p-4 rounded-lg">
            {error}
          </div>
        ) : ipInfo ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cột trái */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg mb-3">Địa chỉ IP của tôi là:</h2>
                <div className="bg-[#1a2635] p-5 rounded-lg space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-lg w-12">IPv4:</span>
                    <a
                      href="#"
                      className="font-bold text-blue-400 text-2xl hover:underline"
                    >
                      {isIPv4(ipInfo.query) ? ipInfo.query : "Not detected"}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg w-12">IPv6:</span>
                    <span className="font-semibold text-gray-500 text-lg">
                      {!isIPv4(ipInfo.query) ? ipInfo.query : "Not detected"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg mb-3">Thông tin IP của tôi:</h2>
                <div className="bg-[#1a2635] p-5 rounded-lg space-y-3 text-md">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400">Nhà mạng:</p>
                    <span className="font-semibold text-right">
                      {ipInfo.isp}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400">Thành phố:</p>
                    <span className="font-semibold text-right">
                      {ipInfo.city}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400">Khu vực:</p>
                    <span className="font-semibold text-right">
                      {ipInfo.regionName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400">Quốc gia:</p>
                    <span className="font-semibold text-right">
                      {ipInfo.country}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải */}
            <div className="flex flex-col items-center">
              <div className="w-full h-64 mb-4 relative">
                <MapWrapper
                  lat={ipInfo.lat}
                  lon={ipInfo.lon}
                  ip={ipInfo.query}
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 text-black p-2 rounded shadow-lg text-xs font-semibold">
                  Nhấn để biết thêm chi tiết về {ipInfo.query}
                </div>
              </div>

              <a
                href="#"
                className="text-blue-400 mt-4 text-sm underline hover:text-blue-300"
              >
                Hiển thị thông tin IP hoàn chỉnh
              </a>
            </div>
          </div>
        ) : (
          <div className="text-center">Đang tải thông tin IP...</div>
        )}
      </main>
    </div>
  );
}
