import { useState } from "react";
import api from "../services/api";
import {
  FaBook,
  FaUser,
  FaTag,
  FaStar,
  FaImage,
  FaAlignLeft,
  FaSpinner,
  FaPlus,
} from "react-icons/fa";

function AddBook({ onBookAdded, showNotification }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    genre: "",
    rating: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // MODIFIER LE FORMULAIRE
  // =====================================================

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // ENVOYER LE FORMULAIRE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =====================================================
    // VALIDATION DU TITRE
    // =====================================================

    if (!book.title.trim()) {
      showNotification(
        "📖 Veuillez saisir le titre du livre.",
        "error"
      );
      return;
    }

    // =====================================================
    // VALIDATION DE L'AUTEUR
    // =====================================================

    if (!book.author.trim()) {
      showNotification(
        "✍️ Veuillez saisir le nom de l'auteur.",
        "error"
      );
      return;
    }

    // =====================================================
    // VALIDATION DU RATING
    // =====================================================

    let rating = 0;

    if (book.rating !== "") {
      rating = Number(book.rating);

      if (
        isNaN(rating) ||
        rating < 0 ||
        rating > 5
      ) {
        showNotification(
          "⭐ La note doit être comprise entre 0 et 5.",
          "error"
        );
        return;
      }
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/books",
        {
          ...book,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // =====================================================
      // SUCCÈS
      // =====================================================

      showNotification(
        "📚 Livre ajouté avec succès !",
        "success"
      );

      // =====================================================
      // RESET
      // =====================================================

      setBook({
        title: "",
        author: "",
        description: "",
        image: "",
        genre: "",
        rating: "",
      });

      // =====================================================
      // ACTUALISER LA LISTE
      // =====================================================

      if (onBookAdded) {
        onBookAdded();
      }

      // =====================================================
      // FERMER LA MODALE
      // =====================================================

      document
        .querySelector("#addBookModal .btn-close")
        ?.click();

    } catch (error) {
      console.error(
        "Erreur lors de l'ajout :",
        error.response?.data ||
          error.message
      );

      showNotification(
        error.response?.data?.message ||
          "❌ Erreur lors de l'ajout du livre.",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="addBookModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">

        <div className="modal-content add-book-modal">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="modal-header add-book-header">

            <div className="d-flex align-items-center gap-3">

              <div className="add-book-icon">
                <FaBook />
              </div>

              <div>
                <h3 className="modal-title mb-1">
                  Ajouter un livre
                </h3>

                <p className="mb-0">
                  Ajoutez un nouveau livre à votre bibliothèque
                </p>
              </div>

            </div>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fermer"
            ></button>

          </div>

          {/* =================================================
              BODY
          ================================================= */}

          <div className="modal-body add-book-body">

            <form onSubmit={handleSubmit}>

              {/* =================================================
                  TITRE
              ================================================= */}

              <div className="add-book-field">

                <label htmlFor="book-title">
                  <FaBook />
                  Titre du livre
                </label>

                <div className="add-book-input">

                  <input
                    id="book-title"
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Ex : Harry Potter"
                    value={book.title}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* =================================================
                  AUTEUR
              ================================================= */}

              <div className="add-book-field">

                <label htmlFor="book-author">
                  <FaUser />
                  Auteur
                </label>

                <input
                  id="book-author"
                  type="text"
                  className="form-control"
                  name="author"
                  placeholder="Ex : J.K. Rowling"
                  value={book.author}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* =================================================
                  GENRE + NOTE
              ================================================= */}

              <div className="row">

                <div className="col-md-6">

                  <div className="add-book-field">

                    <label htmlFor="book-genre">
                      <FaTag />
                      Genre
                    </label>

                    <input
                      id="book-genre"
                      type="text"
                      className="form-control"
                      name="genre"
                      placeholder="Ex : Fantastique"
                      value={book.genre}
                      onChange={handleChange}
                    />

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="add-book-field">

                    <label htmlFor="book-rating">
                      <FaStar />
                      Note
                    </label>

                    <input
                      id="book-rating"
                      type="number"
                      className="form-control"
                      name="rating"
                      placeholder="Entre 1 et 5"
                      value={book.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      step="0.1"
                    />

                  </div>

                </div>

              </div>

              <small className="add-book-help">
                ⭐ La note est facultative. Vous pourrez
                noter le livre plus tard.
              </small>

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="add-book-field">

                <label htmlFor="book-image">
                  <FaImage />
                  Image du livre
                </label>

                <input
                  id="book-image"
                  type="url"
                  className="form-control"
                  name="image"
                  placeholder="https://exemple.com/image.jpg"
                  value={book.image}
                  onChange={handleChange}
                />

                <small className="text-muted">
                  Ajoutez l'URL de la couverture du livre.
                </small>

              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="add-book-field">

                <label htmlFor="book-description">
                  <FaAlignLeft />
                  Description
                </label>

                <textarea
                  id="book-description"
                  className="form-control"
                  rows="5"
                  name="description"
                  placeholder="Décrivez brièvement le livre..."
                  value={book.description}
                  onChange={handleChange}
                />

              </div>

              {/* =================================================
                  BOUTON
              ================================================= */}

              <button
                className="btn btn-warning btn-lg w-100 add-book-submit"
                type="submit"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <FaSpinner className="spinner-icon me-2" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <FaPlus className="me-2" />
                    Ajouter le livre
                  </>
                )}

              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AddBook;