import React, { useEffect, useState } from "react";
import api from "../services/api";


function Favorites() {


  const [favorites, setFavorites] = useState([]);



  const fetchFavorites = async () => {

    try {

      const token = localStorage.getItem("token");


      const res = await api.get(
        "/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );


      setFavorites(res.data);


    } catch (error) {

      console.error(
        "Erreur favoris :",
        error
      );

    }

  };



  useEffect(() => {

    fetchFavorites();

  }, []);





  const removeFavorite = async (bookId) => {


    try {


      const token = localStorage.getItem("token");


      await api.delete(
        `/favorites/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );



      alert(
        "Livre supprimé des favoris"
      );



      fetchFavorites();



    } catch(error) {


      console.error(error);


    }


  };





  return (

    <div
      style={{
        padding:"30px",
        maxWidth:"900px",
        margin:"auto"
      }}
    >


      <h1>
        ❤️ Mes favoris
      </h1>



      {
        favorites.length === 0 ? (

          <p>
            Aucun livre dans vos favoris.
          </p>


        ) : (


          favorites.map((book)=>(


            <div

              key={book._id}

              style={{

                border:"1px solid #ddd",

                borderRadius:"10px",

                padding:"15px",

                marginBottom:"15px"

              }}

            >


              <h3>
                {book.title}
              </h3>



              <p>
                <strong>Auteur :</strong> {book.author}
              </p>



              <p>
                {book.description}
              </p>



              <button

                className="btn btn-danger"

                onClick={() =>
                  removeFavorite(book._id)
                }

              >

                🗑️ Retirer

              </button>



            </div>


          ))

        )

      }



    </div>

  );

}


export default Favorites;