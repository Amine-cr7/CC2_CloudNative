require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Utilisateur = require('./Utilisateur')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
const TOKEN_SECRET = require('crypto').randomBytes(48).toString('hex');
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.post('/register', async (req, res) => {
    const { email, nom,login,mdp } = req.body;
    const utilisateur = await Utilisateur.findOne({ email,login});
    if (utilisateur) {
        return res.send({ message: "deja existe dans base donnee !!." });
    }
    const password = await bcrypt.hash(mdp, 10);
    await Utilisateur.create({ email, mdp: password ,nom,login});
    res.send({ message: "creer  !!." });
});
app.post('/login', async (req, res) => {
    const { email, mdp } = req.body;
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) {
        return res.status(400).json({ message: "no found" });
    }
    const mdpMatch = await bcrypt.compare(mdp, utilisateur.mdp);
    if (!mdpMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect." });
    }
    const token = jwt.sign({ utilisateurId: utilisateur._id },TOKEN_SECRET);
    res.status(200).json({ token });
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})