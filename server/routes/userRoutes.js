const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  register,
  login
} = require("../controllers/authController");


// Register
router.post("/register", register);


// Login
router.post("/login", login);


// Protected profile
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user
  });
});


module.exports = router;