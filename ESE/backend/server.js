import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

/* -----------------------
   MIDDLEWARE
------------------------ */
app.use(express.json());

/* -----------------------
   CORS CONFIG (FIXED)
------------------------ */

const allowedOrigins = [
  "http://localhost:5173",
  "https://roh-1.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / curl (no origin)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Blocked by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

/* ❌ DO NOT use app.options("*") in Express 5+ */
/* Removed intentionally to avoid path-to-regexp crash */

/* -----------------------
   ROUTES
------------------------ */

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/ai", aiRoutes);

/* -----------------------
   HEALTH CHECK
------------------------ */

app.get("/", (req, res) => {
  res.send("Smart Complaint Management System API is running...");
});

/* -----------------------
   ERROR HANDLER
------------------------ */

app.use(errorHandler);

/* -----------------------
   START SERVER
------------------------ */

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err.message);
  });