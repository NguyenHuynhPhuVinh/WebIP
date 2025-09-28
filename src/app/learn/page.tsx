export default function LearnPage() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold">Lý Thuyết Về IP Programming</h1>
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
          Khám phá các khái niệm nền tảng của Giao thức Internet và cách chúng
          được áp dụng trong lập trình mạng.
        </p>
      </div>

      <Section title="1. Lịch Sử Phát Triển Của IP">
        <p>
          Internet Protocol (IP) được phát triển vào những năm 1970 như một phần
          của dự án ARPANET do Bộ Quốc Phòng Mỹ tài trợ. Vint Cerf và Bob Kahn
          là những người tiên phong, thiết kế IP để cho phép các mạng khác nhau
          kết nối với nhau, tạo nền tảng cho Internet hiện đại. Phiên bản IPv4
          được tiêu chuẩn hóa vào năm 1981 qua RFC 791, tập trung vào việc định
          địa chỉ 32-bit và định tuyến gói tin. Đến những năm 1990, với sự bùng
          nổ của Internet, IPv6 được giới thiệu vào năm 1998 qua RFC 2460 để
          giải quyết vấn đề cạn kiệt địa chỉ IPv4.
        </p>
      </Section>

      <Section title="3. Nền tảng cốt lõi: Giao thức Internet (IP)">
        <h3 className="text-xl font-semibold mb-2">Chức năng chính của IP:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Định danh và địa chỉ hóa:</strong>{" "}
            Mỗi thiết bị khi tham gia vào mạng Internet đều được cấp một địa chỉ
            IP duy nhất. Địa chỉ này giúp các thiết bị khác có thể xác định và
            gửi dữ liệu đến đúng đích.
          </li>
          <li>
            <strong className="text-white">Đóng gói dữ liệu:</strong> Dữ liệu từ
            các tầng trên được chia thành các "gói tin" (packets). IP sẽ thêm
            một phần tiêu đề (header) chứa địa chỉ nguồn, đích và thông tin kiểm
            soát.
          </li>
          <li>
            <strong className="text-white">Định tuyến (Routing):</strong> IP
            chịu trách nhiệm tìm ra đường đi tốt nhất để các gói tin di chuyển
            từ máy gửi đến máy nhận.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-6 mb-2">
          Đặc điểm của giao thức IP:
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">
              Không liên kết (Connectionless):
            </strong>{" "}
            IP không thiết lập một kết nối cố định trước khi gửi. Mỗi gói tin
            được xử lý độc lập.
          </li>
          <li>
            <strong className="text-white">
              Không đảm bảo (Unreliable/Best-effort):
            </strong>{" "}
            IP không đảm bảo gói tin sẽ đến đích, đúng thứ tự hay không bị lỗi.
            Việc này được giao cho các giao thức tầng trên như TCP.
          </li>
        </ul>
      </Section>

      <Section title="5. Quy trình cơ bản trong Lập trình IP (sử dụng Socket)">
        <p className="mb-4">
          Mô hình hoạt động phổ biến nhất là Client-Server, sử dụng Socket API:
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-lg text-blue-400">
              Phía Máy chủ (Server):
            </h4>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-300">
              <li>
                <strong>Tạo Socket:</strong> Tạo một điểm cuối giao tiếp.
              </li>
              <li>
                <strong>Gắn (Bind):</strong> Gán socket với một địa chỉ IP và số
                hiệu cổng.
              </li>
              <li>
                <strong>Lắng nghe (Listen):</strong> Đặt socket ở trạng thái chờ
                kết nối.
              </li>
              <li>
                <strong>Chấp nhận (Accept):</strong> Chấp nhận kết nối từ
                client.
              </li>
              <li>
                <strong>Giao tiếp:</strong> Trao đổi dữ liệu với client.
              </li>
              <li>
                <strong>Đóng:</strong> Đóng kết nối khi hoàn tất.
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-blue-400">
              Phía Máy khách (Client):
            </h4>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-300">
              <li>
                <strong>Tạo Socket:</strong> Tạo một điểm cuối giao tiếp.
              </li>
              <li>
                <strong>Kết nối (Connect):</strong> Gửi yêu cầu kết nối đến
                server.
              </li>
              <li>
                <strong>Giao tiếp:</strong> Gửi và nhận dữ liệu với server.
              </li>
              <li>
                <strong>Đóng:</strong> Đóng kết nối khi hoàn tất.
              </li>
            </ol>
          </div>
        </div>
      </Section>

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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold -mb-2">{title}</h2>
      {children}
    </section>
  );
}
