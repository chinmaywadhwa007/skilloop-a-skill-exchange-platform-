import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

export const DraggableSkillCard = ({
  id,
  label,
  icon: Icon,
  color,
  top,
  left,
  right,
  bottom,
  duration = 5.5,
  delay = 0,
  draggedCardId,
  setDraggedCardId,
  cardPositionsRef,
  mouseX,
  mouseY,
  parallaxFactor = 0.4,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [particles, setParticles] = useState([]);
  const cardRef = useRef(null);

  // Drag Motion Values & Ultra-Smooth Springs
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const smoothDragX = useSpring(dragX, { stiffness: 220, damping: 24 });
  const smoothDragY = useSpring(dragY, { stiffness: 220, damping: 24 });

  // Dynamic 3D Tilt from Drag Movement (max 8 degrees)
  const dragRotateX = useTransform(smoothDragY, [-100, 100], [8, -8]);
  const dragRotateY = useTransform(smoothDragX, [-100, 100], [-8, 8]);

  // Parallax Mouse Tilt via Framer Motion transforms (Zero re-renders!)
  const mouseRotateX = useTransform(mouseY, [-20, 20], [-6 * parallaxFactor, 6 * parallaxFactor]);
  const mouseRotateY = useTransform(mouseX, [-20, 20], [-6 * parallaxFactor, 6 * parallaxFactor]);

  // Particle Trail Generator during drag
  const handleDrag = (event, info) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      cardPositionsRef.current[id] = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    if (Math.random() > 0.45) {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: info.point.x,
        y: info.point.y,
      };
      setParticles((prev) => [...prev.slice(-6), newParticle]);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setDraggedCardId(id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedCardId(null);
    setTimeout(() => {
      setParticles([]);
    }, 400);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 350);
  };

  return (
    <div
      ref={cardRef}
      style={{ top, left, right, bottom }}
      className="absolute pointer-events-auto z-30"
    >
      {/* TRAILING PARTICLE SPARKS */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0.2, y: 8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: "fixed",
              left: p.x,
              top: p.y,
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              backgroundColor: color,
              boxShadow: `0 0 12px ${color}`,
              pointerEvents: "none",
              zIndex: 50,
            }}
          />
        ))}
      </AnimatePresence>

      {/* DRAGGABLE CARD CONTAINER */}
      <motion.div
        drag
        dragConstraints={{ left: -160, right: 160, top: -160, bottom: 160 }}
        dragElastic={0.6}
        dragSnapToOrigin={true}
        dragTransition={{
          bounceStiffness: 170,
          bounceDamping: 20,
          mass: 0.75,
        }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        style={{
          x: smoothDragX,
          y: smoothDragY,
          rotateX: isDragging ? dragRotateX : mouseRotateX,
          rotateY: isDragging ? dragRotateY : mouseRotateY,
        }}
        animate={{
          y: isDragging ? 0 : [0, -8, 0],
          rotateZ: isDragging ? 0 : [-2.5, 2.5, -2.5],
          scale: isDragging ? 1.08 : isClicked ? 1.12 : isHovered ? 1.06 : 1.0,
        }}
        transition={
          isDragging
            ? { scale: { duration: 0.18, ease: "easeOut" } }
            : {
                y: { duration, repeat: Infinity, ease: "easeInOut", delay },
                rotateZ: { duration: duration * 1.25, repeat: Infinity, ease: "easeInOut", delay },
                scale: { type: "spring", stiffness: 320, damping: 22 },
              }
        }
        className={`px-3 py-2.5 rounded-2xl backdrop-blur-xl cursor-grab active:cursor-grabbing select-none transition-all duration-300 flex items-center gap-2.5 border ${
          isDragging
            ? "bg-[var(--bg-surface)]/95 border-[var(--accent)] shadow-[0_20px_45px_rgba(0,0,0,0.45)] ring-2 ring-[var(--accent)]/40"
            : isHovered
            ? "bg-[var(--bg-surface)]/90 border-white/40 dark:border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.25)]"
            : "bg-[var(--bg-surface)]/75 border-white/20 dark:border-white/10 shadow-lg"
        }`}
      >
        {/* Shiny 3D Metallic Icon Box */}
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:rotate-12"
          style={{
            background: `linear-gradient(135deg, ${color}, var(--brand-primary))`,
            boxShadow: isDragging ? `0 0 14px ${color}` : `0 2px 6px ${color}35`,
          }}
        >
          <Icon size={16} />
        </div>

        <span className="text-[11px] font-extrabold text-[var(--text-primary)] pr-1 tracking-tight">
          {label}
        </span>

        {/* CLICK RIPPLE ANIMATION */}
        {isClicked && (
          <motion.span
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 2.0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 rounded-2xl border-2 border-[var(--accent)] pointer-events-none"
          />
        )}
      </motion.div>
    </div>
  );
};
