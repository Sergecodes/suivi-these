const Departement = require('../models/Departement');
const Avis = require('../models/Avis');
const EnvoiDossier = require('../models/EnvoiDossier');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const { removePassword } = require('../utils')


exports.register_departement = function(req,res){
    let departement = new Departement();
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
		const { depart } = res.locals;
		const { actualPass, newPass } = req.body;

		bcrypt.compare(actualPass,depart.motDePasse,function(err,result){
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
				depart.motDePasse = newPass;
				depart.save(function(err,new_departement){
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

exports.change_email = function(req,res){
	const { newEmail } = req.body;
	const { depart } = res.locals;

	if (!newEmail)
		return res.send("newEmail n'est pas dans la requete").status(400);

	if (depart.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}
	
	depart.email = newEmail;
	depart.save(function(err,new_departement){
		if(err){
			console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau email: ", err);
			res.json({success:false,message:"Internal server error",error:err}).status(500);
		}

		if (req.session)
			req.session.destroy();

		res.json({success:true, message:"Email mis a jour, vous avez ete deconnecte"});
	});
}


// -----
exports.notifications = async function (req, res) {
	let { depart } = res.locals;
	await depart.populate('notifications');
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

