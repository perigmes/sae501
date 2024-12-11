// Load environment variables
import "./loadEnvironment.mjs";
import cors from "cors";
import express from "express";
import {router} from "./routes/index.mjs";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
    origin: "http://localhost:3000", // Autoriser les requêtes depuis React
    methods: ["GET", "POST", "DELETE", "PUT","PATCH"], // Méthodes autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
  }));
  
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
