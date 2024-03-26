const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true,unique:true  },
  login: { type: Date, required: true,unique:true },
  mdp: { type: String, required: true },
});
const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);

module.exports = Utilisateur;