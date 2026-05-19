import express from "express";
import {
  createComplaint,
  getComplaints,
  searchComplaints,
  filterComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All routes protected

// Define specific routes BEFORE dynamic routes like /:id
router.get("/search", searchComplaints);
router.get("/filter", filterComplaints);

router.route("/")
  .post(createComplaint)
  .get(getComplaints);

router.route("/:id")
  .get(getComplaintById)
  .put(updateComplaintStatus)
  .delete(deleteComplaint);

export default router;
