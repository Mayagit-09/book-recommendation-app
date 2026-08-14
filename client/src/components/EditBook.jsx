import React, { useState } from "react";
import api from "../services/api";

function EditBook({ book, onBookUpdated, onClose }) {

  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    description: book.description,
    genre: book.genre,
    image: book.image,
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const updateBook = async (e) => {
    e.preventDefault();

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


      alert("✏️ Livre modifié avec succès !");


      if (onBookUpdated) {
        onBookUpdated();
      }


    } catch (error) {

      console.error("Erreur modification :", error);

      alert("Erreur lors de la modification");

    }
  };


  return (

    <form
  onSubmit={updateBook}
  className="edit-form"
>

<input
  className="edit-input"
  name="title"
  value={form.title}
  onChange={handleChange}
  placeholder="Titre"
/>

      <br /><br />

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Titre"
      />

      <br /><br />


      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Auteur"
      />

      <br /><br />


      <input
        name="genre"
        value={form.genre}
        onChange={handleChange}
        placeholder="Genre"
      />

      <br /><br />


      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
      />

      <br /><br />


     <textarea
  className="edit-input edit-textarea"
  name="description"
  value={form.description}
  onChange={handleChange}
  placeholder="Description"
/>

      <br /><br />

<button
  type="button"
  onClick={onClose}
  style={{
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginRight: "10px"
  }}
>
  ❌ Annuler
</button>

<button
  type="submit"
  className="save-btn"
  style={{
    backgroundColor: "#198754",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer"
  }}
>
  💾 Enregistrer
</button>
    </form>

  );
}


export default EditBook;