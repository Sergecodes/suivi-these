const USERS  = require ('../src/models/Etudiant');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = function(req,res){
    console.log("enter")
    var Etudiant = new USERS();
        Etudiant.matricule = req.body.matricule;
        Etudiant.nom = req.body.nom;
        Etudiant.prenom = req.body.prenom;
        Etudiant.motDePasse = req.body.motDePasse;
        Etudiant.niveau = req.body.niveau;
        Etudiant.email = req.body.email;
        Etudiant.dateNaissance = req.body.dateNaissance;
        Etudiant.lieuNaissance = req.body.lieuNaissance;
        Etudiant.numTelephone = req.body.numTelephone;
        Etudiant.sexe = req.body.sexe;
        Etudiant.urlPhotoProfil = req.body.urlPhotoProfil;
        // Etudiant.uniteRecherche = req.body.uniteRecherche;
        // Etudiant.encadreur = req.body.encadreur;
        //controle;
        if(Etudiant.nom == ''){
            return res.json({success:false,message:"Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
        }else if(Etudiant.prenom == ''){
            return res.json({success:false,message:"Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
        }else if(Etudiant.motDePasse == ''){
            return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
          
        }else if(Etudiant.motDePasse !== ''){
            if(passwordComplexity().validate(Etudiant.motDePasse).error){
                return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
            }else{
                console.log("hachage du mot de passe")
                bcrypt.hash(Etudiant.motDePasse, saltRounds, function(err, hash) {
                    if(err){
                        return res.json("le mot de passe n'as pas ue etre hacher correctement, le message d'erreur est le suivant:", err).status(500);

                    }else{
                        console.log("mot de passe hacher",hash)
                        Etudiant.motDePasse = hash;

                    }

                    // Store hash in your password DB.
                });
                //le mot de passe est valide donc on le hache
            }
        }else if( Etudiant.dateNaissance == ''){
            return res.json({success:false,message:'le champ date de naissance est vide'}).status(500);
        }else if( Etudiant.lieuNaissance == ''){
            return res.json({success:false,message:'le champ Lieu de naissance est vide de naissance est vide'}).status(500);
        }else if(Etudiant.numTelephone == ''){
            res.json({success:false,message:"le champs numero de telephone est vide veuillez entrer votre numero de telephone"}).status(500);
        }
        Etudiant.save(function(err,nouveau_Etudiant){
            console.log('ici ici');
            if(err){
                console.log(err);
                res.json({success:false,message:"Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", erreur:err}).status(500);
            }
            res.json({success:true,message:"le nouveau etudiant viens d'etre enregistrer avec success",data:nouveau_Etudiant}).status(200);
        })

        //if  passwordComplexity().validate(Etudiant.motDePasse).error
        //  




}