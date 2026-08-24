import axios from "axios";

const api = axios.create({
  baseURL: "https://book-recommendation-app-b9z0.onrender.com/api",
});

export default api;