const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    // Utilisateur qui a écrit le commentaire
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Livre commenté
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    // Contenu du commentaire
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Comment",
  commentSchema
);