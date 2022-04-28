const EXPERT = require('../models/Expert');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// var passport = require('passport');


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
            res.json({success:true,message:'Enregistrer avec success',data:nouveau_expert});

        })
}

exports.login_expert = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let expert = await EXPERT.findOne({email});
        if(!expert){return res.status(400).send("Departement Not found")};
        const validPassword = await bcrypt.compare(motDePasse,expert.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:expert})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}

