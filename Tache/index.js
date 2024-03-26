require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Tache = require('./Tache')
const PORT = process.env.PORT;
const URL_MONGOOSE = process.env.URL_MONGOOSE;
const DBNAME = process.env.DBNAME;
app.use(cors());
app.use(express.json());
mongoose.connect(URL_MONGOOSE + '/' + DBNAME)
app.post('/add', async (req, res) => {
    const tache = await Tache.findOne({titre:req.body.titre})
    if(!tache && !isNaN(req.body.priorite)){
        Tache.create(req.body)
        res.send("created")
    }
});
app.get('/tache/:titre', async (req, res) => {
    const tache = await Tache.findOne({titre:req.params.titre})
    res.send(tache)
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Ecoute dans le port ${PORT}`);
    } else {
        console.log(`Errer de lancement`);
    }
})