import { useState } from "react";
import api from "../services/api";
import {
  FaSearch,
  FaBook,
  FaPlus,
  FaSpinner,
} from "react-icons/fa";

function BookSearch({ onBookAdded, showNotification }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingBook, setAddingBook] = useState(null);

  // =========================
  // RECHERCHER DES LIVRES
  // =========================

  const searchBooks = async () => {
    if (!query.trim()) {
      showNotification(
        "🔍 Veuillez saisir le nom d'un livre.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const res = await api.get(
        `/search?query=${encodeURIComponent(query)}`
      );

      setBooks(res.data);

      if (res.data.length === 0) {
        showNotification(
          "📚 Aucun livre trouvé.",
          "error"
        );
      }
    } catch (error) {
      console.error(
        "Erreur recherche :",
        error
      );

      showNotification(
        "❌ Erreur lors de la recherche.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // AJOUTER UN LIVRE
  // =========================

  const addBook = async (book) => {
    setAddingBook(book.id);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/books",
        {
          title: book.title,
          author: book.author,
          description:
            book.description ||
            "Aucune description disponible.",
          image: book.image,
          genre: book.genre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showNotification(
        "📚 Livre ajouté avec succès !",
        "success"
      );

      if (onBookAdded) {
        onBookAdded();
      }
    } catch (error) {
      console.error(
        "Erreur ajout :",
        error.response?.data ||
          error.message
      );

      showNotification(
        error.response?.data?.message ||
          "❌ Erreur lors de l'ajout du livre.",
        "error"
      );
    } finally {
      setAddingBook(null);
    }
  };

  // =========================
  // AFFICHAGE
  // =========================

  return (
    <section className="book-search-section my-5">

      {/* =========================
          TITRE
      ========================= */}

      <div className="text-center mb-4">

        <div className="mb-2">
          <FaBook
            size={30}
            className="text-primary"
            aria-hidden="true"
          />
        </div>

        <h3 className="fw-bold mb-2">
          Rechercher des livres
        </h3>

        <p className="text-muted mb-0">
          Recherchez un livre et ajoutez-le
          directement à votre bibliothèque.
        </p>

      </div>

      {/* =========================
          BARRE DE RECHERCHE
      ========================= */}

      <div className="book-search-bar">

        <div className="book-search-input">

          <FaSearch
            className="search-icon"
            aria-hidden="true"
          />

          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchBooks();
              }
            }}
            placeholder="Ex : Harry Potter, Le Petit Prince..."
            aria-label="Rechercher un livre"
          />

        </div>

        <button
          className="btn btn-warning search-button"
          onClick={searchBooks}
          disabled={loading}
          type="button"
        >

          {loading ? (
            <>
              <FaSpinner className="spinner-icon me-2" />
              Recherche...
            </>
          ) : (
            <>
              <FaSearch className="me-2" />
              Rechercher
            </>
          )}

        </button>

      </div>

      {/* =========================
          RÉSULTATS
      ========================= */}

      {books.length > 0 && (
        <div className="mt-5">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="fw-bold mb-0">
              📚 Résultats
            </h4>

            <span className="badge bg-primary rounded-pill">
              {books.length} livre
              {books.length > 1
                ? "s"
                : ""}
            </span>

          </div>

          <div className="book-search-results">

            {books.map((book) => (

              <div
                key={book.id}
                className="book-search-card"
              >

                {/* =========================
                    IMAGE
                ========================= */}

                <div className="book-search-image-container">

                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="book-search-image"
                    />
                  ) : (
                    <div className="book-search-no-image">
                      <FaBook size={35} />
                    </div>
                  )}

                </div>

                {/* =========================
                    INFORMATIONS
                ========================= */}

                <div className="book-search-content">

                  <h4 className="book-search-title">
                    {book.title}
                  </h4>

                  <p className="book-search-author">
                    <strong>
                      Auteur :
                    </strong>{" "}
                    {book.author ||
                      "Auteur inconnu"}
                  </p>

                  {book.genre && (
                    <span className="book-search-genre">
                      {book.genre}
                    </span>
                  )}

                  {book.description && (
                    <p className="book-search-description">
                      {book.description}
                    </p>
                  )}

                  {/* =========================
                      BOUTON AJOUTER
                  ========================= */}

                  <button
                    type="button"
                    onClick={() =>
                      addBook(book)
                    }
                    className="btn btn-success book-search-add-btn"
                    disabled={
                      addingBook === book.id
                    }
                  >

                    {addingBook === book.id ? (
                      <>
                        <FaSpinner className="spinner-icon me-2" />
                        Ajout en cours...
                      </>
                    ) : (
                      <>
                        <FaPlus className="me-2" />
                        Ajouter à ma bibliothèque
                      </>
                    )}

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </section>
  );
}

export default BookSearch;