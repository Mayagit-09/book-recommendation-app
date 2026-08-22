import React, { useState } from "react";
import api from "../services/api";

function Rating({ book, onRated }) {
  const [rating, setRating] = useState(book.rating || 0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRating = async (value) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.put(
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

      setRating(value);

      if (onRated) {
        onRated(response.data.book);
      }

    } catch (error) {
      console.error("Erreur rating :", error);

      alert(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement de la note."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rating-container">

      <div className="rating-title">
        Votre note
      </div>

      <div className="rating-stars">

        {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            type="button"
            className={`rating-star ${
              star <= (hover || rating)
                ? "active"
                : ""
            }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            disabled={loading}
            aria-label={`Noter ${star} sur 5`}
          >
            ★
          </button>

        ))}

      </div>

      <div className="rating-value">
        ⭐ {rating || 0}/5
      </div>

      {loading && (
        <div className="rating-loading">
          Enregistrement...
        </div>
      )}

    </div>
  );
}

export default Rating;