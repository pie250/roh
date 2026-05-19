import { Link, useNavigate } from "react-router-dom";
import {
  LogOut,
  ClipboardList,
  PlusCircle,
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">

            <div className="w-9 h-9 bg-blue-500/20 border border-blue-400/30 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition">
              <ClipboardList className="w-5 h-5 text-blue-300" />
            </div>

            <span className="text-white font-bold text-lg tracking-tight">
              Smart CMS
            </span>

          </Link>

          {/* Links */}
          <div className="flex items-center gap-3">

            {token ? (
              <>
                <Link
                  to="/complaints"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm rounded-lg transition"
                >
                  All Complaints
                </Link>

                <Link
                  to="/complaints/new"
                  className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 px-4 py-2 rounded-xl border border-blue-400/20 text-sm transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  Register
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-300 hover:text-red-400 px-3 py-2 text-sm transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 px-4 py-2 rounded-xl border border-blue-400/20 text-sm transition"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;