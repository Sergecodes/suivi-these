require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// console.log(process.env);

// Connexion a la base de donnees
const urlBd = process.env.URL_BD;

mongoose.connect(urlBd).then(() => {
    console.log("Connexion a la base de donnees reussie");    
}).catch(err => {
    console.error('Connexion a la base de donnes echouee. Erreur:', err);
    process.exit(1);
});


// Importer tous les models a partir du server.js
const fs = require('fs');
fs.readdirSync(__dirname + '/src/models').forEach(filename => {
    if (filename.includes('.js')) {
        require(`${__dirname}/src/models/${filename}`);
    }
});
console.log("Modeles installés")


// Configuration serveur
const app = express();
const port = process.env.PORT || 3001;


// Configuration des middlewares
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configuration des routes
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send("Bienvenue sur l'api");
});

// app.use('/api', apiRouter);
// app.use('/api/users', usersRoute);


// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

