"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import IpProgrammingScene from "@/components/scene/IpProgrammingScene";

const steps = [
  {
    title: "Khởi đầu",
    description: "Không gian mạng với Client và Server ở trạng thái chờ.",
  },
  {
    title: "Bước 1: `socket()`",
    description: "Cả hai bên tạo ra các điểm cuối giao tiếp (socket).",
  },
  {
    title: "Bước 2: `bind()` & `listen()`",
    description:
      "Server gắn vào một địa chỉ và bắt đầu phát tín hiệu lắng nghe.",
  },
  {
    title: "Bước 3: `connect()`",
    description:
      "Client gửi một gói tin kết nối (SYN) xuyên qua không gian mạng.",
  },
  {
    title: "Bước 4: `accept()`",
    description:
      "Server chấp nhận, một kênh năng lượng (kết nối) được hình thành.",
  },
  {
    title: "Bước 5: Trao đổi dữ liệu",
    description: "Các gói tin dữ liệu được truyền qua kênh năng lượng.",
  },
  {
    title: "Bước 6: `close()`",
    description: "Kênh năng lượng mờ dần và kết nối được đóng lại.",
  },
  { title: "Hoàn tất", description: "Nhấn 'Chạy lại' để bắt đầu lại." },
];

export default function Guide3DPage() {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleReset = () => setStep(0);

  const currentStep = steps[step];

  return (
    <div className="relative w-full h-[calc(100vh-200px)] bg-black rounded-lg overflow-hidden">
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
