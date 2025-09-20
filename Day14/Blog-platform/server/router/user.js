// routes/users.js
import express from "express";
import User from "../model/users.js";
import protect from "../middlewares/auth.js";

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/users/profile/:id
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
router.put("/profile/:id", protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
