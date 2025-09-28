"use client";

import { Suspense, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  Box,
  Sphere,
  Cylinder,
  Torus,
  MeshReflectorMaterial,
  Float,
  Trail,
  Environment,
  Stars,
  Cloud,
  useTexture,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

// Enhanced Server Model
function ServerRack({ position, isActive, hasSocket, isListening }: any) {
  const meshRef = useRef<THREE.Group>(null!);
  const lightsRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (meshRef.current && isActive) {
      meshRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 2) * 0.02;
    }

    lightsRef.current.forEach((light, i) => {
      if (light && isActive) {
        const material = light.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity =
          Math.sin(clock.elapsedTime * 3 + i) * 0.5 + 1;
      }
    });
  });

  return (
    <group ref={meshRef} position={position}>
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.1}
        enabled={isActive}
      >
        {/* Server Label */}
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
        >
          SERVER
        </Text>

        {/* Main Rack Structure */}
        <Box args={[1.5, 3, 1.8]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#0a0a0a"
            roughness={0.3}
            metalness={0.8}
          />
        </Box>

        {/* Server Units with Details */}
        {[...Array(5)].map((_, i) => (
          <group key={i} position={[0, 1.2 - i * 0.6, 0]}>
            {/* Server Unit */}
            <Box args={[1.3, 0.5, 1.6]} position={[0, 0, 0.05]}>
              <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.4}
                metalness={0.7}
              />
            </Box>

            {/* Front Panel Details */}
            <Box args={[1.25, 0.45, 0.02]} position={[0, 0, 0.82]}>
              <meshStandardMaterial
                color="#2a2a2a"
                roughness={0.5}
                metalness={0.6}
              />
            </Box>

            {/* Status LEDs */}
            {[...Array(3)].map((_, j) => (
              <mesh
                key={j}
                ref={(el) => el && (lightsRef.current[i * 3 + j] = el)}
                position={[-0.4 + j * 0.15, 0, 0.85]}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial
                  color={
                    isActive
                      ? j === 0
                        ? "#00ff00"
                        : j === 1
                        ? "#ffaa00"
                        : "#0088ff"
                      : "#333"
                  }
                  emissive={
                    isActive
                      ? j === 0
                        ? "#00ff00"
                        : j === 1
                        ? "#ffaa00"
                        : "#0088ff"
                      : "#000"
                  }
                  emissiveIntensity={isActive ? 2 : 0}
                  toneMapped={false}
                />
              </mesh>
            ))}

            {/* Ventilation Grills */}
            {[...Array(8)].map((_, k) => (
              <Box
                key={k}
                args={[0.02, 0.35, 0.02]}
                position={[0.5, 0, 0.6 - k * 0.15]}
              >
                <meshStandardMaterial color="#111" />
              </Box>
            ))}
          </group>
        ))}

        {/* Network Socket */}
        {hasSocket && (
          <group position={[1, 0, 0]}>
            <Torus args={[0.3, 0.08, 16, 32]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial
                color="#ffd700"
                emissive="#ffd700"
                emissiveIntensity={isListening ? 3 : 1}
                roughness={0.2}
                metalness={0.8}
                toneMapped={false}
              />
            </Torus>
            {isListening && (
              <Torus args={[0.5, 0.01, 16, 32]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial
                  color="#ffd700"
                  emissive="#ffd700"
                  emissiveIntensity={2}
                  transparent
                  opacity={0.3}
                  toneMapped={false}
                />
              </Torus>
            )}
          </group>
        )}
      </Float>
    </group>
  );
}

