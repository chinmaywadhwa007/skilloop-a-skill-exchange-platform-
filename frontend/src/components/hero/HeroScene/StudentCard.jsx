import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, BookOpen, Flame, PlayCircle } from "lucide-react";

export const StudentCard = ({ isMatchActive, xpGained, mouseX, mouseY }) => {
  const [isDragging, setIsDragging] = useState(false);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const smoothDragX = useSpring(dragX, { stiffness: 220, damping: 24 });
  const smoothDragY = useSpring(dragY, { stiffness: 220, damping: 24 });

  const dragRotateX = useTransform(smoothDragY, [-100, 100], [8, -8]);
  const dragRotateY = useTransform(smoothDragX, [-100, 100], [-8, 8]);

  const mouseRotateX = useTransform(mouseY, [-20, 20], [-6, 6]);
  const mouseRotateY = useTransform(mouseX, [-20, 20], [-6, 6]);

  return (
    <motion.div
      drag
      dragConstraints={{ left: -140, right: 140, top: -140, bottom: 140 }}
      dragElastic={0.6}
      dragSnapToOrigin={true}
      dragTransition={{ bounceStiffness: 170, bounceDamping: 20, mass: 0.75 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        x: smoothDragX,
        y: smoothDragY,
        rotateX: isDragging ? dragRotateX : mouseRotateX,
        rotateY: isDragging ? dragRotateY : mouseRotateY,
      }}
      animate={{
        y: isDragging ? 0 : [0, -10, 0],
        scale: isDragging ? 1.06 : 1.0,
      }}
      transition={
        isDragging
          ? { scale: { duration: 0.18 } }
          : {
              y: { duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
              scale: { type: "spring", stiffness: 320, damping: 22 },
            }
      }
      className={`p-4 rounded-3xl backdrop-blur-2xl w-60 z-30 relative cursor-grab active:cursor-grabbing select-none border transition-all duration-300 ${
        isMatchActive
          ? "border-[var(--brand-secondary)] shadow-[0_0_35px_rgba(124,58,237,0.35)] scale-105 bg-[var(--bg-surface)]/95"
          : "border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/25 shadow-xl bg-[var(--bg-surface)]/80"
      }`}
    >
      {/* Floating XP Gain Popup Notification */}
      <AnimatePresence>
        {xpGained && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: -26, scale: 1.15 }}
            exit={{ opacity: 0, y: -42, scale: 0.9 }}
            className="absolute -top-7 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-xl flex items-center gap-1.5 border border-amber-200 z-40"
          >
            <Flame size={13} className="fill-slate-950" />
            <span>+250 XP EARNED!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Holographic Projection Base Glow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-10 pointer-events-none -z-10 rounded-full blur-xl opacity-40"
        style={{ backgroundColor: "var(--accent)" }}
      />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[10px] font-extrabold text-[var(--accent)] shadow-xs">
          <BookOpen size={13} />
          <span>STUDENT</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/30 text-[10px] font-extrabold text-[var(--brand-primary)] animate-pulse">
          <Sparkles size={11} />
          <span>98% AI Match</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-[var(--brand-primary)] p-0.5 shadow-md">
          <div className="w-full h-full rounded-[14px] bg-[var(--bg-surface)] flex items-center justify-center font-extrabold text-xs text-[var(--text-primary)]">
            JD
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[var(--text-primary)]">Alex R.</h4>
          <p className="text-[10px] font-semibold text-[var(--text-secondary)]">Learning React</p>
          <div className="flex items-center gap-1.5 mt-1 text-[10px] font-extrabold text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Session Active</span>
          </div>
        </div>
      </div>

      {/* Current Course & Progress */}
      <div className="mt-3 pt-2.5 border-t border-white/15 dark:border-white/10">
        <div className="flex items-center justify-between text-[9px] font-bold mb-1">
          <span className="text-[var(--text-secondary)] flex items-center gap-1">
            <PlayCircle size={11} className="text-[var(--accent)]" />
            <span>Current Course</span>
          </span>
          <span className="text-[var(--accent)] font-extrabold">78%</span>
        </div>
        <p className="text-[10px] font-extrabold text-[var(--text-primary)] mb-1 truncate">
          Full-Stack React & Next.js
        </p>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[var(--bg-input)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--accent)]"
            initial={{ width: "65%" }}
            animate={{ width: isMatchActive ? "92%" : "78%" }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Level & XP Footer */}
      <div className="mt-2.5 pt-2 border-t border-white/15 dark:border-white/10 flex items-center justify-between text-[10px]">
        <span className="text-[var(--text-secondary)] font-semibold">Skill Level</span>
        <span className="font-extrabold text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-2 py-0.5 rounded-md border border-[var(--brand-primary)]/20">
          Level 4 (1,850 XP)
        </span>
      </div>
    </motion.div>
  );
};
