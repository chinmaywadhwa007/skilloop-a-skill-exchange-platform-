import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import api from "../../api/api";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "LEARNER",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must contain uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/register", {
        name: formData.name,
        username: formData.username,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        phone: formData.phone || undefined,
      });

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join SkillLoop and start learning today"
    >
      <div className="flex bg-[var(--bg-input)] border border-theme p-1 rounded-xl mb-8 gap-2">
        <Link
          to="/login"
          className="flex-1 text-center py-3 rounded-xl text-[var(--text-secondary)] font-semibold hover:text-[var(--brand-primary)] transition-all duration-300"
        >
          Login
        </Link>
        <button
          type="button"
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white font-semibold shadow-md cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[var(--text-primary)]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] border border-theme outline-none transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[var(--text-primary)]">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="john_doe"
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] border border-theme outline-none transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[var(--text-primary)]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] border border-theme outline-none transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[var(--text-primary)]">
            Password
          </label>
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

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[var(--text-primary)]">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] border border-theme outline-none transition-all duration-300 focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[var(--brand-primary)]/20 placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Submit Button */}
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
            {loading ? "Creating Account..." : "Create Account"}
          </span>

          {!loading && (
            <span className="absolute top-0 -left-[120%] h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000" />
          )}
        </button>

      </form>

      <p className="mt-6 text-center text-[var(--text-secondary)]">
        Already have an account?
        <Link to="/login" className="text-[var(--brand-primary)] ml-2 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Register;