import { Users, Coins, Brain } from "lucide-react";

const Features = () => {
  return (
    <section className="py-24 px-6 bg-[#f8f9ff]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-[#0b1c30] mb-4">
            Engineered for Growth
          </h2>

          <p className="text-lg text-[#464554] max-w-2xl mx-auto">
            Discover the pillars of our community that make SkillLoop the
            premier choice for lifelong learners.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-30">

          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-12 h-12 rounded-xl bg-[#6063ee] flex items-center justify-center">
              <Users className="text-white w-6 h-6" />
            </div>

            <h3 className="text-3xl font-bold text-[#0b1c30]">
              Peer-to-Peer Learning
            </h3>

            <p className="text-[#464554] leading-relaxed">
              Break free from traditional hierarchies. Learn directly from
              industry practitioners who are active in the field every day.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-12 h-12 rounded-xl bg-[#8455ef] flex items-center justify-center">
              <Coins className="text-white w-6 h-6" />
            </div>

            <h3 className="text-3xl font-bold text-[#0b1c30]">
              Earn Knowledge Coins
            </h3>

            <p className="text-[#464554] leading-relaxed">
              Our unique ecosystem rewards both learning and teaching.
              Accumulate coins to unlock premium courses or cash out.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

            <div className="w-12 h-12 rounded-xl bg-[#008096] flex items-center justify-center">
              <Brain className="text-white w-6 h-6" />
            </div>

            <h3 className="text-3xl font-bold text-[#0b1c30]">
              Expert Mentorship
            </h3>

            <p className="text-[#464554] leading-relaxed">
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