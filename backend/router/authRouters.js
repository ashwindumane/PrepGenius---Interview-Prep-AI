const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

// Keep this route if image upload is used elsewhere
router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
