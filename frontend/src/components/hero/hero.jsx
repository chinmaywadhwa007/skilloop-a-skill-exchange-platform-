// this  is the third party services from the react used to create the smooth animmation and transition

import { motion } from "framer-motion";
//they both are hooks and hooks are the imp thing in the react or we can say that they are the special function that allows us to use react features such as state and routing inside the functional components 

// what is usenavigate means when we have to navigate through pages 
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// this is the funnctional component in the js function that return jsx it is the morden way of creacting react compeninents and supports hooks like usettate and useeffect
const Hero = () => {
  const navigate = useNavigate();

  const [rotate, setRotate] =
    // usestetes is used to manage components state. whenever the state changes using the setter function react re-renders the components with updated values 
    useState({
      x: 0,
      y: 0,
    });
    // this is the eventhandler as the eventhandler in the norrmal js in react is similar to js but use the chamelcase syntaxx such as onclick and onchange 
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    // this is  the virtual dom where we use  the  mouse to  rotate the components but it didn't touch the real dom 
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
    // this whole line is the jsx it looks like html but in actual its jsx 
    // jsx stand for js xml it  allows us to write the html like structure inside the js and react convert behind the scane into the functional call 
    <section className="pt-20 min-h-screen relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4648d4] opacity-20 rounded-full blur-[120px]" />

        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-[#6b38d4] opacity-20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center min-h-[90vh]">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="inline-block bg-[#e1e0ff] text-[#2f2ebe] px-4 py-2 rounded-full text-xs text-label-sm font-bold, font-semibold">
            NEW: AI-POWERED SKILL MATCHING
          </div>

          <h1 className="mt-2  text-[72px] leading-[80px] font-extrabold text-2xl">
            Learn,
            <br />
            Teach,
            <br />

            <span className="bg-gradient-to-r from-[#4648d4] to-[#6b38d4] bg-clip-text text-transparent">
              Earn.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            The ultimate high-end ecosystem for peer-to-peer knowledge exchange.
            Master new skills, mentor rising stars, and unlock financial rewards.
          </p>

          <div className="mt-10 flex gap-4">

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white font-semibold shadow-lg cursor-pointer"
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => navigate("/marketplace")}
              className="relative overflow-hidden  px-8 py-4 rounded-2xl backdrop-blur-xl   bg-white/20 border  border-white/30 shadow-lg  text-[#4648d4] font-semibold  cursor-pointer transition-all  duration-300 hover:shadow-[0_0_30px_rgba(70,72,212,0.35)]  hover:border-[#4648d4]/40"
            >
              <span className="relative z-10">
                Explore Skills
              </span>

              {/* Shine Effect */}
              <span
                className=" absolute  top-0    h-full w-1/2    via-white/60 to-transparent skew-x-12  transition-all  duration-700  group-hover:left-[150%] "
              />
            </motion.button>

          </div>

        </motion.div>

        {/* image section */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={resetRotation}
          initial={{ opacity: 0, x: 80 }}
          animate={{
            opacity: 1,
            x: 0,
            rotateX: rotate.x,
            rotateY: rotate.y,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            rotateX: {
              type: "spring",
              stiffness: 120,
              damping: 15,
            },
            rotateY: {
              type: "spring",
              stiffness: 120,
              damping: 15,
            },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "circIn",
            },
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          className="relative"
        >

          <div className="glass-card p-4 rounded-[2rem] aspect-square flex items-center justify-center relative overflow-hidden group text-label-sm ,font-bold">

            <img
              src="../../../public/ChatGPT Image Jun 4, 2026, 09_46_57 PM.png"
              alt="SkillLoop Hero"
              className="w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-110"
            />

            <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-lg flex items-center gap-2">

              <span className="text-[#6b38d4] text-lg">
                ⭐
              </span>

              <span className="text-sm , text-label-sm, font-bold, bg-amber-950 text-amber-50">
                Top Rated: Web3 Design
              </span>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;