import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  GraduationCapIcon,
  CodeBracketsIcon,
  AIChipIcon,
  CoinsIcon,
  BookIcon,
  GraphIcon,
  VideoCallIcon,
} from "./IconGeometries";

const ICON_MAP = {
  cap: GraduationCapIcon,
  code: CodeBracketsIcon,
  ai: AIChipIcon,
  coins: CoinsIcon,
  book: BookIcon,
  graph: GraphIcon,
  video: VideoCallIcon,
};

// Generate high-DPI Skill Badge Pill textures
function createSkillBadgeTexture(label, brandColor, accentColor) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");

  // Rounded Pill Background
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.beginPath();
  ctx.roundRect(6, 6, 244, 88, 44);
  ctx.fill();

  // Neon Glow Border
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 5;
  ctx.stroke();

  // Small Glowing Skill Dot
  ctx.fillStyle = brandColor;
  ctx.beginPath();
  ctx.arc(40, 50, 12, 0, Math.PI * 2);
  ctx.fill();

  // Skill Label Text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 32px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(label, 65, 52);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const OrbitNode = ({
  nodeType = "skill", // "skill" or "icon"
  skillLabel = "React",
  iconType = "cap",
  orbitRadius = 4.8,
  speed = 0.2,
  phase = 0,
  yOffset = 0,
  colors,
  onHoverChange,
  onPositionUpdate,
}) => {
  const nodeGroupRef = useRef();
  const [hovered, setHovered] = useState(false);

  const skillTexture = useMemo(() => {
    if (nodeType === "skill") {
      return createSkillBadgeTexture(skillLabel, colors.brandPrimary, colors.accent);
    }
    return null;
  }, [nodeType, skillLabel, colors]);

  const IconComponent = ICON_MAP[iconType] || GraduationCapIcon;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const currentAngle = time * speed + phase;

    const x = Math.cos(currentAngle) * orbitRadius;
    const z = Math.sin(currentAngle) * orbitRadius;
    const y = Math.sin(time * 1.4 + phase) * 0.4 + yOffset;

    if (nodeGroupRef.current) {
      nodeGroupRef.current.position.set(x, y, z);

      if (nodeType === "skill") {
        nodeGroupRef.current.lookAt(state.camera.position);
      } else {
        nodeGroupRef.current.rotation.y = time * 0.5 + phase;
      }

      const targetScale = hovered ? 1.3 : 1.0;
      nodeGroupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (onPositionUpdate) {
      onPositionUpdate([x, y, z], hovered);
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
    <group ref={nodeGroupRef}>
      {nodeType === "skill" ? (
        /* Floating Skill Badge Pill */
        <mesh
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[1.5, 0.6]} />
          <meshBasicMaterial map={skillTexture} transparent={true} />
        </mesh>
      ) : (
        /* Floating Education 3D Icon */
        <group
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
            <meshPhysicalMaterial
              color={hovered ? colors.accent : colors.brandSecondary}
              transparent={true}
              opacity={0.35}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.57, 0.025, 16, 64]} />
            <meshStandardMaterial
              color={colors.accent}
              emissive={colors.accent}
              emissiveIntensity={hovered ? 1.2 : 0.4}
            />
          </mesh>
          <group position={[0, 0.1, 0]}>
            <IconComponent
              color={colors.brandPrimary}
              accentColor={colors.accent}
            />
          </group>
        </group>
      )}
    </group>
  );
};
