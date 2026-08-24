const Comment = require("../models/Comment");
const Book = require("../models/Book");

// =============================
// AJOUTER UN COMMENTAIRE
// =============================
exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;

    // Vérifier le commentaire
    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Le commentaire est obligatoire"
      });
    }

    // Vérifier que le livre existe
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({
        message: "Livre introuvable"
      });
    }

    // Créer le commentaire
    const comment = await Comment.create({
      user: req.user.id,
      book: req.params.bookId,
      text: text.trim()
    });

    // Récupérer les informations de l'utilisateur
    const populatedComment = await Comment.findById(
      comment._id
    ).populate(
      "user",
      "username email"
    );

    res.status(201).json({
      message: "Commentaire ajouté avec succès",
      comment: populatedComment
    });

  } catch (error) {
    console.error(
      "Erreur ajout commentaire :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// RÉCUPÉRER LES COMMENTAIRES
// =============================
exports.getComments = async (req, res) => {
  try {

    const comments = await Comment.find({
      book: req.params.bookId
    })
      .populate(
        "user",
        "username email"
      )
      .sort({
        createdAt: -1
      });

    res.json(comments);

  } catch (error) {

    console.error(
      "Erreur récupération commentaires :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// SUPPRIMER UN COMMENTAIRE
// =============================
exports.deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!comment) {
      return res.status(404).json({
        message:
          "Commentaire introuvable ou non autorisé"
      });
    }

    await Comment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Commentaire supprimé avec succès"
    });

  } catch (error) {

    console.error(
      "Erreur suppression commentaire :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};