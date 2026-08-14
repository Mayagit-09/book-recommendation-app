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


// Create book
router.post("/", authMiddleware, createBook);

// Get all books
router.get("/", getBooks);

// Get one book
router.get("/:id", getBookById);

// Update book
router.put("/:id", authMiddleware, updateBook);

// delete book
router.delete("/:id", authMiddleware, deleteBook);

// Rate book
router.put("/:id/rating", authMiddleware, rateBook);

module.exports = router;