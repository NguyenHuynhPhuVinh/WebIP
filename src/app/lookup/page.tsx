import SearchComponent from "@/components/SearchComponent";

export default function LookupPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-16">
      <h1 className="text-4xl font-bold mb-4">Tra cứu Thông tin IP</h1>
      <p className="text-gray-400 max-w-lg mb-8">
        Nhập một địa chỉ IPv4, IPv6 hoặc tên miền để xem thông tin chi tiết về
        vị trí, nhà mạng và nhiều hơn nữa.
      </p>
      <SearchComponent />
    </div>
  );
}
