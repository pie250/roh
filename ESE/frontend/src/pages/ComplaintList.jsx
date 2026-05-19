import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import {
  Search,
  Filter,
  AlertCircle,
  Clock,
  CheckCircle2,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const categories = [
    "Water Supply",
    "Electricity",
    "Sanitation",
    "Roads",
    "Health",
    "Other",
  ];

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      let url = "/api/complaints";

      if (searchTerm) {
        url = `/api/complaints/search?location=${searchTerm}`;
      } else if (categoryFilter) {
        url = `/api/complaints/filter?category=${categoryFilter}`;
      }

      const res = await axios.get(url);
      setComplaints(res.data);
    } catch (err) {
      setError("Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [searchTerm, categoryFilter]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="flex items-center text-yellow-200 bg-yellow-500/10 px-2 py-1 rounded-full text-xs border border-yellow-400/20">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "In Progress":
        return (
          <span className="flex items-center text-blue-200 bg-blue-500/10 px-2 py-1 rounded-full text-xs border border-blue-400/20">
            <MoreHorizontal className="w-3 h-3 mr-1" /> In Progress
          </span>
        );
      case "Resolved":
        return (
          <span className="flex items-center text-green-200 bg-green-500/10 px-2 py-1 rounded-full text-xs border border-green-400/20">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Resolved
          </span>
        );
      default:
        return (
          <span className="text-gray-200 bg-gray-500/10 px-2 py-1 rounded-full text-xs border border-gray-400/20">
            {status}
          </span>
        );
    }
  };

  const getUrgencyBadge = (urgency) => {
    if (!urgency) return null;

    const u = urgency.toLowerCase();

    if (u === "critical")
      return (
        <span className="bg-red-500/10 text-red-200 px-2 py-1 rounded text-xs border border-red-400/20">
          Critical
        </span>
      );

    if (u === "high")
      return (
        <span className="bg-orange-500/10 text-orange-200 px-2 py-1 rounded text-xs border border-orange-400/20">
          High
        </span>
      );

    if (u === "medium")
      return (
        <span className="bg-yellow-500/10 text-yellow-200 px-2 py-1 rounded text-xs border border-yellow-400/20">
          Medium
        </span>
      );

    return (
      <span className="bg-green-500/10 text-green-200 px-2 py-1 rounded text-xs border border-green-400/20">
        Low
      </span>
    );
  };

  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
  const inProgressCount = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;
  const pendingCount = complaints.filter((c) => c.status === "Pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black py-10 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">

          <div>
            <h1 className="text-4xl font-extrabold text-white">
              Complaints Dashboard
            </h1>
            <p className="text-gray-300 mt-2">
              Manage and track civic issues
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by location..."
                className="pl-10 pr-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl w-full sm:w-64 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCategoryFilter("");
                }}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-10 pr-4 py-3 bg-white/10 border border-white/10 text-white rounded-xl w-full sm:w-48 backdrop-blur-md focus:ring-2 focus:ring-blue-500 outline-none"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setSearchTerm("");
                }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        {!loading && complaints.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

            <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
              <div className="text-gray-300 text-sm">Total</div>
              <div className="text-white text-3xl font-bold">
                {complaints.length}
              </div>
            </div>

            <div className="bg-yellow-500/10 p-5 rounded-2xl border border-yellow-400/20">
              <div className="text-yellow-200 text-sm">Pending</div>
              <div className="text-yellow-100 text-3xl font-bold">
                {pendingCount}
              </div>
            </div>

            <div className="bg-blue-500/10 p-5 rounded-2xl border border-blue-400/20">
              <div className="text-blue-200 text-sm">In Progress</div>
              <div className="text-blue-100 text-3xl font-bold">
                {inProgressCount}
              </div>
            </div>

            <div className="bg-green-500/10 p-5 rounded-2xl border border-green-400/20">
              <div className="text-green-200 text-sm">Resolved</div>
              <div className="text-green-100 text-3xl font-bold">
                {resolvedCount}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-400/20 p-5 mb-8 rounded-xl">
            <div className="flex items-center text-red-200">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white/5 p-8 rounded-3xl border border-white/10 animate-pulse"
              >
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/20 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center bg-white/5 p-16 rounded-3xl border border-white/10">
            <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold">
              No complaints found
            </h3>
            <p className="text-gray-300 mt-2">
              Try adjusting filters or search.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="bg-white/10 rounded-3xl border border-white/10 p-6 hover:-translate-y-2 transition"
              >
                <div className="flex justify-between mb-4">
                  <span className="text-xs text-blue-200 bg-blue-500/10 px-2 py-1 rounded">
                    {complaint.category}
                  </span>
                  {getStatusBadge(complaint.status)}
                </div>

                <h3 className="text-white font-bold text-xl mb-2">
                  {complaint.title}
                </h3>

                <p className="text-gray-300 text-sm mb-2">
                  📍 {complaint.location}
                </p>

                <p className="text-gray-400 text-xs mb-4">
                  <Calendar className="inline w-3 h-3 mr-1" />
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </p>

                <div className="mb-4">
                  {getUrgencyBadge(complaint.aiAnalysis?.urgency)}
                </div>

                <Link
                  to={`/complaints/${complaint._id}`}
                  className="text-blue-300 hover:text-blue-200 text-sm"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;