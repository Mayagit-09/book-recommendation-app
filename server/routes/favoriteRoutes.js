const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require("../controllers/favoriteController");


// Ajouter un favori
router.post("/:bookId", authMiddleware, addFavorite);


// Supprimer un favori
router.delete("/:bookId", authMiddleware, removeFavorite);


// Voir mes favoris
router.get("/", authMiddleware, getFavorites);


module.exports = router;