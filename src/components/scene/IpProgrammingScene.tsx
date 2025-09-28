import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, CameraControls, Torus } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const serverPos = new THREE.Vector3(-4.5, 0, 0);
const clientPos = new THREE.Vector3(4.5, 0, 0);

function ClientPC({ position }: { position: THREE.Vector3 }) {
  return (
    <group position={position}>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
      >
        Client
      </Text>
      {/* Monitor */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.5, 1, 0.1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.35, 0.06]}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshStandardMaterial color="#55DDFF" emissive="#55DDFF" />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.5, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.4, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

function ServerRack({
  position,
  isListening,
}: {
  position: THREE.Vector3;
  isListening?: boolean;
}) {
  const lightRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (isListening && lightRef.current) {
      (
        lightRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = Math.sin(clock.elapsedTime * 5) * 2 + 3;
    }
  });
  return (
    <group position={position}>
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
      >
        Server
      </Text>
      {/* Rack */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 2.2, 1.5]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Server units */}
      {[...Array(4)].map((_, i) => (
        <group key={i}>
          <mesh position={[0, 0.8 - i * 0.5, 0.05]}>
            <boxGeometry args={[1, 0.4, 1.4]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh
            ref={i === 0 ? lightRef : null}
            position={[-0.4, 0.8 - i * 0.5, 0.76]}
          >
            <circleGeometry args={[0.03, 16]} />
            <meshStandardMaterial
              color={isListening ? "yellow" : "gray"}
              emissive={isListening ? "yellow" : "gray"}
              emissiveIntensity={isListening ? 5 : 0.1}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Socket({ isVisible, position, isListening }: any) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (isListening) {
      const scale = 1 + Math.sin(clock.elapsedTime * 3) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <Torus
      ref={ref}
      args={[0.5, 0.05, 16, 100]}
      position={position}
      rotation-x={Math.PI / 2}
      visible={isVisible}
    >
      <meshStandardMaterial
        color="yellow"
        emissive="yellow"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </Torus>
  );
}

function Packet({ packet, onComplete }: any) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (ref.current.position.distanceTo(packet.to) > 0.1) {
      ref.current.position.lerp(packet.to, delta * 5);
    } else {
      onComplete(packet.id);
    }
  });

  return (
    <mesh ref={ref} position={packet.from}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color={packet.color}
        emissive={packet.color}
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

function ConnectionLine({ step }: { step: number }) {
  const ref = useRef<any>(null!);

  useFrame(() => {
    const targetScale = step >= 5 && step <= 6 ? 1 : 0;
    ref.current.scale.x = THREE.MathUtils.lerp(
      ref.current.scale.x,
      targetScale,
      0.1
    );
  });

  const points = [clientPos, serverPos];
  const tubeGeo = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points),
    64,
    0.05,
    8
  );

  return (
    <mesh ref={ref} geometry={tubeGeo} scale={[0, 1, 1]}>
      <meshStandardMaterial
        color="#7DF9FF"
        emissive="#7DF9FF"
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

let packetId = 0;

export default function IpProgrammingScene({ step }: { step: number }) {
  const cameraControlsRef = useRef<CameraControls>(null!);
  const [packets, setPackets] = useState<any[]>([]);

  const addPacket = (from: THREE.Vector3, to: THREE.Vector3, color: string) => {
    setPackets((p) => [...p, { id: packetId++, from, to, color }]);
  };

  const handlePacketComplete = (id: number) => {
    setPackets((p) => p.filter((packet) => packet.id !== id));
  };

  useEffect(() => {
    const controls = cameraControlsRef.current;
    if (!controls) return;

    // Reset packets on step change to avoid artifacts
    setPackets([]);

    switch (step) {
      case 0:
        controls.setLookAt(0, 2, 12, 0, 0, 0, true);
        break;
      case 1:
        controls.setLookAt(0, 1, 10, 0, 0, 0, true);
        break;
      case 2:
        controls.setLookAt(-4.5, 1, 6, -4.5, 0, 0, true); // Focus Server
        break;
      case 3:
        controls.setLookAt(0, 2, 12, 0, 0, 0, true); // See SYN packet
        addPacket(clientPos, serverPos, "#00FFFF"); // SYN
        break;
      case 4:
        controls.setLookAt(0, 2, 12, 0, 0, 0, true); // See SYN-ACK
        addPacket(serverPos, clientPos, "#FF00FF"); // SYN-ACK
        break;
      case 5:
        controls.setLookAt(0, 1, 11, 0, 0, 0, true); // See ACK and connection
        addPacket(clientPos, serverPos, "#00FFFF"); // ACK
        break;
      case 6:
        controls.setLookAt(0, 1, 11, 0, 0, 0, true); // Data exchange
        addPacket(clientPos, serverPos, "#00FF00"); // Data
        setTimeout(() => addPacket(serverPos, clientPos, "#FFFF00"), 1000); // Response
        break;
      case 7:
        controls.setLookAt(0, 2, 14, 0, 0, 0, true); // Close
        break;
    }
  }, [step]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <color attach="background" args={["#1a2635"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <pointLight
        position={[0, 2, 0]}
        intensity={30}
        color="#7DF9FF"
        decay={2}
      />

      <gridHelper args={[100, 100, "#333", "#222"]} position={[0, -0.6, 0]} />

      <ClientPC position={clientPos} />
      <ServerRack position={serverPos} isListening={step >= 2 && step <= 7} />

      <Socket
        isVisible={step >= 1 && step < 8}
        position={clientPos.clone().add(new THREE.Vector3(-1.2, 0, 0))}
      />
      <Socket
        isVisible={step >= 1 && step < 8}
        position={serverPos.clone().add(new THREE.Vector3(1.2, 0, 0))}
        isListening={step >= 2 && step < 5}
      />

      {packets.map((p) => (
        <Packet key={p.id} packet={p} onComplete={handlePacketComplete} />
      ))}
      <ConnectionLine step={step} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
}
