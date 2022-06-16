const { Types } = require('../constants');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');
const Rectorat = require('../models/Rectorat');
const { removePassword } = require('../utils');
const Etudiant = require('../models/Etudiant');
const EnvoiDossier = require('../models/EnvoiDossier');


exports.getAll = async function (req, res) {
	res.json( await Rectorat.find({}) );
}

exports.getOne = function (req, res) {
	const { rectorat } = res.locals;
	res.json(rectorat);
}

exports.delete = function (req, res) {
	Rectorat.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!doc) {
			return res.status(404).send("Not found");
		}

		if (err) {
			console.error(err);
			return res.status(500).json(err);
		}

		return res.status(204).send("Succes");
	});
}

exports.register_rectorat = function (req, res) {
   let rectorat = new Rectorat();
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
      if (!rectorat) { return res.status(404).send("Invalid credentials") };

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
      const { rectorat } = res.locals;
      const { pass, newPass } = req.body;

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
            res.json({ message: "les mots de passe ne correspondent pas" }).status(401);
         }
      })

   } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
   }
}


exports.changeEmail = function (req, res) {
   const { newEmail } = req.body;
   const { rectorat } = res.locals;

   if (!newEmail)
		return res.send("newEmail n'est pas dans la requete").status(400);

	if (rectorat.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}

   rectorat.email = newEmail;
   rectorat.save(function (err, newRectorat) {
      if (err) {
         res.json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement", error: err }).status(500);
      }

      if (req.session)
         req.session.destroy();

      return res.json({ success: true, message: "Email mis a jour, vous avez ete deconnecte"});
   });
}


// -------------------

exports.notifications = async function (req, res) {
   let { rectorat } = res.locals;
   await rectorat.populate('notifications');
   res.json({ notifs: rectorat.notifications });
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

