import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate high-resolution procedural avatar card textures
function createAvatarCardTexture(initials, role, isMatched, bgColor, textColor, accentColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 360;
  const ctx = canvas.getContext("2d");

  // Rounded Glass Card Background
  const r = 30;
  ctx.fillStyle = isMatched ? "rgba(15, 23, 42, 0.92)" : "rgba(15, 23, 42, 0.82)";
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(300 - r, 0);
  ctx.quadraticCurveTo(300, 0, 300, r);
  ctx.lineTo(300, 360 - r);
  ctx.quadraticCurveTo(300, 360, 300 - r, 360);
  ctx.lineTo(r, 360);
  ctx.quadraticCurveTo(0, 360, 0, 360 - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // Glass Card Border
  ctx.strokeStyle = isMatched ? accentColor : "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = isMatched ? 8 : 4;
  ctx.stroke();

  // Avatar Circle Background
  const grad = ctx.createLinearGradient(150, 40, 150, 180);
  grad.addColorStop(0, bgColor);
  grad.addColorStop(1, accentColor);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(150, 115, 65, 0, Math.PI * 2);
  ctx.fill();

  // Avatar Initials
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 52px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, 150, 120);

  // Status Indicator Dot (Online / Matching)
  ctx.fillStyle = isMatched ? "#10B981" : accentColor;
  ctx.beginPath();
  ctx.arc(195, 65, 12, 0, Math.PI * 2);
  ctx.fill();

  // Role Pill
  ctx.fillStyle = isMatched ? accentColor : "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.roundRect(50, 210, 200, 48, 24);
  ctx.fill();

  ctx.fillStyle = isMatched ? "#0F172A" : textColor;
  ctx.font = "bold 26px system-ui, sans-serif";
  ctx.fillText(role.toUpperCase(), 150, 234);

  // Subtitle / Rating
  ctx.fillStyle = isMatched ? accentColor : "rgba(255, 255, 255, 0.6)";
  ctx.font = "500 20px system-ui, sans-serif";
  ctx.fillText(isMatched ? "★ AI MATCHED ★" : "★★★★★ Top Rated", 150, 305);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const FloatingAvatar = ({
  initials = "SL",
  role = "Mentor",
  orbitRadius = 3.4,
  speed = 0.25,
  phase = 0,
  yOffset = 0,
  isMatched = false,
  colors,
  onHoverChange,
  onPositionUpdate,
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const cardTexture = useMemo(() => {
    return createAvatarCardTexture(
      initials,
      role,
      isMatched,
      colors.brandPrimary,
      colors.textPrimary || "#F8FAFC",
      colors.accent
    );
  }, [initials, role, isMatched, colors]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentAngle = time * speed + phase;

    const x = Math.cos(currentAngle) * orbitRadius;
    const z = Math.sin(currentAngle) * orbitRadius;
    const y = Math.sin(time * 1.6 + phase) * 0.35 + yOffset;

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.lookAt(state.camera.position);

      const targetScale = isMatched ? 1.35 : hovered ? 1.25 : 1.0;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (onPositionUpdate) {
      onPositionUpdate([x, y, z], hovered || isMatched);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    if (onHoverChange) onHoverChange(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (onHoverChange) onHoverChange(false);
  };

  return (
    <group ref={meshRef}>
      {/* Outer Glow Halo Rim on AI Match */}
      {isMatched && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[1.7, 2.05]} />
          <meshBasicMaterial
            color={colors.accent}
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Sleek Glass Avatar Card Plane */}
      <mesh
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[1.5, 1.85]} />
        <meshBasicMaterial map={cardTexture} transparent={true} />
      </mesh>
    </group>
  );
};
