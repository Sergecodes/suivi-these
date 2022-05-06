const COORD = require('../models/Coordonateur');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const { Types } = require('../constants')
const saltRounds = 10;
// var passport = require('passport');
exports.login_coordonateur = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let coordonateur = await COORD.findOne({email});
        if(!coordonateur){return res.status(404).send("Coordonateur Not found")};
        bcrypt.compare(motDePasse, coordonateur.motDePasse, function(err,result) {
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
					_id: coordonateur._id,
					model: Types.ACTEURS.COORDONATEUR
				};

				// Remove mot de passe from returned result
				let data = coordonateur.toJSON();
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

