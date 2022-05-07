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

