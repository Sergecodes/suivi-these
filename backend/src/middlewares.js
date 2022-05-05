const { Types } = require('./constants')


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


exports.isEtudiant = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.JURY) {
        return res.status(403).send("Vous n'etes pas un membre du jury");
    } 
    next();
}


exports.isEtudiant = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.RECTORAT) {
        return res.status(403).send("Vous n'etes pas le rectorat");
    } 
    next();
}


exports.isEtudiant = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.status(401).send("Not authenticated");
    } else if (req.session.user.model !== Types.ACTEURS.ADMIN) {
        return res.status(403).send("Vous n'etes pas l'administrateur");
    } 
    next();
}





