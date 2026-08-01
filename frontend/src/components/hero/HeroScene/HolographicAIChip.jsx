import React from "react";
import { motion, useTransform } from "framer-motion";
import { Cpu, Sparkles, Radio, Scan } from "lucide-react";

export const HolographicAIChip = ({ isMatchActive, mouseX, mouseY }) => {
  const rotateX = useTransform(mouseY, [-20, 20], [-8, 8]);
  const rotateY = useTransform(mouseX, [-20, 20], [-8, 8]);

  return (
    <div className="relative flex flex-col items-center justify-center z-30 mb-1.5">
      {/* Downward Holographic Scanning Cone Light Beam onto Laptop Screen */}
      <div
        className="absolute top-8 w-40 h-20 pointer-events-none -z-10 opacity-30 blur-md transition-all"
        style={{
          background:
            "linear-gradient(to bottom, var(--accent), transparent)",
        }}
      />

      {/* Radial Scan Rings Expanding Outward */}
      <motion.div
        animate={{
          scale: [1, 2.4, 1],
          opacity: [0.7, 0, 0.7],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute w-20 h-20 rounded-full border-2 border-[var(--accent)] pointer-events-none"
      />

      {isMatchActive && (
        <motion.div
          animate={{
            scale: [1, 3.2],
            opacity: [0.9, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute w-24 h-24 rounded-full border-2 border-[var(--brand-secondary)] pointer-events-none"
        />
      )}

      {/* HOLOGRAPHIC AI CHIP MAIN BADGE */}
      <motion.div
        style={{
          rotateX,
          rotateY,
        }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
        className={`px-3.5 py-2 rounded-2xl backdrop-blur-2xl flex items-center gap-2.5 shadow-2xl transition-all duration-300 border ${
          isMatchActive
            ? "bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)] shadow-[0_0_30px_rgba(6,182,212,0.45)] scale-105"
            : "bg-[var(--bg-surface)]/90 border-white/20 dark:border-white/10 text-[var(--text-primary)]"
        }`}
      >
        {/* Glowing Chip Icon Box */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--accent)] flex items-center justify-center text-white shadow-lg relative">
          <Cpu size={18} className="animate-spin-slow" />
          <Scan size={11} className="absolute text-amber-300 animate-ping" />
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-black tracking-wide">
            <span>AI MATCH ENGINE</span>
            <Sparkles size={12} className="text-amber-400 fill-amber-400" />
          </div>
          <p className="text-[9px] font-bold text-[var(--text-secondary)] flex items-center gap-1 mt-0.5">
            <Radio size={10} className="animate-pulse text-emerald-400" />
            <span>{isMatchActive ? "Match Found! Connecting..." : "Scanning Skill Marketplace..."}</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
