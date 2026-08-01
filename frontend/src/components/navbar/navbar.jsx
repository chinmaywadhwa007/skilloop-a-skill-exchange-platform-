import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../../components/common/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 glass-nav text-theme"
    >
      {/* Top Subtle Prism Highlight Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--brand-primary)] to-transparent opacity-30" />

      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between font-semibold">

        {/* Left Section - Brand & Navigation */}
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="group relative flex items-center gap-2 text-2xl font-black tracking-tight"
          >
            <span className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] bg-clip-text text-transparent transition-all duration-300 group-hover:opacity-90">
              SkillLoop
            </span>
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-sm">
            <li className="relative py-1 font-bold text-[var(--brand-primary)] cursor-pointer group">
              <span>Explore</span>
              <motion.div
                layoutId="activeNav"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-[var(--brand-primary)]"
              />
            </li>

            <li className="relative py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group">
              <span>Marketplace</span>
            </li>

            <li className="relative py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group">
              <span>Leaderboard</span>
            </li>

            <li
              onClick={() => navigate("/dashboard")}
              className="relative py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
            >
              <span>Dashboard</span>
            </li>
          </ul>
        </div>

        {/* Right Section - Search & Controls */}
        <div className="flex items-center gap-4">

          {/* Search Pill */}
          <div className="hidden lg:flex items-center rounded-full px-4 py-2 w-64 glass-pill transition-all focus-within:ring-2 focus-within:ring-[var(--brand-primary)]">
            <Search size={16} className="text-[var(--text-secondary)] shrink-0" />
            <input
              type="text"
              placeholder="Search skills..."
              className="bg-transparent outline-none ml-2 w-full text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]"
            />
          </div>

          <ThemeToggle />

          {/* Notifications Button */}
          <button
            className="relative p-2.5 rounded-full glass-pill text-[var(--text-primary)] hover:scale-105 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber-400 ring-2 ring-[var(--glass-bg)]" />
          </button>

          {/* User Avatar */}
          <div
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 rounded-full overflow-hidden ml-1 p-[1.5px] bg-gradient-to-tr from-[var(--brand-primary)] to-[var(--accent)] cursor-pointer hover:scale-105 transition-all shadow-sm"
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

        </div>

      </nav>
    </motion.header>
  );
};

export default Navbar;
