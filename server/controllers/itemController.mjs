// const Materiel = require('../models/Materiel'); // Importer le modèle Materiel
import { ObjectId } from 'mongodb';
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
export const GetItemById = async (req, res) => {
  let id= req.params.id;

  let collection = await db.collection('materiel');
    try {
      let result = await collection.find({ _id: new ObjectId(id)},{}).toArray();

        // Retourner les données en réponse 
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur lors de la récupération des items depuis la base de données" });
    }
   
}

export const DeleteStateItem = async (req, res) => {
  let collection = await db.collection('materiel');
  try {
      let result = await collection.updateMany({}, { $unset: { state: "" } });
      res.status(200).json({ message: "Propriété 'state' supprimée de tous les items", result });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur lors de la suppression de la propriété 'state'" });
  }
};

