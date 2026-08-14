import React, { useEffect, useState } from "react";

import api from "../services/api";

import AddBook from "../components/AddBook";
import BookSearch from "../components/BookSearch";
import EditBook from "../components/EditBook";
import Rating from "../components/Rating";

import library from "../assets/library.jpg";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // =========================
  // RÉCUPÉRER LES LIVRES
  // =========================

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Erreur récupération livres :", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // =========================
  // SUPPRIMER UN LIVRE
  // =========================

  const deleteBook = async (id) => {
  if (!window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    console.log("ID du livre :", id);
    console.log("Token :", token);

    const response = await api.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Réponse suppression :", response.data);

    alert("🗑️ Livre supprimé !");

    fetchBooks();

  } catch (error) {
    console.error("Erreur suppression :", error);
    console.error("Status :", error.response?.status);
    console.error("Data :", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Erreur lors de la suppression"
    );
  }
};
  // =========================
  // AJOUTER AUX FAVORIS
  // =========================

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

      alert("❤️ Livre ajouté aux favoris !");
    } catch (error) {
      console.error("Erreur favoris :", error);
      alert("Erreur favoris");
    }
  };

  // =========================
  // RECHERCHE LOCALE
  // =========================

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

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

  // =========================
  // AFFICHAGE
  // =========================

  return (
    <>
      {/* =========================
          HERO
      ========================= */}

      <div
        className="hero mb-5"
        style={{
          backgroundImage: `url(${library})`,
        }}
      >
        <div className="hero-content">
          <h1>📚 Découvrez votre prochaine lecture</h1>

          <p className="mt-3">
           Des milliers de livres vous attendent.
            <br />
            Explorez, découvrez et partagez vos coups de cœur.
          </p>

          <button
  className="btn btn-warning btn-lg mt-3"
  onClick={() =>
    document.getElementById("books-section")?.scrollIntoView({
      behavior: "smooth",
    })
  }
>
  📖 Commencer l’exploration
</button>
        </div>
      </div>

      {/* =========================
          RECHERCHE OPEN LIBRARY
      ========================= */}

      <BookSearch onBookAdded={fetchBooks} />

      {/* =========================
          BOUTON AJOUTER
      ========================= */}

      <div className="text-center my-4">
        <button
          className="btn btn-warning btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#addBookModal"
        >
          ➕ Ajouter un livre
        </button>
      </div>

      {/* =========================
          MODAL AJOUT
      ========================= */}

      <AddBook onBookAdded={fetchBooks} />

      <hr className="my-5" />

      {/* =========================
          RECHERCHE LOCALE
      ========================= */}

      <input
        className="form-control search-box mb-5"
        type="text"
        placeholder="🔍 Rechercher dans mes livres..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* =========================
          TITRE BIBLIOTHÈQUE
      ========================= */}
<div id="books-section">
  <h2 className="mb-4">
    📖 Ma bibliothèque
  </h2>
</div>

      {/* =========================
          LIVRES
      ========================= */}

      {filteredBooks.length === 0 ? (
        <div className="text-center my-5">
          <h4>📚 Aucun livre trouvé</h4>

          <p>
            Ajoutez un livre ou essayez une autre recherche.
          </p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div
              className="book-item"
              key={book._id}
            >
              {/* =========================
                  CARTE
              ========================= */}

              <div className="book-card">

                {/* IMAGE */}

                <img
  src={
    book.image ||
    "https://via.placeholder.com/300x450?text=No+Image"
  }
  alt={book.title}
  className="book-image"
  style={{
    width: "100%",
    height: "600px",
    objectFit: "cover"
  }}
/>
                {/* CONTENU */}

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
                    {book.author}
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
                    {book.genre || "Non classé"}
                  </p>

                  {/* NOTE */}

                  <p className="card-text">
                    ⭐ {book.rating || 0}/5
                  </p>

                  {/* RATING */}

                  <Rating
                    book={book}
                    onRated={fetchBooks}
                  />

                  {/* =========================
                      BOUTONS
                  ========================= */}

                  <div className="book-actions">
                    
                    {/* Détail */}
                     <button
                       className="btn btn-primary"
                        onClick={() => navigate(`/books/${book._id}`)}
                    >
                      📖
                      <span>Détails</span>
                     </button>

                    {/* FAVORI */}

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        addFavorite(book._id)
                      }
                    >
                      <FaHeart />
                      <span>Favori</span>
                    </button>

                    {/* MODIFIER */}

                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        setEditId(book._id)
                      }
                    >
                      <FaEdit />
                      <span>Modifier</span>
                    </button>

                    {/* SUPPRIMER */}

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deleteBook(book._id)
                      }
                    >
                      <FaTrash />
                      <span>Supprimer</span>
                    </button>

                  </div>

                  {/* =========================
                      MODIFICATION
                  ========================= */}

                  {editId === book._id && (
                  <div className="mt-4">
                     <EditBook
                       book={book}
                       onBookUpdated={() => {
                       fetchBooks();
                       setEditId(null);
                       }}
                      onClose={() => setEditId(null)}
                      />
                  </div>
)}

                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================
          FOOTER
      ========================= */}

      <footer>
        <h3>📚 Application de recommandation de livres</h3>

        <hr />

        <p>
          Découvrez, ajoutez et partagez vos livres préférés.
        </p>

        <p>
          © 2026 Book Recommendation App — Tous droits réservés.
        </p>
      </footer>
    </>
  );
}

export default Home;