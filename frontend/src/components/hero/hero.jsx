import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sparkles, ArrowRight, Award, Zap } from "lucide-react";

import HeroScene from "./HeroScene/HeroScene";

const Hero = () => {
  const navigate = useNavigate();

  const [rotate, setRotate] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;

    setRotate({
      x: rotateX,
      y: rotateY,
    });
  };

  const resetRotation = () => {
    setRotate({
      x: 0,
      y: 0,
    });
  };

  return (
    <section className="pt-28 pb-16 min-h-screen relative overflow-hidden bg-app text-theme transition-colors duration-300">
      {/* Background Glow Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] opacity-25 dark:opacity-20 rounded-full blur-[140px] transition-all"
          style={{
            backgroundColor: "var(--brand-primary)",
          }}
        />

        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] opacity-25 dark:opacity-20 rounded-full blur-[140px] transition-all"
          style={{
            backgroundColor: "var(--brand-secondary)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-surface border border-theme text-theme shadow-xs">
            <Sparkles size={14} className="text-amber-500" />
            <span>NEW: AI-POWERED SKILL MATCHING</span>
          </div>

          <h1 className="mt-4 text-6xl lg:text-7xl leading-[1.1] font-extrabold text-[var(--text-primary)] tracking-tight">
            Learn,
            <br />
            Teach,
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">
              Earn.
            </span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl max-w-xl text-[var(--text-secondary)] leading-relaxed">
            The ultimate high-end ecosystem for peer-to-peer knowledge exchange.
            Master new skills, mentor rising stars, and unlock financial rewards.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 items-center">

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/register")}
              className="btn-primary px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/25 cursor-pointer flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/marketplace")}
              className="btn-secondary px-8 py-4 rounded-xl font-semibold shadow-sm cursor-pointer transition-all duration-300"
            >
              Explore Skills
            </motion.button>

          </div>

        </motion.div>

        {/* RIGHT SIDE 3D HERO ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          <HeroScene />
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;