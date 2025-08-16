require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const connectDB = require("./config/db");

const authRouters = require("./router/authRouters");
const sessionRouters = require("./router/sessionRouters");
const questionRouters = require("./router/questionRouters");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

const app = express();

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "PUT", "POST", "DELETE"] }));
app.use(compression()); // ✅ Faster responses
app.use(express.json({ limit: "10kb" })); // Limit payload size for speed

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRouters);
app.use("/api/sessions", sessionRouters);
app.use("/api/questions", questionRouters);
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
