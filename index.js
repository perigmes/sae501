const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'rezav';

app.use(express.json());

let db, collection;

// Fonction pour se connecter à MongoDB
async function connectToMongo() {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        // Connexion à la base de données et à la collection
        db = client.db(dbName);
        collection = db.collection('materiel');
    } catch (err) {
        console.error("Erreur lors de la connexion à MongoDB", err);
    }
}

// Connexion à MongoDB
connectToMongo();

// Route GET pour récupérer tous les documents dans la collection "materiel"
app.get('/materiel', async (req, res) => {
    try {
        const docs = await collection.find({}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des documents' });
    }
});

//route GET pour récupérer les documents donc le nom contient la recherche dans la collection matériel
app.get('/materiel/:name', async (req, res) => {
    try {
        const docs = await collection.find({name:{$regex: req.params.name, $options: 'i'}}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des documents' });
    }
});

//route GET pour récupérer le document donc l'id correspond à la recherche dans la collection matériel
app.get('/materiel/:id', async (req, res) => {
    try {
        const docs = await collection.find({name:req.params.id}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des documents' });
    }
});

// Route DELETE (avec correction du typo)
app.delete('/materiel/:id', async (req, res) => {
    const id = req.params.id;  

    try {
        const result = await collection.deleteOne({ _id: new require('mongodb').ObjectId(id) });
        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Document supprimé avec succès" });
        } else {
            res.status(404).json({ message: "Document non trouvé" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression du document" });
    }
});

app.listen(8080, () => {
    console.log("Serveur à l'écoute sur le port 8080");
});
