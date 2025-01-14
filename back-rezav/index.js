const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const passport = require("passport");
const session = require("express-session");
const ObjectId = require("mongodb").ObjectId;
const cas = require("./cas"); // Importer le fichier CAS
const path = require("path");
require("dotenv").config();
const { sendConfirmationEmail, sendResponseEmail } = require("./mail.js");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Ajouter le middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Autoriser les requêtes depuis React
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configuration de la session (nécessaire pour Passport)
app.use(
  session({
    secret: require("crypto").randomBytes(32).toString("hex"), // Clé secrète générée dynamiquement
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Passez à true si vous utilisez HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Durée de vie du cookie : 24h
    },
  })
);

// Initialiser Passport et gérer les sessions
app.use(passport.initialize());
app.use(passport.session());

// Serialisation et désérialisation des utilisateurs pour Passport
passport.serializeUser((user, done) => {
  done(null, user.id); // Utilise l'ID utilisateur pour les sessions
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Définir le répertoire où les fichiers JSON sont stockés
const jsonFolder = path.join(__dirname, "../assets/data");

const materialFilePath = path.join(jsonFolder, "materiel.json");
const reservationFilePath = path.join(jsonFolder, "reservation.json");
const reservationStatusFilePath = path.join(jsonFolder, "reservation_status.json");

// Routes existantes (inchangées)
app.get("/items", (req, res) => {
  fs.readFile(materialFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
    }
    const items = JSON.parse(data);
    res.status(200).json(items);
  });
});

app.post("/reservation", (req, res) => {
  // Lire les fichiers JSON en parallèle
  fs.readFile(reservationFilePath, "utf8", (err, reservationsData) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture du fichier des réservations" });
    }
    fs.readFile(reservationStatusFilePath, "utf8", (errStatus, statusData) => {
      if (errStatus) {
        return res.status(500).json({ error: "Erreur lors de la lecture du fichier des statuts" });
      }
      let reservations = [];
      let reservationStatuses = [];
      try {
        reservations = reservationsData ? JSON.parse(reservationsData) : [];
        reservationStatuses = statusData ? JSON.parse(statusData) : [];
      } catch (parseError) {
        return res.status(500).json({ error: "Erreur de parsing des fichiers JSON." });
      }
      const newReservation = req.body.reservation;
      const newStatus = req.body.reservation_status;

      reservations.push(newReservation);
      reservationStatuses.push(newStatus);

      fs.writeFile(reservationFilePath, JSON.stringify(reservations, null, 2), "utf8", (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ error: "Erreur lors de l'écriture dans le fichier des réservations" });
        }
        fs.writeFile(reservationStatusFilePath, JSON.stringify(reservationStatuses, null, 2), "utf8", (writeErrStatus) => {
          if (writeErrStatus) {
            return res.status(500).json({ error: "Erreur lors de l'écriture dans le fichier des statuts" });
          }
          sendConfirmationEmail(newReservation)
            .then(() => res.status(201).json({ message: "Réservation ajoutée avec succès", newReservation, newStatus }))
            .catch((emailError) =>
              res.status(201).json({ message: "Réservation ajoutée, mais erreur d'envoi de l'email", error: emailError.message })
            );
        });
      });
    });
  });
});

// Route pour démarrer l'authentification CAS
app.get("/login/cas", passport.authenticate("cas"));

// Callback après authentification CAS
app.get(
  "/cas/callback",
  passport.authenticate("cas", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard"); // Redirection après succès
  }
);

// Vérification de l'état de connexion
app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Non authentifié" });
  }
});

// Déconnexion
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la déconnexion" });
    }
    res.redirect("/");
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
