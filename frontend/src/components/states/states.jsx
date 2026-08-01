import { useEffect, useState } from "react";

const Counter = ({ end, suffix, color }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <h2
      className="text-5xl lg:text-6xl font-extrabold tracking-tight"
      style={{ color }}
    >
      {count}
      {suffix}
    </h2>
  );
};

const Stats = () => {
  return (
    <section className="py-20 bg-app transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center glass-card p-10 rounded-3xl border border-theme">

          <div className="p-4 hover:scale-105 transition-transform duration-300">
            <Counter
              end={500}
              suffix="K+"
              color="var(--brand-primary)"
            />
            <p className="mt-3 text-xs font-bold uppercase tracking-[3px] text-muted">
              Learners Globally
            </p>
          </div>

          <div className="p-4 hover:scale-105 transition-transform duration-300">
            <Counter
              end={10}
              suffix="K+"
              color="var(--brand-secondary)"
            />
            <p className="mt-3 text-xs font-bold uppercase tracking-[3px] text-muted">
              Expert Mentors
            </p>
          </div>

          <div className="p-4 hover:scale-105 transition-transform duration-300">
            <Counter
              end={2}
              suffix="M+"
              color="var(--accent)"
            />
            <p className="mt-3 text-xs font-bold uppercase tracking-[3px] text-muted">
              Coins Earned
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;