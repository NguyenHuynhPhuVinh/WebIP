import MapWrapper from "@/components/MapWrapper";

interface IpInfo {
  status: string;
  message?: string;
  [key: string]: any; // Allow any other properties
}

async function getIpInfo(ip: string): Promise<IpInfo> {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${decodeURIComponent(ip)}`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) {
      return { status: "fail", message: "Không thể kết nối đến dịch vụ IP." };
    }
    const data = await res.json();
    return data;
  } catch (e: any) {
    return {
      status: "fail",
      message: e.message || "Đã xảy ra lỗi không xác định.",
    };
  }
}

export default async function LookupResultPage({
  params,
}: {
  params: { ip: string };
}) {
  const ipInfo = await getIpInfo(params.ip);

  const keyTranslations: { [key: string]: string } = {
    query: "IP / Tên miền",
    status: "Trạng thái",
    continent: "Lục địa",
    continentCode: "Mã lục địa",
    country: "Quốc gia",
    countryCode: "Mã quốc gia",
    region: "Mã khu vực",
    regionName: "Tên khu vực",
    city: "Thành phố",
    zip: "Mã bưu chính",
    lat: "Vĩ độ",
    lon: "Kinh độ",
    timezone: "Múi giờ",
    isp: "Nhà mạng (ISP)",
    org: "Tổ chức",
    as: "AS (Số hiệu mạng)",
    mobile: "Thiết bị di động",
    proxy: "Proxy/VPN",
    hosting: "Hosting",
  };

  return (
    <main className="w-full max-w-7xl flex-grow mt-6 bg-[#0f1a29] p-6 sm:p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">
        Kết quả tra cứu cho:{" "}
        <span className="text-blue-400">
          {ipInfo.query || decodeURIComponent(params.ip)}
        </span>
      </h1>
      {ipInfo.status === "fail" ? (
        <div className="text-red-400 text-center bg-red-900/50 p-4 rounded-lg">
          {ipInfo.message || "Không thể lấy thông tin cho IP này."}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cột trái: Thông tin chi tiết */}
          <div className="bg-[#1a2635] p-5 rounded-lg space-y-2 text-md overflow-x-auto">
            {Object.entries(ipInfo).map(([key, value]) => {
              const translatedKey =
                keyTranslations[key] ||
                key.charAt(0).toUpperCase() + key.slice(1);
              const displayValue =
                typeof value === "boolean"
                  ? value
                    ? "Có"
                    : "Không"
                  : String(value);

              return (
                <div
                  key={key}
                  className="flex justify-between items-start gap-4"
                >
                  <p className="text-gray-400 flex-shrink-0">
                    {translatedKey}:
                  </p>
                  <span className="font-semibold text-right break-all">
                    {displayValue}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Cột phải: Bản đồ */}
          <div className="w-full h-80 md:h-full rounded-lg overflow-hidden">
            {ipInfo.lat && ipInfo.lon ? (
              <MapWrapper lat={ipInfo.lat} lon={ipInfo.lon} ip={ipInfo.query} />
            ) : (
              <div className="flex items-center justify-center h-full bg-[#1a2635]">
                <p>Không có dữ liệu vị trí.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
