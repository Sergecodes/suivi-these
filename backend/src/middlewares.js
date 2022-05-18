const { Types } = require('./constants');
const Jury = require('./models/Jury');
const { Dossier } = require('./models/Dossier');


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

