const User = require("../models/User");
const Book = require("../models/Book");

// ==========================================
// 🤖 RECOMMANDATIONS PERSONNALISÉES
// ==========================================

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // ==========================================
    // RÉCUPÉRER L'UTILISATEUR
    // ==========================================

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable",
      });
    }

    // ==========================================
    // RÉCUPÉRER LES LIVRES AIMÉS
    // ==========================================

    const likedBooks = await Book.find({
      likes: userId,
    });

    // ==========================================
    // DÉTERMINER LES GENRES PRÉFÉRÉS
    // ==========================================

    const genreCount = {};

    likedBooks.forEach((book) => {
      if (book.genre && book.genre.trim()) {
        const genre = book.genre.trim();

        genreCount[genre] =
          (genreCount[genre] || 0) + 1;
      }
    });

    // Trier les genres du plus aimé au moins aimé

    const favoriteGenres = Object.entries(
      genreCount
    )
      .sort((a, b) => b[1] - a[1])
      .map(([genre]) => genre);

    // ==========================================
    // RÉCUPÉRER LES LIVRES DÉJÀ AIMÉS
    // ==========================================

    const likedBookIds = likedBooks.map(
      (book) => book._id
    );

    // ==========================================
    // RECOMMANDATIONS
    // ==========================================

    let recommendations = [];

    // ------------------------------------------
    // CAS 1 :
    // L'utilisateur a des genres préférés
    // ------------------------------------------

    if (favoriteGenres.length > 0) {
      recommendations = await Book.find({
        genre: {
          $in: favoriteGenres,
        },

        _id: {
          $nin: likedBookIds,
        },
      })
        .populate(
          "recommendedBy",
          "username"
        )
        .sort({
          rating: -1,
          createdAt: -1,
        })
        .limit(20);
    }

    // ------------------------------------------
    // CAS 2 :
    // Pas encore de genre préféré
    // ------------------------------------------

    if (
      recommendations.length === 0
    ) {
      recommendations = await Book.find({
        _id: {
          $nin: likedBookIds,
        },
      })
        .populate(
          "recommendedBy",
          "username"
        )
        .sort({
          rating: -1,
          createdAt: -1,
        })
        .limit(20);
    }

    // ==========================================
    // RÉPONSE
    // ==========================================

    res.json({
      recommendations,
      favoriteGenres,
    });

  } catch (error) {
    console.error(
      "❌ Erreur recommandations :",
      error
    );

    res.status(500).json({
      message:
        "Erreur lors de la récupération des recommandations.",
      error: error.message,
    });
  }
};