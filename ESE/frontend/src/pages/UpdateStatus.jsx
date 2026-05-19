import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { ArrowLeft, Save } from "lucide-react";

const UpdateStatus = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const statuses = ["Pending", "In Progress", "Resolved"];

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`/api/complaints/${id}`);
        setStatus(res.data.status);
      } catch (err) {
        setError("Failed to load complaint");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      await axios.put(`/api/complaints/${id}`, { status });

      navigate(`/complaints/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        
        {/* Background */}
        <div className="absolute inset-0 z-[-1]">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
            className="w-full h-full object-cover scale-105"
          />

          <div className="absolute inset-0 bg-black/40 dark:bg-black/70"></div>
        </div>

        {/* Loader */}
        <div className="w-full max-w-xl px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 animate-pulse">
            <div className="h-6 bg-white/20 rounded mb-6"></div>

            <div className="space-y-4">
              <div className="h-12 bg-white/20 rounded-xl"></div>
              <div className="h-12 bg-white/20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-10">
      
      {/* Background */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          className="w-full h-full object-cover scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/70"></div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-screen blur-3xl opacity-20 animate-pulse"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen blur-3xl opacity-20 animate-pulse"></div>

      {/* Main Card */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center justify-between">
          
          <div>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-xl">
              Update Status
            </h2>

            <p className="text-gray-300 mt-1 text-sm">
              Modify the current complaint progress
            </p>
          </div>

          <Link
            to={`/complaints/${id}`}
            className="text-gray-300 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>

        {/* Form */}
        <div className="p-8">
          
          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl mb-6 text-sm backdrop-blur-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* Status */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-200 mb-3">
                Current Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                  w-full px-4 py-3
                  bg-white/10
                  border border-white/10
                  text-white
                  rounded-xl
                  backdrop-blur-md
                  focus:ring-2 focus:ring-blue-500
                  focus:border-blue-400
                  outline-none
                  transition-all
                "
              >
                {statuses.map((s) => (
                  <option
                    key={s}
                    value={s}
                    className="bg-gray-900 text-white"
                  >
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-white/10">
              
              <button
                type="button"
                onClick={() => navigate(`/complaints/${id}`)}
                className="
                  px-6 py-3
                  bg-white/10
                  hover:bg-white/20
                  text-white
                  rounded-xl
                  border border-white/10
                  backdrop-blur-md
                  transition-all
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  flex items-center justify-center
                  px-6 py-3
                  bg-gradient-to-r from-blue-500 to-cyan-500
                  hover:from-blue-600 hover:to-cyan-600
                  text-white font-semibold
                  rounded-xl
                  shadow-lg shadow-blue-500/20
                  transition-all
                  disabled:opacity-70
                "
              >
                {saving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;