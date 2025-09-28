"use client";

import { useState } from "react";
import {
  ServerIcon,
  ClientIcon,
  SocketIcon,
  ListenIcon,
  PacketIcon,
  CheckIcon,
} from "./GuideIcons";

const steps = [
  {
    title: "Bước 0: Trạng thái ban đầu",
    description:
      "Hệ thống bao gồm một Máy chủ (Server) và một Máy khách (Client), cả hai đều đang chờ để bắt đầu giao tiếp.",
  },
  {
    title: "Bước 1: `socket()` - Tạo Socket",
    description:
      "Cả Server và Client đều gọi hàm `socket()` để tạo một điểm cuối giao tiếp (socket). Đây là bước khởi đầu để thiết lập kênh truyền.",
  },
  {
    title: "Bước 2: `bind()` - Gắn địa chỉ",
    description:
      "Server gọi hàm `bind()` để gắn socket của nó với một địa chỉ IP và số hiệu cổng (port) cụ thể (ví dụ: 127.0.0.1:8080). Từ giờ, Server sẽ lắng nghe tại địa chỉ này.",
  },
  {
    title: "Bước 3: `listen()` - Lắng nghe",
    description:
      "Server gọi hàm `listen()` để chuyển socket vào trạng thái sẵn sàng chấp nhận kết nối từ Client. Socket sẽ ở trạng thái chờ.",
  },
  {
    title: "Bước 4: `connect()` - Kết nối",
    description:
      "Client gọi hàm `connect()`, gửi một yêu cầu kết nối (gói tin SYN) đến địa chỉ IP và cổng mà Server đang lắng nghe.",
  },
  {
    title: "Bước 5: `accept()` - Chấp nhận kết nối",
    description:
      "Server nhận yêu cầu, gọi hàm `accept()` để chấp nhận. Một kết nối TCP được thiết lập (bắt tay 3 bước). Một kênh giao tiếp hai chiều đã sẵn sàng.",
  },
  {
    title: "Bước 6: Gửi/Nhận Dữ liệu (Client -> Server)",
    description:
      "Client sử dụng kết nối để gửi dữ liệu (ví dụ: một yêu cầu HTTP) đến Server.",
  },
  {
    title: "Bước 7: Xử lý và Phản hồi (Server -> Client)",
    description:
      "Server nhận, xử lý dữ liệu và gửi một gói tin phản hồi trở lại cho Client.",
  },
  {
    title: "Bước 8: `close()` - Đóng kết nối",
    description:
      "Sau khi hoàn tất trao đổi, một trong hai bên (hoặc cả hai) sẽ gọi hàm `close()` để giải phóng socket và chấm dứt kết nối.",
  },
  {
    title: "Hoàn tất!",
    description: "Quy trình đã kết thúc. Nhấn 'Chạy lại' để xem lại từ đầu.",
  },
];

export default function IpProgrammingGuide() {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const handleReset = () => setStep(0);

  const currentStep = steps[step];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
      {/* Visualization Area */}
      <div className="relative h-64 bg-black/20 rounded-lg flex items-center justify-around p-4 overflow-hidden">
        {/* Server */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <ServerIcon />
          <span className="font-bold text-lg">Server</span>
          <div
            className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ${
              step >= 1 ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: "16.67%" }}
          >
            <div className="relative">
              <SocketIcon listening={step === 3} />
              {step >= 2 && (
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-gray-600 px-2 py-0.5 rounded font-mono whitespace-nowrap">
                  127.0.0.1:8080
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Client */}
        <div className="flex flex-col items-center gap-3 w-1/3">
          <ClientIcon />
          <span className="font-bold text-lg">Client</span>
          <div
            className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-500 ${
              step >= 1 ? "opacity-100" : "opacity-0"
            }`}
            style={{ right: "16.67%" }}
          >
            <SocketIcon />
          </div>
        </div>

        {/* Connection Line */}
        <div
          className={`absolute top-1/2 left-1/3 w-1/3 h-1 bg-green-500/50 transition-transform duration-500 origin-center ${
            step >= 5 ? "scale-x-100" : "scale-x-0"
          }`}
        />

        {/* Connect Packet (SYN) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
            step === 4
              ? "opacity-100 left-[calc(16.67%+24px)]"
              : "opacity-0 left-[calc(83.33%-24px)]"
          }`}
        >
          <PacketIcon />
        </div>

        {/* Data Packet (Client -> Server) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
            step === 6
              ? "opacity-100 left-[calc(16.67%+24px)]"
              : "opacity-0 left-[calc(83.33%-24px)]"
          }`}
        >
          <PacketIcon data />
        </div>

        {/* Response Packet (Server -> Client) */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
            step === 7
              ? "opacity-100 right-[calc(16.67%+24px)]"
              : "opacity-0 right-[calc(83.33%-24px)]"
          }`}
        >
          <PacketIcon data />
        </div>

        {/* Closed state */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
            step === 8 || step === 9
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="text-center">
            <CheckIcon />
            <p className="text-2xl font-bold mt-2">Đã đóng kết nối</p>
          </div>
        </div>
      </div>

      {/* Explanation Area */}
      <div className="text-center p-4 border border-gray-700 rounded-lg min-h-[100px]">
        <h3 className="text-xl font-bold text-blue-400">{currentStep.title}</h3>
        <p className="text-gray-300 mt-2">{currentStep.description}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={step === 0}
          className="px-6 py-2 rounded-lg font-semibold bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          Quay lại
        </button>
        <div className="font-mono text-sm text-gray-400">
          {step} / {steps.length - 1}
        </div>
        {step === steps.length - 1 ? (
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Chạy lại
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Tiếp theo
          </button>
        )}
      </div>
    </div>
  );
}
