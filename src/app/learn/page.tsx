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

      {/* Section 1 */}
      <Section title="1. Lịch Sử Phát Triển Của IP">
        <p>
          Internet Protocol (IP) được phát triển vào những năm 1970 như một phần
          của dự án ARPANET do Bộ Quốc Phòng Mỹ tài trợ. Vint Cerf và Bob Kahn
          là những người tiên phong, thiết kế IP để cho phép các mạng khác nhau
          kết nối với nhau, tạo nền tảng cho Internet hiện đại. Phiên bản IPv4
          được tiêu chuẩn hóa vào năm 1981 qua RFC 791, tập trung vào việc định
          địa chỉ 32-bit và định tuyến gói tin. Đến những năm 1990, với sự bùng
          nổ của Internet, IPv6 được giới thiệu vào năm 1998 qua RFC 2460 để
          giải quyết vấn đề cạn kiệt địa chỉ IPv4. IP đã phát triển từ một giao
          thức đơn giản thành nền tảng cho lập trình mạng, hỗ trợ các ứng dụng
          từ email đến streaming.
        </p>
      </Section>

      {/* Section 2 */}
      <Section title="2. Giới Thiệu Về IP Programming">
        <p>
          IP Programming, hay lập trình với Internet Protocol (IP), là một phần
          quan trọng trong lĩnh vực lập trình mạng. Nó liên quan đến việc sử
          dụng giao thức IP để cho phép các thiết bị kết nối và giao tiếp qua
          mạng Internet.
        </p>
        <p>
          IP là giao thức cốt lõi trong mô hình TCP/IP, chịu trách nhiệm định
          địa chỉ và định tuyến dữ liệu giữa các thiết bị. Trong ngữ cảnh lập
          trình, IP Programming thường được sử dụng để xử lý địa chỉ IP, thiết
          lập kết nối mạng, và truyền dữ liệu một cách an toàn và hiệu quả. Nó
          là nền tảng cho các khái niệm như Socket Programming, TCP, và UDP.
        </p>
        <p>
          Về cơ bản, đây là quá trình viết mã để quản lý cách dữ liệu được định
          dạng, gửi và nhận giữa các thiết bị trên mạng, giúp xây dựng các ứng
          dụng mạng như máy chủ web, ứng dụng chat, hoặc hệ thống phân tán.
        </p>
      </Section>

      {/* Section 3 */}
      <Section title="3. Nền tảng cốt lõi: Giao thức Internet (IP)">
        <p>
          Để hiểu về lập trình IP, trước hết cần nắm vững khái niệm về Giao thức
          Internet (IP). IP là một trong những giao thức nền tảng và quan trọng
          nhất của bộ giao thức TCP/IP, hoạt động ở tầng Mạng (Network Layer).
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">
          Chức năng chính của IP:
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>
            <strong className="text-white">Định danh và địa chỉ hóa:</strong>{" "}
            Mỗi thiết bị khi tham gia vào mạng Internet đều được cấp một địa chỉ
            IP duy nhất. Địa chỉ này có vai trò như một địa chỉ nhà, giúp các
            thiết bị khác có thể xác định và gửi dữ liệu đến đúng đích.
          </li>
          <li>
            <strong className="text-white">Đóng gói dữ liệu:</strong> Dữ liệu từ
            các tầng trên được chia thành các "gói tin" (packets). IP sẽ thêm
            một phần tiêu đề (header) chứa các thông tin quan trọng như địa chỉ
            IP nguồn, địa chỉ IP đích và các thông tin kiểm soát khác.
          </li>
          <li>
            <strong className="text-white">Định tuyến (Routing):</strong> IP
            chịu trách nhiệm tìm ra đường đi tốt nhất để các gói tin có thể di
            chuyển từ máy gửi đến máy nhận qua các mạng máy tính phức tạp.
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
            IP không thiết lập một kết nối cố định trước khi gửi dữ liệu. Mỗi
            gói tin được xử lý và gửi đi một cách độc lập với các gói tin khác.
          </li>
          <li>
            <strong className="text-white">
              Không đảm bảo (Unreliable/Best-effort):
            </strong>{" "}
            IP không có cơ chế đảm bảo rằng các gói tin sẽ đến đích, đến đúng
            thứ tự hay không bị lỗi trong quá trình truyền. Việc đảm bảo độ tin
            cậy này được giao cho các giao thức ở tầng cao hơn, điển hình là
            TCP.
          </li>
        </ul>
      </Section>

      {/* Section 4 */}
      <Section title="4. Lập trình với IP: Khái niệm và Thành phần">
        <p>
          Lập trình IP thực chất là việc các lập trình viên sử dụng các giao
          diện lập trình ứng dụng (API) do hệ điều hành cung cấp để tương tác
          với ngăn xếp mạng (network stack) của máy tính. Khái niệm trung tâm
          trong lập trình IP chính là <strong>Socket</strong>.
        </p>
        <p>
          Một socket có thể được hình dung như một "điểm cuối" của một kênh giao
          tiếp hai chiều giữa hai chương trình đang chạy trên mạng. Khi một ứng
          dụng muốn giao tiếp qua mạng, nó sẽ tạo ra một socket, gắn socket đó
          với một địa chỉ IP và một số hiệu cổng (port) cụ thể, sau đó sử dụng
          socket này để gửi và nhận dữ liệu.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">
          Các thành phần chính:
        </h3>
        <ul className="list-disc pl-5 space-y-3 text-gray-300">
          <li>
            <strong className="text-white">Địa chỉ IP:</strong> Dùng để xác định
            máy tính nguồn và máy tính đích trên mạng. Hiện có hai phiên bản
            chính là IPv4 (ví dụ: 192.168.1.1) và IPv6 (ví dụ:
            2001:0db8:85a3::8a2e:0370:7334).
          </li>
          <li>
            <strong className="text-white">Số hiệu cổng (Port Number):</strong>{" "}
            Dùng để phân biệt các ứng dụng khác nhau đang chạy trên cùng một máy
            tính. Ví dụ, trình duyệt web thường sử dụng cổng 80 cho giao thức
            HTTP.
          </li>
          <li>
            <strong className="text-white">
              Giao thức tầng giao vận (Transport Layer Protocol):
            </strong>{" "}
            Lập trình viên thường phải lựa chọn giữa hai giao thức chính:
            <ul className="list-circle pl-6 mt-2 space-y-2">
              <li>
                <strong>TCP (Transmission Control Protocol):</strong> Cung cấp
                một kết nối đáng tin cậy, có thứ tự và kiểm soát lỗi. Thích hợp
                cho các ứng dụng yêu cầu tính toàn vẹn dữ liệu cao như duyệt
                web, gửi email, truyền file.
              </li>
              <li>
                <strong>UDP (User Datagram Protocol):</strong> Cung cấp một kết
                nối không đáng tin cậy, không có thứ tự và nhanh hơn TCP. Phù
                hợp cho các ứng dụng yêu cầu tốc độ cao và có thể chấp nhận mất
                mát một vài gói tin như truyền phát video trực tiếp (streaming),
                game online, gọi thoại qua Internet (VoIP).
              </li>
            </ul>
          </li>
        </ul>
      </Section>

      {/* Section 5 */}
      <Section title="5. Quy trình cơ bản trong Lập trình IP (sử dụng Socket)">
        <p className="mb-4">
          Mô hình hoạt động phổ biến nhất trong lập trình IP là mô hình
          Client-Server:
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
                kết nối từ máy khách.
              </li>
              <li>
                <strong>Chấp nhận (Accept):</strong> Khi có yêu cầu kết nối, máy
                chủ chấp nhận và tạo ra một socket mới dành riêng cho việc giao
                tiếp với client đó.
              </li>
              <li>
                <strong>Giao tiếp:</strong> Sử dụng socket mới để trao đổi dữ
                liệu (gửi và nhận).
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
                <strong>Kết nối (Connect):</strong> Gửi yêu cầu kết nối đến địa
                chỉ IP và số hiệu cổng của máy chủ.
              </li>
              <li>
                <strong>Giao tiếp:</strong> Sau khi kết nối được chấp nhận,
                client có thể gửi và nhận dữ liệu với server.
              </li>
              <li>
                <strong>Đóng:</strong> Đóng kết nối khi hoàn tất.
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* Section 6 & 7 */}
      <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          6. Mô Hình TCP/IP Và Vai Trò Của IP
        </h2>
        <p className="mb-4 text-gray-300">
          Mô hình TCP/IP là khung lý thuyết chính cho giao tiếp mạng, gồm bốn
          lớp. IP nằm ở lớp Internet Layer (hay Network Layer), nơi nó xử lý
          việc định địa chỉ IP và định tuyến gói tin qua các mạng khác nhau. Khi
          gửi dữ liệu, dữ liệu được đóng gói từ lớp trên xuống dưới, với IP thêm
          địa chỉ nguồn và đích vào gói tin. Tại đầu nhận, quá trình ngược lại
          để tái tạo dữ liệu.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">
          Các Lớp Trong Mô Hình TCP/IP:
        </h3>
        <div className="space-y-4">
          <LayerCard
            layerName="Application (Lớp ứng dụng)"
            protocols="HTTP, FTP, SMTP, DNS"
            description="Xử lý dữ liệu ứng dụng, định dạng dữ liệu, và kết nối với người dùng."
          />
          <LayerCard
            layerName="Transport (Lớp giao vận)"
            protocols="TCP, UDP"
            description="Đảm bảo truyền dữ liệu đáng tin cậy (TCP) hoặc nhanh chóng (UDP) giữa các điểm cuối."
          />
          <LayerCard
            layerName="Internet (Lớp mạng)"
            protocols="IP, ICMP, IGMP"
            description="Định địa chỉ IP, định tuyến, và phân mảnh gói tin để di chuyển qua các mạng."
          />
          <LayerCard
            layerName="Network Access (Lớp truy cập mạng)"
            protocols="Ethernet, Wi-Fi"
            description="Xử lý kết nối vật lý, tạo khung dữ liệu, và kiểm tra lỗi trên mạng cục bộ."
          />
        </div>
      </section>

      {/* Section 8 */}
      <Section title="8. Địa Chỉ IP Và Các Khái Niệm Cơ Bản">
        <p>
          Địa chỉ IP là nhãn số duy nhất được gán cho mỗi thiết bị kết nối mạng,
          ví dụ: 192.168.1.1 (IPv4) hoặc 2001:db8::1 (IPv6). Trong lập trình,
          địa chỉ IP được sử dụng để:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 mt-2">
          <li>Xác định máy chủ và máy khách.</li>
          <li>
            Chuyển đổi giữa dạng chuỗi (như "127.0.0.1") và dạng nhị phân để sử
            dụng trong socket.
          </li>
          <li>Hỗ trợ định tuyến dữ liệu qua các mạng khác nhau.</li>
        </ul>
        <p className="mt-4">
          Lập trình viên thường làm việc với các hàm để tạo socket, `bind` địa
          chỉ IP và port, và `connect` đến một địa chỉ từ xa.
        </p>
      </Section>

      {/* Section 9 */}
      <Section title="9. Cách IP Programming Liên Kết Với Các Chủ Đề Khác">
        <p>
          IP Programming là nền tảng cho nhiều khái niệm và công nghệ mạng khác:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 mt-2">
          <li>
            <strong>Socket Programming:</strong> Là cách triển khai trực tiếp
            của IP Programming, sử dụng socket API để giao tiếp qua IP.
          </li>
          <li>
            <strong>TCP và UDP:</strong> TCP cung cấp kết nối đáng tin cậy trên
            nền IP, trong khi UDP nhanh hơn nhưng không đảm bảo. Lập trình viên
            chọn một trong hai tùy theo nhu cầu ứng dụng.
          </li>
          <li>
            <strong>Kiến Trúc Mạng:</strong> Hỗ trợ các mô hình như
            Client-Server (2 lớp), N-tier, Microservices, và các giao thức như
            REST, SOAP, tất cả đều dựa trên giao tiếp IP.
          </li>
        </ul>
      </Section>

      {/* Section 11 */}
      <section className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">11. So Sánh IPv4 và IPv6</h2>
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
                ipv4="32 bit (khoảng 4,3 tỷ địa chỉ)"
                ipv6="128 bit (khoảng 3,4 x 10^38 địa chỉ)"
              />
              <TableRow
                feature="Biểu Diễn"
                ipv4="Dạng thập phân (ví dụ: 192.168.1.1)"
                ipv6="Dạng hex (ví dụ: 2001:db8::1)"
              />
              <TableRow
                feature="Phân Mảnh Gói Tin"
                ipv4="Hỗ trợ phân mảnh tại router"
                ipv6="Phân mảnh chỉ tại nguồn"
              />
              <TableRow
                feature="Bảo Mật"
                ipv4="Không tích hợp IPSec"
                ipv6="Tích hợp IPSec bắt buộc"
              />
              <TableRow
                feature="Tương Thích"
                ipv4="Phổ biến, nhưng đang cạn kiệt"
                ipv6="Tương thích với IPv4 qua cơ chế chuyển tiếp"
              />
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-gray-300">
          IPv6 mang lại lợi ích như không gian địa chỉ lớn hơn, định tuyến hiệu
          quả hơn, và hỗ trợ tốt hơn cho các thiết bị IoT, giúp lập trình viên
          xây dựng ứng dụng mạng bền vững hơn.
        </p>
      </section>

      {/* Section 10 */}
      <Section title="10. Ưu Điểm Và Nhược Điểm Của IP Programming">
        <ul className="list-none space-y-3">
          <li>
            <strong className="text-green-400">Ưu điểm:</strong> Tính tương
            thích cao, khả năng mở rộng, và là tiêu chuẩn cho Internet, cho phép
            kết nối toàn cầu.
          </li>
          <li>
            <strong className="text-red-400">Nhược điểm:</strong> Không có bảo
            mật tích hợp (cần thêm lớp như TLS/IPsec), và IPv4 có giới hạn địa
            chỉ (đang được giải quyết bởi IPv6).
          </li>
        </ul>
      </Section>

      {/* Section 12 */}
      <Section title="12. Bảo Mật Trong IP Programming">
        <p>
          Bản thân IP là giao thức không kết nối và không có cơ chế bảo mật tích
          hợp, dẫn đến các rủi ro như spoofing địa chỉ hoặc nghe lén gói tin. Để
          khắc phục, lập trình viên cần kết hợp với các lớp trên:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 mt-2">
          <li>
            <strong>TLS/SSL:</strong> Sử dụng ở lớp Transport hoặc Application
            để mã hóa dữ liệu.
          </li>
          <li>
            <strong>IPsec (Internet Protocol Security):</strong> Một bộ giao
            thức có thể tích hợp vào IP để cung cấp xác thực, toàn vẹn dữ liệu,
            và mã hóa ở lớp mạng.
          </li>
          <li>
            <strong>VPN:</strong> Sử dụng để tạo một kênh truyền an toàn, bảo vệ
            lưu lượng IP.
          </li>
        </ul>
        <p className="mt-2">
          Các vấn đề như DDoS có thể được giảm thiểu bằng cách kiểm tra địa chỉ
          nguồn trong code hoặc sử dụng các dịch vụ bảo vệ chuyên dụng.
        </p>
      </Section>

      {/* Section 13 */}
      <Section title="13. Ứng Dụng Thực Tế Của IP Programming">
        <p>IP Programming được áp dụng rộng rãi trong các hệ thống thực tế:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 mt-2">
          <li>
            <strong>Máy Chủ Web:</strong> Sử dụng IP để `bind` socket và phục vụ
            yêu cầu HTTP qua TCP.
          </li>
          <li>
            <strong>Ứng Dụng Phân Tán:</strong> Như microservices, nơi các dịch
            vụ giao tiếp với nhau qua địa chỉ IP và port.
          </li>
          <li>
            <strong>IoT Và Mạng Di Động:</strong> IPv6 hỗ trợ kết nối hàng tỷ
            thiết bị mà không cần NAT.
          </li>
          <li>
            <strong>Công Cụ Chẩn Đoán:</strong> Lệnh `ping` sử dụng ICMP trên IP
            để kiểm tra kết nối, `traceroute` theo dõi đường đi của gói tin.
          </li>
        </ul>
      </Section>
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
