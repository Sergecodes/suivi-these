require('dotenv').config();
const express = require('express');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const cors = require('cors');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');
// const schedule = require('node-schedule');
// const { sendEmail } = require('./src/utils');

// Importer les routes
const etudiantRoutes = require('./src/routes/etudiant');
const adminRoutes = require('./src/routes/admin');
const conseilRoutes = require('./src/routes/conseil');
const coordonateurRoutes = require('./src/routes/coordonateur');
const departementRoutes = require('./src/routes/departement');
const expertRoutes = require('./src/routes/expert');
const juryRoutes  = require('./src/routes/jury');
const rectoratRoutes = require('./src/routes/rectorat');
const uniteRoutes = require('./src/routes/uniteRecherche');
const notificationRoutes = require('./src/routes/notification');
const commonRoutes = require('./src/routes/common')
// var passport = require('passport');


// console.log(process.env);
// env vars
const PRODUCTION = process.env.PRODUCTION;
const urlBd = process.env.URL_BD;

// Connexion a la base de donnees
console.log(urlBd);

mongoose.connect(urlBd).then((mongooseObj) => {
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
const port = process.env.PORT || 8001;


// Configuration des middlewares
app.set('trust proxy', 1);  // trust first proxy
app.use(cors({
    origin: [
        'http://suivi-these.eu-west-3.elasticbeanstalk.com',
        'https://suivi-these.eu-west-3.elasticbeanstalk.com',
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creer l'objet session
let sevenDays = 7 * 24 * 60 * 60 * 1000;
let sessionObj = {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,  // don't create session until something stored
    resave: false,   // don't save session if unmodified,
    store: MongoStore.create({
        mongoUrl: urlBd,
        ttl: sevenDays  // Default is 14 days
    }),
    cookie: {
        sameSite: PRODUCTION == 'true' ? 'none' : 'lax',
        maxAge: sevenDays,
        expires: new Date(Date.now() + sevenDays),
        httpOnly: true,
        // Cookies with SameSite=None require a secure context/HTTPS
        secure: PRODUCTION == 'true' ? true : false,
        // domain: PRODUCTION == 'true' ? (process.env.COOKIE_DOMAIN || '') : ''
    }
};
app.use(session(sessionObj));
app.use(fileupload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: true,
    createParentPath: true
    // parseNested: true,
    // useTempFiles: true
}));


// Configuration des routes
const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send("You are connected to the api");
});

app.use('/api', apiRouter);
app.use('/api', commonRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/conseils', conseilRoutes);
app.use('/api/coordonateurs', coordonateurRoutes);
app.use('/api/departements', departementRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/jury', juryRoutes);
app.use('/api/rectorat', rectoratRoutes);
app.use('/api/unite', uniteRoutes);
app.use('/api/notifications', notificationRoutes);


/**
 * Send email to actors that have unread notifications, reminding them to 
 * login to the platform.
 */
// const emailActors = () => {
//     // Admin, etudiants, conseils, coordonateurs,
//     // departements, experts, jurys, rectorat
    
// }

// Lancer le serveur
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);

    // Run everyday at 5am;
    // Basically send emails to all actors to login to the website
    // schedule.scheduleJob('0 5 * * *', () => { 
    //     emailActors();
    // });
});

