import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "Water Supply",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const categories = [
    "Water Supply",
    "Electricity",
    "Sanitation",
    "Roads",
    "Health",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/complaints", formData);
      navigate(`/complaints/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden py-10">

      {/* Glow effects (only decorative, no images) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">

          {/* Header */}
          <div className="px-8 py-6 border-b border-white/10 bg-white/5">
            <h2 className="text-3xl font-extrabold text-white">
              Register New Complaint
            </h2>
            <p className="text-gray-300 mt-2 text-sm">
              AI will analyze and prioritize your issue automatically.
            </p>
          </div>

          {/* Body */}
          <div className="p-8 md:p-10">

            {error && (
              <div className="bg-red-500/10 text-red-200 border border-red-400/20 p-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid md:grid-cols-2 gap-6">

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <input
                type="text"
                name="title"
                required
                placeholder="Complaint Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="grid md:grid-cols-2 gap-6">

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-gray-900">
                      {c}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <textarea
                name="description"
                rows="6"
                required
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />

              <div className="flex justify-end gap-4 pt-4 border-t border-white/10">

                <button
                  type="button"
                  onClick={() => navigate("/complaints")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit Complaint"}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;