const { Dossier, EtapeDossier, FichierDossier } = require("../models/Dossier");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const moment = require('moment');
require('moment/locale/fr');
const path = require("path");
// const fs = require('fs');
const { storage } = require('../../firebase.config');
const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { Types } = require('../constants');
const Etudiant = require('../models/Etudiant');
const { removePassword, getEtapeWording, getActeur, sendEmail } = require('../utils');

moment.locale('fr');


exports.getEtudiants = async function (req, res) {
   let filter = req.body.filter || {};
   res.json(await Etudiant.find(filter));
}

exports.etudiantsMaster = async function (req, res) {
   let etuds = await Etudiant
      .find({ niveau: Types.Niveau.MASTER })
      .where('compteValideLe').nin([undefined, ''])
      .populate({
         path: 'departement',
         select: '-motDePasse',
         populate: {
            path: 'uniteRecherche'
         }
      });
   
   res.json(etuds);
}

exports.etudiantsThese = async function (req, res) {
   let etuds = await Etudiant
      .find({ niveau: Types.Niveau.THESE })
      .where('compteValideLe').nin([undefined, ''])
      .populate({
         path: 'departement',
         select: '-motDePasse',
         populate: {
            path: 'uniteRecherche'
         }
      });
   
   res.json(etuds);
}

exports.getOne = function (req, res) {
	const { etudiant } = res.locals;
	res.json(etudiant);
}

exports.notifications = async function (req, res) {
   let { etudiant } = res.locals;
   await etudiant.populate({
      path: 'notifications',
      populate: {
         path: 'objetConcerne'
      }
   });
   res.json(etudiant.notifications);
}


