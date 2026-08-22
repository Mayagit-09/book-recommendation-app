import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Rating from "../components/Rating";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <h2 className="text-center mt-5">Chargement...</h2>;
  }

  return (
    <div className="container py-5">

      <div className="row">

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

        <div className="col-md-8">

          <h1>{book.title}</h1>

          <h4 className="text-muted">
            {book.author}
          </h4>

          <hr />

          <p>
            <strong>Genre :</strong> {book.genre}
          </p>

          <p>
            <strong>Note :</strong> ⭐ {book.rating || 0}/5
          </p>

          <p>{book.description}</p>
            <Rating
              book={book}
              onRated={(updatedBook) => setBook(updatedBook)}
            />
        </div>

      </div>

    </div>
  );
}

export default BookDetails;