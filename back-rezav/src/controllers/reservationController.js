const path = require('path');
const  { sendResponseEmail,sendConfirmationEmail } = require( "../helper");
const jsonFolder = path.join(__dirname, "./../../data"); // Assurez-vous que 'assets' est le dossier où sont vos fichiers JSON
const fs = require('fs');
const materialFilePath = path.join(jsonFolder, "materiel.json");
const reservationFilePath = path.join(jsonFolder, "reservation.json");
const reservationStatusFilePath = path.join(jsonFolder, "reservation_status.json");




 const PostReservation = async (req, res) => {
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
  };
  
  // GET pour récupérer les réservations
   const GetReservation = async(req, res) => {
    fs.readFile(reservationFilePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
      }
      const reservations = JSON.parse(data);
      res.status(200).json(reservations);
    });
  }
  
  const UpdateReservationStatus= async (req, res) => {
    const id = req.params.id;
    const status = req.body.newData.status;
    const justification = req.body.newData.justification ?? '';
  
    // Lecture du fichier json reservation_status
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
        sendResponseEmail(justification).catch((emailError) => {
          console.error("Erreur lors de l'envoi de l'e-mail:", emailError.message);
        });
      });
  
      // Lecture de json reservation pour aller chercher les objets
      fs.readFile(reservationFilePath, "utf8", (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
        }
        const reservations = JSON.parse(data);
        fs.readFile(materialFilePath, "utf8", (err, data) => {
          if (err) {
            return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
          }
          const items = JSON.parse(data);
  
          // maj du statut des objets
          const index = reservations.findIndex((resa) => resa.idStatus === id);
          reservations[index].items.forEach(idItem => {
            const indexItem = items.findIndex((item) => item._id.$oid === idItem);
  
            if (indexItem === -1) {
              return res.status(404).json({ error: "Objet non trouvé" });
            }
            if (status === "accepted") {
              items[indexItem].state = "Reserved";
            }
          });
  
          fs.writeFile(materialFilePath, JSON.stringify(items, null, 2), "utf8", (err) => {
            if (err) {
              return res.status(500).json({ error: "Erreur lors de l'écriture du fichier" });
            }
            res.status(200).json({ message: "Statut et objets modifiés avec succès" });
          });
        });
      });
    });
  }

  module.exports = { PostReservation,GetReservation,UpdateReservationStatus };