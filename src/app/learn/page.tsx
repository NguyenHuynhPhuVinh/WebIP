export default function LearnPage() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Lý Thuyết Về IP Programming</h1>
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
          Khám phá các khái niệm nền tảng của Giao thức Internet và cách chúng
          được áp dụng trong lập trình mạng.
        </p>
      </div>

      {/* TCP/IP Model Section */}
      <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Mô Hình TCP/IP</h2>
        <div className="space-y-4">
          <LayerCard
            layerName="Application (Lớp ứng dụng)"
            protocols="HTTP, FTP, SMTP, DNS"
            description="Xử lý dữ liệu ứng dụng, định dạng và kết nối với người dùng."
          />
          <LayerCard
            layerName="Transport (Lớp giao vận)"
            protocols="TCP, UDP"
            description="Đảm bảo truyền dữ liệu đáng tin cậy (TCP) hoặc nhanh chóng (UDP) giữa các điểm cuối."
          />
          <LayerCard
            layerName="Internet (Lớp mạng)"
            protocols="IP, ICMP, IGMP"
            description="Định địa chỉ IP, định tuyến và phân mảnh gói tin để di chuyển qua các mạng."
          />
          <LayerCard
            layerName="Network Access (Lớp truy cập mạng)"
            protocols="Ethernet, Wi-Fi"
            description="Xử lý kết nối vật lý, tạo khung dữ liệu và kiểm tra lỗi trên mạng cục bộ."
          />
        </div>
      </section>

      {/* IPv4 vs IPv6 Section */}
      <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">So Sánh IPv4 và IPv6</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Đặc Điểm
                </th>
                <th scope="col" className="px-6 py-3">
                  IPv4
                </th>
                <th scope="col" className="px-6 py-3">
                  IPv6
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                feature="Độ Dài Địa Chỉ"
                ipv4="32 bit (~4.3 tỷ địa chỉ)"
                ipv6="128 bit (~3.4 x 10^38 địa chỉ)"
              />
              <TableRow
                feature="Biểu Diễn"
                ipv4="Dạng thập phân (192.168.1.1)"
                ipv6="Dạng hex (2001:db8::1)"
              />
              <TableRow
                feature="Bảo Mật"
                ipv4="Không tích hợp (tùy chọn)"
                ipv6="Tích hợp IPSec bắt buộc"
              />
              <TableRow
                feature="Phân Mảnh Gói Tin"
                ipv4="Thực hiện tại các router"
                ipv6="Chỉ thực hiện tại nguồn gửi"
              />
              <TableRow
                feature="Cấu hình"
                ipv4="Thường thủ công hoặc qua DHCP"
                ipv6="Hỗ trợ cấu hình tự động (SLAAC)"
              />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function LayerCard({
  layerName,
  protocols,
  description,
}: {
  layerName: string;
  protocols: string;
  description: string;
}) {
  return (
    <div className="bg-gray-900 p-4 rounded-md border-l-4 border-blue-500">
      <h3 className="font-bold text-lg text-white">{layerName}</h3>
      <p className="text-sm text-gray-400 mt-1">
        <span className="font-semibold">Giao thức chính:</span> {protocols}
      </p>
      <p className="text-sm text-gray-300 mt-2">{description}</p>
    </div>
  );
}

function TableRow({
  feature,
  ipv4,
  ipv6,
}: {
  feature: string;
  ipv4: string;
  ipv6: string;
}) {
  return (
    <tr className="bg-gray-800 border-b border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-white whitespace-nowrap"
      >
        {feature}
      </th>
      <td className="px-6 py-4">{ipv4}</td>
      <td className="px-6 py-4">{ipv6}</td>
    </tr>
  );
}
