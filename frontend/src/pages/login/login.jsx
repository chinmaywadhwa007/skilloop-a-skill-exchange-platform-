import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import AuthLayout from "../../components/auth/AuthLayout";
import api from "../../api/api";
import { toast } from "sonner";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const authData = data.data;
      login(authData);
      toast.success(`Welcome ${authData.user.name}!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Access your learning dashboard">
      <div className="flex bg-[var(--bg-input)] border border-theme p-1 rounded-xl mb-8 gap-2">
        <button
          type="button"
          className="flex-1 group relative py-3 rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white font-semibold overflow-hidden shadow-md cursor-pointer"
        >
          <span className="relative z-10">Login</span>
          <span className="absolute top-0 -left-[120%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000" />
        </button>
        <Link
          to="/register"
          className="flex-1 text-center py-3 rounded-xl text-[var(--text-secondary)] font-semibold hover:text-[var(--brand-primary)] cursor-pointer transition-all duration-300"
        >
          Sign Up
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-[var(--text-primary)]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] border border-theme outline-none transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--text-muted)]"
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-[var(--text-primary)]">
              Password
            </label>
            <button
              type="button"
              className="text-sm text-[var(--brand-primary)] hover:underline"
            >
              Forgot?
            </button>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] border border-theme outline-none transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--text-muted)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`
            group
            relative
            w-full
            py-3.5
            rounded-xl
            bg-gradient-to-r
            from-[var(--brand-primary)]
            to-[var(--brand-secondary)]
            text-white
            font-semibold
            overflow-hidden
            shadow-lg
            shadow-indigo-500/25
            transition-all
            duration-300
            ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-95 cursor-pointer"
            }
          `}
        >
          <span className="relative z-10">
            {loading ? "Signing In..." : "Login"}
          </span>

          {!loading && (
            <span className="absolute top-0 -left-[120%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000" />
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[var(--text-secondary)]">
        Don't have an account?
        <Link to="/register" className="text-[var(--brand-primary)] ml-2 font-semibold hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;