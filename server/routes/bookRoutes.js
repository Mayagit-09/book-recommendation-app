const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  rateBook
} = require("../controllers/bookController");


// Ajouter un livre
router.post("/", authMiddleware, createBook);

// Ma bibliothèque
router.get("/", authMiddleware, getBooks);

// Détails d'un livre
router.get("/:id", authMiddleware, getBookById);

// Modifier
router.put("/:id", authMiddleware, updateBook);

// Supprimer
router.delete("/:id", authMiddleware, deleteBook);

// Noter
router.put("/:id/rating", authMiddleware, rateBook);


module.exports = router;