exports.delete = function (req, res) {
	Etudiant.findByIdAndRemove(req.params.id, (err, doc) => {
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

exports.register = function (req, res) {
   let isValid = (function () {
      let validParams = [
         'matricule', 'nom', 'prenom', 'motDePasse', 'niveau',
         'email', 'dateNaissance', 'lieuNaissance',  'sexe',
         'numTelephone', 'departement', 'encadreur'
      ]

      for (let ele of validParams) {
         if (!(ele in req.body))
            return ele;
      }

      return true;
   })();

   if (isValid !== true)
      return res.status(400).send(`${isValid} is not in the request body`);

   let etud = new Etudiant();
   etud.matricule = req.body.matricule;
   etud.nom = req.body.nom;
   etud.prenom = req.body.prenom;
   etud.motDePasse = req.body.motDePasse;
   etud.niveau = req.body.niveau;
   etud.email = req.body.email;
   etud.dateNaissance = req.body.dateNaissance;
   etud.lieuNaissance = req.body.lieuNaissance;
   etud.numTelephone = req.body.numTelephone;
   etud.sexe = req.body.sexe;
   etud.departement = req.body.departement;
   etud.encadreur = req.body.encadreur;

   if (etud.motDePasse !== '') {
      if (passwordComplexity().validate(etud.motDePasse).error) {
         return res.status(400).json({ 
            success: false, 
            type: 'INVALID_PASSWORD',
            message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," 
         });
      } else {
         console.log("mot de passe valide");
      }
   } 

   etud.save(async function (err, newEtud) {
      if (err) {
         console.error(err);
         return res.status(500).json({ 
            success: false, 
            message: "Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", 
            erreur: err 
         });
      }

      // Send email to user
      if (process.env.SEND_EMAILS === "true") {
         sendEmail(
            newEtud.email, 
            "Demande de création de compte envoyé",
            `Votre demande de création de compte a été envoyé,
            vous recevrez un email lorsque votre demande sera accepté. `
         );
      }

      // Create user session
      req.session.user = {
         _id: newEtud._id,
         model: Types.ACTEURS.ETUDIANT
      };

      res.status(201).json({
         success: true,
         message: "Enregistre avec succes",
         data: removePassword(newEtud.toJSON())
      });
   })
}

exports.login_student = async function (req, res) {
   try {
      const { matricule, motDePasse, niveau, email } = req.body;
      let etudiant = await Etudiant.findOne({ 
         email,
         niveau,
         matricule: matricule.toUpperCase()
      })
      .populate('encadreur', '-motDePasse')
      .populate({
         path: 'departement',
         select: '-motDePasse',
         populate: {
            path: 'uniteRecherche',
            select: '-motDePasse'
         }
      });

      if (!etudiant) { return res.status(404).send("User Not found") };
      console.log("to validate password");

      bcrypt.compare(motDePasse, etudiant.motDePasse, async function (err, result) {
         if (err) {
            console.error("une erreur interne est suvenue: ", err);
            return res.status(500).json({
               success: false, message: "une erreur interne est survenue",
               error: err
            });
         }

         if (!result) {
            return res.status(404).send("User Not found")
         } else {
            // Create user session
            req.session.user = {
               _id: etudiant._id,
               model: Types.ACTEURS.ETUDIANT
            };

            res.json({
               success: true,
               message: "Connexion reussie",
               data: removePassword(etudiant.toJSON())
            });
         }
      })

   } catch (error) {
      console.error(error);
      res.status(500).send(error);
   }
}

exports.change_student_password = async function (req, res) {
   try {
      console.log("in change password");
      const { etudiant } = res.locals;
      const { pass, newPass } = req.body;

      bcrypt.compare(pass, etudiant.motDePasse, function (err, result) {
         if (err) {
            console.log("une erreur interne est suvenue: ", err);
            return res.json({ success: false, message: "une erreur interne est survenue", error: err });
         }
         if (result == true) {
            etudiant.motDePasse = newPass
            etudiant.save(function (err, nouveau_Etudiant) {
               console.log('ici ici');
               if (err) {
                  console.error(err);
                  res.json({ success: false, message: "Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", erreur: err }).status(500);
               }

               if (req.session)
                     req.session.destroy();

               res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte" });
            })
         } else {
            res.status(401).json({ message: "les mots de passe ne correspondent pas" });
         }
      });

   } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong")
   }
}

exports.changeEmail = function (req, res) {
   const { newEmail } = req.body;
   const { etudiant } = res.locals;

   if (!newEmail)
		return res.status(400).send("newEmail n'est pas dans la requete");

	if (etudiant.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.status(400).send("Cet email est votre email actuel, vous avez ete deconnecte");
	}

   etudiant.email = newEmail;
   etudiant.save(function (err, newEtudiant) {
      if (err) {
         res.status(500).json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement", error: err })
      }

      if (req.session)
         req.session.destroy();

      return res.json({ 
         success: true, 
         message: "Email mis a jour, vous avez ete deconnecte", 
         newEmail: newEtudiant.email
      });
   });
}

exports.updateProfile = function (req, res) {
	const { etudiant } = res.locals;
	// Info: numTelephone
	etudiant.numTelephone = req.body.numTelephone || etudiant.numTelephone;

	etudiant.save((err, newEtudiant) => {
		if (err) {
         console.error(err);
         res.status(500).json(err)
      }

      res.json(newEtudiant);
	});
}


/**
 * Recuperer les fichiers renvoyes par un etudiant et
 * creer son dossier a partir de ceux-ci.
 */
exports.updatePhoto = async function (req, res) {
   const { etudiant } = res.locals;

   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
         success: false,
         message: "Aucun fichier envoyé",
      });
   }

   console.log(req.files);
   const file = req.files.photo;
   const extname = path.extname(file.name);

   // Validate file extensions
   const validExtensions = [".png", ".jpg", ".jpeg"];

   if (!validExtensions.includes(extname)) {
      return res
         .status(422)
         .send(`Format non supporte (${extname.substring(1)})`);
   }

   const etudDir = `${etudiant.matricule} - ${new Date().getFullYear()}/`;

   if (process.env.USE_FIREBASE === "true") {
      const uploadPath = path.join(
         etudDir,
         "photo_profil" + path.extname(file.name)
      );
      const imageRef = ref(storage, uploadPath);
      const fileMetadata = {
         // cacheControl: 'public,max-age=86400',  // 24hrs = 86400s (1hr=3600s)
         contentType: file.mimetype,
      };

      await uploadBytesResumable(imageRef, file.data, fileMetadata)
         .then(async (snapshot) => {
            // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            console.log("File metadata:", snapshot.metadata);

            // Let's get a download URL for the file.
            await getDownloadURL(snapshot.ref).then(async (url) => {
               console.log("File available at", url);

               etudiant.urlPhotoProfil = url;
               await etudiant.save();
               return res.json({ 
                  success: true, 
                  urlPhotoProfil: url, 
                  message: "Profile picture updated" 
               });
            });
         })
         .catch((error) => {
            console.error("Upload failed", error);
            return res.status(500).json({ success: false, error });
         });
   } else {
      const basedir = process.env.basedir;

      if (!basedir) {
         console.error("Set 'basedir' in .env file");
         process.exit(1);
      }

      const saveDir = path.join(basedir, etudDir);

      // Create student directory if it doesn't exist
      // if (!fs.existsSync(saveDir)) {
      //     fs.mkdirSync(saveDir);
      // }

      const uploadPath = path.join(
         saveDir,
         "photo_profil" + path.extname(file.name)
      );

      // Use the mv() method to place the file somewhere on your server
      file.mv(uploadPath, async function (err) {
         if (err) return res.status(500).send(err);

         etudiant.urlPhotoProfil = uploadPath;
         await etudiant.save();
         return res.json({ 
            success: true, 
            message: "Photo de profile mise a jour", 
            urlPhotoProfil: uploadPath 
         });
      });
   }
};


