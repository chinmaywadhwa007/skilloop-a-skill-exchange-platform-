
import { useState } from "react";
import {
  Home,
  BarChart3,
  Users,
  BookOpen,
  FileQuestion,
  Trophy,
  ShoppingBag,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Plus,
  Coins,
  LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff]">

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-indigo-500/10">
        <nav className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between font-bold">

          <div className="flex items-center gap-10">
            <h1 className="text-4xl  font-extrabold text-[#4648d4]">
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

            <button
              onClick={handleLogout}
              title="Log out"
              className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            >
              <LogOut size={18} />
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

      <div className="flex">

        <aside
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
          className={`
    fixed
    top-16
    left-0
    h-[calc(100vh-64px)]
    bg-white/70
    backdrop-blur-xl
    border-r
    border-white/30
    shadow-2xl
    flex
    flex-col
    p-4
    transition-all
    duration-300
    z-40
    ${sidebarOpen ? "w-60" : "w-20"}
  `}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3">

              <div
                className="
          w-10
          h-10
          rounded-xl
          bg-gradient-to-r
          from-[#4648d4]
          to-[#6b38d4]
          flex
          items-center
          justify-center
          text-white
          shrink-0
        "
              >
                <BarChart3 size={20} />
              </div>

              {sidebarOpen && (
                <div>
                  <h3 className="font-semibold  text-[#4648d4] text-3xl">
                    Dashboard
                  </h3>

                  <p className="text-shadow-cyan-700 text-gray-500">
                    Management Console
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">

            <button className="flex items-center gap-3 w-full p-4 font-semibold rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all">
              <BarChart3 size={24}
                className="shrink-0" />
              {sidebarOpen && <span>Analytics</span>}
            </button>

            <button className="flex items-center gap-3 w-full p-4 font-semibold rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all">
              <Users size={20} className="shrink-0" />
              {sidebarOpen && <span>take quizz</span>}
            </button>

            <button className="flex items-center gap-3 w-full p-4 font-semibold rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all">
              <BookOpen size={20} className="shrink-0" />
              {sidebarOpen && <span>Skills</span>}
            </button>

            <button className="flex items-center gap-3 w-full p-4 font-semibold rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all ">
              <FileQuestion size={20} className="shrink-0" />
              {sidebarOpen && <span>find experts </span>}
            </button>
            <button className="flex items-center gap-3 w-full p-4 font-semibold rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all ">
              <FileQuestion size={20} className="shrink-0" />
              {sidebarOpen && <span>Leaderboard </span>}
            </button>


          </nav>

          {/* Bottom */}
          <div>

            <button
              className="
        w-full
        py-4
        rounded-xl
        bg-gradient-to-r
        from-[#4648d4]
        to-[#6b38d4]
        text-white
        font-semibold
        shadow-lg
        hover:scale-[1.02]
        active:scale-95
        transition-all
        flex
        items-center
        justify-center
        gap-3
      "
            >
              <Plus size={20} />
              {sidebarOpen && <span>New Skill</span>}
            </button>

            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">

              <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all">
                <Settings size={20} />
                {sidebarOpen && <span>Settings</span>}
              </button>

              <button className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-600 border-l-4 border-transparent hover:border-[#4648d4] hover:text-[#4648d4] transition-all">
                <HelpCircle size={20} />
                {sidebarOpen && <span>Support</span>}
              </button>

            </div>

          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`
    flex-1
    pt-24
    px-8
    flex-col
    transition-all
    duration-300
    ${sidebarOpen ? "ml-64" : "ml-20"}
  `}
        >
          {/* Welcome Header */}
          <div className="mb-10 ">

            <h1 className="text-5xl font-bold text-[#0b1c30]">
              Welcome back,

              <span className="text-[#4648d4]">
                {" "}{currentUser?.name}
              </span>
              !
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              You've mastered 4 new skills this month.
              Keep the momentum going!
            </p>

          </div>
          <div className="flex gap-6 items-start">
            {/* Bento Grid   left corner  */}
            <div className="col-span-3 w-80 flex flex-col gap-4">

              <div
                className="
    col-span-3
    bg-white
    rounded-3xl
    p-6
    shadow-lg
    relative
    overflow-hidden
    group
    hover:-translate-y-2
    hover:shadow-xl
    hover:bg-[#4648d4]
    cursor-pointer
    transition-all
    duration-300
  "
              >

                {/* Decorative Circle */}
                <div
                  className="
      absolute
      top-0
      right-0
      w-20
      h-20
      bg-[#4648d4]/10
      rounded-full
      translate-x-8
      -translate-y-8
      group-hover:bg-white/20
      group-hover:scale-125
      transition-all
      duration-300
    "
                />

                {/* Title */}
                <p
                  className="
      uppercase
      text-2xl
      font-bold
      tracking-wider
      text-gray-400
      group-hover:text-white
      transition-all
      duration-300
    "
                >
                  Skill Credits
                </p>

                {/* Coin + Number */}
                <div className="flex items-center gap-2 mt-4">

                  <Coins
                    size={40}
                    className="
        text-[#4648d4]
        group-hover:text-white
        transition-all
        duration-300
      "
                  />

                  <span
                    className="
        text-3xl
        font-extrabold
        text-[#1a1a1a]
        group-hover:text-white
        transition-all
        duration-300
      "
                  >
                    1,240
                  </span>

                </div>

                {/* Growth Text */}
                <p
                  className="
      mt-4
      text-green-500
      text-sm
      flex
      items-center
      gap-1
      group-hover:text-green-200
      transition-all
      duration-300
    "
                >
                  ↗ +12% from last week
                </p>

              </div>

              {/* Active Courses */}
              <div
                className="
    group
    col-span-3
    bg-white
    rounded-3xl
    p-6
    shadow-lg
    hover:-translate-y-2
    hover:shadow-xl
    hover:bg-[#4648d4]
    cursor-pointer
    transition-all
    duration-300
  "
              >
                <p
                  className="
      uppercase
      text-xl
      font-semibold
      text-gray-500
      group-hover:text-white
      transition-all
      duration-300
    "
                >
                  Active Courses
                </p>

                <h2
                  className="
      text-5xl
      font-bold
      mt-4
      text-gray-900
      group-hover:text-white
      transition-all
      duration-300
    "
                >
                  6
                </h2>

                <p
                  className="
      text-gray-500
      mt-4
      group-hover:text-white/80
      transition-all
      duration-300
    "
                >
                  2 nearing completion
                </p>
              </div>

              {/* Learning Hours */}
              <div
                className="
    group
    bg-white
    rounded-3xl
    p-6
    shadow-lg
    hover:bg-[#4648d4]
    hover:-translate-y-2
    hover:shadow-xl
    transition-all
    duration-300
    cursor-pointer
  "
              >
                <p className="uppercase text-xl font-semibold text-gray-500 group-hover:text-white">
                  Learning Hours
                </p>

                <h2 className="text-5xl font-bold mt-4 group-hover:text-white">
                  42.5
                </h2>

                <p className="text-gray-500 mt-4 group-hover:text-white/80">
                  This month
                </p>
              </div>

              {/* Current Level */}
              <div
                className="
    group
    bg-white
    rounded-3xl
    p-6
    shadow-xl
    cursor-pointer
    transition-all
    duration-300
    hover:bg-[#4648d4]
    hover:-translate-y-2
    hover:shadow-2xl
  "
              >
                <p
                  className="
      uppercase
      text-xl
      font-semibold
      text-gray-500
      group-hover:text-white
      transition-all
      duration-300
    "
                >
                  Current Level
                </p>

                <h2
                  className="
      text-5xl
      font-bold
      mt-4
      text-black
      group-hover:text-white
      transition-all
      duration-300
    "
                >
                  12
                </h2>

                <p
                  className="
      mt-4
      text-gray-600
      group-hover:text-white/80
      transition-all
      duration-300
    "
                >
                  Advanced Learner
                </p>
              </div>
            </div>
            <div className="col-span-4">
              <div className="bg-white rounded-3xl p-6 shadow-xl h-full w-80">

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">
                    Current Skill
                  </h3>

                  <button>⋮</button>
                </div>

                <div className="flex justify-center">

                  <div className="relative w-48 h-48">

                    <svg
                      className="w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />

                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#4648d4"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold text-[#4648d4]">
                        75%
                      </span>

                      <span className="text-gray-500">
                        Completed
                      </span>
                    </div>

                  </div>

                </div>

                <div className="text-center mt-6">
                  <h3 className="text-2xl font-semibold">
                    Advanced React
                  </h3>

                  <p className="text-gray-500">
                    Module 4: Performance Patterns
                  </p>
                </div>

                <button
                  className="
        w-full
        mt-6
        py-3
        rounded-xl
        bg-gradient-to-r
        from-[#4648d4]
        to-[#6b38d4]
        text-white
        font-semibold
      "
                >
                  Resume Lesson
                </button>

              </div>


            </div>
          </div>




        </main>

      </div>

    </div>
  );
};

export default Dashboard;