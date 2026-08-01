import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-app transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            relative
            overflow-hidden
            rounded-[3rem]
            px-8
            py-20
            text-center
            bg-gradient-to-r
            from-[var(--brand-primary)]
            to-[var(--brand-secondary)]
            shadow-2xl
            border
            border-white/10
          "
        >

          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-white rounded-full blur-[120px]" />
            <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-white rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">

            <h2 className="text-white font-extrabold text-4xl lg:text-6xl tracking-tight">
              Ready to join the loop?
            </h2>

            <p className="text-indigo-100 text-lg max-w-2xl mx-auto mt-6">
              Start your journey today and become part of the world's most
              advanced skill exchange ecosystem.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="
                  bg-white
                  text-[var(--brand-primary)]
                  px-9
                  py-4
                  rounded-xl
                  font-bold
                  shadow-lg
                  hover:bg-slate-50
                  cursor-pointer
                  transition-colors
                "
              >
                Create Account
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="
                  border-2
                  border-white/40
                  text-white
                  px-9
                  py-4
                  rounded-xl
                  font-bold
                  hover:bg-white/10
                  transition-colors
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