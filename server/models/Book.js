const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    author: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    image: {
      type: String
    },

    genre: {
      type: String
    },

    rating: {
      type: Number,
      default: 0
    },

    recommendedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);