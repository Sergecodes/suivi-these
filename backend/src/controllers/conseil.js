const Conseil = require('../models/Conseil');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants');
const { removePassword } = require('../utils');
const EnvoiDossier = require('../models/EnvoiDossier');


exports.getAll = async function (req, res) {
	res.json(await Conseil.find({}));
}

exports.getOne = function (req, res) {
	const { conseil } = res.locals;
	res.json(conseil);
}

exports.delete = function (req, res) {
	Conseil.findByIdAndRemove(req.params.id, (err, doc) => {
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

exports.new_conseil = function (req, res) {
	let conseil = new Conseil();
	conseil.email = req.body.email;
	conseil.motDePasse = req.body.motDePasse;

	if (conseil.email == '') {
		return res.json({ success: false, message: "vous ne pouvez pas vous authentifier avec un email vide" }).status(500);

	} else if (conseil.motDePasse == '') {
		return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })

	} else if (conseil.motDePasse !== '') {
		if (passwordComplexity().validate(conseil.motDePasse).error) {
			return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
		} else {
			console.log("mot de passe valide")
		}
	}

	conseil.save(function (err, nouveau_conseil) {
		if (err) {
			console.log("erreur lors de l'enregistrement dun conseil scientifique");
			return res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique", error: err }).status(500)
		}

		// Create user session
		req.session.user = {
			_id: nouveau_conseil._id,
			model: Types.ACTEURS.CONSEIL
		};

		res.json({
			success: true,
			message: "Enregistre avec succes",
			data: removePassword(nouveau_conseil.toJSON())
		}).status(201);
	})
}

exports.conseil_login = async function (req, res) {
	try {
		const { email, motDePasse } = req.body;
		let conseil = await Conseil.findOne({ email });
		if (!conseil) { return res.status(404).send("Conseil Not found") };

		bcrypt.compare(motDePasse, conseil.motDePasse, function (err, result) {
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
					_id: conseil._id,
					model: Types.ACTEURS.CONSEIL
				};

				res.json({
					success: true,
					message: "Connexion reussie",
					data: removePassword(conseil.toJSON())
				});
			}
		})
	} catch (error) {
		console.log(error)
		res.status(500).send("Something went wrong");
	}

}

exports.change_conseil_pass = function (req, res) {
	try {
		const { conseil } = res.locals;
		const { actualPass, newPass } = req.body;

		bcrypt.compare(actualPass, conseil.motDePasse, function (err, result) {
			if (err) {
				console.log("une erreur est survenue: ", err);
				return res.json({ success: false, message: "Une erreur est survenue", error: err }).status(400);
			}
			if (result == true) {
				if (newPass == '') {
					return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })
				} else {
					if (passwordComplexity().validate(newPass).error) {
						return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
					} else {
						console.log("mot de passe valide");

					}
				}
				conseil.motDePasse = newPass;
				conseil.save(function (err, new_conseil) {
					if (err) {
						res.json({ success: false, message: "Une erreur est survenue lors de la mise a jour de vos informations", error: err }).status(400)
					} else {
						if (req.session)
							req.session.destroy();

						res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte" });
					}
				})
			} else {
				res.json({ message: "les mots de passe ne correspondent pas" }).status(401);
			}
		})

	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

exports.change_email = function (req, res) {
	const { conseil } = res.locals;
	const { newEmail } = req.body;

	if (!newEmail)
		return res.send("newEmail n'est pas dans la requete").status(400);

	if (conseil.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}

	conseil.email = newEmail;
	conseil.save(function (err, new_conseil) {
		if (err) {
			console.error("Une erreur s'est produite au niveau de l'enregistrement du nouveau email", err);
			res.json({ success: false, message: "Internal server error", error: err }).status(500);
		}

		if (req.session)
			req.session.destroy();

		res.json({ success: true, message: "Email mis a jour, vous avez ete deconnecte" });
	})
}


exports.notifications = async function (req, res) {
	let { conseil } = res.locals;
	await conseil.populate('notifications');

	res.json({ notifs: conseil.notifications });
};


exports.dossiersEtudsThese = async function (req, res) {
	const { conseil } = res.locals;

	let envoisDossiers = await EnvoiDossier.find({
		destinataire: conseil._id,
		destinataireModel: Types.ActeurDossier.CONSEIL
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


exports.verifierAvisDonne = async function (req, res) {
	const { conseil, dossier } = res.locals;
	res.json({ dejaDonne: await conseil.verifierAvisDonne(dossier._id) });
}


exports.donnerAvisAdmin = async function (req, res) {
	const { typeAvis, commentaire, rapport } = req.body;
	const { conseil, dossier } = res.locals;

	try {
		await conseil.donnerAvisTheseAdmin(typeAvis, commentaire, rapport, dossier._id);
	} catch (err) {
		res.status(400).json(err);
	}

	res.send("Succes!");
}

