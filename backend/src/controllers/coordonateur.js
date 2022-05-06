const COORD = require('../models/Coordonateur');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// var passport = require('passport');




exports.login_coordonateur = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let coordonateur = await COORD.findOne({email});
        if(!coordonateur){return res.status(400).send("Coordonateur Not found")};
        const validPassword = await bcrypt.compare(motDePasse,coordonateur.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:coordonateur})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}

