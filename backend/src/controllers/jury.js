const bcrypt = require('bcrypt');
const passwordComplexity = require("joi-password-complexity");
const { Types } = require('../constants');
const EnvoiDossier = require('../models/EnvoiDossier');
const Jury = require('../models/Jury');
const Avis = require('../models/Avis');
const { removePassword } = require('../utils')


exports.register_jury = function (req, res) {
   let jury = new Jury();
   jury.nom = req.body.nom;
   jury.prenom = req.body.prenom;
   jury.motDePasse = req.body.motDePasse;
   jury.email = req.body.email;
   jury.telephone = req.body.telephone;
   jury.grade = req.body.grade;

   jury.save(function (err, nouveau_jury) {
      if (err) {
         console.log("erreur lors de l'enregistrement dun jurry: ", err);
         return res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client", error: err }).status(500)
      }

      // Create user session
      req.session.user = {
         _id: nouveau_jury._id,
         model: Types.ACTEURS.JURY
      };

      res.json({
         success: true,
         message: "Enregistre avec succes",
         data: removePassword(nouveau_jury.toJSON())
      }).status(201);

   })
}


exports.login_jury = async function (req, res) {
   try {
      const { email, motDePasse } = req.body;
      let jury = await Jury.findOne({ email });
      if (!jury) { return res.status(404).send("Jury Not found") };
      bcrypt.compare(motDePasse, jury.motDePasse, function (err, result) {
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
               _id: jury._id,
               model: Types.ACTEURS.JURY
            };

            res.json({
               success: true,
               message: "Connexion reussie",
               data: removePassword(jury.toJSON())
            });
         }
      })
   } catch (error) {
      console.log(error)
      res.status(500).send("Something went wrong");
   }
}


exports.change_jury_pass = function(req,res){
	try{
      const { jury } = res.locals;
		const { actualPass, newPass } = req.body;

      bcrypt.compare(actualPass,jury.motDePasse,function(err,result){
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
            jury.motDePasse = newPass;
            jury.save(function(err,new_jury){
               if(err){
                  res.json({success:false,message:"Une erreur est survenue lors de la mise a jour de vos informations",error:err}).status(500)
               } else {
                  if (req.session)
                     req.session.destroy();

                  return res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte"});
               }
            })
         }else{
            res.json({ message:"les mots de passe ne correspondent pas" }).status(401);
         }
      });

	} catch(error){
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
}


exports.change_email = function(req,res){
   const { jury } = res.locals;
	const { newEmail } = req.body;

	// If email is same as before
	if (jury.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}
	
   jury.save(function(err,new_jury){
      if(err){
         console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
         res.json({success:false,message:"Internal server error",error:err}).status(500);

      }
      if (req.session)
         req.session.destroy();

      return res.json({ success: true, message: "Email mis a jour, vous avez ete deconnecte"});
   });
}


exports.changePhoneNumber = function (req, res) {
   const { jury } = res.locals;
   const { newPhoneNumber } = req.body;

   if (jury.telephone === newPhoneNumber) {
		return res.json({ message: "Ce numero est votre numero actuel" });
	}

   if (newPhoneNumber) {
      jury.telephone = newPhoneNumber; 

      jury.save(function (err, newJury) {
         if (err) {
            console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
            res.json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone", error: err }).status(500);
         }

         res.json({ success: true, message: "le nouveau numero de telephone a ete enregistrer avec success", data: newJury.telephone });
      });
   }
}


// ------------
exports.dossiersEtudsMaster= async function (req, res) {
   const { jury } = res.locals;
 
  let envoisDossiers = await EnvoiDossier.find({
    destinataire: jury.id,
    destinataireModel: Types.ActeurDossier.JURY
  }).populate({
    path: 'dossier',
    populate: {
      path: 'etudiant',
      select: '-motDePasse -niveau -dossier -misAJourLe',
      match: { niveau: Types.Niveau.MASTER },
      populate: 'juges'
    }
  });
 
   return res.json({ envoisDossiers });
 }

 
exports.noterDossier = async function (req, res) {
   const { valeur } = req.body;
   const { jury, dossier } = res.locals;

   try {
      await jury.attribuerNote(dossier._id, Types.CategorieFichierMaster.MEMOIRE, valeur);
   } catch (err) {
      res.status(400).json(err);
   }

   res.send("Succes!");
}


exports.verifierNoterDossier = async function (req, res) {
   const { jury, dossier } = res.locals;
   res.json({ dejaNote: await jury.verifierDejaNoter(dossier._id) });
}


exports.notifications = async function (req, res) {
   let { jury } = res.locals;
   jury = jury.populate('notifications');
   res.json({ notifs: jury.notifications });
}

exports.verifierAvisDonne = async function (req, res) {
   const { jury, dossier } = res.locals;
   res.json({ dejaDonne: await jury.verifierAvisDonne(dossier._id) });
}


exports.donnerAvisAdmin = async function (req, res) {
   const { typeAvis, commentaire, rapport } = req.body;
   const { jury, dossier } = res.locals;

   try {
      await jury.donnerAvisAdmin(typeAvis, commentaire, rapport, dossier._id);
   } catch (err) {
      res.status(400).json(err);
   }

   res.send("Succes!");
}


 /*
exports.rapportsEtudsMaster = async function (req, res) {
   const { jury } = res.locals;

   let avis = await Avis.find({ 
      donnePar: jury._id, 
      donneParModel: Types.AvisEmetteur.JURY,
      destinataireModel: Types.AvisDestinataire.ADMIN
    }).populate({
      path: 'dossier',
      populate: {
        path: 'etudiant',
        select: '-juges -motDePasse -niveau -dateNaissance -urlPhotoProfil -dossier -creeLe -misAJourLe',
        // match: { niveau: Types.Niveau.MASTER }
      }
    });
  
   return res.json({ avis });

   // let jury = await Jury.findById(req.session.user._id)
   //    .populate({
   //       path: 'etudiants',
   //       match: { niveau: Types.Niveau.MASTER },
   //       populate: {
   //          path: 'dossier',
   //          populate: [
   //             'notes',
   //             {
   //                path: 'fichiers',
   //                select: 'url uploadeLe',
   //                match: { categorie: Types.CategorieFichierMaster.MEMOIRE }
   //             },
   //          ]
   //       }
   //    });

   // res.json({ etudiants: jury.etudiants });
}
*/