// Enhanced Client Model
function ClientComputer({ position, isActive, hasSocket }: any) {
  const groupRef = useRef<THREE.Group>(null!);
  const screenRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (screenRef.current && isActive) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = Math.sin(clock.elapsedTime * 2) * 0.3 + 1.5;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.1}
        enabled={isActive}
      >
        {/* Client Label */}
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
        >
          CLIENT
        </Text>

        {/* Monitor */}
        <group>
          {/* Monitor Frame */}
          <Box args={[2, 1.5, 0.1]} position={[0, 0.5, 0]}>
            <meshStandardMaterial
              color="#111"
              roughness={0.3}
              metalness={0.8}
            />
          </Box>

          {/* Screen */}
          <mesh ref={screenRef} position={[0, 0.5, 0.06]}>
            <planeGeometry args={[1.8, 1.3]} />
            <meshStandardMaterial
              color="#00ddff"
              emissive="#00aaff"
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>

          {/* Screen Content Overlay */}
          {isActive && (
            <group position={[0, 0.5, 0.07]}>
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  args={[1.6, 0.05, 0.01]}
                  position={[0, 0.4 - i * 0.2, 0]}
                >
                  <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.5}
                    transparent
                    opacity={0.3}
                  />
                </Box>
              ))}
            </group>
          )}

          {/* Stand Neck */}
          <Cylinder args={[0.15, 0.15, 0.6]} position={[0, -0.5, 0]}>
            <meshStandardMaterial
              color="#222"
              roughness={0.5}
              metalness={0.7}
            />
          </Cylinder>

          {/* Stand Base */}
          <Cylinder args={[0.5, 0.6, 0.05]} position={[0, -0.8, 0]}>
            <meshStandardMaterial
              color="#333"
              roughness={0.4}
              metalness={0.6}
            />
          </Cylinder>

          {/* Keyboard */}
          <Box args={[1.2, 0.05, 0.5]} position={[0, -0.85, 0.8]}>
            <meshStandardMaterial
              color="#1a1a1a"
              roughness={0.6}
              metalness={0.4}
            />
          </Box>

          {/* Mouse */}
          <Box args={[0.15, 0.03, 0.2]} position={[0.8, -0.85, 0.8]}>
            <meshStandardMaterial
              color="#2a2a2a"
              roughness={0.5}
              metalness={0.3}
            />
          </Box>
        </group>

        {/* Network Socket */}
        {hasSocket && (
          <group position={[-1.2, 0, 0]}>
            <Torus args={[0.3, 0.08, 16, 32]} rotation={[0, 0, Math.PI / 2]}>
              <meshStandardMaterial
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={2}
                roughness={0.2}
                metalness={0.8}
                toneMapped={false}
              />
            </Torus>
          </group>
        )}
      </Float>
    </group>
  );
}

