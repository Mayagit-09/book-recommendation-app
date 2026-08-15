import React, { useState } from "react";
import api from "../services/api";

function Rating({ book, onRated, showNotification }) {
  const [loading, setLoading] = useState(false);

  const rateBook = async (value) => {
    if (loading) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await api.put(
        `/books/${book._id}/rating`,
        {
          rating: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notification professionnelle
      showNotification(
        `⭐ Note de ${value}/5 enregistrée !`,
        "success"
      );

      // Actualiser le livre
      if (onRated) {
        onRated();
      }

    } catch (error) {
      console.error(
        "Erreur notation :",
        error.response?.data || error.message
      );

      showNotification(
        error.response?.data?.message ||
          "❌ Erreur lors de l'enregistrement de la note.",
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p>
        Donner une note :
      </p>

      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => rateBook(star)}
          disabled={loading}
          title={`Noter ${star}/5`}
          style={{
            fontSize: "22px",
            cursor: loading ? "not-allowed" : "pointer",
            border: "none",
            background: "transparent",
            opacity: loading ? 0.6 : 1,
          }}
        >
          ⭐
        </button>
      ))}
    </div>
  );
}

export default Rating;