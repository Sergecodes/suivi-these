const Expert = require('../models/Expert');
const bcrypt = require('bcrypt');
const passwordComplexity = require("joi-password-complexity");
const { Types } = require('../constants')
const { removePassword } = require('../utils')
const EnvoiDossier = require('../models/EnvoiDossier')


exports.getAll = async function (req, res) {
	res.json( await Expert.find({}) );
}

exports.getOne = function (req, res) {
	const { expert } = res.locals;
	res.json(expert);
}

exports.delete = function (req, res) {
	Expert.findByIdAndRemove(req.params.id, (err, doc) => {
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

exports.register_expert = function (req, res) {
	let expert = new Expert();
	expert.nom = req.body.nom;
	expert.prenom = req.body.prenom;
	expert.motDePasse = req.body.motDePasse;
	expert.email = req.body.email;
	expert.ville = req.body.ville;
	expert.grade = req.body.grade;
	expert.type = req.body.type;

	if (passwordComplexity().validate(expert.motDePasse).error) {
      return res.status(400).json({
          success: false,
          message:
            "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,",
        });
    } else {
      console.log("mot de passe valide");
    }

	expert.save(function (err, nouveau_expert) {
		if (err) {
			console.log("erreur lors de l'enregistrement dun expert: ", err);
			res.status(500).json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau expert", error: err });
		}

		res.status(201).json({
			success: true,
			message: "Enregistre avec succes",
			data: removePassword(nouveau_expert.toJSON())
		});

	})
}

exports.login_expert = async function (req, res) {
	try {
		const { email, motDePasse } = req.body;
		let expert = await Expert.findOne({ email });
		if (!expert) { return res.status(404).send("Expert Not found") };

		bcrypt.compare(motDePasse, expert.motDePasse, function (err, result) {
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
					_id: expert._id,
					model: Types.ACTEURS.EXPERT
				};

				res.json({
					success: true,
					message: "Connexion reussie",
					data: removePassword(expert.toJSON())
				});
			}
		})
	} catch (error) {
		console.error(error)
		res.status(500).send("Something went wrong");
	}
}

exports.change_expert_pass = function (req, res) {
	try {
		const { expert } = res.locals;
		const { actualPass, newPass } = req.body;

		bcrypt.compare(actualPass, expert.motDePasse, function (err, result) {
			if (err) {
				console.error("une erreur est survenue: ", err);
				return res.status(500).json({ success: false, message: "Une erreur est survenue", error: err })
			}
			if (result == true) {
				if (newPass == '') {
					return res.status(400).json({ success: false, message: "veuillez svp entrer un mot de passe" });
				} else {
					if (passwordComplexity().validate(newPass).error) {
						return res.status(400).json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," });
					} else {
						console.log("mot de passe valide");

					}
				}
				expert.motDePasse = newPass;
				expert.save(function (err, new_expert) {
					if (err) {
						res.status(500).json({ success: false, message: "Une erreur est survenue lors de la mise a jour de vos informations", error: err })
					} else {
						if (req.session)
							req.session.destroy();

						res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte" });
					}
				})
			} else {
				res.status(401).json({ message: "les mots de passe ne correspondent pas" });
			}
		});

	} catch (error) {
		console.log(error);
		res.status(500).send("Internal Server Error");
	}
}


exports.change_email = function (req, res) {
	const { expert } = res.locals;
	const { newEmail } = req.body;

	if (!newEmail)
		return res.status(400).end("newEmail n'est pas dans la requete");
		
	if (expert.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}

	expert.email = newEmail;
	expert.save(function (err, new_expert) {
		if (err) {
			console.error("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
			res.status(400).json({ success: false, message: "Internal server error", error: err });
		}
		if (req.session)
			req.session.destroy();

		return res.json({ success: true, message: "Email mis a jour, vous avez ete deconnecte"});
	});
}

exports.changePhoneNumber = function (req, res) {
   const { expert } = res.locals;
   const { newPhoneNumber } = req.body;

   if (!newPhoneNumber)
		return res.status(400).send("newPhoneNumber n'est pas dans la requete");

   if (expert.numTelephone === newPhoneNumber) {
		return res.status(400).send("Ce numero est votre numero actuel");
	}

   expert.numTelephone = newPhoneNumber;
   expert.save(function (err, newExpert) {
      if (err) {
         console.error("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
         res.status(500).json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone", error: err })
      }
      res.json({ 
         success: true, 
         message: "le nouveau numero de telephone a ete enregistrer avec success", 
         numTelephone: newExpert.numTelephone 
      });
   });
}


// ----------
exports.dossiersEtudsThese = async function (req, res) {
	const { expert } = res.locals;

	let envoisDossiers = await EnvoiDossier.find({
		destinataire: expert._id,
		destinataireModel: Types.ActeurDossier.EXPERT
	}).populate({
		path: 'dossier',
		populate: {
			path: 'etudiant',
			select: '-motDePasse -niveau -dossier -misAJourLe',
			match: { niveau: Types.Niveau.THESE },
			populate: 'juges'
		}
	});

	return res.json(envoisDossiers);
}

exports.notifications = async function (req, res) {
	let { expert } = res.locals;
   await expert.populate({
      path: 'notifications',
      populate: {
         path: 'objetConcerne'
      }
   });
   res.json(expert.notifications);
}


exports.verifierAvisDonne = async function (req, res) {
   const { expert, dossier } = res.locals;
   res.json({ dejaDonne: await expert.verifierAvisDonne(dossier._id) });
}


exports.donnerAvisAdmin = async function (req, res) {
   const { typeAvis, commentaire, rapport } = req.body;
   const { expert, dossier } = res.locals;

   try {
      await expert.donnerAvisAdmin(typeAvis, commentaire, rapport, dossier._id);
   } catch (err) {
      res.status(400).json(err);
   }

   res.send("Succes!");
}




