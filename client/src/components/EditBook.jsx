import React, { useState } from "react";
import api from "../services/api";

function EditBook({
  book,
  onBookUpdated,
  onClose,
  showNotification,
}) {
  const [form, setForm] = useState({
    title: book.title || "",
    author: book.author || "",
    description: book.description || "",
    genre: book.genre || "",
    image: book.image || "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // MODIFIER LES CHAMPS
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // MODIFIER LE LIVRE
  // =========================

  const updateBook = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/books/${book._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notification de succès
      showNotification(
        "✏️ Livre modifié avec succès !",
        "success"
      );

      // Actualiser les livres
      if (onBookUpdated) {
        onBookUpdated();
      }

    } catch (error) {
      console.error(
        "Erreur modification :",
        error.response?.data || error.message
      );

      // Notification d'erreur
      showNotification(
        error.response?.data?.message ||
          "Erreur lors de la modification.",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={updateBook}
      className="edit-form"
    >

      {/* =========================
          TITRE
      ========================= */}

      <input
        className="edit-input"
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Titre"
        required
      />

      <br />
      <br />

      {/* =========================
          AUTEUR
      ========================= */}

      <input
        className="edit-input"
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Auteur"
        required
      />

      <br />
      <br />

      {/* =========================
          GENRE
      ========================= */}

      <input
        className="edit-input"
        name="genre"
        value={form.genre}
        onChange={handleChange}
        placeholder="Genre"
      />

      <br />
      <br />

      {/* =========================
          IMAGE
      ========================= */}

      <input
        className="edit-input"
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
      />

      <br />
      <br />

      {/* =========================
          DESCRIPTION
      ========================= */}

      <textarea
        className="edit-input edit-textarea"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows="5"
      />

      <br />
      <br />

      {/* =========================
          BOUTONS
      ========================= */}

      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        style={{
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          padding: "10px 25px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        ❌ Annuler
      </button>

      <button
        type="submit"
        className="save-btn"
        disabled={loading}
        style={{
          backgroundColor: "#198754",
          color: "white",
          border: "none",
          padding: "10px 25px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading
          ? "Enregistrement..."
          : "💾 Enregistrer"}
      </button>

    </form>
  );
}

export default EditBook;