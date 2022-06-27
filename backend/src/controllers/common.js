const EnvoiDossier = require('../models/EnvoiDossier');


exports.logout = function (req, res) {
    if (req.session)
        req.session.destroy();

    res.send("Logged out");
}

exports.envoyerDossier = async function (req, res) {
    const { 
        envoyePar, envoyeParModel, destinataire, 
        destinataireModel, dossier
    } = req.body;

    try {
        await EnvoiDossier.create({
            envoyePar, envoyeParModel, destinataire, 
            destinataireModel, dossier, 
            fichiersConcernes: req.body.fichiersConcernes || [],
            message: req.body.message || ''
        });
        return res.send("Envoye");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err });
    }
}