/**
 * Recuperer les fichiers renvoyes par un etudiant et
 * creer son dossier a partir de ceux-ci.
 */
exports.uploadFiles = async function (req, res) {
   const { sujet, niveau } = req.body;
   const { etudiant } = res.locals;

   if (!(await etudiant.peutUploader()))
      return res.status(409).send("Cet etudiant n'a pas/plus le droit d'uploader un dossier")

   if (!sujet || !niveau) {
      return res.status(400).json({
         success: false,
         message: "Invalid request body",
      });
   }

   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
         success: false,
         message: "Aucun fichier envoyé",
      });
   }

   // Validate file categories
   let validFilenames = [];

   if (niveau == Types.Niveau.MASTER) {
      validFilenames = Object.values(Types.CategorieFichierMaster);
      for (let filename of validFilenames) {
         if (!req.files[filename]) {
            return res.status(400).json({
               success: false,
               message: `Le fichier ${filename} est manquant`,
            });
         }
      }
   } else if (niveau == Types.Niveau.THESE) {
      validFilenames = Object.values(Types.CategorieFichierThese);
      for (let filename of validFilenames) {
         if (!req.files[filename]) {
            return res.status(400).json({
               success: false,
               message: `Le fichier ${filename} est manquant`,
            });
         }
      }
   } else {
      return res.status(400).json({
         success: false,
         message: "Niveau non trouvé ou invalide",
      });
   }

   const fileEntries = Object.entries(req.files);

   // Validate file extensions
   const validExtensions = [".png", ".jpg", ".jpeg", ".pdf"];

   for (const [fileCat, fileCatObj] of fileEntries) {
      let extname = path.extname(fileCatObj.name);
      if (!validExtensions.includes(extname)) {
         return res
            .status(422)
            .send(
               `Le fichier ${fileCat} a un format non supporte (${extname.substring(
                  1
               )})`
            );
      }
   }

   // Create dossier
   Dossier.create(
      { sujet, etudiant: etudiant._id },
      async function (err, dossier) {
         if (err) {
            return res.status(500).json({
                  success: false,
                  message: "erreur lors de la creation du dossier",
                  error: err,
               });
         }

         // Set etudiant dossier
         etudiant.dossier = dossier._id;
         await etudiant.save();

         // Upload files
         const etudDir = `${etudiant.matricule} - ${new Date().getFullYear()}/`;

         if (process.env.USE_FIREBASE === "true") {
            let i = 0,
               n = fileEntries.length;

            for (const [fileCat, fileCatObj] of fileEntries) {
               const uploadPath = path.join(
                  etudDir,
                  fileCat + path.extname(fileCatObj.name)
               );
               const imageRef = ref(storage, uploadPath);
               const fileMetadata = {
                  // cacheControl: 'public,max-age=86400',  // 24hrs = 86400s (1hr=3600s)
                  contentType: fileCatObj.mimetype,
               };

               await uploadBytesResumable(imageRef, fileCatObj.data, fileMetadata)
                  .then(async (snapshot) => {
                     // console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                     console.log("File metadata:", snapshot.metadata);

                     // Let's get a download URL for the file.
                     await getDownloadURL(snapshot.ref).then(async (url) => {
                        console.log("File available at", url);

                        await FichierDossier.create({
                           url,
                           categorie: fileCat,
                           dossier: dossier._id,
                        });

                        i++;

                        // Return response if for loop is over
                        if (i == n - 1) {
                           await dossier.populate('fichiers');
                           return res.status(201).json({
                              success: true,
                              message: "Files uploaded!",
                              dossier
                           });
                        }
                     });
                  })
                  .catch((error) => {
                     console.error("Upload failed", error);
                     return res.status(500).json({ success: false, error });
                  });
            }
         } else {
            let i = 0, n = fileEntries.length;
            const basedir = process.env.basedir;

            if (!basedir) {
               console.error("Set 'basedir' in .env file");
               process.exit(1);
            }

            const saveDir = path.join(basedir, etudDir);

            // Create student directory if it doesn't exist
            // if (!fs.existsSync(saveDir)) {
            //     fs.mkdirSync(saveDir);
            // }

            for (const [fileCat, fileCatObj] of fileEntries) {
               const uploadPath = path.join(
                  saveDir,
                  fileCat + path.extname(fileCatObj.name)
               );

               // Use the mv() method to place the file somewhere on your server
               fileCatObj.mv(uploadPath, async function (err) {
                  if (err) return res.status(500).send(err);

                  // Create file
                  await FichierDossier.create({
                     categorie: fileCat,
                     url: uploadPath,
                     dossier: dossier._id,
                  });

                  i++;
                  
                  // Return response if for loop is over
                  if (i == n - 1) {
                     await dossier.populate('fichiers');
                     return res.status(201)
                     .json({ success: true, message: "Files uploaded!", dossier });
                  }
               });
            }
         }
      }
   );
};

