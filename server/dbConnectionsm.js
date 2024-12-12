import dotenv from 'dotenv';
dotenv.config();

mongoose.connect('mongodb://etudiant:SAE501@172.18.68.101:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.log('Erreur de connexion à MongoDB', err));
