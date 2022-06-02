const { Types } = require('../constants');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');
const Rectorat = require('../models/Rectorat');
const { removePassword } = require('../utils');
const Etudiant = require('../models/Etudiant');
const EnvoiDossier = require('../models/EnvoiDossier');


exports.register_rectorat = function (req, res) {
   var rectorat = new Rectorat();
   rectorat.motDePasse = req.body.motDePasse;
   rectorat.email = req.body.email;

   console.log(req.body);

   rectorat.save(function (err, nouveau_rectorat) {
      if (err) {
         console.log("erreur lors de l'enregistrement dun rectorat: ", err);
         return res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique", error: err }).status(500)
      }

      // Create user session
      req.session.user = {
         _id: nouveau_rectorat._id,
         model: Types.ACTEURS.RECTORAT
      };

      res.json({
         success: true,
         message: "Enregistre avec succes",
         data: removePassword(nouveau_rectorat.toJSON())
      }).status(201);
   })
}

exports.login_rectorat = async function (req, res) {
   try {
      const { email, motDePasse } = req.body;
      let rectorat = await Rectorat.findOne({ email });
      if (!rectorat) { return res.status(400).send("Invalid credentials") };

      bcrypt.compare(motDePasse, rectorat.motDePasse, function (err, result) {
         if (err) {
            console.log("une erreur interne est suvenue: ", err);
            return res.status(500).json({
               success: false, message: "une erreur interne est survenue",
               error: err
            });
         }

         if (!result) {
            res.json({
               success: false,
               message: "Invalid credentials"
            })
         } else {
            // Create user session
            req.session.user = {
               _id: rectorat._id,
               model: Types.ACTEURS.RECTORAT
            };

            res.json({
               success: true,
               message: "Connexion reussie",
               data: removePassword(rectorat.toJSON())
            });
         }
      })
   } catch (error) {
      console.log(error)
      res.status(500).send("Something went wrong");
   }

}


exports.changePassword = function (req, res) {
   try {
      const id = req.session.user._id;
      const { pass, newPass } = req.body;

      Rectorat.findById(id, function (err, rectorat) {
         if (err) {
            return res.json({ success: false, error: err }).status(500);
         }

         if (!rectorat)
            return res.status(404).send("Non trouve");

         bcrypt.compare(pass, rectorat.motDePasse, function (err, result) {
            if (err) {
               return res.status(500).json({ success: false, message: "une erreur interne est survenue", error: err });
            }
            if (result === true) {
               rectorat.motDePasse = newPass;
               rectorat.save(function (err, newRectorat) {
                  if (err) {
                     console.log(err);
                     res.json({ success: false, erreur: err }).status(500);
                  }

                  if (req.session)
                     req.session.destroy();

                  res.json({ success: true, message: "Vous avez ete deconnecte" });
               })
            } else {
               res.status(400).json({ message: "les mots de passe ne correspondent pas" })
            }
         })
      })

   } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
   }
}


exports.changeEmail = function (req, res) {
   const { newEmail } = req.body;

   Rectorat.findById(req.session.user._id, function (err, rectorat) {
      if (err) {
         return res.json({ success: false, error: err }).status(500);
      }

      if (req.body.newEmail) {
         rectorat.email = newEmail;
      }
      rectorat.save(function (err, newRectorat) {
         if (err) {
            res.json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement", error: err }).status(500);
         }
         res.json({ success: true, newEmail: newRectorat.email });
      })
   })
}


// -------------------

exports.notifications = async function (req, res) {
   let notifs = await Notification.find({
      destinataireModel: Types.ModelNotif.RECTORAT
   });
   res.json({ notifs });
}

exports.dossiersEtudsThese = async function (req, res) {
   const { rectorat } = res.locals;

   let envoisDossiers = await EnvoiDossier.find({
      destinataire: rectorat.id,
      destinataireModel: Types.ActeurDossier.RECTORAT
   }).populate({
      path: 'dossier',
      populate: {
         path: 'etudiant',
         select: '-motDePasse -niveau -dossier -misAJourLe',
         match: { niveau: Types.Niveau.THESE },
         populate: 'juges'
      }
   });

   return res.json({ envoisDossiers });
}


exports.programmerDateSoutenanceThese = async function (req, res) {
   const { dateSoutient } = req.body;
   const { rectorat, etudiant } = res.locals;

   try {
      await rectorat.programmerDateSoutenanceThese(etudiant, dateSoutient);
   } catch (err) {
      return res.status(400).json(err);
   }

   res.send("Date de soutenance programmee avec succes!");
}


exports.verifierAvisDonne = async function (req, res) {
   const { rectorat, dossier } = res.locals;
   res.json({ dejaDonne: await rectorat.verifierAvisDonne(dossier._id) });
}


// Rapport d'audition
exports.donnerAvisAdmin = async function (req, res) {
   const { typeAvis, commentaire, rapport } = req.body;
   const { rectorat, dossier } = res.locals;

   try {
      await rectorat.donnerAvisTheseAdmin(typeAvis, commentaire, rapport, dossier._id);
   } catch (err) {
      res.status(400).json(err);
   }

   res.send("Succes!");
}



/*
exports.rapportsEtudsThese = async function (req, res) {
   let etudiants = await Etudiant.find({ niveau: Types.Niveau.THESE })
      .select('-motDePasse')
      .populate({
         path: 'dossier',
         populate: [
            // 'notes',
            {
               path: 'fichiers',
               select: 'url uploadeLe',
               match: { categorie: Types.CategorieFichierThese.MEMOIRE }
            },
         ]
      });

   console.log(etudiants);

   // Filtrer les etudiants qui ont atteint cette etape
   let validEtuds = [], numEtape = 8;
   for (let etud of etudiants) {
      let dossier = etud.dossier;
      if (await dossier.etapeActuelle.numEtape === numEtape) {
         validEtuds.push(etud);
      }
   }

   res.json({ etudiants: validEtuds });
}
*/

