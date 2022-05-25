const EXPERT = require('../models/Expert');
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const saltRounds = 10;
// var passport = require('passport');


exports.register_expert = function(req,res){
    
}

exports.login_expert = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let expert = await EXPERT.findOne({email});
        if(!expert){return res.status(404).send("Departement Not found")};
        bcrypt.compare(motDePasse, expert.motDePasse, function(err,result) {
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
					_id: expert._id,
					model: Types.ACTEURS.EXPERT
				};

				// Remove mot de passe from returned result
				let data = expert.toJSON();
				delete data.motDePasse;

				res.json({
					success: true,
					message: "Connexion reussie",
					data
				});
			}
		})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}

exports.change_expert_pass = function(req,res){
	try{
		const {id} = req.params;
		const {actualPass,newPass} = req.body;

		EXPERT.findById(id,function(err,expert){
			if(err){
				console.log("Une erreur s'est produitr lors de la recuperation du expert, ce dernier n'existe pas ou il a ete supprimer");
				return res.json({success:false,message:"Une erreur s'est produitr lors de la recuperation du expert, ce dernier n'existe pas ou il a ete supprimer",error:err}).status(400);
			}
			console.log(expert);
			//Utilisateur trouver;
			bcrypt.compare(actualPass,expert.motDePasse,function(err,result){
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
					expert.motDePasse = newPass;
					expert.save(function(err,new_expert){
						if(err){
							res.json({success:false,message:"Une erreur est survenue lors de la mise a jour de vos informations",error:err}).status(400)
						}else{
							res.json({success:false,message:"Vos informations de connexion ont ete mise a jour",data:new_expert}).status(201);
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


exports.change_email = function(req,res){
	const {newEmail,id} = req.body;
	
	EXPERT.findById(id,function(err,expert){
		if(err){
			return res.json({success:false,message:"quelque chose nas pas marcher lors de la recuperation du expert",error:err}).status(500);
		}
		//le expert a ete trouver
		if(req.body.newEmail){
			expert.email = newEmail;
		}
		expert.save(function(err,new_expert){
			if(err){
				console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
				res.json({success:false,message:"Internal server error",error:err}).status(500);

			}
			res.json({success:true,message:"la nouvelle adresse email a ete modifier avec success",data:new_expert.email});
		})
	})
}
