import { Link } from "react-router-dom";
import { ShieldCheck, Zap, BarChart3, Bot } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="AI Background"
          className="w-full h-full object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 dark:bg-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-100 px-4 py-2 rounded-full mb-8 border border-blue-400/30 backdrop-blur-md">
            <Bot className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              AI-Powered Civic Management
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
            Smart Complaint <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200">
              Management System
            </span>
          </h1>

          <p className="text-xl text-gray-200 mb-10 leading-relaxed drop-shadow-lg">
            Revolutionize how civic issues are resolved. Our advanced AI instantly
            analyzes complaints, detects urgency, and routes them to the correct
            department.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            
            <Link
              to="/signup"
              className="
                px-8 py-4
                bg-gradient-to-r from-blue-500 to-blue-600
                hover:from-blue-600 hover:to-blue-700
                text-white font-bold rounded-xl
                shadow-lg hover:shadow-blue-500/30
                transition-all transform hover:-translate-y-1
              "
            >
              Get Started Now
            </Link>

            <Link
              to="/login"
              className="
                px-8 py-4
                bg-white/10 hover:bg-white/20
                text-white font-bold rounded-xl
                backdrop-blur-md border border-white/20
                transition-all
              "
            >
              Login to Dashboard
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-blue-300 w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Instant Analysis
            </h3>

            <p className="text-gray-300">
              Our AI model reads and understands your complaint instantly,
              assigning priorities accurately.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg">
            <div className="bg-teal-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="text-teal-300 w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Smart Routing
            </h3>

            <p className="text-gray-300">
              Complaints are automatically routed to the correct department
              (Water, Health, Roads, etc.).
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-lg">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-purple-300 w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Track Progress
            </h3>

            <p className="text-gray-300">
              Monitor the live status of your complaints and receive AI-generated
              resolutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;