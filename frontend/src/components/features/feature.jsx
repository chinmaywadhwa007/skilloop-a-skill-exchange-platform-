import { Users, Coins, Brain } from "lucide-react";

const Features = () => {
  return (
    <section className="py-24 px-6 bg-app transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight">
            Engineered for Growth
          </h2>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover the pillars of our community that make SkillLoop the
            premier choice for lifelong learners.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Users className="text-white w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Peer-to-Peer Learning
            </h3>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              Break free from traditional hierarchies. Learn directly from
              industry practitioners who are active in the field every day.
            </p>

          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-14 h-14 rounded-2xl bg-[var(--brand-secondary)] flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Coins className="text-white w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Earn Knowledge Coins
            </h3>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our unique ecosystem rewards both learning and teaching.
              Accumulate coins to unlock premium courses or cash out.
            </p>

          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Brain className="text-white w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Expert Mentorship
            </h3>

            <p className="text-[var(--text-secondary)] leading-relaxed">
              Get personalized guidance through one-on-one sessions with
              verified experts. Fast-track your career with direct feedback.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Features;