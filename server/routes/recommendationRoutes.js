const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  getRecommendations,
} = require(
  "../controllers/recommendationController"
);

// ==========================================
// 🤖 RECOMMANDATIONS PERSONNALISÉES
// GET /api/recommendations
// ==========================================

router.get(
  "/",
  authMiddleware,
  getRecommendations
);

module.exports = router;