import { useState } from "react";
import api from "../services/api";

function AddBook({ onBookAdded, showNotification }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    genre: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await api.post("/books", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Notification de succès
      showNotification(
        "📚 Livre ajouté avec succès !",
        "success"
      );

      // Réinitialiser le formulaire
      setBook({
        title: "",
        author: "",
        description: "",
        image: "",
        genre: "",
      });

      // Actualiser la liste des livres
      onBookAdded();

      // Fermer la fenêtre
      document
        .querySelector("#addBookModal .btn-close")
        ?.click();

    } catch (error) {
      console.error(
        "Erreur lors de l'ajout :",
        error.response?.data || error.message
      );

      // Notification d'erreur
      showNotification(
        error.response?.data?.message ||
          "Erreur lors de l'ajout du livre.",
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content rounded-4">

          {/* =========================
              HEADER
          ========================= */}

          <div className="modal-header">

            <h3 className="modal-title">
              📚 Ajouter un livre
            </h3>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Fermer"
            ></button>

          </div>

          {/* =========================
              BODY
          ========================= */}

          <div className="modal-body">

            <form onSubmit={handleSubmit}>

              {/* TITRE */}

              <input
                className="form-control form-control-lg mb-3"
                name="title"
                placeholder="📖 Titre"
                value={book.title}
                onChange={handleChange}
                required
              />

              {/* AUTEUR */}

              <input
                className="form-control form-control-lg mb-3"
                name="author"
                placeholder="✍️ Auteur"
                value={book.author}
                onChange={handleChange}
                required
              />

              {/* GENRE */}

              <input
                className="form-control form-control-lg mb-3"
                name="genre"
                placeholder="🏷️ Genre"
                value={book.genre}
                onChange={handleChange}
              />

              {/* IMAGE */}

              <input
                className="form-control form-control-lg mb-3"
                name="image"
                placeholder="🖼️ URL de l'image"
                value={book.image}
                onChange={handleChange}
              />

              {/* DESCRIPTION */}

              <textarea
                className="form-control mb-4"
                rows="4"
                name="description"
                placeholder="📝 Description"
                value={book.description}
                onChange={handleChange}
              />

              {/* BOUTON */}

              <button
                className="btn btn-warning btn-lg w-100"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Ajout en cours..."
                  : "📚 Ajouter le livre"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AddBook;