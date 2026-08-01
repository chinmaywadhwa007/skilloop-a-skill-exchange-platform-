import React from "react";
import * as THREE from "three";

/**
 * 3D Stylized Ecosystem Icons constructed from clean Three.js geometries
 */

// 1. Graduation Cap (Learn / Teach)
export const GraduationCapIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.5, 0.5, 0.5]}>
      {/* Cap Crown / Top Diamond */}
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.2, 0]}>
        <boxGeometry args={[1.6, 0.1, 1.6]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Skull Cap Base */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.55, 0.6, 0.5, 32]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Tassel Button */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      {/* Tassel String & Tip */}
      <mesh position={[0.4, 0.1, 0.4]}>
        <cylinderGeometry args={[0.02, 0.04, 0.5, 8]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

// 2. Code Brackets (Practice / Tech)
export const CodeBracketsIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.45, 0.45, 0.45]}>
      {/* Left Bracket '<' */}
      <group position={[-0.45, 0, 0]}>
        <mesh position={[-0.2, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.12, 0.6, 0.12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[-0.2, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.12, 0.6, 0.12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Right Bracket '>' */}
      <group position={[0.45, 0, 0]}>
        <mesh position={[0.2, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.12, 0.6, 0.12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.2, -0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.12, 0.6, 0.12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </group>
      {/* Slash '/' */}
      <mesh rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.08, 1.1, 0.08]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// 3. AI Chip (AI-Powered Skill Matching)
export const AIChipIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.45, 0.45, 0.45]}>
      {/* Central Microchip Main Board */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Die / Core Glow Plate */}
      <mesh position={[0, 0, 0.14]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Outer Pins (8 Pins) */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <React.Fragment key={`pin-${i}`}>
          {/* Top & Bottom Pins */}
          <mesh position={[x, 0.75, 0]}>
            <boxGeometry args={[0.1, 0.3, 0.1]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} />
          </mesh>
          <mesh position={[x, -0.75, 0]}>
            <boxGeometry args={[0.1, 0.3, 0.1]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} />
          </mesh>
          {/* Left & Right Pins */}
          <mesh position={[0.75, x, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} />
          </mesh>
          <mesh position={[-0.75, x, 0]}>
            <boxGeometry args={[0.3, 0.1, 0.1]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

// 4. Coins (Earn / Financial Rewards)
export const CoinsIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.45, 0.45, 0.45]}>
      {/* Bottom Coin */}
      <mesh position={[-0.2, -0.25, -0.1]} rotation={[Math.PI / 3, 0.2, -0.1]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.2} emissive={accentColor} emissiveIntensity={0.2} />
      </mesh>
      {/* Middle Coin */}
      <mesh position={[0.1, 0, 0]} rotation={[Math.PI / 3.2, -0.1, 0.2]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color={color} metalness={0.95} roughness={0.15} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      {/* Top Coin */}
      <mesh position={[-0.1, 0.3, 0.15]} rotation={[Math.PI / 3.5, 0.1, -0.2]}>
        <cylinderGeometry args={[0.6, 0.6, 0.15, 32]} />
        <meshStandardMaterial color={accentColor} metalness={0.95} roughness={0.1} emissive={accentColor} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

// 5. Book (Knowledge / Learn)
export const BookIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.45, 0.45, 0.45]}>
      {/* Left Page Spine */}
      <mesh position={[-0.35, 0, 0]} rotation={[0, -Math.PI / 8, 0]}>
        <boxGeometry args={[0.65, 0.9, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Right Page Spine */}
      <mesh position={[0.35, 0, 0]} rotation={[0, Math.PI / 8, 0]}>
        <boxGeometry args={[0.65, 0.9, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Pages Inner Core */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.2, 0.82, 0.12]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.4} />
      </mesh>
      {/* Bookmark Ribbon */}
      <mesh position={[0, -0.3, 0.1]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.1, 0.6, 0.04]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
};

// 6. Growth Graph (Mastery / Analytics)
export const GraphIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.45, 0.45, 0.45]}>
      {/* Bar 1 */}
      <mesh position={[-0.45, -0.2, 0]}>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Bar 2 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 0.9, 0.22]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Bar 3 */}
      <mesh position={[0.45, 0.25, 0]}>
        <boxGeometry args={[0.22, 1.4, 0.22]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      {/* Growth Trend Line Arrow */}
      <mesh position={[0, 0.4, 0.15]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.3, 0.06, 0.06]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// 7. Video Call Icon (Mentor / Community)
export const VideoCallIcon = ({ color, accentColor }) => {
  return (
    <group scale={[0.45, 0.45, 0.45]}>
      {/* Camera Main Body */}
      <mesh position={[-0.15, 0, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.3]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Lens Cone */}
      <mesh position={[0.45, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.3, 0.4, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
      {/* Record Light Dot */}
      <mesh position={[-0.4, 0.22, 0.16]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
};
