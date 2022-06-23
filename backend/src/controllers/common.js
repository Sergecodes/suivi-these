const EnvoiDossier = require('../models/EnvoiDossier');


exports.logout = function (req, res) {
    if (req.session)
        req.session.destroy();

    console.log(req.session);
    res.send("Logged out");
}

exports.envoyerDossier = async function (req, res) {
    const { 
        envoyePar, envoyeParModel, destinataire, 
        destinataireModel, dossier, fichiersConcernes
    } = req.body;

    try {
        await EnvoiDossier.create({
            envoyePar, envoyeParModel, destinataire, 
            destinataireModel, dossier, fichiersConcernes,
            message: req.body.message || ''
        });
        return res.status(201).send("Envoye");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err });
    }
}