exports.setJugesMaster = async function (req, res) {
   const { etudiant } = res.locals;
   const { juges } = req.body;

   if (etudiant.niveau !== Types.Niveau.MASTER) {
      return res.status(400).send("Juste les etudiants de master peuvent avoir des juges");
   }

   etudiant.juges = juges;
   await etudiant.save();
   await etudiant.populate('juges', '-motDePasse');
   res.json(etudiant.juges);
}

exports.datesSoutenance = function (req, res) {
   // Etudiant.find({ dateSoutenance: { $ne: "" } }, (err, etuds) => {
   Etudiant.where('dateSoutenance').nin([undefined, '']).exec((err, etuds) => {
      if (err) {
         return res.status(500).json({ success: false, error: err });
      }

      console.log(etuds);

      let result = {};

      for (let etud of etuds) {
         const date = etud.dateSoutenance;
         const etudObj = {
            id: etud._id,
            matricule: etud.matricule,
            nom: etud.nom,
            prenom: etud.prenom,
            niveau: etud.niveau,
            sexe: etud.sexe
         };

         if (!(date in result)) {
            result[date] = [etudObj];
         } else {
            result[date].push(etudObj);
         }
      }

      return res.json(result);
   });
};

exports.getEvolutionDossier = async function (req, res) {
   const { etudiant } = res.locals;
   const { MASTER, THESE } = Types.Niveau; 
   let numEtapeActu;
   
   let etapes = await (async function () {
      let etapesDossier = await EtapeDossier.find({ dossier: etudiant.dossier });
      console.log(etapesDossier);

      const numEtapes = etapesDossier.length;
      if (numEtapes === 0) 
         numEtapeActu = Types.EtapeDossier.UNE;
      else
         numEtapeActu = etapesDossier.at(-1).numEtape;

      let defaultVal = { debuteeLe: '', acheveeLe: '', };
      let result = { 
         1: defaultVal, 2: defaultVal, 3: defaultVal, 
         4: defaultVal, 5: defaultVal, 6: defaultVal 
      };
      for (let etape of etapesDossier) {
         result[etape.numEtape] = etape;
      }
      return result;
   })();

   let evolution = {};
   if (etudiant.niveau === MASTER) {
      evolution = {
         1: {
           titre: getEtapeWording(1, MASTER),
           debuteeLe: etapes[1].debuteeLe && moment(etapes[1].debuteeLe).format('llll'),
           acheveeLe: etapes[1].acheveeLe && moment(etapes[1].acheveeLe).format('llll'),
           gereePar: getActeur(1, MASTER),
         },
         2: {
           titre: getEtapeWording(2, MASTER),
           debuteeLe: etapes[2].debuteeLe && moment(etapes[2].debuteeLe).format('llll'),
           acheveeLe: etapes[2].acheveeLe && moment(etapes[2].acheveeLe).format('llll'),
           gereePar: getActeur(2, MASTER)
         },
         3: {
           titre: getEtapeWording(3, MASTER),
           debuteeLe: etapes[3].debuteeLe && moment(etapes[3].debuteeLe).format('llll'),
           acheveeLe: etapes[3].acheveeLe && moment(etapes[3].acheveeLe).format('llll'),
           gereePar: getActeur(3, MASTER)
         },
         4: {
           titre: getEtapeWording(4, MASTER),
           debuteeLe: etapes[4].debuteeLe && moment(etapes[4].debuteeLe).format('llll'),
           acheveeLe: etapes[4].acheveeLe && moment(etapes[4].acheveeLe).format('llll'),
           gereePar: getActeur(4, MASTER)
         },
         5: {
           titre: getEtapeWording(5, MASTER),
           debuteeLe: etapes[5].debuteeLe && moment(etapes[5].debuteeLe).format('llll'),
           acheveeLe: etapes[5].acheveeLe && moment(etapes[5].acheveeLe).format('llll'),
           gereePar: getActeur(5, MASTER)
         },
         6: {
           titre: getEtapeWording(6, MASTER),
           debuteeLe: etapes[6].debuteeLe && moment(etapes[6].debuteeLe).format('llll'),
           acheveeLe: etapes[6].acheveeLe && moment(etapes[6].acheveeLe).format('llll'),
           gereePar: getActeur(6, MASTER)
         },
       };
   } else {
      evolution = { };
   }
   
   res.json({ numEtapeActuelle: numEtapeActu, evolution});
}

exports.etapesDossier = async function (req, res) {
   const { etudiant } = res.locals;

   try {
      let etapes = await EtapeDossier.find({ dossier: etudiant.dossier });
      res.json(etapes);
   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }
}

exports.peutUploaderDossier = async function (req, res) {
   const { etudiant } = res.locals;
   res.json({ peutUploader: await etudiant.peutUploader() });
}


exports.reinitialiser = async function (req, res) {
   const { etudiant } = res.locals;
   await etudiant.reinitialiser();
   res.send('Success');
}

