const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getProfile,
  followUser,
  unfollowUser,
} = require("../controllers/userController");

// ========================================
// 👤 MON PROFIL
// GET /api/users/profile
// ========================================

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// ========================================
// 👥 SUIVRE
// POST /api/users/:id/follow
// ========================================

router.post(
  "/:id/follow",
  authMiddleware,
  followUser
);

// ========================================
// 👥 NE PLUS SUIVRE
// DELETE /api/users/:id/follow
// ========================================

router.delete(
  "/:id/follow",
  authMiddleware,
  unfollowUser
);

module.exports = router;