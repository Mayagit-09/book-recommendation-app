const Book = require("../models/Book");


// Add book recommendation
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      image,
      genre
    } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      image,
      genre,
      recommendedBy: req.user.id
    });

    res.status(201).json({
      message: "Book added successfully",
      book
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get all books
exports.getBooks = async (req, res) => {
  try {

    const books = await Book.find()
      .populate("recommendedBy", "username email");

    res.json(books);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Get single book
exports.getBookById = async (req, res) => {
  try {

    const book = await Book.findById(req.params.id)
      .populate("recommendedBy", "username email");

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json(book);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book updated successfully",
      book
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json({
      message: "Book deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Rate a book
exports.rateBook = async (req, res) => {
  try {

    const { rating } = req.body;


    const book = await Book.findById(req.params.id);


    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }


    book.rating = rating;

    await book.save();


    res.json({
      message: "⭐ Note ajoutée avec succès !",
      book
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};