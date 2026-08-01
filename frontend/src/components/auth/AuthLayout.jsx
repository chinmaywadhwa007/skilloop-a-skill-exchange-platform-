import ThemeToggle from "../common/ThemeToggle";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <main className="min-h-screen flex bg-app text-theme transition-colors duration-300">

      {/* Left Side */}
      <section className="hidden md:flex md:w-1/2 relative overflow-hidden items-center justify-center px-12 bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-secondary)] to-[#006577]">

        {/* Floating Glow */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-white/20 rounded-xl rotate-12"></div>

        <div className="relative z-10 max-w-lg">

          <div className="mb-8">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              SkillLoop
            </h1>
          </div>

          <h2 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Turn your curiosity
            <br />
            into
            <span className="text-cyan-300"> mastery.</span>
          </h2>

          <div className="h-1 w-24 bg-white/30 rounded-full mt-6 mb-8"></div>

          <p className="text-xl text-white/90 italic leading-relaxed">
            "Knowledge is the only asset that grows when shared.
            SkillLoop is where curious minds learn, teach and
            build the future together."
          </p>

          <div className="mt-10 flex items-center gap-4">

            <div className="flex -space-x-3">
              <img
                src="https://i.pravatar.cc/100?img=1"
                alt="user"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/100?img=2"
                alt="user"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <img
                src="https://i.pravatar.cc/100?img=3"
                alt="user"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            </div>

            <span className="text-white/80 text-sm font-medium">
              Joined by 12k+ learners today
            </span>

          </div>

        </div>

      </section>

      {/* Right section */}
      <section className="w-full md:w-1/2 flex items-center justify-center p-8 bg-app relative">

        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-lg glass-card p-8 rounded-3xl border border-theme shadow-xl">

          <h2 className="text-3xl font-bold text-[var(--text-primary)]">
            {title}
          </h2>

          <p className="text-[var(--text-secondary)] mt-2 mb-6">
            {subtitle}
          </p>

          {children}

        </div>

      </section>

    </main>
  );
};

export default AuthLayout;