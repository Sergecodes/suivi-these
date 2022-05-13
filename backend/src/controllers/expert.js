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

