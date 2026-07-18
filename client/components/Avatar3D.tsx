"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@/lib/utils";

function AvatarHead() {
  const headRef = useRef<Mesh>(null);
  const leafRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.6) * 0.25;
      headRef.current.position.y = Math.sin(time * 0.8) * 0.05;
    }
    if (leafRef.current) {
      leafRef.current.rotation.z = Math.sin(time * 1.2) * 0.4;
      leafRef.current.rotation.x = Math.sin(time * 1.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
        {/* Head */}
        <mesh ref={headRef} position={[0, 0, 0]} castShadow receiveShadow>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial color="#34d399" metalness={0.1} roughness={0.3} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.4, 0.2, 1.05]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#0b2f22" />
        </mesh>
        <mesh position={[0.4, 0.2, 1.05]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color="#0b2f22" />
        </mesh>

        {/* Smile */}
        <mesh position={[0, -0.15, 1.08]}>
          <torusGeometry args={[0.25, 0.04, 16, 80, Math.PI]} />
          <meshStandardMaterial color="#0b2f22" />
        </mesh>

        {/* Leaf on head */}
        <mesh ref={leafRef} position={[0.2, 1.3, 0]} rotation={[0.3, 0, 0.2]}>
          <coneGeometry args={[0.35, 0.7, 24]} />
          <meshStandardMaterial color="#16a34a" metalness={0.1} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

type Avatar3DProps = {
  className?: string;
};

export default function Avatar3D({ className }: Avatar3DProps) {
  return (
    <div className={cn("avatar-shell relative", className)}>
      <Canvas camera={{ position: [0, 0.5, 4.5], fov: 40 }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 3]} intensity={1.2} castShadow />
        <directionalLight position={[-2, 1, 2]} intensity={0.4} />
        <pointLight position={[0, 0, 2]} intensity={0.3} />
        <AvatarHead />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={false}
        />
      </Canvas>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        🌿 PlantPal
      </div>
    </div>
  );
}