import {
  ClientPCIcon,
  CloudIcon,
  DnsServerIcon,
  PacketIcon,
  ServerIcon,
  WhoisDBIcon,
} from "./ToolIcons";

type ToolType = "ping" | "dns-lookup" | "port-scan" | "whois";
type Status = "idle" | "loading" | "success" | "error";

interface ToolVisualizationProps {
  toolType: ToolType;
  status: Status;
}

const toolConfig = {
  ping: {
    label: "Target Server",
    Icon: ServerIcon,
  },
  "dns-lookup": {
    label: "DNS Server",
    Icon: DnsServerIcon,
  },
  "port-scan": {
    label: "Target Server",
    Icon: ServerIcon,
  },
  whois: {
    label: "WHOIS Registry",
    Icon: WhoisDBIcon,
  },
};

export default function ToolVisualization({
  toolType,
  status,
}: ToolVisualizationProps) {
  const config = toolConfig[toolType];
  const isLoading = status === "loading";

  return (
    <div className="relative h-40 bg-black/30 rounded-lg flex items-center justify-between px-4 sm:px-8 py-4 my-6 overflow-hidden border border-gray-700">
      {/* Client */}
      <div className="flex flex-col items-center gap-2 text-center w-24">
        <ClientPCIcon />
        <span className="text-sm font-semibold">Your PC</span>
      </div>

      {/* Internet Cloud */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CloudIcon />
      </div>

      {/* Packets */}
      {/* Packet from Client to Server */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out ${
          isLoading && toolType !== "port-scan"
            ? "left-[calc(50%-48px)] opacity-100"
            : "left-1/4 opacity-0"
        }`}
      >
        <PacketIcon type={toolType} direction="out" />
      </div>

      {/* Packet from Server to Client (for ping) */}
      {toolType === "ping" && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out delay-700 ${
            isLoading
              ? "right-[calc(50%-48px)] opacity-100"
              : "right-1/4 opacity-0"
          }`}
        >
          <PacketIcon type="ping" direction="in" />
        </div>
      )}

      {/* Target */}
      <div className="flex flex-col items-center gap-2 text-center w-24">
        <div className="relative">
          <config.Icon />
          {isLoading && toolType === "port-scan" && (
            <div className="absolute inset-0 rounded-full animate-ping bg-red-500/50"></div>
          )}
        </div>
        <span className="text-sm font-semibold">{config.label}</span>
      </div>

      {/* Status Overlay */}
      <div
        className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center
        ${status === "success" ? "bg-green-500/20" : ""}
        ${status === "error" ? "bg-red-500/20" : ""}
        ${status === "idle" || isLoading ? "opacity-0" : "opacity-100"}
      `}
      >
        {status === "success" && (
          <span className="text-2xl font-bold text-green-300">Success!</span>
        )}
        {status === "error" && (
          <span className="text-2xl font-bold text-red-300">Error!</span>
        )}
      </div>
    </div>
  );
}
