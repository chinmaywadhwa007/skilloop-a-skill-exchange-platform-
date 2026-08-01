import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Sparkles, Zap } from "lucide-react";

const ThemeTransitionOverlay = ({ isAnimating, transitionType, origin, onAnimationComplete }) => {
  if (!isAnimating) return null;

  const { x, y } = origin || { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  // Calculate maximum distance to screen corner from click origin for full coverage
  const maxDist = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  const targetRadius = maxDist * 1.3;

  const isOpeningDark = transitionType === "opening-dark";

  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {isAnimating && (
        <div className="aria-hidden fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
          {isOpeningDark ? (
            /* ============================================================ */
            /* 1. OPENING DARK MODE: COSMIC NIGHTFALL ECLIPSE RIPPLE (RADIAL) */
            /* ============================================================ */
            <motion.div
              key="opening-dark-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Expanding Dark Cosmic Circle (Slower, smoother wave) */}
              <motion.div
                initial={{
                  clipPath: `circle(0px at ${x}px ${y}px)`,
                }}
                animate={{
                  clipPath: `circle(${targetRadius}px at ${x}px ${y}px)`,
                }}
                transition={{
                  duration: 1.15,
                  ease: [0.25, 1, 0.35, 1], // Smooth cinematic expansion
                }}
                className="absolute inset-0 w-full h-full bg-slate-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950 via-slate-900 to-black flex items-center justify-center"
              >
                {/* Floating Cosmic Stars & Dust particles radiating from origin */}
                {[...Array(14)].map((_, i) => {
                  const angle = (i / 14) * Math.PI * 2;
                  const distance = 160 + (i % 3) * 80;
                  const targetX = Math.cos(angle) * distance;
                  const targetY = Math.sin(angle) * distance;

                  return (
                    <motion.div
                      key={`star-${i}`}
                      initial={{
                        x: x,
                        y: y,
                        opacity: 0,
                        scale: 0.2,
                        rotate: 0,
                      }}
                      animate={{
                        x: x + targetX,
                        y: y + targetY,
                        opacity: [0, 1, 0],
                        scale: [0.2, 1.5, 0.3],
                        rotate: 360,
                      }}
                      transition={{
                        duration: 1.1,
                        delay: 0.1 + i * 0.035,
                        ease: "easeOut",
                      }}
                      className="absolute left-0 top-0 pointer-events-none"
                    >
                      <Sparkles
                        size={18 + (i % 3) * 8}
                        className={i % 2 === 0 ? "text-indigo-400" : "text-cyan-300"}
                      />
                    </motion.div>
                  );
                })}

                {/* Central Moon Orbit Badge at origin point */}
                <motion.div
                  style={{ left: x, top: y }}
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{
                    scale: [0, 1.35, 1],
                    rotate: [-180, 25, 0],
                    opacity: [0, 1, 1],
                  }}
                  transition={{ duration: 0.9, delay: 0.15, ease: "backOut" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-6 rounded-full bg-indigo-950/80 border border-indigo-500/50 shadow-[0_0_60px_rgba(99,102,241,0.7)] backdrop-blur-md"
                >
                  <Moon className="w-14 h-14 text-amber-300 drop-shadow-[0_0_20px_rgba(252,211,77,0.9)]" />
                  {/* Glowing Cosmic Aura Ring */}
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* 2. CLOSING DARK MODE: SOLAR DAWN DIAGONAL SWEEP (LIGHT MODE) */
            /* ============================================================ */
            <motion.div
              key="closing-dark-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Diagonal Solar Light Ray Curtain (Slower, majestic sunrise wipe) */}
              <motion.div
                initial={{
                  clipPath: "polygon(100% 0, 100% 0, 100% 0, 100% 0)",
                }}
                animate={{
                  clipPath: "polygon(-50% -50%, 150% -50%, 150% 150%, -50% 150%)",
                }}
                transition={{
                  duration: 1.15,
                  ease: [0.22, 1, 0.36, 1], // Smooth solar wave
                }}
                className="absolute inset-0 w-full h-full bg-amber-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-100 via-orange-50 to-slate-50 flex items-center justify-center"
              >
                {/* Diagonal Solar Ray Stripes */}
                <div className="absolute inset-0 opacity-25 bg-[linear-gradient(45deg,transparent_25%,rgba(251,191,36,0.4)_50%,transparent_75%)] bg-[length:70px_70px]" />

                {/* Floating Solar Sparkle Flares */}
                {[...Array(14)].map((_, i) => {
                  const startX = window.innerWidth * (0.2 + (i / 14) * 0.8);
                  const startY = window.innerHeight * (i / 14);
                  return (
                    <motion.div
                      key={`sun-flare-${i}`}
                      initial={{ opacity: 0, scale: 0, y: -20 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.6, 0.7],
                        y: [0, 80],
                      }}
                      transition={{
                        duration: 1.0,
                        delay: 0.1 + i * 0.04,
                        ease: "easeOut",
                      }}
                      style={{ left: startX, top: startY }}
                      className="absolute pointer-events-none"
                    >
                      <Zap
                        size={20 + (i % 4) * 6}
                        className="text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]"
                      />
                    </motion.div>
                  );
                })}

                {/* Central Rising Solar Crest */}
                <motion.div
                  initial={{ scale: 0.2, rotate: -90, opacity: 0, y: 60 }}
                  animate={{
                    scale: [0.2, 1.4, 1],
                    rotate: [-90, 45, 0],
                    opacity: [0, 1, 1],
                    y: 0,
                  }}
                  transition={{ duration: 0.9, delay: 0.15, ease: "backOut" }}
                  className="relative flex items-center justify-center p-6 rounded-full bg-white/90 border border-amber-300/70 shadow-[0_0_70px_rgba(251,191,36,0.8)] backdrop-blur-md"
                >
                  <Sun className="w-14 h-14 text-amber-500 animate-spin-slow drop-shadow-[0_0_20px_rgba(245,158,11,0.9)]" />

                  {/* Pulsing Sunbeam Ring */}
                  <motion.div
                    animate={{ scale: [1, 2.2], opacity: [0.9, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-amber-400"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThemeTransitionOverlay;
