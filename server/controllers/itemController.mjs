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

export const DeleteItem = async (req, res) => {
  let collection = await db.collection('materiel');
  let id = req.params.id;
  try {
      let result = await collection.deleteOne({_id:id},{});
      res.status(200).json({ message: "L'objet a bien été supprimé", result });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur lors de la suppression de l'objet" });
  }
};
export const AddItem = async (req, res) => {
  let collection = await db.collection('materiel');
  let item = req.body;
  try {
      let result = await collection.insertOne(item);
      res.status(200).json({ message: "Item ajouté avec succès", result });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur lors de l'ajout de l'item" });
  }
}

export const EditItem = async (req, res) => {
  let id = req.params.id;
  let collection = await db.collection('materiel');
  console.log(req.body);
  try {
      let result = await collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: req.body });
      res.status(200).json({ message: "Item modifié avec succès", result });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erreur lors de la modification de l'item" });
  }
}

