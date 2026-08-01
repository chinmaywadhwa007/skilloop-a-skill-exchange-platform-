import React, { useState, useRef } from "react";
import {
  Code2,
  Terminal,
  Server,
  Palette,
  Brain,
  FileCode2,
  Award,
  GraduationCap,
  Coins,
  Trophy,
} from "lucide-react";
import { DraggableSkillCard } from "./DraggableSkillCard";

// 10 INTERACTIVE DRAGGABLE OBJECTS
const ALL_INTERACTIVE_OBJECTS = [
  { id: "react", label: "React", icon: Code2, color: "#06B6D4", top: "12%", left: "4%", duration: 5.2, delay: 0, parallax: 0.6 },
  { id: "python", label: "Python", icon: Terminal, color: "#3B82F6", top: "14%", right: "4%", duration: 5.8, delay: 0.4, parallax: 0.55 },
  { id: "node", label: "Node.js", icon: Server, color: "#10B981", top: "66%", left: "3%", duration: 4.8, delay: 0.8, parallax: 0.5 },
  { id: "js", label: "JavaScript", icon: FileCode2, color: "#F7DF1E", top: "64%", right: "3%", duration: 5.4, delay: 1.2, parallax: 0.5 },
  { id: "ai", label: "AI Engine", icon: Brain, color: "#8B5CF6", top: "38%", right: "1.5%", duration: 4.6, delay: 0.6, parallax: 0.65 },
  { id: "uiux", label: "UI/UX", icon: Palette, color: "#EC4899", top: "40%", left: "1.5%", duration: 5.0, delay: 1.0, parallax: 0.65 },
  { id: "trophy", label: "Trophy", icon: Trophy, color: "#F59E0B", bottom: "14%", right: "20%", duration: 5.6, delay: 0.5, parallax: 0.4 },
  { id: "cert", label: "Certificate", icon: Award, color: "#F59E0B", bottom: "14%", left: "20%", duration: 5.3, delay: 0.3, parallax: 0.4 },
  { id: "coin", label: "Coin", icon: Coins, color: "#FBBF24", bottom: "12%", right: "35%", duration: 4.4, delay: 0.9, parallax: 0.35 },
  { id: "cap", label: "Cap", icon: GraduationCap, color: "#6366F1", bottom: "12%", left: "35%", duration: 6.2, delay: 0.7, parallax: 0.35 },
];

export const FloatingCubes = ({ mouseX, mouseY }) => {
  const [draggedCardId, setDraggedCardId] = useState(null);
  const cardPositionsRef = useRef({});

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {ALL_INTERACTIVE_OBJECTS.map((item) => (
        <DraggableSkillCard
          key={item.id}
          id={item.id}
          label={item.label}
          icon={item.icon}
          color={item.color}
          top={item.top}
          left={item.left}
          right={item.right}
          bottom={item.bottom}
          duration={item.duration}
          delay={item.delay}
          draggedCardId={draggedCardId}
          setDraggedCardId={setDraggedCardId}
          cardPositionsRef={cardPositionsRef}
          mouseX={mouseX}
          mouseY={mouseY}
          parallaxFactor={item.parallax}
        />
      ))}
    </div>
  );
};
