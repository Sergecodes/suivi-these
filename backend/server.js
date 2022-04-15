// require('dotenv').config();
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import fileupload from 'express-fileupload';
// const UsersRoute = require('../src/Contollers/auth/UsersControllers');
// const MemoryStore = require('memorystore')(session);
const MongoDBStore = require('connect-mongodb-session')(session);


// Connexion a la base de donnees
const urlBd = 'mongodb://localhost:27017/suivi-these-bd';

mongoose.connect(urlBd).then(() => {
    console.log("Connexion a la base de donnees reussie");    
}).catch(err => {
    console.error('Connexion a la base de donnes echouee. Erreur:', err);
    process.exit(1);
});


// Charger tous les models
// fs.readdirSync(__dirname + '/models').forEach(filename => {
//     if (filename.includes('.js')) {
//         require(`${__dirname}/models/${filename}`);
//     }
// });


// Configuration serveur
const app = express();
const port = 3001;
const store = new MongoDBStore({
    uri: urlBd,
    collection: 'sessions'
}, function(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    } 
});


// Configurer les middleware ici
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload({
    limits: { fileSize: 10 * 1024 * 1024}
}));
app.use(session({
    secret: 'This is the secret',
    cookie: {
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 7  // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));
// app.use(session({
//     // Les periodes sont en millisecondes
//     cookie: { maxAge: 86400000 },
//     store: new MemoryStore({
//         // Retirer les enregistrements expires apres chaque 24hr
//         checkPeriod: 86400000  
//     }),
//     resave: false,
//     secret: 'keyboard cat'
// }));

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send("Bienvenue sur l'api");
});


// Mettez les routes ici
app.use('/api', apiRouter);
app.use('/api/users', usersRoute);


// Lancer le serveur
app.listen(port, () => {
    console.log("Server running!");
});


export { port };
