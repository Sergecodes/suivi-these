const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const { Types } = require("../constants");
const { removePassword } = require("../utils");
const Coordonateur = require("../models/Coordonateur");
const Etudiant = require('../models/Etudiant');
const Avis = require('../models/Avis');
const EnvoiDossier = require('../models/EnvoiDossier');

exports.getAll = async function (req, res) {
  res.json(await Coordonateur.find({}));
}

exports.getOne = function (req, res) {
  const { coordo } = res.locals;
  res.json(coordo);
}

exports.delete = function (req, res) {
  Coordonateur.findByIdAndRemove(req.params.id, (err, doc) => {
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

exports.register_coordonateur = function (req, res) {
  let coordo = new Coordonateur();
  coordo.email = req.body.email;
  coordo.motDePasse = req.body.motDePasse;
  coordo.nom = req.body.nom;
  coordo.prenom = req.body.prenom;

  if (coordo.email == "") {
    return res.status(400).json({
      success: false,
      message: "vous ne pouvez pas vous authentifier avec un email vide",
    });
  } else if (coordo.motDePasse == "") {
    return res.status(400).json({
      success: false,
      message: "veuillez svp entrer un mot de passe",
    });
  } else if (coordo.motDePasse !== "") {
    if (passwordComplexity().validate(coordo.motDePasse).error) {
      return res.status(400).json({
        success: false,
        message:
          "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,",
      });
    } else {
      console.log("mot de passe valide");
    }
  } else if (coordo.nom == "") {
    return res.status(400).json({
      success: false,
      message: "Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter",
    });
  } else if (coordo.prenom == "") {
    return res.status(400).json({
      success: false,
      message:
        "Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter",
    });
  }

  coordo.save((err, coordo) => {
    if (err) {
      console.error("erreur lors de l'enregistrement dun coordonateur", err);
      return res.status(500).json({
        success: false,
        message:
          "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",
        error: err,
      });
    }

    res.status(201).json({
      success: true,
      message: "Enregistre avec succes",
      data: removePassword(coordo.toJSON()),
    });
  });
};


exports.login_coordonateur = async function (req, res) {
  try {
    const { email, motDePasse } = req.body;
    let coordo = await Coordonateur.findOne({ email });
    if (!coordo) {
      return res.status(404).send("Coordonateur Not found");
    }

    bcrypt.compare(motDePasse, coordo.motDePasse, function (err, result) {
      if (err) {
        console.log("une erreur interne est suvenue: ", err);
        return res.status(500).json({
          success: false,
          message: "une erreur interne est survenue",
          error: err,
        });
      }

      if (!result) {
        res.json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        // Create user session
        req.session.user = {
          _id: coordo._id,
          model: Types.ACTEURS.COORDONATEUR,
        };

        res.json({
          success: true,
          message: "Connexion reussie",
          data: removePassword(coordo.toJSON()),
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


exports.change_coordonator_pass = function (req, res) {
  try {
    const { coordo } = res.locals;
    const { actualPass, newPass } = req.body;

    bcrypt.compare(actualPass, coordo.motDePasse, function (err, result) {
      if (err) {
        console.error("une erreur est survenue: ", err);
        return res.status(500).json({ success: false, message: "Une erreur est survenue", error: err })
      }
      if (result === true) {
        if (newPass == '') {
          return res.status(400).json({ success: false, message: "veuillez svp entrer un mot de passe" })
        } else {
          if (passwordComplexity().validate(newPass).error) {
            return res.status(400).json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," })
          } else {
            console.log("mot de passe valide");

          }
        }
        coordo.motDePasse = newPass;
        coordo.save(function (err, new_coordonator) {
          if (err) {
            res.json({ success: false, message: "Une erreur est survenue lors de la mise a jour de vos informations", error: err }).status(400)
          } else {
            if (req.session)
              req.session.destroy();

            res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte" });
          }
        })
      } else {
        res.status(401).json({ message: "les mots de passe ne correspondent pas" });
      }
    })

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

exports.change_email = function (req, res) {
  const { coordo } = res.locals;
  const { newEmail } = req.body;

  if (!newEmail)
    return res.send("newEmail n'est pas dans la requete").status(400);

  if (coordo.email === newEmail) {
    if (req.session)
      req.session.destroy();

    return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
  }

  coordo.email = newEmail;
  coordo.save(function (err, new_coordonateur) {
    if (err) {
      console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
      return res.status(500).json({ success: false, message: "Internal server error", error: err })
    }
    if (req.session)
      req.session.destroy();

    return res.json({ success: true, message: "Email mis a jour, vous avez ete deconnecte" });
  })
}

exports.changePhoneNumber = function (req, res) {
   const { coordo } = res.locals;
   const { numTelephone } = req.body;

   if (!numTelephone)
		return res.status(400).send("numTelephone n'est pas dans la requete");

   if (coordo.numTelephone === numTelephone) {
		return res.status(400).send("Ce numero est votre numero actuel");
	}

   coordo.numTelephone = numTelephone;
   coordo.save(function (err, newCoordo) {
      if (err) {
         console.error("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
         res.status(500).json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone", error: err })
      }
      res.json({ 
         success: true, 
         message: "le nouveau numero de telephone a ete enregistrer avec success", 
         numTelephone: newCoordo.numTelephone 
      });
   });
}

// ----------
exports.dossiersEtudsThese = async function (req, res) {
  const { coordo } = res.locals;

  let envoisDossiers = await EnvoiDossier.find({
    destinataire: coordo._id,
    destinataireModel: Types.ActeurDossier.COORDONATEUR
  }).populate({
    path: 'dossier',
    populate: {
      path: 'etudiant',
      select: '-motDePasse -niveau -dossier -departement -misAJourLe',
      match: { niveau: Types.Niveau.THESE },
      populate: 'juges'
    }
  });

  return res.json(envoisDossiers);
}


exports.autorisationsSoutenanceMaster = async function (req, res) {
  let avis = await Avis.find({
    type: Types.Avis.AUTORISATION_SOUTENANCE,
    // donnePar: admin._id, 
    donneParModel: Types.AvisEmetteur.ADMIN,
    destinataireModel: Types.AvisDestinataire.COORDONATEUR
  }).populate({
    path: 'dossier',
    populate: [
      {
        path: 'etudiant',
        select: 'nom prenom matricule',
        // Pas besoin de selectionner le niveau, car 
        // on doit normalement avoir juste les etudiants du MASTER ??
        match: { niveau: Types.Niveau.MASTER }
      },
      {
        path: 'notes',
        select: 'total'
      }
    ]
  });

  res.json(avis);
}


exports.notifications = async function (req, res) {
  const { coordo } = res.locals;
  await coordo.populate({
      path: 'notifications',
      populate: {
         path: 'objetConcerne'
      }
   });
  res.json(coordo.notifications);
};


exports.programmerDateSoutenanceMaster = async function (req, res) {
  const { dateSoutient } = req.body;
  const { coordo, etudiant } = res.locals;

  try {
    await coordo.programmerDateSoutenanceMaster(etudiant, dateSoutient);
  } catch (err) {
    return res.status(400).json(err);
  }

  res.send("Date de soutenance programmee avec succes!");
}

exports.etudiantsMasterProgrammes = async function (req, res) {
  let etudiants = await Etudiant.find({ niveau: Types.Niveau.MASTER })
    .where('dateSoutenance').nin([undefined, '']);

  res.json(etudiants);
}


exports.verifierAvisDonne = async function (req, res) {
  const { coordo, dossier } = res.locals;
  res.json({ dejaDonne: await coordo.verifierAvisDonne(dossier._id) });
}


// Rapport d'audition
exports.donnerAvisAdmin = async function (req, res) {
  const { typeAvis, commentaire, rapport } = req.body;
  const { coordo, dossier } = res.locals;

  try {
    await coordo.donnerAvisTheseAdmin(typeAvis, commentaire, rapport, dossier._id);
  } catch (err) {
    res.status(400).json(err);
  }

  res.send("Succes!");
}

