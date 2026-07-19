"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ============================================================
// PIXAR-STYLE HUMAN CHARACTER (NO EXTERNAL ASSETS)
// ============================================================
function HumanCharacter({ isSpeaking = false }: { isSpeaking?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);
  const time = useRef(0);

  // High-fidelity Color Palette matching your Plant AI theme
  const skinColor = "#fcd34d"; // Warm, stylized skin tone
  const hairColor = "#5c2c16"; // Smooth chestnut brown
  const glassesColor = "#1a1a1a"; 
  const jacketColor = "#65a30d"; // Plant-themed bright olive green jacket
  const turtleneckColor = "#f4f4f5"; // Crisp white turtleneck

  useFrame((state, delta) => {
    time.current += delta;

    // Subtle breathing/floating logic
    if (groupRef.current) {
      groupRef.current.position.y = -0.8 + Math.sin(time.current * 1.5) * 0.015;
    }

    // Interactive Head Tracking (smoothly tracks the user's mouse)
    if (headGroupRef.current) {
      const targetRotationX = -state.pointer.y * 0.25; 
      const targetRotationY = state.pointer.x * 0.35;
      
      headGroupRef.current.rotation.x += (targetRotationX - headGroupRef.current.rotation.x) * 0.08;
      headGroupRef.current.rotation.y += (targetRotationY - headGroupRef.current.rotation.y) * 0.08;
    }

    // Blinking logic
    blinkTimer.current += delta;
    if (blinkTimer.current > 3 + Math.random() * 2) {
      isBlinking.current = true;
      blinkTimer.current = 0;
    }
    if (isBlinking.current) {
      const blinkProgress = Math.min(blinkTimer.current * 8, 1);
      const scaleY = 1 - Math.sin(blinkProgress * Math.PI) * 0.95;
      if (leftEyeRef.current) leftEyeRef.current.scale.y = scaleY;
      if (rightEyeRef.current) rightEyeRef.current.scale.y = scaleY;
      if (blinkProgress >= 1) {
        isBlinking.current = false;
        blinkTimer.current = 0;
      }
    }

    // Dynamic Speaking/Jaw logic
    if (mouthRef.current) {
      if (isSpeaking) {
        const speechWave = 0.2 + Math.abs(Math.sin(time.current * 14)) * 0.6;
        mouthRef.current.scale.y = speechWave;
      } else {
        mouthRef.current.scale.y += (0.15 - mouthRef.current.scale.y) * 0.15;
      }
    }

    // Arm swaying
    if (leftArmRef.current) leftArmRef.current.rotation.z = 0.08 + Math.sin(time.current * 1.0) * 0.02;
    if (rightArmRef.current) rightArmRef.current.rotation.z = -0.08 - Math.sin(time.current * 1.0 + 0.5) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -0.8, 0]}>
      
      {/* 1. CLOTHING (Turtleneck + open jacket structure) */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.42, 0.55, 16, 32]} />
        <meshStandardMaterial color={turtleneckColor} roughness={0.8} />
      </mesh>
      
      {/* Outer Jacket Layer */}
      <mesh position={[0, 0.32, 0.02]} scale={[1.06, 0.95, 1.05]} castShadow>
        <capsuleGeometry args={[0.42, 0.55, 16, 32]} />
        <meshStandardMaterial color={jacketColor} roughness={0.5} />
      </mesh>

      {/* Jacket Collar flaps */}
      <mesh position={[-0.18, 0.58, 0.3]} rotation={[0.4, 0.3, -0.4]}>
        <boxGeometry args={[0.15, 0.2, 0.05]} />
        <meshStandardMaterial color={jacketColor} roughness={0.5} />
      </mesh>
      <mesh position={[0.18, 0.58, 0.3]} rotation={[0.4, -0.3, 0.4]}>
        <boxGeometry args={[0.15, 0.2, 0.05]} />
        <meshStandardMaterial color={jacketColor} roughness={0.5} />
      </mesh>

      {/* Arms */}
      <group ref={leftArmRef} position={[-0.52, 0.65, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 12, 24]} />
          <meshStandardMaterial color={jacketColor} roughness={0.5} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[0.52, 0.65, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.45, 12, 24]} />
          <meshStandardMaterial color={jacketColor} roughness={0.5} />
        </mesh>
      </group>

      {/* 2. NECK (High Turtleneck collar block) */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.15, 0.22, 24]} />
        <meshStandardMaterial color={turtleneckColor} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.11, 0.12, 24]} />
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </mesh>

      {/* 3. HEAD & FACE GROUP (Locks onto interactive mouse tracking) */}
      <group ref={headGroupRef} position={[0, 1.2, 0.05]}>
        
        {/* Core Head Sphere */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.42, 64, 64]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} metalness={0.02} />
        </mesh>

        {/* Big Pixar Eyes */}
        <group position={[0, 0.06, 0.34]}>
          {/* Eyeballs */}
          <mesh position={[-0.16, 0, 0]}>
            <sphereGeometry args={[0.085, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
          </mesh>
          <mesh position={[0.16, 0, 0]}>
            <sphereGeometry args={[0.085, 32, 32]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
          </mesh>

          {/* Large Pupils */}
          <mesh ref={leftEyeRef} position={[-0.16, 0, 0.065]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color={hairColor} roughness={0.2} />
          </mesh>
          <mesh ref={rightEyeRef} position={[0.16, 0, 0.065]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 32, 32]} />
            <meshStandardMaterial color={hairColor} roughness={0.2} />
          </mesh>

          {/* Eye Highlights */}
          <mesh position={[-0.13, 0.03, 0.1]} scale={[0.015, 0.015, 0.015]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" intensity={1} />
          </mesh>
          <mesh position={[0.19, 0.03, 0.1]} scale={[0.015, 0.015, 0.015]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" intensity={1} />
          </mesh>

          {/* Eyelashes/Brows */}
          <mesh position={[-0.16, 0.11, -0.02]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.15, 0.02, 0.03]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
          <mesh position={[0.16, 0.11, -0.02]} rotation={[0, 0, -0.08]}>
            <boxGeometry args={[0.15, 0.02, 0.03]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>
        </group>

        {/* ROUND ROUND GLASSES FRAME */}
        <group position={[0, 0.06, 0.395]}>
          {/* Left Ring */}
          <mesh position={[-0.16, 0, 0]}>
            <torusGeometry args={[0.13, 0.015, 12, 48]} />
            <meshStandardMaterial color={glassesColor} roughness={0.3} />
          </mesh>
          {/* Right Ring */}
          <mesh position={[0.16, 0, 0]}>
            <torusGeometry args={[0.13, 0.015, 12, 48]} />
            <meshStandardMaterial color={glassesColor} roughness={0.3} />
          </mesh>
          {/* Glasses Bridge connector */}
          <mesh position={[0, 0.02, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.08, 0.016, 0.015]} />
            <meshStandardMaterial color={glassesColor} roughness={0.3} />
          </mesh>
        </group>

        {/* Tiny Stylized Button Nose */}
        <mesh position={[0, -0.04, 0.415]}>
          <sphereGeometry args={[0.036, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.3} />
        </mesh>

        {/* Cute Smile / Speaking Mouth Container */}
        <mesh ref={mouthRef} position={[0, -0.16, 0.38]} scale={[1, 0.15, 1]}>
          <torusGeometry args={[0.06, 0.012, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.5} />
        </mesh>

        {/* Rosy Cheeks */}
        <mesh position={[-0.26, -0.08, 0.33]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#f43f5e" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.26, -0.08, 0.33]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#f43f5e" transparent opacity={0.3} />
        </mesh>

        {/* Large Round Ears */}
        <mesh position={[-0.43, 0.02, -0.04]} rotation={[0, 0.3, -0.2]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>
        <mesh position={[0.43, 0.02, -0.04]} rotation={[0, -0.3, 0.2]}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* 4. PIXAR HAIR BUN AND SIDE CURLS (removed earring-like curls) */}
        {/* Back Hair Shell */}
        <mesh position={[0, 0.05, -0.14]}>
          <sphereGeometry args={[0.44, 48, 48]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>

        {/* Top/Front Swoop Hair Parts */}
        <mesh position={[0, 0.28, 0.12]} rotation={[0.3, 0, 0]} scale={[1.02, 0.6, 1.02]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>
        <mesh position={[-0.1, 0.32, 0.22]} rotation={[0.4, 0.4, -0.3]} scale={[0.35, 0.2, 0.2]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.7} />
        </mesh>

        {/* Fluid Wrapped Hair Bun on Top */}
        <group position={[0, 0.46, -0.1]}>
          <mesh castShadow>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.08, 0]} rotation={[0.4, 0.8, 0.2]} scale={[1.1, 0.8, 1.1]}>
            <torusGeometry args={[0.12, 0.05, 12, 32]} />
            <meshStandardMaterial color={hairColor} roughness={0.6} />
          </mesh>
        </group>

        {/* Soft Side Hanging Curls - REMOVED (these were the brown earring-like objects) */}
        {/* <HairStrand ... /> lines are deleted */}

      </group>
    </group>
  );
}

// ============================================================
// MAIN CANVAS MOUNT CONTROLLER
// ============================================================
type Avatar3DProps = {
  className?: string;
  isSpeaking?: boolean;
};

export default function Avatar3D({ className, isSpeaking = false }: Avatar3DProps) {
  return (
    <div className={cn("w-full h-full min-h-[350px] relative", className)}>
      <Canvas
        shadows
        camera={{ position: [0, 0.2, 2.5], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, 2, 2]} intensity={0.4} />
        <pointLight position={[0, 1.5, 2]} intensity={0.7} color="#bbf7d0" />

        <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.3}>
          <HumanCharacter isSpeaking={isSpeaking} />
        </Float>

        <ContactShadows position={[0, -0.8, 0]} opacity={0.4} blur={1.6} far={2.5} color="#000000" />
        <Environment preset="studio" />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.7}
          minAzimuthAngle={-0.3}
          maxAzimuthAngle={0.3}
        />
      </Canvas>
    </div>
  );
}