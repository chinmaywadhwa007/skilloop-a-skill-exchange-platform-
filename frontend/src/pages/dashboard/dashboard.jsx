import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  BookOpen,
  FileQuestion,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Plus,
  Coins
} from "lucide-react";
import Navbar from "../../components/navbar/navbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { name: "Learner" };

  return (
    <div className="min-h-screen bg-app text-theme transition-colors duration-300">

      {/* Glass Navbar */}
      <Navbar />

      <div className="flex">

        {/* Sidebar */}
        <aside
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
          className={`
            fixed
            top-16
            left-0
            h-[calc(100vh-64px)]
            bg-surface/90
            backdrop-blur-xl
            border-r
            border-theme
            shadow-lg
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] flex items-center justify-center text-white shrink-0 shadow-md">
                <BarChart3 size={20} />
              </div>

              {sidebarOpen && (
                <div>
                  <h3 className="font-bold text-[var(--brand-primary)] text-xl">
                    Dashboard
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Management Console
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">

            <button className="flex items-center gap-3 w-full p-3 font-semibold rounded-xl text-[var(--text-secondary)] border-l-4 border-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
              <BarChart3 size={20} className="shrink-0" />
              {sidebarOpen && <span>Analytics</span>}
            </button>

            <button className="flex items-center gap-3 w-full p-3 font-semibold rounded-xl text-[var(--text-secondary)] border-l-4 border-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
              <Users size={20} className="shrink-0" />
              {sidebarOpen && <span>Take Quiz</span>}
            </button>

            <button className="flex items-center gap-3 w-full p-3 font-semibold rounded-xl text-[var(--text-secondary)] border-l-4 border-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
              <BookOpen size={20} className="shrink-0" />
              {sidebarOpen && <span>Skills</span>}
            </button>

            <button className="flex items-center gap-3 w-full p-3 font-semibold rounded-xl text-[var(--text-secondary)] border-l-4 border-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
              <FileQuestion size={20} className="shrink-0" />
              {sidebarOpen && <span>Find Experts</span>}
            </button>

          </nav>

          {/* Bottom */}
          <div>

            <button
              className="
                w-full
                py-3
                rounded-xl
                bg-gradient-to-r
                from-[var(--brand-primary)]
                to-[var(--brand-secondary)]
                text-white
                font-semibold
                shadow-md
                hover:scale-[1.02]
                active:scale-95
                transition-all
                flex
                items-center
                justify-center
                gap-2
                cursor-pointer
              "
            >
              <Plus size={18} />
              {sidebarOpen && <span>New Skill</span>}
            </button>

            <div className="mt-6 pt-4 border-t border-theme space-y-2">
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-[var(--text-secondary)] border-l-4 border-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
                <Settings size={18} />
                {sidebarOpen && <span>Settings</span>}
              </button>

              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-[var(--text-secondary)] border-l-4 border-transparent hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-surface-hover)] transition-all">
                <HelpCircle size={18} />
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
            pb-16
            transition-all
            duration-300
            ${sidebarOpen ? "ml-64" : "ml-24"}
          `}
        >
          {/* Welcome Header */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Welcome back,
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]">
                {" "}{currentUser?.name}
              </span>
              !
            </h1>

            <p className="text-[var(--text-secondary)] mt-3 text-lg">
              You've mastered 4 new skills this month. Keep the momentum going!
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Bento Grid Left / Center */}
            <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Skill Credits Card */}
              <div className="glass-card rounded-3xl p-6 shadow-md relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--brand-primary)]/10 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-500" />

                <p className="uppercase text-xs font-bold tracking-wider text-[var(--text-secondary)]">
                  Skill Credits
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <Coins size={36} className="text-[var(--brand-primary)] shrink-0" />
                  <span className="text-4xl font-extrabold text-[var(--text-primary)]">
                    1,240
                  </span>
                </div>

                <p className="mt-4 text-emerald-500 text-sm font-semibold flex items-center gap-1">
                  ↗ +12% from last week
                </p>
              </div>

              {/* Active Courses Card */}
              <div className="glass-card rounded-3xl p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <p className="uppercase text-xs font-bold tracking-wider text-[var(--text-secondary)]">
                  Active Courses
                </p>

                <h2 className="text-5xl font-extrabold mt-4 text-[var(--text-primary)]">
                  6
                </h2>

                <p className="text-[var(--text-secondary)] mt-4 text-sm font-medium">
                  2 nearing completion
                </p>
              </div>

              {/* Learning Hours Card */}
              <div className="glass-card rounded-3xl p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <p className="uppercase text-xs font-bold tracking-wider text-[var(--text-secondary)]">
                  Learning Hours
                </p>

                <h2 className="text-5xl font-extrabold mt-4 text-[var(--text-primary)]">
                  42.5
                </h2>

                <p className="text-[var(--text-secondary)] mt-4 text-sm font-medium">
                  This month
                </p>
              </div>

              {/* Current Level Card */}
              <div className="glass-card rounded-3xl p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <p className="uppercase text-xs font-bold tracking-wider text-[var(--text-secondary)]">
                  Current Level
                </p>

                <h2 className="text-5xl font-extrabold mt-4 text-[var(--text-primary)]">
                  12
                </h2>

                <p className="text-[var(--text-secondary)] mt-4 text-sm font-medium">
                  Advanced Learner
                </p>
              </div>

            </div>

            {/* Right Column Progress Widget */}
            <div className="xl:col-span-4">
              <div className="glass-card rounded-3xl p-6 shadow-md border border-theme">

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    Current Skill
                  </h3>
                  <button className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">⋮</button>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="var(--border-light)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="var(--brand-primary)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-[var(--brand-primary)]">
                        75%
                      </span>
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    Advanced React
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-1">
                    Module 4: Performance Patterns
                  </p>
                </div>

                <button className="w-full mt-6 py-3 rounded-xl btn-primary font-semibold shadow-md hover:shadow-indigo-500/25 transition-all cursor-pointer">
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