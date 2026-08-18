const Book = require("../models/Book");

// =============================
// AJOUTER UN LIVRE
// =============================
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      image,
      genre,
      rating
    } = req.body;

    // Validation du titre
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Le titre du livre est obligatoire"
      });
    }

    // Validation de l'auteur
    if (!author || !author.trim()) {
      return res.status(400).json({
        message: "L'auteur est obligatoire"
      });
    }

    // Validation du rating
    const bookRating = Number(rating);

    if (
      rating === undefined ||
      rating === null ||
      rating === "" ||
      isNaN(bookRating) ||
      bookRating < 1 ||
      bookRating > 5
    ) {
      return res.status(400).json({
        message: "La note doit être comprise entre 1 et 5"
      });
    }

    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      description: description || "",
      image: image || "",
      genre: genre || "",
      rating: bookRating,
      recommendedBy: req.user.id
    });

    res.status(201).json({
      message: "Book added successfully",
      book
    });

  } catch (error) {
    console.error("Erreur ajout livre :", error);

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// RÉCUPÉRER MES LIVRES
// =============================
exports.getBooks = async (req, res) => {
  try {

    const books = await Book.find({
      recommendedBy: req.user.id
    }).populate(
      "recommendedBy",
      "username email"
    );

    res.json(books);

  } catch (error) {

    console.error(
      "Erreur récupération livres :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// RÉCUPÉRER UN LIVRE
// =============================
exports.getBookById = async (req, res) => {
  try {

    const book = await Book.findOne({
      _id: req.params.id,
      recommendedBy: req.user.id
    }).populate(
      "recommendedBy",
      "username email"
    );

    if (!book) {
      return res.status(404).json({
        message: "Livre introuvable"
      });
    }

    res.json(book);

  } catch (error) {

    console.error(
      "Erreur récupération livre :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// MODIFIER UN LIVRE
// =============================
exports.updateBook = async (req, res) => {
  try {

    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        recommendedBy: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        message: "Livre introuvable ou non autorisé"
      });
    }

    res.json({
      message: "Book updated successfully",
      book
    });

  } catch (error) {

    console.error(
      "Erreur modification livre :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// SUPPRIMER UN LIVRE
// =============================
exports.deleteBook = async (req, res) => {
  try {

    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      recommendedBy: req.user.id
    });

    if (!book) {
      return res.status(404).json({
        message: "Livre introuvable ou non autorisé"
      });
    }

    res.json({
      message: "Book deleted successfully"
    });

  } catch (error) {

    console.error(
      "Erreur suppression livre :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};


// =============================
// NOTER UN LIVRE
// =============================
exports.rateBook = async (req, res) => {
  try {

    const { rating } = req.body;

    const bookRating = Number(rating);

    if (
      rating === undefined ||
      rating === null ||
      rating === "" ||
      isNaN(bookRating) ||
      bookRating < 1 ||
      bookRating > 5
    ) {
      return res.status(400).json({
        message: "La note doit être comprise entre 1 et 5"
      });
    }

    const book = await Book.findOne({
      _id: req.params.id,
      recommendedBy: req.user.id
    });

    if (!book) {
      return res.status(404).json({
        message: "Livre introuvable ou non autorisé"
      });
    }

    book.rating = bookRating;

    await book.save();

    res.json({
      message: "⭐ Note ajoutée avec succès !",
      book
    });

  } catch (error) {

    console.error(
      "Erreur notation :",
      error
    );

    res.status(500).json({
      message: error.message
    });
  }
};