const EnvoiDossier = require('../models/EnvoiDossier');
const Avis = require('../models/Avis');
// const { Types } = require('../constants');


exports.logout = function (req, res) {
    if (req.session)
        req.session.destroy();

    res.send("Logged out");
}

exports.envoyerDossier = async function (req, res) {
    const { 
        envoyePar, envoyeParModel, 
        destinataireModel, dossier
    } = req.body;

    try {
        await EnvoiDossier.create({
            envoyePar, envoyeParModel, destinataireModel, dossier, 
            destinataire: req.body.destinataire || '', 
            fichiersConcernes: req.body.fichiersConcernes || [],
            message: req.body.message || ''
        });
        return res.send("Envoye");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err });
    }
}

exports.dossiersEnvoyes = async function (req, res) {
    const { 
        destinataireModel, envoyePar, envoyeParModel
    } = req.body;
  
    let envoisDossiers = await EnvoiDossier.find({
        destinataire: req.body.destinataire || '', 
        destinataireModel,
        envoyePar, 
        envoyeParModel
    }).populate({
        path: 'dossier',
        populate: {
        path: 'etudiant',
        select: '-motDePasse -niveau -dossier -misAJourLe',
        // match: { niveau: Types.Niveau.MASTER },
        // populate: 'juges'
        }
    });
  
    return res.json(envoisDossiers);
}

exports.donnerAvis = async function (req, res) {
   const { 
       rapport, type, dossier, donnePar, 
       donneParModel, destinataireModel 
    } = req.body;

   try {
      await Avis.create({
         type,
         rapport,
         commentaire: req.body.commentaire || '',
         donnePar,
         donneParModel,
         dossier,
         destinataire: req.body.destinataire || '',
         destinataireModel
      });
      res.send("Succes");
   } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
   }
}

exports.avisDonnes = async function (req, res) {
    const { 
        destinataire, destinataireModel, donnePar, donneParModel
    } = req.body;
  
    let avis = await Avis.find({
        destinataire, destinataireModel,
        donnePar, donneParModel
    }).populate({
        path: 'dossier',
        populate: {
        path: 'etudiant',
        select: '-motDePasse -niveau -dossier -misAJourLe',
        // match: { niveau: Types.Niveau.MASTER },
        // populate: 'juges'
        }
    });
  
    return res.json(avis);
}

