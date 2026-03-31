"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

function PlaceholderChair({ autoRotate = true }: { autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.8, 0.06, 0.7]} />
        <meshStandardMaterial color="#D4C5B2" roughness={0.4} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.85, -0.3]} castShadow>
        <boxGeometry args={[0.8, 0.75, 0.06]} />
        <meshStandardMaterial color="#D4C5B2" roughness={0.4} />
      </mesh>
      {/* Legs */}
      {[
        [-0.33, 0.22, 0.25],
        [0.33, 0.22, 0.25],
        [-0.33, 0.22, -0.25],
        [0.33, 0.22, -0.25],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.44, 8]} />
          <meshStandardMaterial color="#5C4033" roughness={0.3} />
        </mesh>
      ))}
      {/* Armrests */}
      {[-0.42, 0.42].map((x, i) => (
        <mesh key={`arm-${i}`} position={[x, 0.65, -0.02]} castShadow>
          <boxGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#5C4033" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function PlaceholderSofa({ autoRotate = true }: { autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={0.7}>
      {/* Base/Seat */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[2.2, 0.35, 0.9]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.5} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.7, -0.35]} castShadow>
        <boxGeometry args={[2.2, 0.55, 0.2]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.5} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-1.0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.18, 0.35, 0.9]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.5} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[1.0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.18, 0.35, 0.9]} />
        <meshStandardMaterial color="#F5F0EB" roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[
        [-0.9, 0.08, 0.35],
        [0.9, 0.08, 0.35],
        [-0.9, 0.08, -0.35],
        [0.9, 0.08, -0.35],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.16, 8]} />
          <meshStandardMaterial color="#5C4033" roughness={0.3} />
        </mesh>
      ))}
      {/* Cushions */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <mesh key={`cushion-${i}`} position={[x, 0.58, 0.05]} castShadow>
          <boxGeometry args={[0.6, 0.12, 0.65]} />
          <meshStandardMaterial color="#D4C5B2" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function PlaceholderTable({ autoRotate = true }: { autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Table top */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.6]} />
        <meshStandardMaterial color="#8B6914" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Legs */}
      {[
        [-0.5, 0.2, 0.22],
        [0.5, 0.2, 0.22],
        [-0.5, 0.2, -0.22],
        [0.5, 0.2, -0.22],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.03, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#5C4033" roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function PlaceholderLamp({ autoRotate = true }: { autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.04, 16]} />
        <meshStandardMaterial color="#2B2B2B" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.96, 8]} />
        <meshStandardMaterial color="#2B2B2B" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <coneGeometry args={[0.25, 0.3, 16, 1, true]} />
        <meshStandardMaterial
          color="#F5F0EB"
          roughness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bulb glow */}
      <pointLight position={[0, 0.95, 0]} intensity={0.5} color="#FFF5E1" distance={3} />
    </group>
  );
}

const modelMap: Record<string, React.FC<{ autoRotate?: boolean }>> = {
  chair: PlaceholderChair,
  sofa: PlaceholderSofa,
  table: PlaceholderTable,
  lamp: PlaceholderLamp,
};

interface ModelViewerProps {
  modelType?: string;
  autoRotate?: boolean;
  enableControls?: boolean;
  className?: string;
  environmentPreset?: "studio" | "apartment" | "city" | "warehouse" | "sunset" | "dawn" | "night" | "forest" | "park" | "lobby";
}

export default function ModelViewer({
  modelType = "chair",
  autoRotate = true,
  enableControls = false,
  className = "",
  environmentPreset = "apartment",
}: ModelViewerProps) {
  const ModelComponent = modelMap[modelType] || PlaceholderChair;

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [2, 1.5, 2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <Environment preset={environmentPreset} />
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
            <ModelComponent autoRotate={autoRotate} />
          </Float>
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={4}
            blur={2.5}
          />
          {enableControls && (
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={1.5}
              maxDistance={5}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
