import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, CameraControls } from "@react-three/drei";
import * as THREE from "three";

const serverPos = new THREE.Vector3(-4, 0, 0);
const clientPos = new THREE.Vector3(4, 0, 0);

function ClientPC({ position }: { position: THREE.Vector3 }) {
  const textRef = useRef<any>(null!);
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group position={position}>
      {/* PC Tower */}
      <mesh position={[0.5, -0.3, 0]}>
        <boxGeometry args={[0.4, 1, 0.8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Monitor */}
      <mesh position={[-0.4, 0.1, 0]}>
        <boxGeometry args={[1.2, 0.9, 0.1]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Screen */}
      <mesh position={[-0.4, 0.1, 0.06]}>
        <boxGeometry args={[1.1, 0.8, 0.02]} />
        <meshStandardMaterial
          color="#55DDFF"
          emissive="#55DDFF"
          emissiveIntensity={0.3}
          toneMapped={false}
        />
      </mesh>
      {/* Monitor Stand */}
      <mesh position={[-0.4, -0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[-0.4, -0.7, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <Text
        ref={textRef}
        position={[0, 1, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Client
      </Text>
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
  const textRef = useRef<any>(null!);
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.quaternion.copy(state.camera.quaternion);
    }
  });

  return (
    <group position={position}>
      {/* Rack Frame */}
      <mesh>
        <boxGeometry args={[1, 2.2, 1.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      {/* Server Units */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[0, 0.8 - i * 0.5, 0.05]}>
          <boxGeometry args={[0.8, 0.4, 1.1]} />
          <meshStandardMaterial color="#444444" />
        </mesh>
      ))}
      {/* Listening Light */}
      <mesh position={[-0.35, 0.8, 0.65]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial
          color={isListening ? "#FFFF00" : "#555555"}
          emissive={isListening ? "#FFFF00" : "#555555"}
          emissiveIntensity={isListening ? 5 : 1}
          toneMapped={false}
        />
      </mesh>
      <Text
        ref={textRef}
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Server
      </Text>
    </group>
  );
}

function Packet({ step }: { step: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    // Reset position and visibility when step changes to a "packet" step
    if (step === 3 || step === 5) {
      ref.current.position.copy(clientPos);
      ref.current.visible = true;
    } else {
      ref.current.visible = false;
    }
  }, [step]);

  useFrame((_, delta) => {
    if (!ref.current || !ref.current.visible) return;

    let targetPos: THREE.Vector3 | null = null;
    if (step === 3) targetPos = serverPos; // Connect packet (SYN)
    if (step === 5) targetPos = serverPos; // Data packet

    if (targetPos) {
      ref.current.position.lerp(targetPos, 6 * delta); // Use delta for frame-rate independence
      if (ref.current.position.distanceTo(targetPos) < 0.2) {
        ref.current.visible = false;
      }
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color="#00FFFF"
        emissive="#00FFFF"
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

function ConnectionLine({ step }: { step: number }) {
  const ref = useRef<any>(null!);

  useFrame(() => {
    if (!ref.current) return;
    const targetScale = step >= 4 && step <= 6 ? 1 : 0;
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
    8,
    false
  );

  return (
    <mesh ref={ref} geometry={tubeGeo} scale={[0, 1, 1]}>
      <meshStandardMaterial
        color="#7DF9FF"
        emissive="#7DF9FF"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function IpProgrammingScene({ step }: { step: number }) {
  const cameraControlsRef = useRef<CameraControls>(null!);

  useEffect(() => {
    const controls = cameraControlsRef.current;
    if (!controls) return;

    // Adjust camera positions for new models
    switch (step) {
      case 0: // Start
        controls.setLookAt(0, 2, 12, 0, 0, 0, true);
        break;
      case 1: // socket()
        controls.setLookAt(0, 1, 10, 0, 0, 0, true);
        break;
      case 2: // bind() & listen()
        controls.setLookAt(-4, 1, 6, -4, 0, 0, true); // Focus on Server
        break;
      case 3: // connect()
        controls.setLookAt(0, 2, 12, 0, 0, 0, true); // Zoom out to see packet
        break;
      case 4: // accept()
      case 5: // data exchange
        controls.setLookAt(0, 1, 10, 0, 0, 0, true); // Focus on connection
        break;
      case 6: // close()
        controls.setLookAt(0, 2, 14, 0, 0, 0, true); // Zoom out as connection fades
        break;
      default:
        controls.setLookAt(0, 2, 12, 0, 0, 0, true);
        break;
    }
  }, [step]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <color attach="background" args={["#111827"]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />

      <ClientPC position={clientPos} />
      <ServerRack position={serverPos} isListening={step >= 2 && step <= 6} />

      <Packet step={step} />
      <ConnectionLine step={step} />

      <gridHelper args={[100, 100, "#333", "#222"]} position={[0, -1, 0]} />
    </>
  );
}