// Network Packet Component
function NetworkPacket({ from, to, type, onComplete }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<any>(null!);
  const progress = useRef(0);

  const color = useMemo(() => {
    switch (type) {
      case "SYN":
        return "#00ffff";
      case "SYN-ACK":
        return "#ff00ff";
      case "ACK":
        return "#00ff00";
      case "DATA":
        return "#ffaa00";
      case "RESPONSE":
        return "#00aaff";
      default:
        return "#ffffff";
    }
  }, [type]);

  useFrame((_, delta) => {
    progress.current += delta * 0.5;

    if (progress.current <= 1) {
      const x = THREE.MathUtils.lerp(from[0], to[0], progress.current);
      const y = from[1] + Math.sin(progress.current * Math.PI) * 1.5;
      const z = THREE.MathUtils.lerp(from[2], to[2], progress.current);

      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.x += delta * 5;
      meshRef.current.rotation.y += delta * 3;
    } else {
      onComplete();
    }
  });

  return (
    <Trail
      width={3}
      length={10}
      color={color}
      attenuation={(t) => t * t}
      target={meshRef}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

// Connection Line Component
function ConnectionLine({ active, from, to }: any) {
  const lineRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (lineRef.current && active) {
      const material = lineRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = Math.sin(clock.elapsedTime * 3) * 0.5 + 1.5;
      material.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.2;
    }
  });

  const curve = useMemo(() => {
    const points = [
      new THREE.Vector3(...from),
      new THREE.Vector3((from[0] + to[0]) / 2, 0.5, 0),
      new THREE.Vector3(...to),
    ];
    return new THREE.CatmullRomCurve3(points);
  }, [from, to]);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.05, 8, false);
  }, [curve]);

  if (!active) return null;

  return (
    <mesh ref={lineRef} geometry={tubeGeometry}>
      <meshStandardMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={1.5}
        transparent
        opacity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

// Main Scene Component
export default function IpProgrammingScene({ step }: { step: number }) {
  const [packets, setPackets] = useState<any[]>([]);
  const cameraRef = useRef<any>(null!);

  const serverPos: [number, number, number] = [-5, 0, 0];
  const clientPos: [number, number, number] = [5, 0, 0];

  // Add packet based on step
  useMemo(() => {
    const newPackets = [];

    if (step === 3)
      newPackets.push({
        id: "syn",
        type: "SYN",
        from: clientPos,
        to: serverPos,
      });
    if (step === 4)
      newPackets.push({
        id: "synack",
        type: "SYN-ACK",
        from: serverPos,
        to: clientPos,
      });
    if (step === 5)
      newPackets.push({
        id: "ack",
        type: "ACK",
        from: clientPos,
        to: serverPos,
      });
    if (step === 6)
      newPackets.push({
        id: "data",
        type: "DATA",
        from: clientPos,
        to: serverPos,
      });
    if (step === 7)
      newPackets.push({
        id: "response",
        type: "RESPONSE",
        from: serverPos,
        to: clientPos,
      });

    setPackets(newPackets);
  }, [step]);

  const handlePacketComplete = (id: string) => {
    setPackets((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 5, 15]}
        fov={50}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight
        position={[0, 5, 0]}
        intensity={50}
        color="#00aaff"
        decay={2}
      />
      <pointLight
        position={[-5, 2, 0]}
        intensity={30}
        color="#ff00ff"
        decay={2}
      />
      <pointLight
        position={[5, 2, 0]}
        intensity={30}
        color="#00ffff"
        decay={2}
      />

      {/* Environment */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <fog attach="fog" args={["#0a0a0a", 10, 30]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#101010"
          metalness={0.8}
          roughness={0.5}
          mirror={0}
        />
      </mesh>

      {/* Grid */}
      <gridHelper args={[50, 50, "#222", "#111"]} position={[0, -1.49, 0]} />

      {/* Server */}
      <ServerRack
        position={serverPos}
        isActive={step >= 1}
        hasSocket={step >= 1}
        isListening={step === 3 || step === 4}
      />

      {/* Client */}
      <ClientComputer
        position={clientPos}
        isActive={step >= 1}
        hasSocket={step >= 1}
      />

      {/* Connection Line */}
      <ConnectionLine
        active={step >= 5 && step <= 7}
        from={clientPos}
        to={serverPos}
      />

      {/* Packets */}
      {packets.map((packet) => (
        <NetworkPacket
          key={packet.id}
          {...packet}
          onComplete={() => handlePacketComplete(packet.id)}
        />
      ))}

      {/* Status Text */}
      {step >= 8 && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <Text
            position={[0, 3, 0]}
            fontSize={0.8}
            color="#00ff00"
            anchorX="center"
          >
            CONNECTION CLOSED
          </Text>
        </Float>
      )}

      {/* Post Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={0.5} levels={9} mipmapBlur />
        <ChromaticAberration offset={[0.001, 0.001]} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  );
}

// Step data
const steps = [
  {
    title: "🚀 Khởi động hệ thống",
    description:
      "Hệ thống mạng với Client và Server đang ở trạng thái chờ. Sẵn sàng thiết lập kết nối TCP/IP.",
    code: "// Trạng thái ban đầu\n// Client và Server chờ lệnh",
  },
  {
    title: "🔌 Bước 1: socket()",
    description:
      "Cả Client và Server tạo socket - điểm cuối giao tiếp mạng. Socket như một 'ổ cắm' ảo cho kết nối.",
    code: "int sockfd = socket(AF_INET, SOCK_STREAM, 0);\n// AF_INET: IPv4\n// SOCK_STREAM: TCP",
  },
  {
    title: "📍 Bước 2: bind() & listen()",
    description:
      "Server gán socket với IP:Port cụ thể (127.0.0.1:8080) và chuyển sang trạng thái lắng nghe kết nối.",
    code: "bind(sockfd, &server_addr, sizeof(server_addr));\nlisten(sockfd, 5); // Queue up to 5 connections",
  },
  {
    title: "📤 Bước 3: connect() - Gửi SYN",
    description:
      "Client gửi gói tin SYN (Synchronize) đến Server để bắt đầu bắt tay 3 bước TCP.",
    code: "connect(client_sock, &server_addr, sizeof(server_addr));\n// Sending SYN packet...",
  },
  {
    title: "📥 Bước 4: accept() - Phản hồi SYN-ACK",
    description:
      "Server nhận SYN, gửi lại SYN-ACK (Synchronize-Acknowledge) xác nhận sẵn sàng kết nối.",
    code: "int new_sock = accept(server_sock, &client_addr, &addr_len);\n// Sending SYN-ACK packet...",
  },
  {
    title: "✅ Bước 5: Hoàn tất kết nối - ACK",
    description:
      "Client gửi ACK cuối cùng. Kết nối TCP được thiết lập thành công! Kênh truyền 2 chiều đã sẵn sàng.",
    code: "// TCP 3-way handshake complete!\n// Connection established",
  },
  {
    title: "📨 Bước 6: Trao đổi dữ liệu",
    description:
      "Client gửi dữ liệu (HTTP request, command, v.v.) đến Server qua kết nối đã thiết lập.",
    code: 'send(sock, "GET / HTTP/1.1\\r\\n", 16, 0);\nrecv(sock, buffer, sizeof(buffer), 0);',
  },
  {
    title: "💬 Bước 7: Server phản hồi",
    description:
      "Server xử lý request và gửi response về cho Client. Giao tiếp 2 chiều hoàn tất.",
    code: "send(client_sock, response, strlen(response), 0);\n// Data exchange complete",
  },
  {
    title: "🔒 Bước 8: close()",
    description:
      "Kết nối được đóng lại, socket được giải phóng. Quá trình hoàn tất!",
    code: "close(sockfd);\n// Connection terminated",
  },
  {
    title: "🎉 Hoàn thành!",
    description:
      "Bạn đã khám phá quy trình TCP/IP Socket Programming từ A-Z. Nhấn 'Chạy lại' để xem lại.",
    code: "// Mission Complete!\n// Ready for next connection...",
  },
];

export function Enhanced3DGuide() {
  const [step, setStep] = useState(0);
  const currentStep = steps[step];

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const handleReset = () => setStep(0);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas>
          <Suspense fallback={null}>
            <IpProgrammingScene step={step} />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="text-white">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                3D Socket Programming
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Hướng dẫn trực quan TCP/IP
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">
                {step + 1}/{steps.length}
              </div>
              <div className="text-xs text-gray-400">Bước hiện tại</div>
            </div>
          </div>
        </div>

        {/* Bottom Control Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-auto">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Step Info */}
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-2">
                {currentStep.title}
              </h2>
              <p className="text-gray-300 mb-4">{currentStep.description}</p>

              {/* Code Snippet */}
              <div className="bg-black/50 rounded-lg p-3 font-mono text-sm">
                <pre className="text-green-400">{currentStep.code}</pre>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={step === 0}
                className="px-6 py-3 rounded-xl font-semibold bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 disabled:cursor-not-allowed transition-all duration-200 text-white min-w-[120px]"
              >
                ← Quay lại
              </button>

              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === step
                        ? "w-8 bg-gradient-to-r from-blue-400 to-purple-400"
                        : i < step
                        ? "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>

              {step === steps.length - 1 ? (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 min-w-[120px] shadow-lg shadow-green-500/30"
                >
                  🔄 Chạy lại
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-200 min-w-[120px] shadow-lg shadow-blue-500/30"
                >
                  Tiếp theo →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
