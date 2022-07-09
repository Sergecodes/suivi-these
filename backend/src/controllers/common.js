const EnvoiDossier = require('../models/EnvoiDossier');
const Avis = require('../models/Avis');
const { EtapeDossier } = require('../models/Dossier');
const { Types } = require('../constants');


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
            destinataire: req.body.destinataire || null, 
            fichiersConcernes: req.body.fichiersConcernes || [],
            message: req.body.message || ''
        });

        // If dossier is from etudiant, create first etape
        // and initialize second etape
        if (envoyeParModel === Types.ActeurDossier.ETUDIANT) {
            let now = new Date();
            let etapes = [{
                dossier,
                numEtape: Types.EtapeDossier.UNE,
                debuteeLe: now,
                acheveeLe: now
            }, {
                dossier,
                numEtape: Types.EtapeDossier.DEUX,
                debuteeLe: now
            }];
            await EtapeDossier.insertMany(etapes);
        }

        return res.send("Envoye");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ err });
    }
}

exports.dossiersEnvoyes = async function (req, res) {
    const { 
        destinataireModel, envoyePar, envoyeParModel
    } = req.query;

    console.log(req.query);

    let destinataire = req.query.destinataire;
    let findQuery = { destinataireModel, envoyePar, envoyeParModel };
    if (destinataire) {
        findQuery['destinataire'] = destinataire;
    }
  
    let envoisDossiers = await EnvoiDossier.find(findQuery).populate({
        path: 'dossier',
        populate: [
            {
                path: 'etudiant',
                select: '-motDePasse -niveau -dossier -misAJourLe',
                // match: { niveau: Types.Niveau.MASTER },
                // populate: 'juges'
            },
			{ path: 'fichiers' }
        ]
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
         destinataire: req.body.destinataire || null,
         destinataireModel
      });
      res.send("Succes");
   } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
   }
}

exports.avisDonnes = async function (req, res) {
    const { destinataireModel, donnePar, donneParModel } = req.query;
    console.log(req.query);

    let destinataire = req.query.destinataire;
    let findQuery = { destinataireModel, donnePar, donneParModel };

    if (destinataire) {
        findQuery['destinataire'] = destinataire;
    }

    let avis = await Avis.find(findQuery).populate({
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

