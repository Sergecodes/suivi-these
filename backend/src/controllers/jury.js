const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
const { Types } = require("../constants");
const { NoteDossier } = require("../models/Dossier");
const EnvoiDossier = require("../models/EnvoiDossier");
const Avis = require("../models/Avis");
const { removePassword } = require("../utils");

exports.getAll = async function (req, res) {
  res.json(await Jury.find({}));
};

exports.getOne = function (req, res) {
  const { jury } = res.locals;
  res.json(jury);
};

exports.delete = function (req, res) {
  Jury.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!doc) {
      return res.status(404).send("Not found");
    }

    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    return res.status(204).send("Succes");
  });
};

exports.register_jury = function (req, res) {
  let jury = new Jury();
  jury.nom = req.body.nom;
  jury.prenom = req.body.prenom;
  jury.motDePasse = req.body.motDePasse;
  jury.email = req.body.email;
  jury.telephone = req.body.telephone;
  jury.grade = req.body.grade;

  if (passwordComplexity().validate(jury.motDePasse).error) {
    return res.status(400).json({
      success: false,
      message:
        "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,",
    });
  } else {
    console.log("mot de passe valide");
  }

  jury.save(function (err, nouveau_jury) {
    if (err) {
      console.error("erreur lors de l'enregistrement dun jurry: ", err);
      return res
        .status(500)
        .json({
          success: false,
          message:
            "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client",
          error: err,
        });
    }

    res.status(201).json({
      success: true,
      message: "Enregistre avec succes",
      data: removePassword(nouveau_jury.toJSON()),
    });
  });
};

exports.login_jury = async function (req, res) {
  console.log(req.session);
  console.log(req.headers);
  try {
    const { email, motDePasse } = req.body;
    let jury = await Jury.findOne({ email });
    if (!jury) {
      return res.status(404).send("Jury Not found");
    }

    bcrypt.compare(motDePasse, jury.motDePasse, function (err, result) {
      if (err) {
        console.log("une erreur interne est suvenue: ", err);
        return res.status(500).json({
          success: false,
          message: "une erreur interne est survenue",
          error: err,
        });
      }

      if (!result) {
        res.status(404).json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        // Create user session
        req.session.user = {
          _id: jury._id,
          model: Types.ACTEURS.JURY,
        };

        res.json({
          success: true,
          message: "Connexion reussie",
          data: removePassword(jury.toJSON()),
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

exports.change_jury_pass = function (req, res) {
  try {
    const { jury } = res.locals;
    const { actualPass, newPass } = req.body;

    bcrypt.compare(actualPass, jury.motDePasse, function (err, result) {
      if (err) {
        console.error("une erreur est survenue: ", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "Une erreur est survenue",
            error: err,
          });
      }
      if (result == true) {
        if (newPass == "") {
          return res
            .status(400)
            .json({
              success: false,
              message: "veuillez svp entrer un mot de passe",
            });
        } else {
          if (passwordComplexity().validate(newPass).error) {
            return res
              .status(400)
              .json({
                success: false,
                message:
                  "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,",
              });
          } else {
            console.log("mot de passe valide");
          }
        }
        jury.motDePasse = newPass;
        jury.save(function (err, new_jury) {
          if (err) {
            res
              .status(500)
              .json({
                success: false,
                message:
                  "Une erreur est survenue lors de la mise a jour de vos informations",
                error: err,
              });
          } else {
            if (req.session) req.session.destroy();

            return res.json({
              success: true,
              message: "Mot de passe mis a jour, vous avez ete deconnecte",
            });
          }
        });
      } else {
        res
          .status(401)
          .json({ message: "les mots de passe ne correspondent pas" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.change_email = function (req, res) {
  const { jury } = res.locals;
  const { newEmail } = req.body;

  if (!newEmail)
    return res.send("newEmail n'est pas dans la requete").status(400);

  if (jury.email === newEmail) {
    if (req.session) req.session.destroy();

    return res.json({
      message: "Cet email est votre email actuel, vous avez ete deconnecte",
    });
  }

  jury.email = newEmail;
  jury.save(function (err, new_jury) {
    if (err) {
      console.error(
        "Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ",
        err
      );
      res
        .status(500)
        .json({ success: false, message: "Internal server error", error: err });
    }
    if (req.session) req.session.destroy();

    return res.json({
      success: true,
      message: "Email mis a jour, vous avez ete deconnecte",
    });
  });
};

exports.changePhoneNumber = function (req, res) {
  const { jury } = res.locals;
  const { newPhoneNumber } = req.body;

  if (!newPhoneNumber)
    return res.status(400).send("newPhoneNumber n'est pas dans la requete");

  if (jury.numTelephone === newPhoneNumber) {
    return res.json({ message: "Ce numero est votre numero actuel" });
  }

  jury.numTelephone = newPhoneNumber;
  jury.save(function (err, newJury) {
    if (err) {
      console.log(
        "Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ",
        err
      );
      res
        .status(500)
        .json({
          success: false,
          message:
            "Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone",
          error: err,
        });
    }

    res.json({
      success: true,
      message: "le nouveau numero de telephone a ete enregistrer avec success",
      data: newJury.telephone,
    });
  });
};

// ------------
exports.dossiersEtudsMaster = async function (req, res) {
  const { jury } = res.locals;

   let envoisDossiers = await EnvoiDossier.find({
      destinataire: jury._id,
      destinataireModel: Types.ActeurDossier.JURY,
   }).populate({
      path: "dossier",
      populate: [
         {
            path: "etudiant",
            select: "-motDePasse -niveau -dossier -misAJourLe",
            // match: { niveau: Types.Niveau.MASTER },
            // populate: 'juges'
         },
         { path: 'fichiers' }
      ]
  });

  return res.json(envoisDossiers);
};

exports.notesDossier = async function (req, res) {
  const { jury } = res.locals;

  let notesDossier = await NoteDossier.find({
    notePar: jury._id,
    noteParModel: Types.ActeurDossier.JURY,
  }).populate({
    path: "dossier",
    // populate: {
    //   path: 'etudiant',
    //   select: '-motDePasse -niveau -dossier -misAJourLe',
    //   // match: { niveau: Types.Niveau.MASTER },
    //   // populate: 'juges'
    // }
  });

  return res.json(notesDossier);
};

exports.noterDossier = async function (req, res) {
  const { notes } = req.body;
  const { jury, dossier } = res.locals;

  try {
    await jury.attribuerNote(dossier._id, notes, req.body.commentaire || "");
  } catch (err) {
    return res.status(400).json(err);
  }

  res.send("Succes!");
};

exports.verifierNoterDossier = async function (req, res) {
  const { jury, dossier } = res.locals;
  res.json({ dejaNote: await jury.verifierDejaNoter(dossier._id) });
};

exports.notifications = async function (req, res) {
  let { jury } = res.locals;
  await jury.populate("notifications");
  res.json({ notifs: jury.notifications });
};

exports.verifierAvisDonne = async function (req, res) {
  const { jury, dossier } = res.locals;
  res.json({ dejaDonne: await jury.verifierAvisDonne(dossier._id) });
};

exports.donnerAvisAdmin = async function (req, res) {
  const { typeAvis, commentaire, rapport } = req.body;
  const { jury, dossier } = res.locals;

  try {
    await jury.donnerAvisAdmin(typeAvis, commentaire, rapport, dossier._id);
  } catch (err) {
    res.status(400).json(err);
  }

  res.send("Succes!");
};

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
