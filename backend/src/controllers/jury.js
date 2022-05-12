const JURY = require('../models/Jury');
const bcrypt = require('bcrypt');
const passwordComplexity = require("joi-password-complexity");
const { Types } = require('../constants')
const Jury = require('../models/Jury');
const Etudiant = require('../models/Etudiant');


exports.register_jury = function(req,res){
    var jury = new JURY();
	jury.nom = req.body.nom;
	jury.prenom=req.body.prenom;
	jury.motDePasse = req.body.motDePasse;
	jury.email = req.body.email;
	jury.telephone = req.body.telephone;
	jury.grade = req.body.grade;

	jury.save(function(err,nouveau_jury){
		if(err){
			console.log("erreur lors de l'enregistrement dun jurry: ",err);
			res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client",error:err}).status(500)
		}
		res.json({success:true,message:'Enregistrer avec success',data:nouveau_jury}).status(201);
	})
}


exports.login_jury = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let jury = await JURY.findOne({email});
        if(!jury){return res.status(404).send("Jury Not found")};
        bcrypt.compare(motDePasse, jury.motDePasse, function(err,result) {
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
					_id: jury._id,
					model: Types.ACTEURS.JURY
				};

				// Remove mot de passe from returned result
				let data = jury.toJSON();
				delete data.motDePasse;

				res.json({
					success: true,
					message: "Connexion reussie",
					data
				});
			}
		})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}

// -----
exports.rapportsEtudsMaster = async function (req, res) {
	let jury = await Jury.findById(req.session.user._id)
		.populate({
			path: 'etudiants',
			populate: {
				path: 'dossier',
				populate: [
					'notes',
					{
						path: 'fichiers',
						select: 'url uploadeLe',
						match: { categorie: Types.CategorieFichierMaster.MEMOIRE }
					}, 
				]
			}
		});

	if (!jury)
		res.status(404).send("Jury non trouve");

	res.json({ etudiants: jury.etudiants });
}


exports.noterEtudiant = async function (req, res) {
	const { idEtudiant, valeur } = req.body;
	let jury = await Jury.findById(req.session.user._id);
	let etud = await Etudiant.findById(idEtudiant);

	if (!jury)
		res.status(404).send("Jury non trouve");
	
	if (!etud)
		res.status(404).send("Etudiant non trouve");

	try {
		await jury.attribuerNote(etud.dossier, Types.CategorieFichierMaster.MEMOIRE, valeur);
	} catch (err) {
		res.status(400).json(err);
	}

	res.send("Succes!");
}


exports.verifierNoterEtudiant = async function (req, res) {
	const { idEtudiant } = req.body;
	let jury = await Jury.findById(req.session.user._id);
	let etud = await Etudiant.findById(idEtudiant);

	if (!jury)
		res.status(404).send("Jury non trouve");
	
	if (!etud)
		res.status(404).send("Etudiant non trouve");

	res.json({ dejaNote: await jury.verifierDejaNoter(etud.dossier) });
}


exports.notifications = async function (req, res) {
	let jury = await Jury.findById(req.session.user._id).populate('notifications');
	if (!jury)
		res.status(404).send("Jury non trouve");
	
	res.json({ notifs: jury.notifications });
}


exports.changePassword = async function(req, res) {
	try {
		const id = req.session.user._id;
		const { pass, newPass } = req.body;

		Jury.findById(id, function(err,jury) {
			if (err){
				console.log("une erreur est survenu lors de la recuperation de ce jury, il n'existe pas ou a ete supprimer");
				return res.json({success:false,message:"quelque chose nas pas marcher lors de la recuperation de l'etudiant",error:err}).status(500);
			}

			if (!jury)
				return res.status(404).send("Jury non trouve");
		
			bcrypt.compare(pass, jury.motDePasse, function (err,result) {
				if (err) {
					console.log("une erreur interne est suvenue: ",err);
					return res.json({success:false,message:"une erreur interne est survenue",error:err});
				}
				if (result === true){
					jury.motDePasse = newPass;
					jury.save(function (err, newJury) {
						if(err){
							console.log(err);
							res.json({success:false,message:"Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", erreur:err}).status(500);
						}
						res.json({ success: true });
					})
				} else {
					res.status(400).json({ message:"les mots de passe ne correspondent pas" })
				}
			})
		})
		
	 } catch(error){
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}
 
 
exports.changePhoneNumber = function(req, res) {
	 const {newPhoneNumber} = req.body;
 
	Jury.findById(req.session.user._id, function(err, jury){
		if(err){
			return res.json({success:false,message:"quelque chose nas pas marcher lors de la recuperation du jury",error:err}).status(500);
		}
		
		if(req.body.newPhoneNumber) {
			jury.telephone = newPhoneNumber;
		}
		jury.save(function(err,newJury){
			if(err){
				console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
				res.json({success:false,message:"Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone",error:err}).status(500);        
			}
			res.json({success:true,message:"le nouveau numero de telephone a ete enregistrer avec success",data:newJury.telephone});
		})
	})
}

exports.verifierAvisDonne = async function (req, res) {
	const { idEtudiant } = req.body;
	let jury = await Jury.findById(req.session.user._id);
	let etud = await Etudiant.findById(idEtudiant);

	if (!jury)
		res.status(404).send("Jury non trouve");
	
	if (!etud)
		res.status(404).send("Etudiant non trouve");

	res.json({ dejaDonne: await jury.verifierAvisDonne(etud.dossier) });
}


exports.donnerAvisAdmin = function (req, res) {
	const { idEtudiant, avis, commentaire, rapport } = req.body;
	let jury = await Jury.findById(req.session.user._id);
	let etud = await Etudiant.findById(idEtudiant);

	if (!jury)
		res.status(404).send("Jury non trouve");
	
	if (!etud)
		res.status(404).send("Etudiant non trouve");

	try {
		await jury.donnerAvisAdmin(avis, commentaire, rapport, etud.dossier);
	} catch (err) {
		res.status(400).json(err);
	}

	res.send("Succes!");
}
 
