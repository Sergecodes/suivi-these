const COORD = require('../models/Coordonateur');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// var passport = require('passport');


exports.register_coordonateur = function(req,res){
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

exports.login_coordonateur = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let coordonateur = await COORD.findOne({email});
        if(!coordonateur){return res.status(400).send("Coordonateur Not found")};
        const validPassword = await bcrypt.compare(motDePasse,coordonateur.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:coordonateur})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}
