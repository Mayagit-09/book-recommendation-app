const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const searchRoutes = require("./routes/searchRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes"); // ✅ ajouté


const app = express();


app.use(cors());

app.use(express.json());


// Routes API

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/books", bookRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/favorites", favoriteRoutes); // ✅ ajouté



app.get("/", (req, res) => {

  res.send("Book Recommendation API is running 📚");

});



// MongoDB

mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("✅ MongoDB connected");

})

.catch((error) => {

  console.log(error);

});



// Server

const PORT = 5000;


app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});