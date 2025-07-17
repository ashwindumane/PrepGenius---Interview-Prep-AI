require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRouters = require("./router/authRouters");
const sessionRouters = require("./router/sessionRouters");
const questionRouters = require("./router/questionRouters");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");



const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

// Middleware
app.use(express.json());

app.use("/api/auth",authRouters);
app.use("/api/sessions",sessionRouters);
app.use("/api/questions",questionRouters);
 app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
 app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);



// Route to serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
