import React from "react";
import { motion } from "framer-motion";

export const LiveConnectionBeams = ({ isMatchActive }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-15 overflow-visible">
      <defs>
        <linearGradient id="neonBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.9" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity="0.9" />
        </linearGradient>

        <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. MENTOR -> AI CHIP BEAM */}
      <path
        d="M 140, 220 Q 240, 110 340, 70"
        fill="none"
        stroke={isMatchActive ? "var(--accent)" : "var(--brand-primary)"}
        strokeWidth={isMatchActive ? "3.5" : "2"}
        strokeDasharray="6 6"
        filter="url(#neonGlow)"
        className="opacity-75"
      />

      {/* 2. AI CHIP -> LAPTOP BEAM */}
      <path
        d="M 340, 70 Q 340, 160 340, 240"
        fill="none"
        stroke={isMatchActive ? "var(--accent)" : "var(--brand-secondary)"}
        strokeWidth={isMatchActive ? "4" : "2.5"}
        strokeDasharray="4 4"
        filter="url(#neonGlow)"
        className="opacity-80"
      />

      {/* 3. LAPTOP -> STUDENT BEAM */}
      <path
        d="M 340, 240 Q 440, 200 540, 220"
        fill="none"
        stroke={isMatchActive ? "var(--brand-secondary)" : "var(--accent)"}
        strokeWidth={isMatchActive ? "3.5" : "2"}
        strokeDasharray="6 6"
        filter="url(#neonGlow)"
        className="opacity-75"
      />

      {/* TRAVELING KNOWLEDGE PACKET PARTICLES */}

      {/* Mentor to AI */}
      <motion.circle
        r={isMatchActive ? "6" : "4.5"}
        fill="var(--accent)"
        filter="url(#neonGlow)"
        animate={{
          cx: [140, 240, 340],
          cy: [220, 110, 70],
        }}
        transition={{
          duration: 2.0,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* AI to Laptop */}
      <motion.circle
        r={isMatchActive ? "7" : "5"}
        fill="var(--brand-secondary)"
        filter="url(#neonGlow)"
        animate={{
          cx: [340, 340],
          cy: [70, 240],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Laptop to Student */}
      <motion.circle
        r={isMatchActive ? "6" : "4.5"}
        fill="var(--accent)"
        filter="url(#neonGlow)"
        animate={{
          cx: [340, 440, 540],
          cy: [240, 200, 220],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />
    </svg>
  );
};
