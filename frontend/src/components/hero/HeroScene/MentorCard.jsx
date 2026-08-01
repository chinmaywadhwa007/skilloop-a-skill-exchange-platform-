import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Award, ShieldCheck } from "lucide-react";

export const MentorCard = ({ isMatchActive, mouseX, mouseY }) => {
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
        y: isDragging ? 0 : [0, -8, 0],
        scale: isDragging ? 1.06 : 1.0,
      }}
      transition={
        isDragging
          ? { scale: { duration: 0.18 } }
          : {
              y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 320, damping: 22 },
            }
      }
      className={`p-4 rounded-3xl backdrop-blur-2xl w-60 z-30 relative cursor-grab active:cursor-grabbing select-none border transition-all duration-300 ${
        isMatchActive
          ? "border-[var(--accent)] shadow-[0_0_35px_rgba(6,182,212,0.35)] scale-105 bg-[var(--bg-surface)]/95"
          : "border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/25 shadow-xl bg-[var(--bg-surface)]/80"
      }`}
    >
      {/* Holographic Projection Base Glow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-10 pointer-events-none -z-10 rounded-full blur-xl opacity-40"
        style={{ backgroundColor: "var(--brand-primary)" }}
      />

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/15 border border-[var(--brand-primary)]/30 text-[10px] font-extrabold text-[var(--brand-primary)] shadow-xs">
          <Award size={13} />
          <span>TOP MENTOR</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-extrabold text-emerald-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Online</span>
        </div>
      </div>

      {/* Mentor Profile Details */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[var(--brand-primary)] to-[var(--brand-secondary)] p-0.5 shadow-md">
            <div className="w-full h-full rounded-[14px] bg-[var(--bg-surface)] flex items-center justify-center font-extrabold text-xs text-[var(--text-primary)]">
              SK
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 rounded-full p-0.5 shadow-xs">
            <ShieldCheck size={12} />
          </div>
        </div>

        <div>
          <h4 className="text-xs font-extrabold text-[var(--text-primary)]">Sophia K.</h4>
          <p className="text-[10px] font-semibold text-[var(--text-secondary)]">Frontend Expert</p>
          <div className="flex items-center gap-0.5 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[10px] font-extrabold text-[var(--text-primary)] ml-1">5.0</span>
          </div>
        </div>
      </div>

      {/* Skills Badges */}
      <div className="mt-3 pt-2.5 border-t border-white/15 dark:border-white/10">
        <p className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">
          Verified Skills
        </p>
        <div className="flex flex-wrap gap-1">
          <span className="px-2 py-0.5 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] font-extrabold text-[9px] border border-[var(--accent)]/20">
            React
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[var(--brand-primary)]/15 text-[var(--brand-primary)] font-extrabold text-[9px] border border-[var(--brand-primary)]/20">
            Node
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[var(--brand-secondary)]/15 text-[var(--brand-secondary)] font-extrabold text-[9px] border border-[var(--brand-secondary)]/20">
            System Design
          </span>
        </div>
      </div>

      {/* Footer Sessions Count */}
      <div className="mt-2.5 pt-2 border-t border-white/15 dark:border-white/10 flex items-center justify-between text-[10px]">
        <span className="text-[var(--text-secondary)] font-semibold">Sessions Completed</span>
        <span className="font-extrabold text-[var(--text-primary)] bg-[var(--bg-surface)] px-2 py-0.5 rounded-md border border-[var(--border-light)]">
          120 Sessions
        </span>
      </div>
    </motion.div>
  );
};
