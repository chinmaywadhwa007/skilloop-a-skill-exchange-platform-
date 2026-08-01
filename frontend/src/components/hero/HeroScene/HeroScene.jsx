import React, { useState, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { Laptop3D } from "./Laptop3D";
import { HolographicAIChip } from "./HolographicAIChip";
import { MentorCard } from "./MentorCard";
import { StudentCard } from "./StudentCard";
import { FloatingCubes } from "./FloatingCubes";
import { LiveConnectionBeams } from "./LiveConnectionBeams";
import { Sparkles, BrainCircuit } from "lucide-react";

export default function HeroScene() {
  const [isMatchActive, setIsMatchActive] = useState(false);
  const [xpGained, setXpGained] = useState(false);

  // Framer Motion MotionValues bypass React state re-renders (Zero vibration!)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const mouseX = useSpring(rawMouseX, { stiffness: 90, damping: 22 });
  const mouseY = useSpring(rawMouseY, { stiffness: 90, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawMouseX.set(((x - centerX) / centerX) * 12);
    rawMouseY.set(((centerY - y) / centerY) * 12);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  // Periodic AI Skill Match Event Cycle Every 4.8 Seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsMatchActive(true);
      setXpGained(true);

      setTimeout(() => {
        setIsMatchActive(false);
      }, 2200);

      setTimeout(() => {
        setXpGained(false);
      }, 3200);
    }, 4800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[580px] lg:min-h-[640px] flex flex-col items-center justify-between p-4 sm:p-6 rounded-[2.5rem] overflow-hidden glass-card border border-white/20 dark:border-white/10 transition-all duration-300 group shadow-2xl"
    >
      {/* Top Header Live Badge */}
      <div className="w-full flex items-center justify-between z-30 pointer-events-none mb-1">
        <div className="glass-card px-3.5 py-1.5 rounded-xl flex items-center gap-2 border border-white/20 dark:border-white/10 text-xs font-extrabold text-[var(--text-primary)] shadow-sm backdrop-blur-md">
          <BrainCircuit size={16} className="text-[var(--accent)]" />
          <span>SkillLoop AI Engine • P2P Marketplace</span>
        </div>

        <div className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20 flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Learn • Teach • Earn</span>
        </div>
      </div>

      {/* Background Volumetric Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute top-[10%] left-[15%] w-[55%] h-[55%] rounded-full blur-[140px] opacity-30 dark:opacity-25 transition-all"
          style={{ backgroundColor: "var(--brand-primary)" }}
        />
        <div
          className="absolute bottom-[10%] right-[15%] w-[50%] h-[50%] rounded-full blur-[140px] opacity-30 dark:opacity-25 transition-all"
          style={{ backgroundColor: "var(--brand-secondary)" }}
        />
      </div>

      {/* Floating 3D Skill Cubes & Reward Objects */}
      <FloatingCubes isMatchActive={isMatchActive} mouseX={mouseX} mouseY={mouseY} />

      {/* Live Neon SVG Connection Beams */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-15">
        <LiveConnectionBeams isMatchActive={isMatchActive} />
      </div>

      {/* MAIN 3D ECOSYSTEM CONTENT (ISOMETRIC MACBOOK & HOLOGRAM CARDS) */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 z-20 my-auto">
        {/* MENTOR CARD (Left Side Floating Hologram) */}
        <div className="hidden lg:flex flex-col items-center">
          <MentorCard isMatchActive={isMatchActive} mouseX={mouseX} mouseY={mouseY} />
        </div>

        {/* CENTERPIECE: 3/4 ISOMETRIC LAPTOP + HOLOGRAPHIC AI CHIP */}
        <div className="flex flex-col items-center justify-center w-full lg:w-auto relative">
          <HolographicAIChip isMatchActive={isMatchActive} mouseX={mouseX} mouseY={mouseY} />
          <Laptop3D isMatchActive={isMatchActive} mouseX={mouseX} mouseY={mouseY} />
        </div>

        {/* STUDENT CARD (Right Side Floating Hologram) */}
        <div className="hidden lg:flex flex-col items-center">
          <StudentCard isMatchActive={isMatchActive} xpGained={xpGained} mouseX={mouseX} mouseY={mouseY} />
        </div>

        {/* MOBILE & TABLET COMPACT CARDS ROW */}
        <div className="flex lg:hidden items-center justify-center gap-4 w-full flex-wrap z-30 mt-3">
          <MentorCard isMatchActive={isMatchActive} mouseX={mouseX} mouseY={mouseY} />
          <StudentCard isMatchActive={isMatchActive} xpGained={xpGained} mouseX={mouseX} mouseY={mouseY} />
        </div>
      </div>

      {/* Bottom Footer Status Bar */}
      <div className="w-full flex items-center justify-between z-30 glass-card p-3 rounded-xl border border-white/20 dark:border-white/10 backdrop-blur-md mt-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white font-bold text-xs flex items-center justify-center shadow-md">
            SL
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--text-primary)]">Interactive 3D Ecosystem</p>
            <p className="text-[10px] text-[var(--text-secondary)]">Move cursor to tilt 3D view</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1.5 rounded-lg border border-[var(--accent)]/20 shadow-xs">
          <Sparkles size={14} className="text-amber-400 fill-amber-400" />
          <span>60 FPS • Smooth Physics</span>
        </div>
      </div>
    </div>
  );
}
