import IpProgrammingGuide from "@/components/IpProgrammingGuide";

export default function GuidePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Hướng Dẫn Trực Quan IP Programming
        </h1>
        <p className="text-gray-400 mt-2 max-w-3xl mx-auto">
          Khám phá cách Client và Server giao tiếp với nhau qua từng bước của
          Socket API. Nhấn "Tiếp theo" để bắt đầu mô phỏng.
        </p>
      </div>

      <IpProgrammingGuide />
    </div>
  );
}
