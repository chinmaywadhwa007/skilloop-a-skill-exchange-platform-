import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../context/authContext";
import { ROLES } from "../../utils/constants";

const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ROLES.USER,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!PASSWORD_RULE.test(formData.password)) {
      setError(
        "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
      );
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join SkillLoop and start learning today"
    >
      <div className="flex bg-[#eff4ff] p-1 rounded-xl mb-8">

        <Link
          to="/login"
          className="
      flex-1
      text-center
      py-3
      rounded-xl
    
     
      text-black

      text-gray-500
      hover:border-b-blue-600
       hover:text-[#4648d4],
      transition-all
      duration-300
    "
        >
          Login
        </Link>

        <Link
          to="/register"
          className="
      flex-1
      text-center
      py-3
      rounded-xl
      bg-gradient-to-r
      from-[#4648d4]
      to-[#6b38d4]
      text-white
      font-semibold
      shadow-md
    "
        >
          Sign Up
        </Link>

      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {error && (
          <p className="px-4 py-3 rounded-xl bg-red-50 text-sm text-red-600">{error}</p>
        )}

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0b1c30]">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="enter your name "
            value={formData.name}
            onChange={handleChange}
            required
            className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#eff4ff]
        border
        border-transparent
        outline-none
        transition-all
        duration-300
        focus:border-[#4648d4]
        focus:ring-4
        focus:ring-[#4648d4]/20
      "
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0b1c30]">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="enter your email "
            value={formData.email}
            onChange={handleChange}
            required
            className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#eff4ff]
        border
        border-transparent
        outline-none
        transition-all
        duration-300
        focus:border-[#4648d4]
        focus:ring-4
        focus:ring-[#4648d4]/20
      "
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0b1c30]">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#eff4ff]
        border
        border-transparent
        outline-none
        transition-all
        duration-300
        focus:border-[#4648d4]
        focus:ring-4
        focus:ring-[#4648d4]/20
      "
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0b1c30]">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#eff4ff]
        border
        border-transparent
        outline-none
        transition-all
        duration-300
        focus:border-[#4648d4]
        focus:ring-4
        focus:ring-[#4648d4]/20
      "
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-[#0b1c30]">
            I want to join as
          </label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[#eff4ff] border border-transparent outline-none transition-all duration-300 focus:border-[#4648d4] focus:ring-4 focus:ring-[#4648d4]/20"
          >
            <option value={ROLES.USER}>Learner</option>
            <option value={ROLES.MENTOR}>Mentor (share your skills)</option>
          </select>
        </div>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={submitting}
          className="
      group
      relative
      w-full
      py-3.5
      rounded-xl
      bg-gradient-to-r
      from-[#4648d4]
      to-[#6b38d4]
      text-white
      font-semibold
      overflow-hidden
      shadow-lg
      shadow-[#4648d4]/30
      transition-all
      duration-300
      hover:scale-[1.02]
      hover:shadow-[0_12px_30px_rgba(70,72,212,0.45)]
      active:scale-95
      cursor-pointer
    "
        >
          <span className="relative z-10">
            {submitting ? "Creating account..." : "Create Account"}
          </span>

          <span
            className="
        absolute
        top-0
        -left-[120%]
        h-full
        w-1/3
        bg-gradient-to-r
        from-transparent
        via-white/40
        to-transparent
        skew-x-12
        group-hover:left-[150%]
        transition-all
        duration-1000
      "
          />
        </button>

      </form>

      <p className="mt-6 text-center">
        Already have an account?

        <Link
          to="/login"
          className="text-[#4648d4] ml-2"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
};

export default Register;