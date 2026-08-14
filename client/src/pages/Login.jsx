import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Login() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    console.log("Formulaire envoyé :", form);



    try {


      const res = await api.post(
        "/users/login",
        form
      );


      console.log(
        "Réponse backend :",
        res.data
      );



      localStorage.setItem(
        "token",
        res.data.token
      );



      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );



      console.log(
        "TOKEN ENREGISTRÉ :",
        localStorage.getItem("token")
      );



      alert("Connexion réussie !");


      navigate("/");



    } catch(error) {


      console.error(
        "Erreur login :",
        error.response?.data || error.message
      );


      alert(
        "Erreur de connexion"
      );


    }

  };



  return (

    <div
      style={{
        maxWidth:"400px",
        margin:"40px auto"
      }}
    >

      <h2>
        Connexion
      </h2>


      <form onSubmit={handleSubmit}>


        <input

          type="email"

          name="email"

          placeholder="Email"

          value={form.email}

          onChange={handleChange}

          required

        />


        <br/><br/>


        <input

          type="password"

          name="password"

          placeholder="Mot de passe"

          value={form.password}

          onChange={handleChange}

          required

        />


        <br/><br/>


        <button type="submit">

          Se connecter

        </button>


      </form>


    </div>

  );

}


export default Login;