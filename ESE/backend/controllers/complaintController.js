import Complaint from "../models/Complaint.js";
import { analyzeComplaintContent } from "./aiController.js";

/**
 * Add a new complaint and auto-trigger AI analysis
 * @route POST /api/complaints
 */
export const createComplaint = async (req, res) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    if (!name || !email || !title || !description || !category || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Call AI analysis
    const aiAnalysis = await analyzeComplaintContent(description);

    const newComplaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
      aiAnalysis
    });

    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all complaints
 * @route GET /api/complaints
 */
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Search complaints by location
 * @route GET /api/complaints/search?location=...
 */
export const searchComplaints = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: "Location query is required" });
    }
    
    // Case-insensitive search using regex
    const complaints = await Complaint.find({ location: { $regex: location, $options: "i" } }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Filter complaints by category
 * @route GET /api/complaints/filter?category=...
 */
export const filterComplaints = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "Category query is required" });
    }
    
    const complaints = await Complaint.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get single complaint by ID
 * @route GET /api/complaints/:id
 */
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update complaint status
 * @route PUT /api/complaints/:id
 */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a complaint
 * @route DELETE /api/complaints/:id
 */
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
