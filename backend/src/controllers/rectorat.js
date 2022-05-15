const { Types } = require('../constants');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');
const Rectorat = require('../models/Rectorat');
const { removePassword } = require('../utils');
const Etudiant = require('../models/Etudiant');

exports.register_rectorat = function(req,res){
   var rectorat = new Rectorat();
  rectorat.motDePasse = req.body.motDePasse;
  rectorat.email = req.body.email;

   console.log(req.body);

  rectorat.save(function(err,nouveau_rectorat){
     if(err){
        console.log("erreur lors de l'enregistrement dun rectorat: ",err);
        return res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
     }
     
     // Create user session
       req.session.user = {
           _id: nouveau_rectorat._id,
           model: Types.ACTEURS.RECTORAT
       };

       res.json({
           success: true,
           message: "Enregistre avec succes",
           data: removePassword(nouveau_rectorat.toJSON())
       }).status(201);
  })
}

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
 

exports.changeEmail = function(req,res){
	const {newEmail} = req.body;

	Rectorat.findById(req.session.user._id, function(err,rectorat){
		if(err){
			return res.json({success:false,error:err}).status(500);
		}

		 if(req.body.newEmail){
			 rectorat.email = newEmail;
		 }
		 rectorat.save(function(err, newRectorat){
			if(err){
				res.json({success:false,message:"Une erreur s'est produite au niveau de l'enregistrement",error:err}).status(500);        
			}
			res.json({ success:true, newEmail: newRectorat.email });
		})
	})
}


exports.rapportsEtudsThese = async function (req, res) {
	let etudiants = await Etudiant.find({ niveau: Types.Niveau.THESE })
      .select('-motDePasse')
		.populate({
			path: 'dossier',
			populate: [
            // 'notes',
            {
               path: 'fichiers',
               select: 'url uploadeLe',
               match: { categorie: Types.CategorieFichierThese.MEMOIRE }
            }, 
         ]
		});

   console.log(etudiants);

   let rectoratEtuds = [], numEtape = 8;
   for (let etud of etudiants) {
      let dossier = etud.dossier;
      if (await dossier.etapeActuelle === numEtape) {
         rectoratEtuds.push(etud);
      }
   }

	res.json({ etudiants: rectoratEtuds });
}


exports.programmerDateSoutenance = async function (req, res) {
   const { idEtudiant, dateSoutient } = req.body;
   let etud = await Etudiant.findById(idEtudiant);

   if (!etud)
     return res.status(404).send("Etudiant non trouve");
      
   if (etud.niveau != Types.Niveau.THESE)
      return res.status(400).json({message: "L'etudiant doit etre un etudiant de these"});

   let rectorat = await Rectorat.findById(req.session.user._id);
   if (!rectorat)
      return res.status(404).send("Rectorat non trouve");

   try {
      await rectorat.programmerDateSoutenanceThese(etud, dateSoutient);
   } catch (err) {
      return res.status(400).json({ err });
   }

    res.send("Date de soutenance programmée!");
}



