exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    const data = await response.json();

    const books = data.docs.slice(0, 10).map((book) => ({
      id: book.key,

      title: book.title,

      author: book.author_name
        ? book.author_name.join(", ")
        : "Auteur inconnu",

      image: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "",

      genre: book.subject
        ? book.subject[0]
        : "Non classé",

      description: book.first_sentence
        ? Array.isArray(book.first_sentence)
          ? book.first_sentence.join(" ")
          : book.first_sentence
        : "Aucune description disponible.",
    }));

    res.json(books);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};