import { ShieldAlert, Building2, MessageSquareText, FileText } from "lucide-react";

const getUrgencyColor = (urgency) => {
  switch (urgency?.toLowerCase()) {
    case "critical":
      return "bg-red-500/10 text-red-300 border-red-500/30";

    case "high":
      return "bg-orange-500/10 text-orange-300 border-orange-500/30";

    case "medium":
      return "bg-yellow-500/10 text-yellow-300 border-yellow-500/30";

    case "low":
      return "bg-green-500/10 text-green-300 border-green-500/30";

    default:
      return "bg-gray-500/10 text-gray-300 border-gray-500/30";
  }
};

const AIResultCard = ({ aiAnalysis }) => {
  if (!aiAnalysis) return null;

  return (
    <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden">

      {/* Icon watermark (no images used) */}
      <div className="absolute right-4 top-4 opacity-10">
        <ShieldAlert className="w-24 h-24 text-blue-400" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-blue-300 text-xl">🤖</span>
        <h3 className="text-lg font-semibold text-white">
          AI Analysis Result
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">

        {/* Urgency */}
        <div className="bg-black/20 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase mb-2">
            Urgency Level
          </div>

          <span
            className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getUrgencyColor(
              aiAnalysis.urgency
            )}`}
          >
            {aiAnalysis.urgency || "Unknown"}
          </span>
        </div>

        {/* Department */}
        <div className="bg-black/20 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase mb-2 flex items-center gap-1">
            <Building2 className="w-3 h-3" />
            Department
          </div>

          <div className="text-white font-medium">
            {aiAnalysis.department || "General"}
          </div>
        </div>

        {/* Summary */}
        <div className="md:col-span-2 bg-black/20 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase mb-2 flex items-center gap-1">
            <FileText className="w-3 h-3" />
            Summary
          </div>

          <p className="text-gray-200">
            {aiAnalysis.summary}
          </p>
        </div>

        {/* Auto Response */}
        <div className="md:col-span-2 bg-black/20 border border-white/10 rounded-xl p-4">
          <div className="text-xs text-gray-400 uppercase mb-2 flex items-center gap-1">
            <MessageSquareText className="w-3 h-3" />
            Auto Response
          </div>

          <p className="text-gray-300 italic border-l-2 border-blue-500 pl-3">
            "{aiAnalysis.autoResponse}"
          </p>
        </div>

      </div>
    </div>
  );
};

export default AIResultCard;