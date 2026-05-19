import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import AIResultCard from "../components/AIResultCard";
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Tag,
  User,
  Mail,
  Calendar,
} from "lucide-react";

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`/api/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        setError("Failed to load complaint details");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await axios.delete(`/api/complaints/${id}`);
        navigate("/complaints");
      } catch (err) {
        alert("Failed to delete complaint");
      }
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="w-full max-w-4xl px-4 animate-pulse">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="h-6 bg-white/20 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ERROR
  if (error || !complaint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
        <div className="bg-red-500/10 backdrop-blur-md text-red-200 p-6 rounded-2xl border border-red-500/20">
          {error || "Complaint not found"}
        </div>

        <Link
          to="/complaints"
          className="mt-6 text-gray-300 hover:text-blue-300 transition"
        >
          ← Back to Complaints
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-gray-900 via-slate-900 to-black">

      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">

        {/* Back */}
        <Link
          to="/complaints"
          className="inline-flex items-center text-sm text-gray-300 hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10">

          <div className="p-8 md:p-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">

              <div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-blue-500/20 text-blue-200 text-xs px-3 py-1 rounded-full border border-blue-400/20">
                    {complaint.category}
                  </span>

                  <span className={`text-xs px-3 py-1 rounded-full border ${
                    complaint.status === "Resolved"
                      ? "bg-green-500/20 text-green-200 border-green-400/20"
                      : complaint.status === "In Progress"
                      ? "bg-blue-500/20 text-blue-200 border-blue-400/20"
                      : "bg-yellow-500/20 text-yellow-200 border-yellow-400/20"
                  }`}>
                    {complaint.status}
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold text-white">
                  {complaint.title}
                </h1>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Link
                  to={`/complaints/${id}/edit`}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update
                </Link>

                <button
                  onClick={handleDelete}
                  className="px-5 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-200 rounded-xl border border-red-400/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">

              {/* Reporter */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-5">
                  Reporter Details
                </h3>

                <div className="space-y-4 text-gray-200">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3 text-blue-300" />
                    {complaint.name}
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-blue-300" />
                    {complaint.email}
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-blue-300" />
                    {new Date(complaint.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Issue */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-5">
                  Issue Details
                </h3>

                <div className="space-y-4 text-gray-200">
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-3 text-teal-300" />
                    {complaint.category}
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-teal-300" />
                    {complaint.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Description
              </h3>

              <div className="bg-black/20 p-6 rounded-2xl border border-white/10 text-gray-200 whitespace-pre-wrap">
                {complaint.description}
              </div>
            </div>

            {/* AI */}
            <AIResultCard aiAnalysis={complaint.aiAnalysis} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;