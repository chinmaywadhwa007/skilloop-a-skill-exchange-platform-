import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const CentralOrb = ({ colors, isHovered, isMatchActive, onHoverChange }) => {
  const hubGroupRef = useRef();
  const innerCoreRef = useRef();
  const circuitRing1Ref = useRef();
  const circuitRing2Ref = useRef();
  const aiPrismRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Floating breathing motion
    if (hubGroupRef.current) {
      hubGroupRef.current.position.y = Math.sin(time * 1.5) * 0.15;
      hubGroupRef.current.rotation.y = time * 0.25;
    }

    // Inner core & AI prism pulse
    if (innerCoreRef.current) {
      const pulseScale = 1 + Math.sin(time * 3) * 0.06 + (isMatchActive ? 0.25 : 0) + (isHovered ? 0.15 : 0);
      innerCoreRef.current.scale.setScalar(pulseScale);
    }

    if (aiPrismRef.current) {
      aiPrismRef.current.rotation.x = time * 0.8;
      aiPrismRef.current.rotation.z = time * 0.6;
    }

    // Outer orbital circuit rings
    if (circuitRing1Ref.current) {
      circuitRing1Ref.current.rotation.x = time * 0.5;
      circuitRing1Ref.current.rotation.y = time * 0.3;
    }

    if (circuitRing2Ref.current) {
      circuitRing2Ref.current.rotation.x = -time * 0.4;
      circuitRing2Ref.current.rotation.z = time * 0.6;
    }
  });

  return (
    <group
      ref={hubGroupRef}
      position={[0, 0, 0]}
      onPointerOver={() => onHoverChange(true)}
      onPointerOut={() => onHoverChange(false)}
    >
      {/* Central Lights */}
      <pointLight
        color={colors.brandPrimary}
        intensity={isMatchActive ? 6.0 : isHovered ? 4.5 : 3.0}
        distance={9}
        decay={2}
      />
      <pointLight
        color={colors.accent}
        intensity={isMatchActive ? 4.0 : 2.0}
        distance={6}
        position={[0, 1, 1]}
      />

      {/* AI Skill Hub Central Core Sphere */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[0.9, 3]} />
        <meshStandardMaterial
          color={colors.brandPrimary}
          emissive={colors.brandPrimary}
          emissiveIntensity={isMatchActive ? 2.0 : isHovered ? 1.4 : 0.85}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>

      {/* AI Octahedron Floating Prism inside Core */}
      <mesh ref={aiPrismRef} scale={[0.55, 0.55, 0.55]}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={1.5}
          wireframe={true}
        />
      </mesh>

      {/* Glass Outer Hexagonal Shell */}
      <mesh scale={[1.25, 1.25, 1.25]}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshPhysicalMaterial
          color={colors.brandSecondary}
          transparent={true}
          opacity={0.35}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1}
          transmission={0.65}
          ior={1.5}
        />
      </mesh>

      {/* Neon Orbiting Circuit Rings */}
      <mesh ref={circuitRing1Ref}>
        <torusGeometry args={[1.55, 0.035, 16, 100]} />
        <meshStandardMaterial
          color={colors.accent}
          emissive={colors.accent}
          emissiveIntensity={isMatchActive ? 1.8 : 0.8}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      <mesh ref={circuitRing2Ref}>
        <torusGeometry args={[1.8, 0.025, 16, 100]} />
        <meshStandardMaterial
          color={colors.brandSecondary}
          emissive={colors.brandSecondary}
          emissiveIntensity={isMatchActive ? 1.6 : 0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* AI Match Wave Pulse Shell */}
      {isMatchActive && (
        <mesh scale={[2.2, 2.2, 2.2]}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial
            color={colors.accent}
            transparent={true}
            opacity={0.25}
            wireframe={true}
          />
        </mesh>
      )}
    </group>
  );
};
