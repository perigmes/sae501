// index.js
const express = require("express");
const cors = require("cors"); // Importer cors
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const passport = require("passport");
const session = require("express-session");
const ObjectId = require("mongodb").ObjectId;
const cas = require("./cas"); // Importer le fichier CAS
const path = require("path");
require('dotenv').config();
const { sendConfirmationEmail, sendResponseEmail } = require("./mail.js");

app.use(express.json());

// Ajouter le middleware CORS
app.use(cors({
  origin: "http://localhost:3000", // Autoriser les requêtes depuis React
  methods: ["GET", "POST", "DELETE", "PUT","PATCH"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
}));

// Configuration de la session (nécessaire pour Passport)
app.use(
  session({
    secret: require("crypto").randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: true,
  })
);

// Initialiser Passport et gérer les sessions
app.use(passport.initialize());
app.use(passport.session());

let  collection;

// Définir le répertoire où les fichiers JSON sont stockés
const jsonFolder = path.join(__dirname, "../assets/data"); // Assurez-vous que 'assets' est le dossier où sont vos fichiers JSON

const materialFilePath = path.join(jsonFolder, "materiel.json");
const reservationFilePath = path.join(jsonFolder, "reservation.json");
const reservationStatusFilePath = path.join(jsonFolder, "reservation_status.json");

// GET pour récupérer le matériel
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
              // Parsing des fichiers JSON, utilisation de tableaux vides si les fichiers sont vides
              reservations = reservationsData ? JSON.parse(reservationsData) : [];
              if (!Array.isArray(reservations)) {
                  throw new Error("Le fichier des réservations n'est pas un tableau.");
              }
              reservationStatuses = statusData ? JSON.parse(statusData) : [];
              if (!Array.isArray(reservationStatuses)) {
                  throw new Error("Le fichier des statuts n'est pas un tableau.");
              }
          } catch (parseError) {
              return res.status(500).json({ error: "Erreur de parsing des fichiers JSON." });
          }

          // Ajouter les données pour la nouvelle réservation
          const newReservation = req.body.reservation;
          const newStatus = req.body.reservation_status; // On suppose que les deux objets sont envoyés dans le body

          reservations.push(newReservation);
          reservationStatuses.push(newStatus);

          // Écrire les deux fichiers de manière atomique
          fs.writeFile(reservationFilePath, JSON.stringify(reservations, null, 2), "utf8", (writeErrReservations) => {
              if (writeErrReservations) {
                  return res.status(500).json({ error: "Erreur lors de l'écriture dans le fichier des réservations" });
              }

              fs.writeFile(reservationStatusFilePath, JSON.stringify(reservationStatuses, null, 2), "utf8", (writeErrStatus) => {
                  if (writeErrStatus) {
                      return res.status(500).json({ error: "Erreur lors de l'écriture dans le fichier des statuts" });
                  }

                  sendConfirmationEmail(newReservation)
                  .then(() => {
                      res.status(201).json({
                          message: "Réservation ajoutée avec succès et e-mail envoyé",
                          newReservation,
                          newStatus
                      });
                  })
                  .catch((emailError) => {
                      res.status(201).json({
                          message: "Réservation ajoutée, mais l'e-mail n'a pas pu être envoyé",
                          newReservation,
                          newStatus,
                          error: emailError.message,
                      });
                  });
              });
          });
      });
  });
});

// GET pour récupérer les réservations
app.get("/reservation", (req, res) => {
  fs.readFile(reservationFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
    }
    const reservations = JSON.parse(data);
    res.status(200).json(reservations);
  });
});

app.patch("/reservation/requestStatus/:id",(req,res)=>{
console.log(req.body.newData.status);
  const id = req.params.id;
  const status = req.body.newData.status;
  const justification = req.body.newData.justification??'';
  console.log(id,status,justification);

  fs.readFile(reservationStatusFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
    }
    const reservationStatuses = JSON.parse(data);

    const index = reservationStatuses.findIndex((status) => status.idStatus === id);
    if (index === -1) {
      return res.status(404).json({ error: "Statut non trouvé" });
    }
    reservationStatuses[index].status = status;

    fs.writeFile(reservationStatusFilePath, JSON.stringify(reservationStatuses, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de l'écriture du fichier" });
      }
      res.status(200).json({ message: "Statut modifié avec succès" });
      sendResponseEmail(justification)
    });

  });

})

;




// Route protégée avec CAS
app.get("/cas", cas.casLogin);
app.get("/login/cas", passport.authenticate("cas"));

// Callback après authentification CAS
app.get("/cas/callback", (req, res, next) => {
  passport.authenticate("cas", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/"); // Redirection en cas d'échec
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/"); // Redirection en cas de succès
    });
  })(req, res, next);
});

// Déconnexion
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
