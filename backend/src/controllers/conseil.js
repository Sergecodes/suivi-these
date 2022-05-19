const CONSEIL = require('../models/Conseil');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants');
const { removePassword } = require('../utils')


exports.new_conseil = function(req,res){
    var Conseil = new CONSEIL();
    Conseil.email = req.body.email;
    Conseil.motDePasse = req.body.motDePasse;

    if(Conseil.email == ''){
        return res.json({success:false,message:"vous ne pouvez pas vous authentifier avec un email vide"}).status(500);

    }else if(Conseil.motDePasse == ''){
        return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
        
    }else if(Conseil.motDePasse !== ''){
        if(passwordComplexity().validate(Conseil.motDePasse).error){
            return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
        }else{
            console.log("mot de passe valide")
        }
    }

    Conseil.save(function(err,nouveau_conseil){
        if(err){
            console.log("erreur lors de l'enregistrement dun conseil scientifique");
            return res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
        }

        // Create user session
        req.session.user = {
            _id: nouveau_conseil._id,
            model: Types.ACTEURS.CONSEIL
        };

        res.json({
            success: true,
            message: "Enregistre avec succes",
            data: removePassword(nouveau_conseil.toJSON())
        }).status(201);
    })
}


exports.conseil_login = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let conseil = await CONSEIL.findOne({email});
        if(!conseil){return res.status(404).send("Conseil Not found")};

        bcrypt.compare(motDePasse, conseil.motDePasse, function(err,result) {
			if(err){
				console.log("une erreur interne est suvenue: ",err);
				return res.status(500).json({
					success:false,message:"une erreur interne est survenue",
					error:err
				});
			}

			if(!result) {
				res.json({
					success: false,
					message: "Invalid credentials"
				})
			} else {
				// Create user session
				req.session.user = {
					_id: conseil._id,
					model: Types.ACTEURS.CONSEIL
				};

				res.json({
					success: true,
					message: "Connexion reussie",
					data: removePassword(conseil.toJSON())
				});
			}
		})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}
exports.change_conseil_pass = function(req,res){
	try{
		const {id} = req.params;
		const {actualPass,newPass} = req.body;

		CONSEIL.findById(id,function(err,conseil){
			if(err){
				console.log("Une erreur s'est produitr lors de la recuperation du conseil, ce dernier n'existe pas ou il a ete supprimer");
				return res.json({success:false,message:"Une erreur s'est produitr lors de la recuperation du conseil, ce dernier n'existe pas ou il a ete supprimer",error:err}).status(400);
			}
			console.log(conseil);
			//Utilisateur trouver;
			bcrypt.compare(actualPass,conseil.motDePasse,function(err,result){
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
					conseil.motDePasse = newPass;
					conseil.save(function(err,new_conseil){
						if(err){
							res.json({success:false,message:"Une erreur est survenue lors de la mise a jour de vos informations",error:err}).status(400)
						}else{
							res.json({success:false,message:"Vos informations de connexion ont ete mise a jour",data:new_conseil}).status(201);
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

