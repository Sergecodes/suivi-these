const { Dossier, EtapeDossier, FichierDossier } = require("../models/Dossier");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const path = require("path");
// const fs = require('fs');
const { storage } = require('../../firebase.config');
const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { Types } = require('../constants');
const Etudiant = require('../models/Etudiant');
const Notification = require('../models/Notification');
const { removePassword } = require('../utils');


exports.getAll = async function (req, res) {
	res.json( await Etudiant.find({}) );
}

exports.getOne = function (req, res) {
	const { etudiant } = res.locals;
	res.json(etudiant);
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

   etud.save(async function (err, nouveau_etudiant) {
      if (err) {
         console.error(err);
         return res.status(500).json({ 
            success: false, 
            message: "Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", 
            erreur: err 
         });
      }

      // Send notification to admin
      await Notification.create({
         type: Types.TypeNotification.NOUVEAU_ETUDIANT,
         destinataireModel: Types.ModelNotif.ADMIN,
         objetConcerne: etud._id,
         objetConcerneModel: Types.ModelNotif.ETUDIANT
      });

      // Create user session
      req.session.user = {
         _id: nouveau_etudiant._id,
         model: Types.ACTEURS.ETUDIANT
      };

      res.status(201).json({
         success: true,
         message: "Enregistre avec succes",
         data: removePassword(nouveau_etudiant.toJSON())
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
      });
      console.log(req.body);
      console.log(await Etudiant.find({}));

      if (!etudiant) { return res.status(404).send("User Not found") };
      console.log("to validate");

      bcrypt.compare(motDePasse, etudiant.motDePasse, function (err, result) {
         if (err) {
            console.log("une erreur interne est suvenue: ", err);
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
      res.status(500).send(error);
   }
}

exports.change_student_password = async function (req, res) {
   try {
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
                  console.log(err);
                  res.json({ success: false, message: "Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", erreur: err }).status(500);
               }

               if (req.session)
                     req.session.destroy();

               res.json({ success: true, message: "Mot de passe mis a jour, vous avez ete deconnecte" });
            })
         } else {
            res.json({ message: "les mots de passe ne correspondent pas" }).status(401);
         }
      });

   } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong")
   }
}


exports.changeEmail = function (req, res) {
   const { newEmail } = req.body;
   const { etudiant } = res.locals;

   if (!newEmail)
		return res.send("newEmail n'est pas dans la requete").status(400);

	if (etudiant.email === newEmail) {
		if (req.session)
			req.session.destroy();

		return res.json({ message: "Cet email est votre email actuel, vous avez ete deconnecte" });
	}

   etudiant.email = newEmail;
   etudiant.save(function (err, newEtudiant) {
      if (err) {
         res.json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement", error: err }).status(500);
      }

      if (req.session)
         req.session.destroy();

      return res.json({ success: true, message: "Email mis a jour, vous avez ete deconnecte"});
   });
}

exports.changePhoneNumber = function (req, res) {
   const { etudiant } = res.locals;
   const { newPhoneNumber } = req.body;

   if (!newPhoneNumber)
		return res.send("newPhoneNumber n'est pas dans la requete").status(400);

   if (etudiant.numTelephone === newPhoneNumber) {
		return res.json({ message: "Ce numero est votre numero actuel" });
	}

   etudiant.numTelephone = newPhoneNumber;
   etudiant.save(function (err, newStudent) {
      if (err) {
         console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
         res.json({ success: false, message: "Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone", error: err }).status(500);
      }
      res.json({ success: true, message: "le nouveau numero de telephone a ete enregistrer avec success", data: newStudent.numTelephone });
   });
}


/**
 * Recuperer les fichiers renvoyes par un etudiant et
 * creer son dossier a partir de ceux-ci.
 *
 */
exports.updatePhoto = async function (req, res) {
   const { etudiant } = res.locals;

   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
         success: false,
         message: "Aucun fichier envoyé",
      });
   }

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
               return res
                  .json({ success: true, message: "Profile picture updated" })
                  .status(200);
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
      fileObj.mv(uploadPath, async function (err) {
         if (err) return res.status(500).send(err);

         etudiant.urlPhotoProfil = uploadPath;
         await etudiant.save();
         return res
            .json({ success: true, message: "Profile picture updated" })
            .status(200);
      });
   }
};


/**
 * Recuperer les fichiers renvoyes par un etudiant et
 * creer son dossier a partir de ceux-ci.
 */
exports.uploadFiles = function (req, res) {
   const { sujet, niveau } = req.body;
   const { etudiant } = res.locals;

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
            return res
               .json({
                  success: false,
                  message: "erreur lors de la creation du dossier",
                  error: err,
               })
               .status(500);
         }

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
                        if (i == n - 1)
                           return res.status(201).json({
                              success: true,
                              message: "Files uploaded!",
                           });
                     });
                  })
                  .catch((error) => {
                     console.error("Upload failed", error);
                     return res.status(500).json({ success: false, error });
                  });
            }
         } else {
            let i = 0,
               n = fileEntries.length;
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
                  if (i == n - 1)
                     return res
                        .json({ success: true, message: "Files uploaded!" })
                        .status(201);
               });
            }
         }
      }
   );
};

exports.datesSoutenance = function (req, res) {
   Etudiant.find({ dateSoutenance: { $ne: "" } }, (err, etuds) => {
      if (err) {
         return res.status(500).json({ success: false, error: err });
      }

      let result = {};

      for (let etud of etuds) {
         const date = etud.dateSoutenance;
         const etudObj = {
            matricule: etud.matricule,
            nom: etud.nom,
            prenom: etud.prenom,
            niveau: etud.niveau,
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
   res.send({ peutUploade: await etudiant.peutUploader });
}


exports.reinitialiser = async function (req, res) {
   const { etudiant } = res.locals;
   await etudiant.reinitialiser();
   res.send('Success');
}

