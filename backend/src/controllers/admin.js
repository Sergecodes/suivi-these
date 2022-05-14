const { Types } = require('../constants');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const { removePassword } = require('../utils');


exports.login_admin = async function(req,res){
  try {
      const {email, motDePasse} = req.body;
      let admin = await Admin.findOne({email});
      if(!admin){return res.status(400).send("Invalid credentials")};

      bcrypt.compare(motDePasse, admin.motDePasse, function(err,result) {
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
             _id: admin._id,
             model: Types.ACTEURS.ADMIN
          };

          res.json({
             success: true,
             message: "Connexion reussie",
             data: removePassword(admin.toJSON())
          });
       }
    })
  } catch(error){
      console.log(error)
      res.status(500).send("Something went wrong");
  }

}
