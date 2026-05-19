import { Link } from "react-router-dom";
import { ShieldCheck, Zap, BarChart3, Bot } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative overflow-hidden bg-[#030712]">

      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Gradient Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-950 to-black opacity-90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-cyan-300 px-5 py-2 rounded-full mb-8 shadow-lg">
            <Bot className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              AI Powered Civic Platform
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Smart Complaint
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400">
              Management System
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
            Revolutionize how civic issues are handled using AI-powered
            complaint analysis, intelligent routing, priority detection,
            and real-time progress tracking.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-5">

            <Link
              to="/signup"
              className="
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
                text-white font-bold text-lg
                shadow-2xl shadow-cyan-500/20
                hover:scale-105
                hover:shadow-cyan-500/40
                transition-all duration-300
              "
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
                px-8 py-4
                rounded-2xl
                bg-white/10
                backdrop-blur-xl
                border border-white/10
                text-white font-bold text-lg
                hover:bg-white/20
                transition-all duration-300
              "
            >
              Login Dashboard
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">

          {/* Feature 1 */}
          <div className="group bg-white/[0.05] border border-white/10 backdrop-blur-2xl p-8 rounded-3xl hover:border-cyan-400/30 hover:translate-y-[-6px] transition-all duration-300 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all">
              <Zap className="text-cyan-300 w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Instant Analysis
            </h3>

            <p className="text-gray-400 leading-relaxed">
              AI instantly understands complaints, detects urgency,
              and categorizes issues automatically.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group bg-white/[0.05] border border-white/10 backdrop-blur-2xl p-8 rounded-3xl hover:border-blue-400/30 hover:translate-y-[-6px] transition-all duration-300 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-all">
              <ShieldCheck className="text-blue-300 w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Smart Routing
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Complaints are automatically forwarded to the correct
              departments for faster resolution.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group bg-white/[0.05] border border-white/10 backdrop-blur-2xl p-8 rounded-3xl hover:border-purple-400/30 hover:translate-y-[-6px] transition-all duration-300 shadow-xl">

            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
              <BarChart3 className="text-purple-300 w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Live Tracking
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Monitor complaint status, updates, and AI-generated
              progress reports in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;