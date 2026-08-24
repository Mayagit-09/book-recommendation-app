import React, { useEffect, useState } from "react";
import api from "../services/api";

import AddBook from "../components/AddBook";
import BookSearch from "../components/BookSearch";
import EditBook from "../components/EditBook";
import Rating from "../components/Rating";

import library from "../assets/library.jpg";

import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaEdit,
  FaTrash,
  FaBookOpen,
  FaPlus,
  FaSearch,
} from "react-icons/fa";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // Livre actuellement sélectionné pour modification
  const [editingBook, setEditingBook] = useState(null);

  // Notification
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  // =====================================================
  // NOTIFICATION
  // =====================================================

  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type,
    });

    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, 3000);
  };

  // =====================================================
  // RÉCUPÉRER LES LIVRES
  // =====================================================

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/books", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(response.data);
    } catch (error) {
      console.error(
        "Erreur récupération livres :",
        error
      );

      console.error(
        "Status :",
        error.response?.status
      );

      console.error(
        "Message :",
        error.response?.data
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // =====================================================
  // SUPPRIMER UN LIVRE
  // =====================================================

  const deleteBook = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer ce livre ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showNotification(
        "🗑️ Livre supprimé avec succès !",
        "success"
      );

      fetchBooks();
    } catch (error) {
      console.error(
        "Erreur suppression :",
        error
      );

      showNotification(
        error.response?.data?.message ||
          "Erreur lors de la suppression.",
        "error"
      );
    }
  };

  // =====================================================
  // AJOUTER AUX FAVORIS
  // =====================================================

  const addFavorite = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/favorites/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showNotification(
        "❤️ Livre ajouté aux favoris !",
        "success"
      );
    } catch (error) {
      console.error(
        "Erreur favoris :",
        error
      );

      showNotification(
        error.response?.data?.message ||
          "Erreur lors de l'ajout aux favoris.",
        "error"
      );
    }
  };

  // =====================================================
  // RECHERCHE LOCALE
  // =====================================================

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase().trim();

    return (
      book.title
        ?.toLowerCase()
        .includes(searchText) ||
      book.author
        ?.toLowerCase()
        .includes(searchText) ||
      book.genre
        ?.toLowerCase()
        .includes(searchText)
    );
  });

  // =====================================================
  // AFFICHAGE
  // =====================================================

  return (
    <div className="home-page">

      {/* =================================================
          NOTIFICATION
      ================================================= */}

      {notification.message && (
        <div
          className={`notification ${notification.type}`}
          role="alert"
        >
          <span>{notification.message}</span>

          <button
            type="button"
            onClick={() =>
              setNotification({
                message: "",
                type: "",
              })
            }
            aria-label="Fermer la notification"
          >
            ×
          </button>
        </div>
      )}

      {/* =================================================
          HERO
      ================================================= */}

      <div
        className="hero"
        style={{
          backgroundImage: `url(${library})`,
        }}
      >
        <div className="hero-content">

          <div className="mb-3">
            <FaBookOpen
              size={38}
              aria-hidden="true"
            />
          </div>

          <h1>
            Découvrez votre prochaine lecture
          </h1>

          <p className="mt-3">
            Des milliers de livres vous attendent.
            <br />
            Explorez, découvrez et partagez vos coups de cœur.
          </p>

          <button
            className="btn btn-warning btn-lg mt-3"
            onClick={() =>
              document
                .getElementById("books-section")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            <FaBookOpen className="me-2" />
            Commencer l’exploration
          </button>

        </div>
      </div>

      {/* =================================================
          CONTENU PRINCIPAL
      ================================================= */}

      <main className="container-fluid px-3 px-md-4">

        {/* =================================================
            RECHERCHE OPEN LIBRARY
        ================================================= */}

        <section className="mb-4">
          <BookSearch
            onBookAdded={fetchBooks}
            showNotification={showNotification}
          />
        </section>

        {/* =================================================
            AJOUTER UN LIVRE
        ================================================= */}

        <div className="text-center my-4">
          <button
            className="btn btn-warning btn-lg shadow-sm"
            data-bs-toggle="modal"
            data-bs-target="#addBookModal"
          >
            <FaPlus className="me-2" />
            Ajouter un livre
          </button>
        </div>

        {/* =================================================
            MODAL AJOUT
        ================================================= */}

        <AddBook
          onBookAdded={fetchBooks}
          showNotification={showNotification}
        />

        <hr className="my-5" />

        {/* =================================================
            RECHERCHE LOCALE
        ================================================= */}

        <section className="mb-5">

          <div className="position-relative">

            <FaSearch
              className="position-absolute top-50 translate-middle-y ms-3 text-muted"
              aria-hidden="true"
            />

            <input
              className="form-control search-box ps-5"
              type="text"
              placeholder="Rechercher dans mes livres..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              aria-label="Rechercher dans mes livres"
            />

          </div>

        </section>

        {/* =================================================
            TITRE BIBLIOTHÈQUE
        ================================================= */}

        <section
          id="books-section"
          className="mb-4"
        >
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">

            <div>
              <h2 className="mb-1">
                📖 Ma bibliothèque
              </h2>

              <p className="text-muted mb-0">
                {filteredBooks.length}{" "}
                {filteredBooks.length === 1
                  ? "livre"
                  : "livres"}{" "}
                disponible
                {filteredBooks.length > 1
                  ? "s"
                  : ""}
              </p>
            </div>

          </div>
        </section>

        {/* =================================================
            LIVRES
        ================================================= */}

        {filteredBooks.length === 0 ? (

          <div className="text-center my-5 py-5">

            <FaBookOpen
              size={55}
              className="text-muted mb-3"
              aria-hidden="true"
            />

            <h4>
              Aucun livre trouvé
            </h4>

            <p className="text-muted">
              Ajoutez un livre ou essayez une autre recherche.
            </p>

            {search && (
              <button
                className="btn btn-outline-primary mt-2"
                onClick={() => setSearch("")}
              >
                Réinitialiser la recherche
              </button>
            )}

          </div>

        ) : (

          <div className="books-grid">

            {filteredBooks.map((book) => (

              <div
                className="book-item"
                key={book._id}
              >

                <div className="book-card">

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <img
                    src={
                      book.image ||
                      "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={book.title}
                    className="book-image"
                  />

                  {/* =================================================
                      CONTENU
                  ================================================= */}

                  <div className="card-body">

                    {/* TITRE */}

                    <h3 className="card-title">
                      {book.title}
                    </h3>

                    {/* AUTEUR */}

                    <p className="card-text">
                      <strong>
                        Auteur :
                      </strong>{" "}
                      {book.author || "Inconnu"}
                    </p>

                    {/* DESCRIPTION */}

                    <p className="card-text book-description">
                      {book.description ||
                        "Aucune description disponible."}
                    </p>

                    {/* GENRE */}

                    <p className="card-text">
                      <strong>
                        Genre :
                      </strong>{" "}
                      {book.genre ||
                        "Non classé"}
                    </p>

                    {/* RATING */}

                    <Rating
                      book={book}
                      onRated={fetchBooks}
                    />

                    {/* =================================================
                        BOUTONS
                    ================================================= */}

                    <div className="book-actions">

                      {/* DÉTAILS */}

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(
                            `/books/${book._id}`
                          )
                        }
                        title="Voir les détails"
                      >
                        <FaBookOpen />
                        <span>Détails</span>
                      </button>

                      {/* FAVORI */}

                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          addFavorite(book._id)
                        }
                        title="Ajouter aux favoris"
                      >
                        <FaHeart />
                        <span>Favori</span>
                      </button>

                      {/* MODIFIER */}

                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() =>
                          setEditingBook(book)
                        }
                        title="Modifier le livre"
                      >
                        <FaEdit />
                        <span>Modifier</span>
                      </button>

                      {/* SUPPRIMER */}

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          deleteBook(book._id)
                        }
                        title="Supprimer le livre"
                      >
                        <FaTrash />
                        <span>Supprimer</span>
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* =================================================
          FENÊTRE MODIFICATION
      ================================================= */}

      {editingBook && (
        <EditBook
          book={editingBook}

          onClose={() => {
            setEditingBook(null);
          }}

          onBookUpdated={(updatedBook) => {
            setBooks((previousBooks) =>
              previousBooks.map((book) =>
                book._id === updatedBook._id
                  ? updatedBook
                  : book
              )
            );

            setEditingBook(null);

            showNotification(
              "✏️ Livre modifié avec succès !",
              "success"
            );
          }}

          showNotification={showNotification}
        />
      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer>

        <h3>
          📚 Application de recommandation de livres
        </h3>

        <hr />

        <p>
          Découvrez, ajoutez et partagez vos livres préférés.
        </p>

        <p>
          © 2026 Book Recommendation App —
          Tous droits réservés.
        </p>

      </footer>

    </div>
  );
}

export default Home;