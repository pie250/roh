import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/complaints");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white overflow-hidden">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-gradient-to-br from-indigo-950 via-black to-cyan-950 overflow-hidden">

        {/* Background Shapes */}
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl top-[-20%] left-[-10%] animate-pulse"></div>

        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl bottom-[-10%] right-[-10%] animate-pulse"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:30px_30px]"></div>

        {/* Content */}
        <div className="relative z-10 px-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-400 to-blue-500 mb-8 shadow-2xl shadow-cyan-500/40">
            <span className="text-3xl font-bold">S</span>
          </div>

          <h1 className="text-6xl font-black leading-tight mb-6">
            Smart <br />
            Complaint <br />
            System
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Register complaints, track progress, and manage civic issues
            through a modern AI-powered grievance platform.
          </p>

          <div className="mt-10 flex gap-4">
            <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10">
              ⚡ Fast Access
            </div>

            <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10">
              🔒 Secure
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 relative bg-[#050816]">

        {/* Mobile Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl lg:hidden"></div>

        {/* Card */}
        <div className="w-full max-w-md relative z-10">

          {/* Mobile Heading */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30 mb-5">
              <span className="text-2xl font-bold">S</span>
            </div>

            <h1 className="text-4xl font-black mb-2">
              Create Account
            </h1>

            <p className="text-gray-400">
              Join the smart complaint platform
            </p>
          </div>

          {/* Desktop Heading */}
          <div className="hidden lg:block mb-10">
            <h2 className="text-5xl font-black mb-3">
              Sign Up
            </h2>

            <p className="text-gray-400 text-lg">
              Create your account to continue
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-2xl text-sm backdrop-blur-xl">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                required
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                required
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 text-white font-bold text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;