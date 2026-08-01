import { Sun, Moon, Sparkles } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme, isAnimating } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.08, rotate: isDark ? -8 : 8 }}
      whileTap={{ scale: 0.92, rotate: isDark ? 15 : -15 }}
      onClick={(e) => toggleTheme(e)}
      disabled={isAnimating}
      className={`relative group flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-md ${
        isDark
          ? "bg-slate-900/90 border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]"
          : "bg-white/90 border-amber-300/60 text-amber-500 shadow-[0_4px_16px_rgba(251,191,36,0.2)] hover:border-amber-400 hover:shadow-[0_4px_22px_rgba(251,191,36,0.4)]"
      }`}
      aria-label="Toggle theme mode"
      title={isDark ? "Switch to daylight mode" : "Switch to cosmic dark mode"}
    >
      {/* Dynamic Hover Particle Glow Background */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl ${
          isDark
            ? "bg-gradient-to-tr from-indigo-900/40 via-purple-900/30 to-cyan-900/40"
            : "bg-gradient-to-tr from-amber-100/60 via-orange-100/40 to-yellow-100/60"
        }`}
      />

      {/* Button Ambient Ring Light */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -inset-1 rounded-2xl blur-sm pointer-events-none ${
          isDark ? "bg-indigo-500/30" : "bg-amber-400/30"
        }`}
      />

      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          /* ================================================ */
          /* MOON ICON (DARK MODE ACTIVE) - Opening Dark Anim */
          /* ================================================ */
          <motion.div
            key="dark-moon-icon"
            initial={{ scale: 0.2, rotate: -180, y: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
            exit={{ scale: 0.2, rotate: 180, y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <Moon size={22} className="text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles size={10} className="text-indigo-300 opacity-80" />
            </motion.div>
          </motion.div>
        ) : (
          /* ================================================ */
          /* SUN ICON (LIGHT MODE ACTIVE) - Closing Dark Anim */
          /* ================================================ */
          <motion.div
            key="light-sun-icon"
            initial={{ scale: 0.2, rotate: 180, y: 20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
            exit={{ scale: 0.2, rotate: -180, y: -20, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <Sun size={22} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-spin-slow" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;