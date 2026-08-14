import { useState } from "react";
import api from "../services/api";

function BookSearch({ onBookAdded }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    if (!query) return;

    try {
      const res = await api.get(`/search?query=${query}`);
      setBooks(res.data);
    } catch (error) {
      console.error("Erreur recherche :", error);
    }
  };

  const addBook = async (book) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/books",
        {
          title: book.title,
          author: book.author,
          description: book.description || "Aucune description disponible.",
          image: book.image,
          genre: book.genre,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("📚 Livre ajouté avec succès !");

      if (onBookAdded) {
        onBookAdded();
      }
    } catch (error) {
      console.error("Erreur ajout :", error);
      alert("Erreur lors de l'ajout du livre");
    }
  };

  return (
    <div className="my-5">

      {/* TITRE */}
      <h3 className="text-center mb-3">
        🔍 Recherche de livres
      </h3>

      {/* BARRE DE RECHERCHE */}
      <div className="d-flex justify-content-center align-items-center gap-2">

        <input
          className="form-control"
          style={{
            maxWidth: "500px",
            height: "50px",
            borderRadius: "12px",
            fontSize: "16px",
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex : Harry Potter"
        />

        <button
          className="btn btn-warning"
          style={{
            height: "50px",
            padding: "0 25px",
            borderRadius: "12px",
            fontWeight: "600",
            whiteSpace: "nowrap",
          }}
          onClick={searchBooks}
        >
          🔍 Rechercher
        </button>

      </div>

      {/* RÉSULTATS */}
      <div className="mt-4">

        {books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginTop: "15px",
              borderRadius: "12px",
            }}
          >

            <h3>{book.title}</h3>

            <p>
              <strong>Auteur :</strong> {book.author}
            </p>

            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                width="120"
                style={{
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
            )}

            <br />

            {/* BOUTON AJOUTER */}
            <button
              onClick={() => addBook(book)}
              className="btn btn-success"
              style={{
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: "600",
                border: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              📚 Ajouter à ma bibliothèque
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default BookSearch;