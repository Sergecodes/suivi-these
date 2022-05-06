const DEPART = require('../models/Departement');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const saltRounds = 10;
// var passport = require('passport');



exports.register_departement = function(req,res){
    var departement = new DEPART();
        departement.nom = req.body.nom;
        departement.motDePasse = req.body.motDePasse;
        departement.email = req.body.email;

        departement.save(function(err,nouveau_departement){
            if(err){
                console.log("erreur lors de l'enregistrement dun departement: ",err);
                res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
            }
            res.json({success:true,message:'Enregistrer avec success',data:nouveau_departement}).status(201);
        })
}


exports.login_departement = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let departement = await DEPART.findOne({email});
        if(!departement){return res.status(404).send("Departement Not found")};
        bcrypt.compare(motDePasse, departement.motDePasse, function(err,result) {
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
					_id: departement._id,
					model: Types.ACTEURS.DEPARTEMENT
				};

				// Remove mot de passe from returned result
				let data = departement.toJSON();
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
