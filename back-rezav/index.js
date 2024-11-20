// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const ObjectId = require("mongodb").ObjectId;
const cas = require("./cas"); // Importer le fichier CAS

app.use(express.json());

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

let db, collection;

// Fonction pour se connecter à MongoDB
mongoose
  .connect("mongodb://etudiant:SAE501@localhost:27018/mydatabase", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const itemSchema = new mongoose.Schema({
  name: String,
  picture: String,
  description: String,
  categorie: String,
  isLate: Boolean,
  state: String,
});

const Item = mongoose.model("Item", itemSchema);

// Route GET pour récupérer tous les documents dans la collection "materiel"
app.get("/items", async (req, res) => {
  try {
    const docs = await Item.find();
    res.status(200).json(docs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des documents" });
  }
});

// Route GET pour récupérer les documents par nom (regex)
app.get("/materiel/name/:name", async (req, res) => {
  try {
    const docs = await collection
      .find({ name: { $regex: req.params.name, $options: "i" } })
      .toArray();
    res.status(200).json(docs);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des documents" });
  }
});

// Route GET pour récupérer un document par ID
app.get("/materiel/id/:id", async (req, res) => {
  try {
    const doc = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: "Document non trouvé" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du document" });
  }
});

// Route DELETE pour supprimer un document par ID
app.delete("/materiel/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Document supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Document non trouvé" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du document" });
  }
});

// Route protégée avec CAS
app.get("/cas", cas.casLogin);
// Route pour démarrer l'authentification CAS
app.get("/login/cas", passport.authenticate("cas"));

// Route de callback après l'authentification CAS
app.get("/cas/callback", function (req, res, next) {
  passport.authenticate("cas", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/"); // Redirection en cas d'échec
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/"); // Redirection en cas de succès
    });
  })(req, res, next);
});

// Route de déconnexion
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
