import React from "react";
import { motion, useTransform } from "framer-motion";
import {
  Star,
  Sparkles,
  Video,
  TrendingUp,
  Coins,
} from "lucide-react";

export const Laptop3D = ({ isMatchActive, mouseX, mouseY }) => {
  // Direct Framer Motion GPU transform mappings (Zero vibration!)
  const rotateX = useTransform(mouseY, [-20, 20], [22, 6]);
  const rotateY = useTransform(mouseX, [-20, 20], [-24, -8]);

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[460px] mx-auto z-20 flex flex-col items-center justify-center">
      {/* GLOWING CIRCULAR PLATFORM (UNDERNEATH LAPTOP) */}
      <div className="absolute -bottom-10 w-[110%] h-32 pointer-events-none -z-10 flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <div
          className="w-full h-full rounded-[100%] border border-[var(--brand-primary)]/30 blur-[1px] animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--brand-primary) 0%, transparent 70%)",
            opacity: 0.25,
          }}
        />
        {/* Inner Concentric Glow Platform */}
        <div
          className="absolute w-[80%] h-[70%] rounded-[100%] border border-[var(--accent)]/40"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--accent) 0%, transparent 65%)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* 3/4 ISOMETRIC FLOATING MACBOOK PRO */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ: 3,
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: { duration: 5.0, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-full transition-all duration-300"
      >
        {/* HOLOGRAPHIC SCREEN PROJECTION BEAM */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[85%] h-56 pointer-events-none -z-10 rounded-t-full opacity-40 blur-2xl transition-all"
          style={{
            background:
              "linear-gradient(to top, var(--accent), var(--brand-primary), transparent)",
          }}
        />

        {/* LAPTOP SCREEN CHASSIS */}
        <div
          className="relative rounded-[2.0rem] p-3 sm:p-3.5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-2 border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden backdrop-blur-2xl"
          style={{
            boxShadow:
              "0 20px 45px -10px rgba(0, 0, 0, 0.7), 0 0 35px var(--brand-primary-glow, rgba(79, 70, 229, 0.25))",
          }}
        >
          {/* Screen Camera & Sensor Notch */}
          <div className="w-full flex justify-center mb-1.5 z-30 relative">
            <div className="w-16 h-3 rounded-b-xl bg-slate-950 border-x border-b border-slate-700/60 flex items-center justify-center gap-1.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          {/* SCREEN INNER DASHBOARD CONTENT */}
          <div className="relative rounded-xl bg-[var(--bg-page)] border border-white/10 p-3 sm:p-4 overflow-hidden transition-colors duration-300 shadow-inner">
            {/* Ambient Screen Glow Overlay */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-30"
              style={{ backgroundColor: "var(--accent)" }}
            />

            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-light)] relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white flex items-center justify-center font-extrabold text-xs shadow-md">
                  SL
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[var(--text-primary)] tracking-tight">
                    SkillLoop Experience
                  </h3>
                  <p className="text-[9px] text-[var(--text-secondary)] font-medium">
                    AI P2P Learning Marketplace
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Coins Counter */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-500 font-extrabold text-[9px] shadow-xs">
                  <Coins size={11} className="animate-spin-slow" />
                  <span>2,450 COINS</span>
                </div>
                {/* AI Match Score Badge */}
                <div className="px-2 py-0.5 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] font-extrabold text-[9px] flex items-center gap-1 border border-[var(--accent)]/30 animate-pulse shadow-xs">
                  <Sparkles size={10} />
                  <span>98% MATCH</span>
                </div>
              </div>
            </div>

            {/* MAIN DASHBOARD BODY */}
            <div className="grid grid-cols-2 gap-2.5 my-2.5 relative z-10">
              {/* Mentor Summary Card inside screen */}
              <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)] flex flex-col justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                    SK
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[var(--text-primary)]">Sophia K.</h4>
                    <p className="text-[9px] text-[var(--text-secondary)]">React Specialist</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[9px] font-semibold">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star size={9} className="fill-amber-400" />
                    <span>5.0</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-bold text-[8px]">
                    120 Sessions
                  </span>
                </div>
              </div>

              {/* Student Summary Card inside screen */}
              <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)] flex flex-col justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[var(--accent)] to-[var(--brand-primary)] text-white font-bold text-[10px] flex items-center justify-center shadow-md">
                    JD
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[var(--text-primary)]">Alex R.</h4>
                    <p className="text-[9px] text-[var(--text-secondary)]">Learning React</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[9px] font-semibold text-emerald-500">
                  <span className="flex items-center gap-1 font-bold text-[8px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Session Active
                  </span>
                  <span className="text-[var(--text-secondary)] text-[8px]">Live 1-on-1</span>
                </div>
              </div>
            </div>

            {/* ACTIVE LEARNING TIMELINE & LIVE SESSION CONTROL BAR */}
            <div className="p-2.5 rounded-lg bg-gradient-to-r from-[var(--brand-primary)]/10 via-[var(--bg-surface)] to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-between relative z-10 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[var(--brand-primary)] text-white flex items-center justify-center shadow-md">
                  <TrendingUp size={13} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-[10px] font-bold text-[var(--text-primary)]">Level 4 Mastery</p>
                    <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">
                      +250 XP
                    </span>
                  </div>
                  <div className="w-24 sm:w-28 h-1.5 rounded-full bg-[var(--bg-input)] overflow-hidden mt-0.5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[var(--accent)]"
                      initial={{ width: "65%" }}
                      animate={{ width: isMatchActive ? "90%" : "78%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-3 py-1.5 rounded-lg text-[10px] font-extrabold shadow-md flex items-center gap-1 cursor-pointer"
              >
                <Video size={11} />
                <span>Join Live</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* LAPTOP KEYBOARD BASE & TRACKPAD */}
        <div className="relative w-[104%] -ml-[2%] h-5 sm:h-6 rounded-b-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-x-2 border-b-2 border-slate-600/70 shadow-[0_25px_50px_rgba(0,0,0,0.7)] flex flex-col items-center justify-between pt-1">
          {/* Opening Finger Groove Notch */}
          <div className="w-16 h-1 rounded-b-md bg-slate-950/90 border-x border-b border-slate-700/60" />
          
          {/* Glass Trackpad Outline */}
          <div className="w-20 h-2 rounded-t-md bg-slate-800/80 border-t border-x border-slate-600/40 mb-0.5" />
        </div>

        {/* SOFT AMBIENT REFLECTION & BASE GLOW SHADOW */}
        <div className="w-[90%] h-6 mx-auto rounded-full bg-[var(--brand-primary)]/30 blur-xl -mt-2 pointer-events-none" />
      </motion.div>
    </div>
  );
};
