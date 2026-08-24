const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// =====================
// IMPORT DES ROUTES
// =====================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const searchRoutes = require("./routes/searchRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const commentRoutes = require("./routes/commentRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// =====================
// INITIALISATION EXPRESS
// =====================

const app = express();

// =====================
// MIDDLEWARES
// =====================

app.use(cors());
app.use(express.json());

// =====================
// ROUTES API
// =====================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/favorites", favoriteRoutes);

app.use("/api/comments", commentRoutes);

app.use("/api/recommendations", recommendationRoutes);

// =====================
// ROUTE TEST
// =====================

app.get("/", (req, res) => {
  res.send("Book Recommendation API is running 📚");
});

// =====================
// PORT
// =====================

const PORT = process.env.PORT || 5000;

// =====================
// CONNEXION MONGODB
// PUIS DÉMARRAGE DU SERVEUR
// =====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "❌ MongoDB connection error:",
      error.message
    );
  });