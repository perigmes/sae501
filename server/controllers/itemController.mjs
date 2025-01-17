// const Materiel = require('../models/Materiel'); // Importer le modèle Materiel
import { ObjectId } from 'mongodb';
import db from '../db/conn.mjs';
import multer from 'multer';
import base64Img from 'base64-img';
import { ImageSchema } from '../entities/Image.mjs';
import mongoose from 'mongoose';
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
  const Image = mongoose.model("Image", ImageSchema);
  console.log("test")
  // Configuration de multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Dossier temporaire
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage }).single("picture");

  // Utilisation de multer pour gérer l'upload
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors du chargement du fichier." });
    }

    // ID de l'élément à modifier
    let id = req.params.id;

    try {
      // Vérification que l'image a été uploadée
      if (!req.file) {
        return res.status(400).json({ error: "Aucune image fournie." });
      }

      // Conversion de l'image en Base64
      const filePath = req.file.path;
      console.log("file"+ filePath);
      const base64String = base64Img.base64Sync(filePath);

      // Création d'un objet image
      const image = new Image({
        filename: req.file.filename,
        format: "webp",
        data: base64String,
      });

      // Mise à jour du document dans la base de données
      const collection = await db.collection("materiel");
      const newBody = {
        ...req.body,
        picture: image, // Ajouter l'image dans le corps
      };

      const result = await collection.findOneAndUpdate(
        { _id: id },
        { $set: newBody },
        { returnDocument: "after" } // Retourne le document mis à jour
      );

      res.status(200).json({ message: "Item modifié avec succès", result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur lors de la modification de l'item" });
    }
  });
};

