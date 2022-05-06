
const COORD = require('../models/Coordonateur');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CONSTANTES = require('../constants')

/********************************/
    //ALL ABOUT COORDONATOR
    exports.register_coordonateur = function(req,res){ 
        const {admin_email} = req.body.admin_email;
        const admin_authorized = CONSTANTES.EMAILS_ADMIN
        console.log("yo",admin_authorized);
        //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
        const Is_authorized = admin_authorized.find(function(item){
            if(item == admin_email){
               console.log("existe")
               return true;
            }else{
                console.log("existe pas");
                return false;
            }
        })
        console.log(Is_authorized);
    
        //2. Les verications ete effectuer
          //2.1 si il n'est pas authorizer
          if(Is_authorized === undefined){
              res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
          }else{//2.1 il est autauriser
            var coordonateur = new COORD();
            coordonateur.email = req.body.email;
            coordonateur.motDePasse = req.body.motDePasse;
            coordonateur.nom = req.body.nom;
            coordonateur.prenom = req.body.prenom;
    
            if(coordonateur.email == ''){
                return res.json({success:false,message:"vous ne pouvez pas vous authentifier avec un email vide"}).status(500);
    
            }else if(coordonateur.motDePasse == ''){
                return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
              
            }else if(coordonateur.motDePasse !== ''){
                if(passwordComplexity().validate(coordonateur.motDePasse).error){
                    return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
                }else{
                    console.log("mot de passe valide")
                }
            }else if(coordonateur.nom == ''){
                return res.json({success:false,message:"Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
            }else if(coordonateur.prenom == ''){
                return res.json({success:false,message:"Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
            }
    
            coordonateur.save(function(err,nouveau_coordonateur){
                if(err){
                    console.log("erreur lors de l'enregistrement dun conseil scientifique");
                    res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
                }
                res.json({succes:true,mesage:"le nouveau conseil a ete enregistrer avec success",data:nouveau_coordonateur}).status(200);
    
            })
          }
    }

/******************************* */