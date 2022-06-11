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
const Admin = require('../models/Admin');
const { removePassword } = require('../utils');


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


// todo
exports.accepterInscriptionEtudiant = async function (req, res) {
   const { etudiant } = res.locals;
}




