const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET; // Preload once

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  try {
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // If you only need the ID (skip DB hit for speed)
      req.user = { id: decoded.id };

      // If you need user details from DB, use lean() for speed
      // req.user = await User.findById(decoded.id).select("-password").lean();

      return next();
    }
    res.status(401).json({ message: "Not authorized, no token" });
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

module.exports = { protect };
