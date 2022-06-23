const { Types } = require('./constants');
const Admin = require('./models/Admin');
const Jury = require('./models/Jury');
const Expert = require('./models/Expert');
const Dossier = require('./models/Dossier');
const Coordo = require('./models/Coordonateur');
const Depart = require('./models/Departement')
const Etudiant = require('./models/Etudiant');
const Conseil = require('./models/Conseil');
const Rectorat = require('./models/Rectorat');
const Unite = require('./models/UniteRecherche');
// const Notification = require('./models/Notification');


exports.isEtudiant = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.ETUDIANT) {
        return res.status(403).send("Vous n'etes pas un etudiant");
    } 
    next();
}


exports.isCoordonateur = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.COORDONATEUR) {
        return res.status(403).send("Vous n'etes pas un coordonateur");
    } 
    next();
}


exports.isConseil = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.CONSEIL) {
        return res.status(403).send("Vous n'etes pas un conseil");
    } 
    next();
}


exports.isDepartement = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.DEPARTEMENT) {
        return res.status(403).send("Vous n'etes pas un departement");
    } 
    next();
}


exports.isExpert = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.EXPERT) {
        return res.status(403).send("Vous n'etes pas un expert");
    } 
    next();
}


exports.isJury = function(req, res, next) {
    console.log(req.session);
    console.log(req.headers);
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.JURY) {
        return res.status(403).send("Vous n'etes pas un membre du jury");
    } 
    next();
}


exports.isRectorat = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.RECTORAT) {
        return res.status(403).send("Vous n'etes pas le rectorat");
    } 
    next();
}


exports.isAdmin = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.ADMIN) {
        return res.status(403).send("Vous n'etes pas l'administrateur");
    } 
    next();
}

exports.getAdmin = async function (req, res, next) {
    let admin = await Admin.findById(req.session.user._id);

    if (!admin)
        return res.status(404).send("Admin non trouve");

    res.locals.admin = admin;
    next();
}

exports.getCoordonateur = async function (req, res, next) {
    let coordo = await Coordo.findById(req.session.user._id);

    if (!coordo)
        return res.status(404).send("Coordonateur non trouve");

    res.locals.coordo = coordo;
    next();
}

exports.getConseil = async function (req, res, next) {
    let conseil = await Conseil.findById(req.session.user._id);

    if (!conseil)
        return res.status(404).send("Conseil non trouve");

    res.locals.conseil = conseil;
    next();
}

exports.getExpert = async function (req, res, next) {
    let expert = await Expert.findById(req.session.user._id);

    if (!expert)
        return res.status(404).send("Expert non trouve");

    res.locals.expert = expert;
    next();
}

exports.getRectorat = async function (req, res, next) {
    let rectorat = await Rectorat.findById(req.session.user._id);

    if (!rectorat)
        return res.status(404).send("Rectorat non trouve");

    res.locals.rectorat = rectorat;
    next();
}


exports.getDepartement = async function (req, res, next) {
    let depart = await Depart.findById(req.session.user._id);

    if (!depart)
        return res.status(404).send("Departement non trouve");

    res.locals.depart = depart;
    next();
}


exports.getJury = async function (req, res, next) {
    let jury = await Jury.findById(req.session.user._id);

    if (!jury)
        return res.status(404).send("Jury non trouve");

    res.locals.jury = jury;
    next();
}

exports.getEtudiant = async function (req, res, next) {
    let etudiant = await Etudiant.findById(req.session.user._id);

    if (!etudiant)
        return res.status(404).send("Etudiant non trouve");

    res.locals.etudiant = etudiant;
    next();
}

exports.getEtudiantFromParam = async function (req, res, next) {
    const { id } = req.params;
    let etudiant = await Etudiant.findById(id);

    if (!etudiant)
        return res.status(404).send("Etudiant non trouve");

    res.locals.etudiant = etudiant;
    next();
}

exports.getDepartementFromParam = async function (req, res, next) {
    const { id } = req.params;
    let depart = await Depart.findById(id);

    if (!depart)
        return res.status(404).send("Departement non trouve");

    res.locals.depart = depart;
    next();
}

exports.getConseilFromParam = async function (req, res, next) {
    const { id } = req.params;
    let conseil = await Conseil.findById(id);

    if (!conseil)
        return res.status(404).send("Conseil non trouve");

    res.locals.conseil = conseil;
    next();
}

exports.getCoordonateurFromParam = async function (req, res, next) {
    const { id } = req.params;
    let coordo = await Coordonateur.findById(id);

    if (!coordo)
        return res.status(404).send("Coordonateur non trouve");

    res.locals.coordo = coordo;
    next();
}

exports.getExpertFromParam = async function (req, res, next) {
    const { id } = req.params;
    let expert = await Expert.findById(id);

    if (!expert)
        return res.status(404).send("Expert non trouve");

    res.locals.expert = expert;
    next();
}

exports.getJuryFromParam = async function (req, res, next) {
    const { id } = req.params;
    let jury = await Jury.findById(id);

    if (!jury)
        return res.status(404).send("Jury non trouve");

    res.locals.jury = jury;
    next();
}

exports.getUniteFromParam = async function (req, res, next) {
    const { id } = req.params;
    let unite = await Unite.findById(id);

    if (!unite)
        return res.status(404).send("Unite de recherche non trouve");

    res.locals.unite = unite;
    next();
}

exports.getAdminFromParam = async function (req, res, next) {
    const { id } = req.params;
    let admin = await Admin.findById(id);

    if (!admin)
        return res.status(404).send("Admin non trouve");

    res.locals.admin = admin;
    next();
}

exports.getRectoratFromParam = async function (req, res, next) {
    const { id } = req.params;
    let rectorat = await Rectorat.findById(id);

    if (!rectorat)
        return res.status(404).send("Rectorat non trouve");

    res.locals.rectorat = rectorat;
    next();
}

exports.getEtudiantFromReq = async function (req, res, next) {
    const { idEtudiant } = req.body;
    let etudiant = await Etudiant.findById(idEtudiant);

    if (!etudiant)
        return res.status(404).send("Etudiant non trouve");

    res.locals.etudiant = etudiant;
    next();
}

exports.getDossierFromReq = async function (req, res, next) {
    const { idDossier } = req.body;
    let dossier = await Dossier.findById(idDossier);

    if (!dossier)
        return res.status(404).send("Dossier non trouve");

    res.locals.dossier = dossier;
    next();
}

