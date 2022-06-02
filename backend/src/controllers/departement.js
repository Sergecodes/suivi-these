const Departement = require('../models/Departement');
const Avis = require('../models/Avis');
const EnvoiDossier = require('../models/EnvoiDossier');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const { removePassword } = require('../utils')


exports.register_departement = function(req,res){
    var departement = new Departement();
	departement.nom = req.body.nom;
	departement.motDePasse = req.body.motDePasse;
	departement.email = req.body.email;
	departement.uniteRecherche = req.body.uniteRecherche;

	departement.save(function(err,nouveau_departement){
		if(err){
			console.log("erreur lors de l'enregistrement dun departement: ",err);
			return res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau departement",error:err}).status(500)
		}
		
		// Create user session
        req.session.user = {
            _id: nouveau_departement._id,
            model: Types.ACTEURS.DEPARTEMENT
        };

        res.json({
            success: true,
            message: "Enregistre avec succes",
            data: removePassword(nouveau_departement.toJSON())
        }).status(201);
	})
}


exports.login_departement = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let departement = await Departement.findOne({email});
        if(!departement){return res.status(404).send("Departement Not found")};
        bcrypt.compare(motDePasse, departement.motDePasse, function(err,result) {
			if(err){
				console.log("une erreur interne est suvenue: ",err);
				return res.status(500).json({
					success:false,message:"une erreur interne est survenue",
					error:err
				});
			}

			if(!result) {
				res.json({
					success: false,
					message: "Invalid credentials"
				})
			} else {
				// Create user session
				req.session.user = {
					_id: departement._id,
					model: Types.ACTEURS.DEPARTEMENT
				};

				res.json({
					success: true,
					message: "Connexion reussie",
					data: nouveauPassword(departement.toJSON())
				});
			}
		})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}

exports.change_departement_pass = function(req,res){
	try{
		const {id} = req.params;
		const {actualPass,newPass} = req.body;

		Departement.findById(id,function(err,departement){
			if(err){
				console.log("Une erreur s'est produitr lors de la recuperation du departement, ce dernier n'existe pas ou il a ete supprimer");
				return res.json({success:false,message:"Une erreur s'est produitr lors de la recuperation du departement, ce dernier n'existe pas ou il a ete supprimer",error:err}).status(400);
			}
			console.log(departement);
			//Utilisateur trouver;
			bcrypt.compare(actualPass,departement.motDePasse,function(err,result){
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
					departement.motDePasse = newPass;
					departement.save(function(err,new_departement){
						if(err){
							res.json({success:false,message:"Une erreur est survenue lors de la mise a jour de vos informations",error:err}).status(400)
						}else{
							res.json({success:false,message:"Vos informations de connexion ont ete mise a jour",data:new_departement}).status(201);
						}
					})
				}else{
					res.json({message:"les mots de passe ne correspondent pas"})
				}
			})
		})

	} catch(error){
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
}

exports.change_email = function(req,res){
	const {newEmail,id} = req.body;
	
	Departement.findById(id,function(err,departement){
		if(err){
			return res.json({success:false,message:"quelque chose nas pas marcher lors de la recuperation du departement",error:err}).status(500);
		}
		//le departement a ete trouver
		if(req.body.newEmail){
			departement.email = newEmail;
		}
		departement.save(function(err,new_departement){
			if(err){
				console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
				res.json({success:false,message:"Internal server error",error:err}).status(500);

			}
			res.json({success:true,message:"la nouvelle adresse email a ete modifier avec success",data:new_departement.email});
		})
	})
}


// -----
exports.notifications = async function (req, res) {
   let depart = await Departement.findById(req.session.user._id).populate('notifications');
   res.json({ notifs: depart.notifications });
}

exports.dossiersEtudsMaster = async function (req, res) {
   const { depart } = res.locals;

	let envoisDossiers = await EnvoiDossier.find({
		destinataire: depart.id,
		destinataireModel: Types.ActeurDossier.DEPARTEMENT
	}).populate({
		path: 'dossier',
		populate: {
			path: 'etudiant',
			select: '-motDePasse -niveau -dossier -departement -misAJourLe',
			// match: { niveau: Types.Niveau.MASTER },
			populate: 'juges'
		}
	});

   return res.json({ envoisDossiers });
}


exports.validerDossier = async function (req, res) {
	const { depart, dossier } = res.locals;
	await depart.validerDossier(dossier);
	res.send("Succes!");
}


exports.rejeterDossier = async function (req, res) {
	const { depart, dossier } = res.locals;
	const { raison } = req.body;
	await depart.rejeterDossier(dossier, raison);
	res.send("Succes!");
}


exports.verifierAvisDonne = async function (req, res) {
   const { depart, dossier } = res.locals;
   res.json({ dejaDonne: await depart.verifierAvisDonne(dossier._id) });
}


exports.donnerAvisAdmin = async function (req, res) {
   const { typeAvis, commentaire, rapport } = req.body;
   const { depart, dossier } = res.locals;

   try {
      await depart.donnerAvisAdmin(typeAvis, commentaire, rapport, dossier._id);
   } catch (err) {
      res.status(400).json(err);
   }

   res.send("Succes!");
}

