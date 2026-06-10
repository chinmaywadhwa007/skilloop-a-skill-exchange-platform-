import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";

<motion.header
  initial={{ y: -80 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6 }}
></motion.header>
const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-indigo-500/10">
      <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between font-bold">

        <div className="flex items-center gap-10">
          <h1 className="text-4xl font-extrabold text-[#4648d4]">
            SkillLoop
          </h1>

          <ul className="hidden md:flex items-center gap-8 text-sm">
            <li className="text-[#4648d4] font-bold border-b-2 border-[#4648d4] pb-1 cursor-pointer">
              Explore
            </li>

            <li className="text-gray-600 hover:text-[#4648d4] transition-all cursor-pointer">
              Marketplace
            </li>

            <li className="text-gray-600 hover:text-[#4648d4] transition-all cursor-pointer">
              Leaderboard
            </li>

            <li className="text-gray-600 hover:text-[#4648d4] transition-all cursor-pointer">
              Dashboard
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4">

          <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
            <Search size={16} className="text-gray-500" />

            <input
              type="text"
              placeholder="Search skills..."
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 transition">
            <Bell size={18} />
          </button>

          <div className="w-8 h-8 rounded-full border border-gray-300 overflow-hidden ml-5">
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </nav>
    </header>
  );
};

export default Navbar;