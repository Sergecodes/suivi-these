const { Types } = require('../constants');
const bcrypt = require('bcrypt');
const Unite = require('../models/UniteRecherche');
const { removePassword } = require('../utils');


exports.getAll = async function (req, res) {
	res.json( await Unite.find({}) );
}

exports.getOne = function (req, res) {
	const { unite } = res.locals;
	res.json(unite);
}

exports.delete = function (req, res) {
	Unite.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!doc) {
			return res.status(404).send("Not found");
		}

		if (err) {
			console.error(err);
			return res.status(500).json(err);
		}

		return res.status(204).send("Succes");
	});
}

exports.register_unite = function(req,res){
   let unite = new Unite();

  unite.intitule = req.body.intitule;
  unite.coordonateur = req.body.coordonateur;
  unite.code = req.body.code;


  unite.save(function(err,nouveau_unite){
     if(err){
        console.log("erreur lors de l'enregistrement dun unite: ",err);
        return res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
     }
     
     // Create user session
       req.session.user = {
           _id: nouveau_unite._id,
           model: "UniteRecherche"
       };

       res.json({
           success: true,
           message: "Enregistre avec succes",
           data: removePassword(nouveau_unite.toJSON())
       }).status(201);
  })
}

