import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Rating from "../components/Rating";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [likeLoading, setLikeLoading] = useState(false);

  // =============================
  // COMMENTAIRES
  // =============================
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  // =============================
  // RÉCUPÉRER LE LIVRE
  // =============================
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBook(res.data);
      } catch (error) {
        console.error(
          "Erreur récupération livre :",
          error
        );
      }
    };

    fetchBook();
  }, [id]);

  // =============================
  // RÉCUPÉRER LES COMMENTAIRES
  // =============================
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(
          `/comments/book/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComments(res.data);
      } catch (error) {
        console.error(
          "Erreur récupération commentaires :",
          error
        );
      }
    };

    fetchComments();
  }, [id]);

  // =============================
  // LIKE / UNLIKE
  // =============================
  const handleLike = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert(
        "Vous devez être connecté pour aimer un livre."
      );
      return;
    }

    try {
      setLikeLoading(true);

      const res = await api.post(
        `/books/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBook((prevBook) => ({
        ...prevBook,
        likes: res.data.likes,
      }));

    } catch (error) {
      console.error("Erreur Like :", error);

      alert(
        error.response?.data?.message ||
          "Impossible de liker le livre."
      );

    } finally {
      setLikeLoading(false);
    }
  };

  // =============================
  // PARTAGER LE LIVRE
  // =============================
  const handleShare = async () => {
    const shareData = {
      title: book.title,
      text: `Je vous recommande le livre "${book.title}" de ${book.author} 📚`,
      url: window.location.href,
    };

    try {
      // Partage natif sur mobile
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Sinon copier le lien
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("🔗 Lien du livre copié !");
      }
    } catch (error) {
      // L'utilisateur peut simplement fermer le menu de partage
      if (error.name !== "AbortError") {
        console.error(
          "Erreur partage :",
          error
        );
      }
    }
  };

  // =============================
  // AJOUTER UN COMMENTAIRE
  // =============================
  const handleComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("Veuillez écrire un commentaire.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert(
        "Vous devez être connecté pour commenter."
      );
      return;
    }

    try {
      setCommentLoading(true);

      const res = await api.post(
        `/comments/book/${id}`,
        {
          text: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prevComments) => [
        res.data.comment,
        ...prevComments,
      ]);

      setNewComment("");

    } catch (error) {
      console.error(
        "Erreur ajout commentaire :",
        error
      );

      alert(
        error.response?.data?.message ||
          "Impossible d'ajouter le commentaire."
      );

    } finally {
      setCommentLoading(false);
    }
  };

  // =============================
  // CHARGEMENT
  // =============================
  if (!book) {
    return (
      <h2 className="text-center mt-5">
        Chargement...
      </h2>
    );
  }

  return (
    <div className="container py-5">

      {/* =============================
          INFORMATIONS DU LIVRE
      ============================= */}

      <div className="row">

        {/* IMAGE */}

        <div className="col-md-4">

          <img
            src={
              book.image ||
              "https://via.placeholder.com/350x500?text=No+Image"
            }
            alt={book.title}
            className="img-fluid rounded shadow"
          />

        </div>


        {/* INFORMATIONS */}

        <div className="col-md-8">

          <h1>{book.title}</h1>

          <h4 className="text-muted">
            {book.author}
          </h4>

          <hr />

          <p>
            <strong>Genre :</strong>{" "}
            {book.genre || "Non spécifié"}
          </p>

          <p>
            <strong>Note :</strong>{" "}
            ⭐ {book.rating || 0}/5
          </p>

          <p>
            {book.description ||
              "Aucune description disponible."}
          </p>


          {/* =============================
              RATING
          ============================= */}

          <Rating
            book={book}
            onRated={(updatedBook) =>
              setBook(updatedBook)
            }
          />


          {/* =============================
              LIKE + SHARE
          ============================= */}

          <div className="mt-4 d-flex gap-2">

            <button
              onClick={handleLike}
              disabled={likeLoading}
              className="btn btn-outline-danger"
            >
              ❤️{" "}
              {book.likes?.length || 0}{" "}
              {book.likes?.length === 1
                ? "Like"
                : "Likes"}
            </button>


            <button
              onClick={handleShare}
              className="btn btn-outline-primary"
            >
              🔗 Partager
            </button>

          </div>

        </div>

      </div>


      {/* =============================
          COMMENTAIRES
      ============================= */}

      <div className="mt-5">

        <hr />

        <h3 className="mb-4">
          💬 Commentaires
        </h3>


        {/* FORMULAIRE */}

        <form onSubmit={handleComment}>

          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="Écrivez votre commentaire..."
            value={newComment}
            onChange={(e) =>
              setNewComment(e.target.value)
            }
            maxLength="500"
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={commentLoading}
          >
            {commentLoading
              ? "Envoi..."
              : "💬 Commenter"}
          </button>

        </form>


        {/* LISTE DES COMMENTAIRES */}

        <div className="mt-4">

          {comments.length === 0 ? (

            <p className="text-muted">
              Aucun commentaire pour le moment.
            </p>

          ) : (

            comments.map((comment) => (

              <div
                key={comment._id}
                className="card mb-3 shadow-sm"
              >

                <div className="card-body">

                  <h6>
                    👤{" "}
                    {comment.user?.username ||
                      "Utilisateur"}
                  </h6>

                  <p className="mb-2">
                    {comment.text}
                  </p>

                  <small className="text-muted">
                    {comment.createdAt
                      ? new Date(
                          comment.createdAt
                        ).toLocaleDateString()
                      : ""}
                  </small>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default BookDetails;