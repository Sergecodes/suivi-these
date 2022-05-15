const { Types } = require('../constants');
const bcrypt = require('bcrypt');
const Unite = require('../models/UniteRecherche');
const { removePassword } = require('../utils');


exports.register_unite = function(req,res){
   var unite = new Unite();

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

