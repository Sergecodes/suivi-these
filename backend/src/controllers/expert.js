const EXPERT = require('../models/Expert');
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const { removePassword } = require('../utils')


exports.register_expert = function(req,res){
  var expert = new EXPERT();
	expert.nom = req.body.nom;
	expert.prenom=req.body.prenom;
	expert.motDePasse = req.body.motDePasse;
	expert.email = req.body.email;
	expert.ville = req.body.ville;
	expert.grade = req.body.grade;
	expert.type = req.body.type;

	expert.save(function(err,nouveau_expert){
		if(err){
			console.log("erreur lors de l'enregistrement dun expert: ",err);
			res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau expert",error:err}).status(500)
		}

		// Create user session
        req.session.user = {
            _id: nouveau_expert._id,
            model: Types.ACTEURS.EXPERT
        };

        res.json({
            success: true,
            message: "Enregistre avec succes",
            data: removePassword(nouveau_expert.toJSON())
        }).status(201);

	})
}

exports.login_expert = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let expert = await EXPERT.findOne({email});
        if(!expert){return res.status(404).send("Expert Not found")};
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

				res.json({
					success: true,
					message: "Connexion reussie",
					data: removePassword(expert.toJSON())
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

