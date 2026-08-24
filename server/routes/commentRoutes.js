const express = require("express");

const router = express.Router();

const {
  createComment,
  getComments,
  deleteComment
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");


// =============================
// RÉCUPÉRER LES COMMENTAIRES
// =============================
router.get(
  "/book/:bookId",
  authMiddleware,
  getComments
);


// =============================
// AJOUTER UN COMMENTAIRE
// =============================
router.post(
  "/book/:bookId",
  authMiddleware,
  createComment
);


// =============================
// SUPPRIMER UN COMMENTAIRE
// =============================
router.delete(
  "/:id",
  authMiddleware,
  deleteComment
);

module.exports = router;