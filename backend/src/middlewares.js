const { Types } = require('./constants');
const Jury = require('./models/Jury');
const Dossier = require('./models/Dossier');
const Coordo = require('./models/Coordonateur');
const Depart = require('./models/Departement')



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

exports.getEtudiantFromReq = async function (req, res, next) {
    const { idEtudiant } = req.body;
    let etudiant = await Etudiant.findById(idEtudiant);

    if (!etudiant)
        return res.status(404).send("Etudiant non trouve");

    res.locals.etudiant = etudiant;
    next();
}

exports.getCoordonateur = async function (req, res, next) {
    let coordo = await Coordo.findById(req.session.user._id);

    if (!coordo)
        return res.status(404).send("Coordonateur non trouve");

    res.locals.coordo = coordo;
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


exports.getDossierFromReq = async function (req, res, next) {
    const { idDossier } = req.body;
    let dossier = await Dossier.findById(idDossier);

    if (!dossier)
        return res.status(404).send("Dossier non trouve");

    res.locals.dossier = dossier;
    next();
}


exports.getJuryAndDossier = async function (req, res, next) {
    const { idDossier } = req.body;
    let jury = await Jury.findById(req.session.user._id);
	let dossier = await Dossier.findById(idDossier);
    
	if (!jury)
		return res.status(404).send("Jury non trouve");
	
	if (!dossier)
		return res.status(404).send("Dossier non trouve");

    res.locals.jury = jury;
    res.locals.dossier = dossier;

    next();
}


exports.getDepartAndDossier = async function (req, res, next) {
    const { idDossier } = req.body;
    let depart = await Departement.findById(req.session.user._id);
	let dossier = await Dossier.findById(idDossier);
    
	if (!depart)
		return res.status(404).send("Departement non trouve");
	
	if (!dossier)
		return res.status(404).send("Dossier non trouve");

    res.locals.depart = depart;
    res.locals.dossier = dossier;

    next();
}

