import axios from "axios";

/**
 * Helper to call OpenRouter AI
 */
export const analyzeComplaintContent = async (description) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: process.env.OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an advanced, premium complaint management AI assistant. Given a complaint description, respond ONLY in raw JSON (no markdown, no code blocks, no extra text) with exactly these four keys: urgency (one of: Low, Medium, High, Critical), department (e.g. Water Supply, Electricity, Sanitation, Roads, Health, Other), summary (a detailed, comprehensive, and clear 3-4 sentence summary of the issue), autoResponse (a highly professional, empathetic, and premium automated message to send back to the complainant)."
          },
          {
            role: "user",
            content: `Analyze this complaint: ${description}`
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.CLIENT_URL,
          "X-Title": "Complaint Management System",
          "Content-Type": "application/json"
        }
      }
    );

    const raw = response.data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("AI Analysis Error:", error.message);
    return {
      urgency: "Medium",
      department: "General",
      summary: "Complaint received and is under review.",
      autoResponse: "Thank you for submitting your complaint. Our team will look into it shortly."
    };
  }
};

/**
 * Endpoint to analyze a complaint manually (optional use in frontend)
 * @route POST /api/ai/analyze
 */
export const analyzeComplaint = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: "Description is required for AI analysis" });
    }

    const aiAnalysis = await analyzeComplaintContent(description);
    res.status(200).json(aiAnalysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
