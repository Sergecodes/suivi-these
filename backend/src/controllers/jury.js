const JURY = require("../models/Jury");
const bcrypt = require("bcrypt");
const { Types } = require("../constants");
const saltRounds = 10;
// var passport = require('passport');

exports.register_jury = function (req, res) {
  var jury = new JURY();
  jury.nom = req.body.nom;
  jury.prenom = req.body.prenom;
  jury.motDePasse = req.body.motDePasse;
  jury.email = req.body.email;
  jury.telephone = req.body.telephone;
  jury.grade = req.body.grade;

  jury.save(function (err, nouveau_jury) {
    if (err) {
      console.log("erreur lors de l'enregistrement dun jurry: ", err);
      res
        .json({
          success: false,
          message:
            "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client",
          error: err,
        })
        .status(500);
    }
    res
      .json({
        success: true,
        message: "Enregistrer avec success",
        data: nouveau_jury,
      })
      .status(201);
  });
};

exports.login_jury = async function (req, res) {
  try {
    const { email, motDePasse } = req.body;
    let jury = await JURY.findOne({ email });
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
        res.json({
          success: false,
          message: "Invalid credentials",
        });
      } else {
        // Create user session
        req.session.user = {
          _id: jury._id,
          model: Types.ACTEURS.JURY,
        };

        // Remove mot de passe from returned result
        let data = jury.toJSON();
        delete data.motDePasse;

        res.json({
          success: true,
          message: "Connexion reussie",
          data,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};
