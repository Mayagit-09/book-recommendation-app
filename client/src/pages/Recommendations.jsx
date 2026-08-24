import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "Vous devez être connecté pour voir vos recommandations."
        );
        return;
      }

      const response = await api.get("/recommendations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecommendations(
        response.data.recommendations || []
      );

      setFavoriteGenres(
        response.data.favoriteGenres || []
      );

    } catch (error) {
      console.error(
        "Erreur recommandations :",
        error
      );

      setError(
        error.response?.data?.message ||
          "Impossible de charger les recommandations."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // ==========================================
  // CHARGEMENT
  // ==========================================

  if (loading) {
    return (
      <div className="container text-center py-5">

        <h3>
          🤖 Préparation de vos recommandations...
        </h3>

        <div
          className="spinner-border text-primary mt-3"
          role="status"
        >
          <span className="visually-hidden">
            Chargement...
          </span>
        </div>

      </div>
    );
  }

  // ==========================================
  // ERREUR
  // ==========================================

  if (error) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          ⚠️ {error}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          🏠 Retour à l'accueil
        </button>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="text-center mb-5">

        <h1>
          ✨ Recommandations pour vous
        </h1>

        <p className="text-muted">
          Découvrez des livres sélectionnés
          spécialement pour vous.
        </p>

      </div>


      {/* GENRES PRÉFÉRÉS */}

      {favoriteGenres.length > 0 && (

        <div className="mb-5">

          <h4>
            🏷️ Vos genres préférés
          </h4>

          <div className="d-flex flex-wrap gap-2 mt-3">

            {favoriteGenres.map((genre) => (

              <span
                key={genre}
                className="badge bg-warning text-dark p-2"
              >
                {genre}
              </span>

            ))}

          </div>

        </div>

      )}


      {/* AUCUNE RECOMMANDATION */}

      {recommendations.length === 0 ? (

        <div className="text-center py-5">

          <div style={{ fontSize: "60px" }}>
            📚
          </div>

          <h3>
            Aucune recommandation pour le moment
          </h3>

          <p className="text-muted">
            Likez quelques livres pour que nous
            puissions mieux connaître vos goûts.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            📖 Découvrir les livres
          </button>

        </div>

      ) : (

        <>
          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3>
              📚 Livres recommandés
            </h3>

            <button
              className="btn btn-outline-primary"
              onClick={fetchRecommendations}
            >
              🔄 Actualiser
            </button>

          </div>


          {/* FEED */}

          <div className="row">

            {recommendations.map((book) => (

              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-4"
                key={book._id}
              >

                <div className="card h-100 shadow-sm">

                  {/* IMAGE */}

                  <img
                    src={
                      book.image ||
                      "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    alt={book.title}
                    className="card-img-top"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />


                  {/* CONTENU */}

                  <div className="card-body d-flex flex-column">

                    <h5 className="card-title">
                      {book.title}
                    </h5>

                    <p className="text-muted">
                      ✍️ {book.author}
                    </p>

                    <p>
                      🏷️{" "}
                      {book.genre || "Non classé"}
                    </p>

                    <p>
                      ⭐ {book.rating || 0}/5
                    </p>


                    {/* RECOMMANDÉ PAR */}

                    {book.recommendedBy && (

                      <small className="text-muted mb-3">
                        👤 Recommandé par{" "}
                        {book.recommendedBy.username}
                      </small>

                    )}


                    {/* DESCRIPTION */}

                    {book.description && (

                      <p className="small text-muted">

                        {book.description.length > 100
                          ? book.description.substring(
                              0,
                              100
                            ) + "..."
                          : book.description}

                      </p>

                    )}


                    {/* BOUTON */}

                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() =>
                        navigate(
                          `/books/${book._id}`
                        )
                      }
                    >
                      📖 Voir le livre
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </>

      )}

    </div>
  );
}

export default Recommendations;