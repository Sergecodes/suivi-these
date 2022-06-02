const Coordonateur = require("../models/Coordonateur");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const { Types } = require("../constants");
const { removePassword } = require("../utils");
const Avis = require('../models/Avis');
const EnvoiDossier = require('../models/EnvoiDossier');


exports.register_coordonateur = function (req, res) {
  let coordo = new Coordonateur();
  coordo.email = req.body.email;
  coordo.motDePasse = req.body.motDePasse;
  coordo.nom = req.body.nom;
  coordo.prenom = req.body.prenom;

  if (coordo.email == "") {
    return res
      .json({
        success: false,
        message: "vous ne pouvez pas vous authentifier avec un email vide",
      })
      .status(500);
  } else if (coordo.motDePasse == "") {
    return res.json({
      success: false,
      message: "veuillez svp entrer un mot de passe",
    });
  } else if (coordo.motDePasse !== "") {
    if (passwordComplexity().validate(coordo.motDePasse).error) {
      return res
        .json({
          success: false,
          message:
            "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,",
        })
        .status(500);
    } else {
      console.log("mot de passe valide");
    }
  } else if (coordo.nom == "") {
    return res
      .json({
        success: false,
        message:
          "Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter",
      })
      .status(500);
  } else if (coordo.prenom == "") {
    return res
      .json({
        success: false,
        message:
          "Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter",
      })
      .status(500);
  }

  coordo.save((err, coordo) => {
    if (err) {
      console.log("erreur lors de l'enregistrement dun coordonateur");
      return res
        .json({
          success: false,
          message:
            "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",
          error: err,
        })
        .status(500);
    }

    // Create user session
    req.session.user = {
      _id: coordo._id,
      model: Types.ACTEURS.COORDONATEUR,
    };

    res
      .json({
        success: true,
        message: "Enregistre avec succes",
        data: removePassword(coordo.toJSON()),
      })
      .status(201);
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
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};


exports.change_coordonator_pass = function (req, res) {
  try {
    const { coordo } = res.locals;
    const { actualPass, newPass } = req.body;

    bcrypt.compare(actualPass, coordo.motDePasse, function (err, result) {
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
        coordo.motDePasse = newPass;
        coordo.save(function (err, new_coordonator) {
          if (err) {
            res.json({ success: false, message: "Une erreur est survenue lors de la mise a jour de vos informations", error: err }).status(400)
          } else {
            res.json({ success: false, message: "Vos informations de connexion ont ete mise a jour", data: new_coordonator }).status(201);
          }
        })
      } else {
        res.json({ message: "les mots de passe ne correspondent pas" })
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

  if (req.body.newEmail) {
    coordo.email = newEmail;
  }
  coordo.save(function (err, new_coordonateur) {
    if (err) {
      console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
      return res.json({ success: false, message: "Internal server error", error: err }).status(500);
    }
    return res.json({ success: true, message: "la nouvelle adresse email a ete modifier avec success", data: new_coordonateur.email });
  })
}

// ----------
exports.dossiersEtudsThese = async function (req, res) {
  const { coordo } = res.locals;

  let envoisDossiers = await EnvoiDossier.find({
    destinataire: coordo.id,
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

  return res.json({ envoisDossiers });
}


exports.autorisationsSoutenanceMaster = async function (req, res) {
  const { coordo } = res.locals;
  let avis = await Avis.find({
    type: Types.Avis.AUTORISATION_SOUTENANCE,
    // donnePar: admin._id, 
    donneParModel: Types.AvisEmetteur.ADMIN,
    destinataire: coordo._id,
    destinataireModel: Types.AvisDestinataire.COORDONATEUR
  }).populate({
    path: 'dossier',
    populate: {
      path: 'etudiant',
      select: '-juges -motDePasse -niveau -dateNaissance -urlPhotoProfil -dossier -creeLe -misAJourLe',
      // Pas besoin de selectionner le niveau, car on doit avoir juste les etudiants du MASTER 
      // match: { niveau: Types.Niveau.MASTER }
    }
  });

  res.json({ avis });
}


exports.notifications = async function (req, res) {
  const { coordo } = res.locals;
  res.json({ notifs: coordo.notifications });
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

