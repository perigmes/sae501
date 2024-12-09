const path = require('path');
// const dbConn = pgClient();
const jsonFolder = path.join(__dirname, "./../../data"); // Assurez-vous que 'assets' est le dossier où sont vos fichiers JSON
const fs = require('fs');
const materialFilePath = path.join(jsonFolder, "materiel.json");

 const GetItems = async (req, res) => {
    // await dbConn.connect();
    fs.readFile(materialFilePath, "utf8", (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Erreur lors de la lecture du fichier" });
        }
        const items = JSON.parse(data);
        res.status(200).json(items);
    });
  }
module.exports = { GetItems };

