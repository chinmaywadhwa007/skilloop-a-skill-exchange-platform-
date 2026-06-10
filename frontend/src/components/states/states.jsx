import { useEffect, useState } from "react";

const Counter = ({ end, suffix }) => {
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
    <h2 className="text-5xl font-bold">
      {count}
      {suffix}
    </h2>
  );
};

const Stats = () => {
  return (
    <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-12">

      <div className="text-center">
        <h2 className="text-6xl font-bold text-[#4648d4]">
          0K+
        </h2>

        <p className="mt-2 text-xs font-bold uppercase tracking-[3px] text-gray-500">
          Learners Globally
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-6xl font-bold text-[#6b38d4]">
          0k+
        </h2>

        <p className="mt-2 text-xs font-bold uppercase tracking-[3px] text-gray-500">
          Expert Mentors
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-6xl font-bold text-[#006577]">
          0M+
        </h2>

        <p className="mt-2 text-xs font-bold uppercase tracking-[3px] text-gray-500">
          Coins Earned
        </p>
      </div>

    </div>
  </div>
</section>
  );
};

export default Stats;