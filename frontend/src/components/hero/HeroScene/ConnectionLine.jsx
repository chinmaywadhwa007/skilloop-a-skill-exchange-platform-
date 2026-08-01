import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const ConnectionLine = ({
  startPosition = [0, 0, 0],
  targetPosition,
  isHovered = false,
  isMatchBeam = false,
  colors,
}) => {
  const lineRef = useRef();

  const startPos = useMemo(() => new THREE.Vector3(...startPosition), [startPosition]);
  const endPos = useMemo(() => new THREE.Vector3(...(targetPosition || [0, 0, 0])), [targetPosition]);

  // Construct quadratic curve for smooth arc
  const curve = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
    mid.y += 0.25;
    return new THREE.QuadraticBezierCurve3(startPos, mid, endPos);
  }, [startPos, endPos]);

  const points = useMemo(() => curve.getPoints(32), [curve]);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.getElapsedTime();
      lineRef.current.material.dashOffset = -time * (isMatchBeam ? 3.0 : 1.5);
    }
  });

  return (
    <group>
      {/* Neon Connection Line */}
      <primitive
        object={
          new THREE.Line(
            geometry,
            new THREE.LineDashedMaterial({
              color: isMatchBeam
                ? colors.accent
                : isHovered
                ? colors.brandSecondary
                : colors.brandPrimary,
              dashSize: isMatchBeam ? 0.6 : 0.35,
              gapSize: isMatchBeam ? 0.1 : 0.18,
              linewidth: isMatchBeam ? 4 : isHovered ? 2.5 : 1,
              transparent: true,
              opacity: isMatchBeam ? 1.0 : isHovered ? 0.9 : 0.4,
            })
          )
        }
        ref={lineRef}
        onUpdate={(line) => line.computeLineDistances()}
      />

      {/* Traveling Knowledge Packet Sphere */}
      <KnowledgePacket curve={curve} isMatchBeam={isMatchBeam} colors={colors} />

      {/* Occasional Reward Coin Flowing to Mentor */}
      <RewardCoinPacket curve={curve} colors={colors} />
    </group>
  );
};

// Traveling Knowledge Packet (representing peer-to-peer data flow)
function KnowledgePacket({ curve, isMatchBeam, colors }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = isMatchBeam ? 0.8 : 0.45;
    const t = (time * speed) % 1;
    const pos = curve.getPoint(t);
    if (meshRef.current) {
      meshRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[isMatchBeam ? 0.12 : 0.07, 16, 16]} />
      <meshStandardMaterial
        color={colors.accent}
        emissive={colors.accent}
        emissiveIntensity={isMatchBeam ? 2.0 : 1.2}
      />
    </mesh>
  );
}

// Reward Coin Packet Flowing to Mentors
function RewardCoinPacket({ curve, colors }) {
  const coinRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Flow every 3.5 seconds loop
    const cycle = (time * 0.3) % 1;
    const pos = curve.getPoint(cycle);

    if (coinRef.current) {
      coinRef.current.position.copy(pos);
      coinRef.current.rotation.y = time * 4.0;
      coinRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <mesh ref={coinRef}>
      <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
      <meshStandardMaterial
        color={colors.accent}
        emissive={colors.accent}
        emissiveIntensity={0.8}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
}
