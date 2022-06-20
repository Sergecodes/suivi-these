const Coordonateur = require('../models/Coordonateur');
const Jury = require('../models/Jury');
const Conseil = require('../models/Conseil');
const Expert = require('../models/Expert');
const Etudiant = require('../models/Etudiant');
const Notification = require('../models/Notification');
const { Dossier } = require('../models/Dossier');
const Avis = require('../models/Avis');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const CONSTANTES = require('../constants')
const { Types } = require('../constants');
const EnvoiDossier = require('../models/EnvoiDossier');
const Admin = require('../models/Admin');
const { removePassword } = require('../utils');


exports.getAll = async function (req, res) {
	res.json( await Admin.find({}) );
}

exports.getOne = function (req, res) {
	const { admin } = res.locals;
	res.json(admin);
}

exports.delete = function (req, res) {
	Admin.findByIdAndRemove(req.params.id, (err, doc) => {
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

exports.register = function (req, res) {
    let admin = new Admin();
    admin.motDePasse = req.body.motDePasse;
    admin.email = req.body.email;

    admin.save(function (err, nouveau_admin) {
        if (err) {
            console.log("erreur lors de l'enregistrement dun admin: ", err);
            return res.json({ 
                success: false, 
                message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique", 
                error: err 
            }).status(500);
        }

        // Create user session
        req.session.user = {
            _id: nouveau_admin._id,
            model: Types.ACTEURS.ADMIN
        };

        res.json({
            success: true,
            message: "Enregistre avec succes",
            data: removePassword(nouveau_admin.toJSON())
        }).status(201);
    })
}

exports.login = async function (req, res) {
    try {
        const { email, motDePasse } = req.body;
        let admin = await Admin.findOne({ email });
        if (!admin) { return res.status(400).send("Invalid credentials") };

        bcrypt.compare(motDePasse, admin.motDePasse, function (err, result) {
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
                    _id: admin._id,
                    model: Types.ACTEURS.ADMIN
                };

                res.json({
                    success: true,
                    message: "Connexion reussie",
                    data: removePassword(admin.toJSON())
                });
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}

exports.changePassword = function(req,res) {
	try{
		const { admin } = res.locals;
		const { actualPass, newPass } = req.body;

		bcrypt.compare(actualPass, admin.motDePasse,function(err,result){
			if(err){
				console.log("une erreur est survenue: " , err);
				return res.json({success:false,message:"Une erreur est survenue",error:err}).status(400);
			}
			if(result == true){
				if(newPass == ''){
					return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
				}else{
					if(passwordComplexity().validate(newPass).error){
						return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
					}else{
						console.log("mot de passe valide");

					}
				}
				admin.motDePasse = newPass;
				admin.save(function(err, newAdmin){
					if(err){
						res.json({success:false,message:"Une erreur est survenue lors de la mise a jour de vos informations",error:err}).status(400)
					}else{
						if (req.session)
							req.session.destroy();

						res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte" });
					}
				})
			}else{
				res.json({message:"les mots de passe ne correspondent pas"}).status(401);
			}
		});

	} catch(error){
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
}

exports.changeEmail = function(req,res){
	const { newEmail } = req.body;
	const { admin } = res.locals;

	if (!newEmail)
		return res.send("newEmail n'est pas dans la requete").status(400);

	if (admin.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}
	
	admin.email = newEmail;
	admin.save(function(err, newAdmin){
		if(err){
			console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau email: ", err);
			res.json({success:false, message:"Internal server error", error:err}).status(500);
		}

		if (req.session)
			req.session.destroy();

		res.json({success:true, message:"Email mis a jour, vous avez ete deconnecte"});
	});
}

exports.notifications = async function (req, res) {
   let { admin } = res.locals;
   await admin.populate('notifications');
   res.json({ notifs: admin.notifications });
}

/**
 * Obtenir les demandes d'inscription des etudiants
 */
exports.demandesInscription = async function (req, res) {
   let etudiants = [];
   for (let etud of await Etudiant.find({})) {
      if (await etud.etapeActuelle === Types.EtapeDossier.ZERO) {
         etudiants.push(etud);
      }
   }

   res.json({ demandes: etudiants });
}

exports.accepterInscriptionEtudiant = async function (req, res) {
   const { admin, etudiant } = res.locals;
   try {
      await admin.accepterEtudiant(etudiant);
      res.send("Succes");
   } catch (err) {
      console.error(error);
      res.status(500).send("Something went wrong");
   }
}

exports.rejeterInscriptionEtudiant = async function (req, res) {
   const { admin, etudiant } = res.locals;
   const { raison } = req.body.raison;

   try {
      await admin.rejeterEtudiant(etudiant, raison);
      res.send("Succes");
   } catch (err) {
      console.error(error);
      res.status(500).send("Something went wrong");
   }
}

exports.accepterDossierEtudiant = async function (req, res) {
   const { admin, dossier } = res.locals;
   try {
      await admin.accepterDossier(dossier);
      // todo Send dossier to coordonateur if etudiant is from these
      res.send("Succes, dossier envoye au coordonateur");
   } catch (err) {
      console.error(error);
      res.status(500).send("Something went wrong");
   }
}

exports.rejeterDossierEtudiant = async function (req, res) {
   const { admin, dossier } = res.locals;
   const { raison } = req.body.raison;

   try {
      await admin.rejeterDossier(dossier, raison);
      res.send("Succes");
   } catch (err) {
      console.error(error);
      res.status(500).send("Something went wrong");
   }
}

exports.dossiersEtudiantsMaster = async function (req, res) {
   const { admin } = res.locals;
 
   let envoisDossiers = await EnvoiDossier.find({
      destinataire: admin._id,
      destinataireModel: Types.ActeurDossier.ADMIN
      }).populate({
      path: 'dossier',
      populate: {
         path: 'etudiant',
         select: '-motDePasse -niveau -dossier -misAJourLe',
         match: { niveau: Types.Niveau.MASTER },
         populate: 'juges departement'
      }
   });
 
   return res.json({ envoisDossiers });
}

exports.dossiersEtudiantsMaster = async function (req, res) {
   const { admin } = res.locals;

   let envoisDossiers = await EnvoiDossier.find({
      destinataire: admin._id,
      destinataireModel: Types.ActeurDossier.ADMIN
      }).populate({
      path: 'dossier',
      populate: {
         path: 'etudiant',
         select: '-motDePasse -niveau -dossier -misAJourLe',
         match: { niveau: Types.Niveau.THESE },
         populate: 'juges departement'
      }
   });

   return res.json({ envoisDossiers });
}


exports.envoyerRapportActeur = async function (req, res) {
   const { admin, dossier } = res.locals;
   const { rapport, type, destinataireId, destinataireModel } = req.body;

   try {
      await Avis.create({
         type,
         rapport,
         commentaire: req.body.commentaire || '',
         donnePar: admin._id,
         donneParModel: Types.AvisEmetteur.ADMIN,
         dossier,
         destinataire: destinataireId,
         destinataireModel: destinataireModel
      });
      res.send("Succes");
   } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
   }
}

exports.getActeursAvis = async function (req, res) {
   const { admin } = res.locals;
   const { acteurId, acteurModel } = req.body;

   let avis = await Avis.find({
      donnePar: acteurId,
      donneParModel: acteurModel,
      destinataire: admin._id,
      destinataireModel: Types.AvisDestinataire.ADMIN
   });

   res.json({ avis });
}


// exports.envoyerDossierActeur = async function (req, res) {
//    const { admin, dossier } = res.locals;
//    const { message, destinataireId, destinataireModel } = req.body;

//    try {
//       await EnvoiDossier.create({
//          message,
//          dossier,
//          envoyePar: admin._id,
//          envoyeParModel: Types.ActeurDossier.ADMIN,
//          destinataire: destinataireId,
//          destinataireModel: destinataireModel
//       });
//       res.send("Succes");
//    } catch (err) {
//       console.error(err);
//       res.status(500).send("Something went wrong");
//    }
// }

