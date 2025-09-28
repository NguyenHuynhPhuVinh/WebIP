import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Stars,
  Text,
  CameraControls,
  Sparkles,
  Trail,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const serverPos = new THREE.Vector3(-4, 0, 0);
const clientPos = new THREE.Vector3(4, 0, 0);

function Node({
  position,
  label,
  color,
  isListening,
}: {
  position: THREE.Vector3;
  label: string;
  color: string;
  isListening?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<any>(null!);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.2;
    textRef.current.quaternion.copy(state.camera.quaternion); // Make text face camera
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {isListening && (
        <mesh scale={[1, 1, 1]}>
          <torusGeometry args={[0.8, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#FFFF00"
            emissive="#FFFF00"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </mesh>
      )}
      <Text
        ref={textRef}
        position={[0, 1, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Packet({ step }: { step: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (step === 3 || step === 5) {
      ref.current.position.copy(clientPos);
      ref.current.visible = true;
      if (trailRef.current) trailRef.current.visible = true;
    } else {
      ref.current.visible = false;
      if (trailRef.current) trailRef.current.visible = false;
    }
  }, [step]);

  useFrame(() => {
    if (!ref.current.visible) return;

    if (step === 3) {
      // Connect packet
      ref.current.position.lerp(serverPos, 0.05);
    }
    if (step === 5) {
      // Data packet
      const midPoint = new THREE.Vector3().lerpVectors(
        clientPos,
        serverPos,
        0.5
      );
      const pathProgress = Math.sin(Date.now() * 0.002) * 0.5 + 0.5; // oscillate
      ref.current.position.lerpVectors(clientPos, serverPos, pathProgress);
      ref.current.position.y = Math.sin(pathProgress * Math.PI) * 1.5;
    }
  });

  return (
    <Trail width={0.5} length={4} color={"#00FFFF"} attenuation={(t) => t * t}>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#00FFFF"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}

function ConnectionLine({ step }: { step: number }) {
  const ref = useRef<any>(null!);

  useFrame(() => {
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
        emissiveIntensity={3}
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

    switch (step) {
      case 0:
        controls.setLookAt(0, 2, 12, 0, 0, 0, true);
        break;
      case 1:
        controls.setLookAt(0, 1, 8, 0, 0, 0, true);
        break;
      case 2:
        controls.setLookAt(-4, 1, 5, -4, 0, 0, true); // Focus on Server
        break;
      case 3:
        controls.setLookAt(0, 3, 10, 0, 0, 0, true); // Zoom out to see packet travel
        break;
      case 4:
      case 5:
        controls.setLookAt(0, 0, 9, 0, 0, 0, true); // Focus on connection
        break;
      case 6:
        controls.setLookAt(0, 2, 14, 0, 0, 0, true); // Zoom out as connection fades
        break;
    }
  }, [step]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} />
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} intensity={50} color="lightblue" />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Sparkles count={100} scale={8} size={6} speed={0.4} color="#FFD700" />

      <Node position={clientPos} label="Client" color="#9370DB" />
      <Node
        position={serverPos}
        label="Server"
        color="#1E90FF"
        isListening={step >= 2 && step <= 6}
      />

      <Packet step={step} />
      <ConnectionLine step={step} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}
