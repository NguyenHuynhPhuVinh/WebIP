"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import IpProgrammingScene from "@/components/scene/IpProgrammingScene";

const steps = [
  {
    title: "Bước 0: Khởi đầu",
    description: "Không gian mạng với Client và Server ở trạng thái chờ.",
  },
  {
    title: "Bước 1: `socket()`",
    description:
      "Cả Client và Server đều tạo ra một điểm cuối giao tiếp (socket) để chuẩn bị cho việc kết nối.",
  },
  {
    title: "Bước 2: `bind()` & `listen()`",
    description:
      "Server gắn socket vào một địa chỉ IP và cổng, sau đó chuyển sang trạng thái lắng nghe, sẵn sàng nhận kết nối.",
  },
  {
    title: "Bước 3: `connect()` (Gửi SYN)",
    description:
      "Client bắt đầu quá trình kết nối bằng cách gửi một gói tin đồng bộ (SYN) đến Server.",
  },
  {
    title: "Bước 4: `accept()` (Phản hồi SYN-ACK)",
    description:
      "Server nhận gói SYN, và gửi lại một gói tin xác nhận đồng bộ (SYN-ACK) để báo cho Client rằng nó đã sẵn sàng.",
  },
  {
    title: "Bước 5: `accept()` (Gửi ACK & Hoàn tất kết nối)",
    description:
      "Client nhận SYN-ACK và gửi lại một gói tin xác nhận (ACK). Kết nối TCP được thiết lập thành công!",
  },
  {
    title: "Bước 6: Trao đổi dữ liệu",
    description:
      "Client gửi một gói tin dữ liệu đến Server, và Server xử lý rồi gửi lại một gói tin phản hồi.",
  },
  {
    title: "Bước 7: `close()`",
    description:
      "Sau khi hoàn tất, kết nối được đóng lại, và các socket được giải phóng.",
  },
  { title: "Hoàn tất", description: "Nhấn 'Chạy lại' để bắt đầu lại." },
];

export default function Guide3DPage() {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleReset = () => setStep(0);

  const currentStep = steps[step];

  return (
    <div className="relative w-full h-[calc(100vh-200px)] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 2, 12], fov: 50 }}>
        <Suspense fallback={null}>
          <IpProgrammingScene step={step} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-center">
        <div className="max-w-3xl mx-auto bg-gray-900/50 backdrop-blur-md p-4 rounded-lg border border-gray-700">
          <h1 className="text-xl font-bold text-blue-400">
            {currentStep.title}
          </h1>
          <p className="text-gray-300 mt-1">{currentStep.description}</p>
        </div>
        <div className="mt-4">
          {step === steps.length - 1 ? (
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Chạy lại
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              Tiếp theo
            </button>
          )}
        </div>
      </div>

      <div className="absolute top-4 left-4 text-white font-bold bg-black/30 p-2 rounded">
        3D IP Programming
      </div>
    </div>
  );
}
