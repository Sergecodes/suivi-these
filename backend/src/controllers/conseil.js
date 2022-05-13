const CONSEIL = require('../models/Conseil');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants')


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
            res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
        }

        // Create user session
        req.session.user = {
            _id: Conseil._id,
            model: Types.ACTEURS.CONSEIL
        };

        // Remove mot de passe from returned result
        let data = Conseil.toJSON();
        delete data.motDePasse;

        res.json({
            success: true,
            message: "le nouveau conseil a ete enregistrer avec success",
            data
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

				// Remove mot de passe from returned result
				let data = conseil.toJSON();
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

