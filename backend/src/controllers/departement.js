const DEPART = require('../models/Departement');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const { removePassword } = require('../utils')



exports.register_departement = function(req,res){
    var departement = new DEPART();
	departement.nom = req.body.nom;
	departement.motDePasse = req.body.motDePasse;
	departement.email = req.body.email;

	departement.save(function(err,nouveau_departement){
		if(err){
			console.log("erreur lors de l'enregistrement dun departement: ",err);
			return res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
		}
		
		// Create user session
        req.session.user = {
            _id: nouveau_departement._id,
            model: Types.ACTEURS.DEPARTEMENT
        };

        res.json({
            success: true,
            message: "Enregistre avec succes",
            data: removePassword(nouveau_departement.toJSON())
        }).status(201);
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

				res.json({
					success: true,
					message: "Connexion reussie",
					data: nouveauPassword(departement.toJSON())
				});
			}
		})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}
