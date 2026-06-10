import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            relative
            overflow-hidden
            rounded-[3rem]
            px-8
            py-24
            text-center
            bg-gradient-to-r
            from-[#4648d4]
            to-[#6b38d4]
            shadow-2xl
          "
        >

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white rounded-full blur-[120px]" />

            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-white rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">

            <h2 className="text-white font-extrabold text-5xl lg:text-7xl">
              Ready to join the loop?
            </h2>

            <p className="text-[#d0bcff] text-lg max-w-2xl mx-auto mt-6">
              Start your journey today and become part of the world's most
              advanced skill exchange ecosystem.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => navigate("/register")}
                className="
                  bg-white
                  text-[#4648d4]
                  px-10
                  py-4
                  rounded-xl
                  font-bold
                  shadow-lg
                  cursor-pointer
                "
              >
                Create Account
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() => navigate("/login")}
                className="
                  border-2
                  border-[#d0bcff]
                  text-white
                  px-10
                  py-4
                  rounded-xl
                  font-bold
                  hover:bg-white/10
                  transition
                  cursor-pointer
                "
              >
                Sign in
              </motion.button>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default CTA;