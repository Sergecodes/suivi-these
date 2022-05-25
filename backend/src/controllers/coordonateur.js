const COORD = require("../models/Coordonateur");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const { Types } = require("../constants");
const { removePassword } = require("../utils");
const Avis = require('../models/Avis');


exports.register_coordonateur = function (req, res) {
  let coordonateur = new COORD();
  coordonateur.email = req.body.email;
  coordonateur.motDePasse = req.body.motDePasse;
  coordonateur.nom = req.body.nom;
  coordonateur.prenom = req.body.prenom;

  if (coordonateur.email == "") {
    return res
      .json({
        success: false,
        message: "vous ne pouvez pas vous authentifier avec un email vide",
      })
      .status(500);
  } else if (coordonateur.motDePasse == "") {
    return res.json({
      success: false,
      message: "veuillez svp entrer un mot de passe",
    });
  } else if (coordonateur.motDePasse !== "") {
    if (passwordComplexity().validate(coordonateur.motDePasse).error) {
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
  } else if (coordonateur.nom == "") {
    return res
      .json({
        success: false,
        message:
          "Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter",
      })
      .status(500);
  } else if (coordonateur.prenom == "") {
    return res
      .json({
        success: false,
        message:
          "Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter",
      })
      .status(500);
  }

  coordonateur.save((err, coordo) => {
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
    let coordonateur = await COORD.findOne({ email });
    if (!coordonateur) {
      return res.status(404).send("Coordonateur Not found");
    }
    
    bcrypt.compare(motDePasse, coordonateur.motDePasse, function (err, result) {
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
          _id: coordonateur._id,
          model: Types.ACTEURS.COORDONATEUR,
        };

        res.json({
          success: true,
          message: "Connexion reussie",
          data: removePassword(coordonateur.toJSON()),
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};


exports.rapportsEtudsThese = async function (req, res) {
  const { coordo } = res.locals;
  let avis = await Avis.find({ 
    donnePar: coordo._id, 
    donneParModel: Types.AvisEmetteur.COORDONATEUR,
    destinataireModel: Types.AvisDestinataire.ADMIN
  }).populate({
    path: 'dossier',
    populate: {
      path: 'etudiant',
      select: '-juges -motDePasse -niveau -dateNaissance -urlPhotoProfil -dossier -creeLe -misAJourLe',
      // Pas besoin de selectionner le niveau, car on doit avoir juste les etudiants de THESE 
      // match: { niveau: Types.Niveau.THESE }
    }
  });

  res.json({ avis });
};


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


exports.change_coordonator_pass = function(req,res){
	try{
		const {id} = req.params;
		const {actualPass,newPass} = req.body;

		COORD.findById(id,function(err,coordonateur){
			if(err){
				console.log("Une erreur s'est produitr lors de la recuperation du coordonateur, ce dernier n'existe pas ou il a ete supprimer");
				return res.json({success:false,message:"Une erreur s'est produitr lors de la recuperation du coordonateur, ce dernier n'existe pas ou il a ete supprimer",error:err}).status(400);
			}
			console.log(coordonateur);
			//Utilisateur trouver;
			bcrypt.compare(actualPass,coordonateur.motDePasse,function(err,result){
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
					coordonateur.motDePasse = newPass;
					coordonateur.save(function(err,new_coordonator){
						if(err){
							res.json({success:false,message:"Une erreur est survenue lors de la mise a jour de vos informations",error:err}).status(400)
						}else{
							res.json({success:false,message:"Vos informations de connexion ont ete mise a jour",data:new_coordonator}).status(201);
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

