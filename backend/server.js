require('dotenv').config();
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const cors = require('cors');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');

// Importer les routes
const etudiantRoutes = require('./src/routes/etudiant');
const adminRoutes = require('./src/routes/admin');
const conseilRoutes = require('./src/routes/conseil');
const coordonateurRoutes = require('./src/routes/coordonateur');
const departementRoutes = require('./src/routes/departement');
const expertRoutes = require('./src/routes/expert');
const juryRoutes  = require('./src/routes/jury');
const rectoratRoutes = require('./src/routes/rectorat');
// var passport = require('passport');


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
// const fs = require('fs');
// fs.readdirSync(__dirname + '/src/models').forEach(filename => {
//     if (filename.includes('.js')) {
//         require(`${__dirname}/src/models/${filename}`);
//     }
// });
// console.log("Modeles installés");


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
app.use(session({
    secret: process.env.SESSION_SECRET || 'session-secret',
    saveUninitialized: false,  // don't create session until something stored
    resave: false,   // don't save session if unmodified,
    cookie: {
        sameSite: 'none',
        maxAge: 2 * 24 * 60 * 60 * 1000,  // = 2days
        secure: process.env.PRODUCTION === "true" || false
    },
    store: MongoStore.create({
        mongoUrl: urlBd,
        ttl: 2 * 24 * 60 * 60   // = 2 days. Default is 14 days
    })
}));
app.use(fileupload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
    // parseNested: true,
    // useTempFiles: true
}));


// Configuration des routes
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send("Bienvenue sur l'api");
});

app.use('/api', apiRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/conseils', conseilRoutes);
app.use('/api/coordonateurs', coordonateurRoutes);
app.use('/api/departements', departementRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/jury', juryRoutes);
app.use('/api/rectorat', rectoratRoutes);


// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


