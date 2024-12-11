// const Materiel = require('../models/Materiel'); // Importer le modèle Materiel
import db from '../db/conn.mjs';

export const GetItems = async (req, res) => {

  let collection = await db.collection('materiel');
    try {
      let result =await collection.find().toArray();

        // Retourner les données en réponse 
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur lors de la récupération des items depuis la base de données" });
    }
   
}

