import { useState } from "react";
import api from "../services/api";

function AddBook({ onBookAdded }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
    genre: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/books", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("📚 Livre ajouté avec succès !");

      setBook({
        title: "",
        author: "",
        description: "",
        image: "",
        genre: "",
      });

      onBookAdded();

      // Fermer la fenêtre
      document.querySelector("#addBookModal .btn-close").click();

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout.");
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

          <div className="modal-header">
            <h3 className="modal-title">
              📚 Ajouter un livre
            </h3>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">

            <form onSubmit={handleSubmit}>

              <input
                className="form-control form-control-lg mb-3"
                name="title"
                placeholder="📖 Titre"
                value={book.title}
                onChange={handleChange}
                required
              />

              <input
                className="form-control form-control-lg mb-3"
                name="author"
                placeholder="✍️ Auteur"
                value={book.author}
                onChange={handleChange}
                required
              />

              <input
                className="form-control form-control-lg mb-3"
                name="genre"
                placeholder="🏷️ Genre"
                value={book.genre}
                onChange={handleChange}
              />

              <input
                className="form-control form-control-lg mb-3"
                name="image"
                placeholder="🖼️ URL de l'image"
                value={book.image}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-4"
                rows="4"
                name="description"
                placeholder="📝 Description"
                value={book.description}
                onChange={handleChange}
              />

              <button
                className="btn btn-warning btn-lg w-100"
                type="submit"
              >
                📚 Ajouter le livre
              </button>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AddBook;