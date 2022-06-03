const { Dossier, EtapeDossier, FichierDossier } = require("../models/Dossier");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");
const path = require("path");
// const fs = require('fs')
const { storage } = require('../../firebase.config')
const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { Types } = require('../constants');
const Etudiant = require('../models/Etudiant');
const { removePassword } = require('../utils')


exports.register = function (req, res) {
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
   etud.urlPhotoProfil = req.body.urlPhotoProfil;
   etud.departement = req.body.departement;
   etud.encadreur = req.body.encadreur;

   if (etud.nom == '') {
      return res.json({ success: false, message: "Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter" }).status(500);
   } else if (etud.prenom == '') {
      return res.json({ success: false, message: "Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter" }).status(500);
   } else if (etud.motDePasse == '') {
      return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })

   } else if (etud.motDePasse !== '') {
      if (passwordComplexity().validate(etud.motDePasse).error) {
         return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
      } else {
         console.log("mot de passe valide")
      }
   } else if (etud.dateNaissance == '') {
      return res.json({ success: false, message: 'le champ date de naissance est vide' }).status(500);
   } else if (etud.lieuNaissance == '') {
      return res.json({ success: false, message: 'le champ Lieu de naissance est vide de naissance est vide' }).status(500);
   } else if (etud.numTelephone == '') {
      res.json({ success: false, message: "le champs numero de telephone est vide veuillez entrer votre numero de telephone" }).status(500);
   }
   etud.save(function (err, nouveau_etudiant) {
      if (err) {
         console.log(err);
         return res.json({ success: false, message: "Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", erreur: err }).status(500);
      }

      // Create user session
      req.session.user = {
         _id: nouveau_etudiant._id,
         model: Types.ACTEURS.ETUDIANT
      };

      res.json({
         success: true,
         message: "Enregistre avec succes",
         data: removePassword(nouveau_etudiant.toJSON())
      }).status(201);
   })
}

exports.login_student = async function (req, res) {
   try {
      const { matricule, motDePasse, niveau } = req.body;
      let etudiant = await Etudiant.findOne({ matricule, niveau });
      if (!etudiant) { return res.status(404).send("User Not found") };

      bcrypt.compare(motDePasse, etudiant.motDePasse, function (err, result) {
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


exports.changePhoneNumber = function (req, res) {
   const { etudiant } = res.locals;
   const { newPhoneNumber } = req.body;

   if (etudiant.telephone === newPhoneNumber) {
		return res.json({ message: "Ce numero est votre numero actuel" });
	}

   if (newPhoneNumber) {
      etudiant.numTelephone = newPhoneNumber;
   }

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

// exports.checkUploaderDossier = async function (req, res) {
//    const { etudiant } = res.locals;

//    // todo verifier etape
//    res.send({ 'dejaUploade': Boolean(etudiant.dossier) });
// }
