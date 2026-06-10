import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import AuthLayout from "../../components/auth/AuthLayout";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === formData.email && u.password === formData.password
        );
        if (!user) {
            alert("Invalid Email or Password");
            return;
        }
        login(user);
        alert(`Welcome ${user.name}`);
        navigate("/dashboard");
    };

    return (
        <AuthLayout title="Welcome Back" subtitle="Access your learning dashboard">
            <div className="flex bg-[#eff4ff] p-1 rounded-xl mb-8 gap-2">
                <button type="button" className="flex-1 group relative py-3 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white font-semibold overflow-hidden shadow-lg cursor-pointer">
                    <span className="relative z-10">Login</span>
                    <span className="absolute top-0 -left-[120%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000" />
                </button>
                <div className="w-px h-10 bg-black mx-2"></div>
                <Link to="/register" className="flex-1 text-center py-3 rounded-xl text-gray-600 font-semibold hover:text-[#6b38d4] cursor-pointer transition-all duration-300">
                    Sign Up
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-semibold text-[#0b1c30]">Email Address</label>
                    <input type="email" name="email" placeholder="enter your email" value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl bg-[#eff4ff] border border-transparent outline-none transition-all duration-300 focus:border-[#4648d4] focus:ring-4 focus:ring-[#4648d4]/20 placeholder:text-gray-400" />
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-[#0b1c30]">Password</label>
                        <button type="button" className="text-sm text-[#4648d4] hover:underline">Forgot?</button>
                    </div>
                    <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl bg-[#eff4ff] border border-transparent outline-none transition-all duration-300 focus:border-[#4648d4] focus:ring-4 focus:ring-[#4648d4]/20 placeholder:text-gray-400" />
                </div>

                <button type="submit" className="group relative w-full py-3 rounded-xl bg-gradient-to-r from-[#4648d4] to-[#6b38d4] text-white font-semibold overflow-hidden shadow-lg shadow-[#4648d4]/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer">
                    <span className="relative z-10">Login</span>
                    <span className="absolute top-0 -left-[120%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000" />
                </button>
            </form>

            <p className="mt-6 text-center">
                Don't have an account?
                <Link to="/register" className="text-[#4648d4] ml-2">Sign Up</Link>
            </p>
        </AuthLayout>
    );
};

export default Login;