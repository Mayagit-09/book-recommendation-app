import React from "react";
import api from "../services/api";


function Rating({ book, onRated }) {


  const rateBook = async (value) => {

    try {

      const token = localStorage.getItem("token");


      await api.put(
        `/books/${book._id}/rating`,
        {
          rating: value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      alert("⭐ Note enregistrée !");


      onRated();


    } catch (error) {

      console.error("Erreur notation :", error);

    }

  };


  return (

    <div>

      <p>
        Donner une note :
      </p>


      {[1,2,3,4,5].map((star)=>(

        <button

          key={star}

          onClick={() => rateBook(star)}

          style={{
            fontSize:"22px",
            cursor:"pointer",
            border:"none",
            background:"transparent"
          }}

        >

          ⭐

        </button>


      ))}


    </div>

  );

}


export default Rating;