const { Types } = require('../constants');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');
const Rectorat = require('../models/Rectorat');
const { removePassword } = require('../utils');


exports.login_rectorat = async function(req,res){
   try {
       const {email, motDePasse} = req.body;
       let rectorat = await Rectorat.findOne({email});
       if(!rectorat){return res.status(400).send("Invalid credentials")};

       bcrypt.compare(motDePasse, rectorat.motDePasse, function(err,result) {
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
              _id: rectorat._id,
              model: Types.ACTEURS.RECTORAT
           };

           res.json({
              success: true,
              message: "Connexion reussie",
              data: removePassword(rectorat.toJSON())
           });
        }
     })
   } catch(error){
       console.log(error)
       res.status(500).send("Something went wrong");
   }

}


// -------------------

exports.notifications = async function (req, res) {
	let notifs = await Notification.find({
        destinataireModel: Types.ModelNotif.RECTORAT
    });
	res.json({ notifs });
}


exports.changePassword = function(req, res) {
	try {
		const id = req.session.user._id;
		const { pass, newPass } = req.body;

		Rectorat.findById(id, function(err,rectorat) {
			if (err){
				return res.json({success:false, error:err}).status(500);
			}

			if (!rectorat)
				return res.status(404).send("Non trouve");
		
			bcrypt.compare(pass, rectorat.motDePasse, function (err,result) {
				if (err) {
					return res.status(500).json({success:false,message:"une erreur interne est survenue",error:err});
				}
				if (result === true){
					rectorat.motDePasse = newPass;
					rectorat.save(function (err, newRectorat) {
						if(err){
							console.log(err);
							res.json({success:false, erreur:err}).status(500);
						}

						if (req.session)
        					req.session.destroy();

						res.json({ success: true, message: "Vous avez ete deconnecte" });
					})
				} else {
					res.status(400).json({ message:"les mots de passe ne correspondent pas" })
				}
			})
		})
		
	 } catch(error){
		console.error(error);
		res.status(500).send("Something went wrong");
	}
}
 
