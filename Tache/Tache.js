const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  titre: { type: String, required: true,unique:true },
  description: { type: String, required: true },
  date_echeance: { type: Date, required: true },
  priorite: { type: String, required: true  },
});

const Tache = mongoose.model('Tache', tacheSchema);

module.exports = Tache;