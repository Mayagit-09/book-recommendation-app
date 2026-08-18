import React, { useState } from "react";
import { createPortal } from "react-dom";
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

  // =====================================================
  // MODIFIER LES CHAMPS
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  // =====================================================
  // ENREGISTRER LA MODIFICATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification du titre
    if (!form.title.trim()) {
      showNotification(
        "Le titre est obligatoire.",
        "error"
      );
      return;
    }

    // Vérification de l'auteur
    if (!form.author.trim()) {
      showNotification(
        "L'auteur est obligatoire.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      console.log("ID du livre :", book._id);
      console.log("Données envoyées :", form);

      // =================================================
      // MODIFICATION DU LIVRE
      // =================================================

      const response = await api.put(
        `/books/${book._id}`,
        {
          title: form.title.trim(),
          author: form.author.trim(),
          description: form.description,
          genre: form.genre,
          image: form.image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "Réponse du serveur :",
        response.data
      );

      // =================================================
      // IMPORTANT
      // Le backend retourne :
      //
      // {
      //   message: "...",
      //   book: {...}
      // }
      //
      // Donc on récupère response.data.book
      // =================================================

      const updatedBook = response.data.book;

      if (!updatedBook) {
        throw new Error(
          "Le serveur n'a pas retourné le livre modifié."
        );
      }

      // Mettre à jour Home.jsx
      onBookUpdated(updatedBook);

      // Notification
      showNotification(
        "✏️ Livre modifié avec succès !",
        "success"
      );

      // Fermer la fenêtre
      onClose();

    } catch (error) {
      console.error(
        "ERREUR MODIFICATION :",
        error
      );

      console.error(
        "STATUS :",
        error.response?.status
      );

      console.error(
        "RÉPONSE SERVEUR :",
        error.response?.data
      );

      showNotification(
        error.response?.data?.message ||
          error.message ||
          "Erreur lors de la modification du livre.",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FENÊTRE MODALE
  // =====================================================

  const modal = (
    <div
      style={{
        position: "fixed",
        inset: 0,

        width: "100vw",
        height: "100vh",

        backgroundColor:
          "rgba(0, 0, 0, 0.7)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        padding: "20px",

        boxSizing: "border-box",

        zIndex: 2147483647,
      }}
      onClick={onClose}
    >

      {/* =================================================
          FENÊTRE
      ================================================= */}

      <div
        style={{
          width: "600px",

          maxWidth: "95vw",

          maxHeight: "90vh",

          overflowY: "auto",

          backgroundColor: "#ffffff",

          borderRadius: "18px",

          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.5)",

          position: "relative",
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          style={{
            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            padding: "20px 25px",

            borderBottom:
              "1px solid #eeeeee",
          }}
        >

          <h2
            style={{
              margin: 0,

              fontSize: "24px",

              color: "#263238",
            }}
          >
            ✏️ Modifier le livre
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",

              background:
                "transparent",

              fontSize: "32px",

              lineHeight: 1,

              color: "#777",

              cursor: "pointer",

              padding: "0 5px",
            }}
          >
            ×
          </button>

        </div>

        {/* =================================================
            FORMULAIRE
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          style={{
            padding: "25px",
          }}
        >

          {/* TITRE */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#37474f",
                textAlign: "left",
              }}
            >
              Titre
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Titre du livre"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
              }}
            />

          </div>

          {/* AUTEUR */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#37474f",
                textAlign: "left",
              }}
            >
              Auteur
            </label>

            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Nom de l'auteur"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
              }}
            />

          </div>

          {/* GENRE */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#37474f",
                textAlign: "left",
              }}
            >
              Genre
            </label>

            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Genre du livre"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
              }}
            />

          </div>

          {/* DESCRIPTION */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#37474f",
                textAlign: "left",
              }}
            >
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description du livre"
              rows="5"
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: "10px",
                fontSize: "15px",
                fontFamily: "inherit",
                resize: "vertical",
                outline: "none",
              }}
            />

          </div>

          {/* IMAGE */}

          <div
            style={{
              marginBottom: "18px",
            }}
          >

            <label
              style={{
                display: "block",
                marginBottom: "7px",
                fontWeight: "600",
                color: "#37474f",
                textAlign: "left",
              }}
            >
              URL de l'image
            </label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: "1px solid #d6d6d6",
                borderRadius: "10px",
                fontSize: "15px",
                outline: "none",
              }}
            />

          </div>

          {/* =================================================
              BOUTONS
          ================================================= */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "25px",
              paddingTop: "20px",
              borderTop:
                "1px solid #eeeeee",
            }}
          >

            {/* ANNULER */}

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                border: "none",
                padding: "11px 22px",
                borderRadius: "10px",
                backgroundColor: "#eeeeee",
                color: "#444",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Annuler
            </button>

            {/* ENREGISTRER */}

            <button
              type="submit"
              disabled={loading}
              style={{
                border: "none",
                padding: "11px 22px",
                borderRadius: "10px",
                backgroundColor: "#26a69a",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {loading
                ? "Modification..."
                : "💾 Enregistrer"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );

  // =====================================================
  // PORTAL
  // =====================================================

  return createPortal(
    modal,
    document.body
  );
}

export default EditBook;