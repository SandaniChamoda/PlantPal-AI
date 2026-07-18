"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, Sparkles } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@/lib/utils";

function AIAssistant() {
  const headRef = useRef<Mesh>(null);
  const bodyRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Gentle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
      headRef.current.position.y = Math.sin(time * 0.5) * 0.03;
    }
    
    // Subtle body sway
    if (bodyRef.current) {
      bodyRef.current.rotation.z = Math.sin(time * 0.2) * 0.02;
    }
    
    // Glow pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 0.8) * 0.05;
      glowRef.current.scale.x = pulse;
      glowRef.current.scale.y = pulse;
    }

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.y = time * 0.1;
      ringRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group 
        position={[0, 0, 0]} 
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Outer Ring */}
        <mesh ref={ringRef} position={[0, 0.2, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={0.3}
            transparent 
            opacity={0.4}
          />
        </mesh>

        {/* Glow Ring */}
        <mesh ref={glowRef} position={[0, -0.2, 0]}>
          <ringGeometry args={[1.2, 1.6, 64]} />
          <meshStandardMaterial 
            color="#22c55e" 
            transparent 
            opacity={0.1}
            emissive="#22c55e"
            emissiveIntensity={0.5}
            side={2}
          />
        </mesh>

        {/* Body - Sleek Modern */}
        <mesh ref={bodyRef} position={[0, -1.2, 0]} castShadow>
          <cylinderGeometry args={[1.0, 1.3, 1.6, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.7} 
            roughness={0.15}
            emissive="#22c55e"
            emissiveIntensity={0.03}
          />
        </mesh>

        {/* Shoulders */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            metalness={0.6} 
            roughness={0.2}
            emissive="#22c55e"
            emissiveIntensity={0.02}
          />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.5, 0.6, 0.4, 16]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Head - Modern Shape */}
        <mesh ref={headRef} position={[0, 1.1, 0]} castShadow>
          <sphereGeometry args={[0.85, 64, 64]} />
          <meshStandardMaterial 
            color="#e2e8f0" 
            metalness={0.1} 
            roughness={0.25}
            emissive="#22c55e"
            emissiveIntensity={0.02}
          />
        </mesh>

        {/* Face Shield / Visor - AI Assistant Look */}
        <mesh position={[0, 1.05, 0.8]} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.9} 
            roughness={0.05}
            transparent 
            opacity={0.15}
            emissive="#22c55e"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Eyes - Glowing AI */}
        <mesh position={[-0.28, 1.2, 0.85]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={3}
          />
        </mesh>
        <mesh position={[0.28, 1.2, 0.85]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={3}
          />
        </mesh>

        {/* Eye glow rings */}
        <mesh position={[-0.28, 1.2, 0.8]}>
          <ringGeometry args={[0.11, 0.15, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            transparent 
            opacity={0.4}
            emissive="#22c55e"
            emissiveIntensity={1.5}
            side={2}
          />
        </mesh>
        <mesh position={[0.28, 1.2, 0.8]}>
          <ringGeometry args={[0.11, 0.15, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            transparent 
            opacity={0.4}
            emissive="#22c55e"
            emissiveIntensity={1.5}
            side={2}
          />
        </mesh>

        {/* Mouth - Gentle Smile */}
        <mesh position={[0, 0.95, 0.88]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.14, 0.02, 8, 30, Math.PI]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Ear pieces */}
        <mesh position={[-0.82, 1.0, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.8} 
            roughness={0.1}
            emissive="#22c55e"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.82, 1.0, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            metalness={0.8} 
            roughness={0.1}
            emissive="#22c55e"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Antenna / Status indicator */}
        <mesh position={[0, 1.65, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.35, 8]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={2}
          />
        </mesh>
        <mesh position={[0, 1.85, 0]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#22c55e" 
            emissive="#22c55e" 
            emissiveIntensity={3}
          />
        </mesh>

        {/* Holographic particles */}
        <Sparkles 
          count={30}
          scale={[3, 3, 3]}
          size={0.04}
          speed={0.5}
          color="#22c55e"
          opacity={0.4}
        />
      </group>
    </Float>
  );
}

type Avatar3DProps = {
  className?: string;
};

export default function Avatar3D({ className }: Avatar3DProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={cn("avatar-shell-dark flex items-center justify-center", className)}>
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-emerald-400 text-sm">Loading AI Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("avatar-shell-dark relative", className)}>
      <Canvas 
        camera={{ position: [0, 0.5, 4.5], fov: 40 }} 
        shadows
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 6, 4]} intensity={1.5} castShadow />
        <directionalLight position={[-4, 2, 3]} intensity={0.5} />
        <pointLight position={[0, 2, 2]} intensity={0.8} color="#22c55e" />
        <pointLight position={[0, -1, 0]} intensity={0.3} color="#22c55e" />
        <Environment preset="city" />
        <AIAssistant />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.6}
          autoRotate={true}
          autoRotateSpeed={0.8}
          rotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Status Label */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-full px-4 py-1.5">
        <span className="text-xs font-medium text-emerald-400 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI Assistant • Online
        </span>
      </div>
    </div>
  );
}