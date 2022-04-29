
const USERS = require('../src/models/Etudiant');
const ETAPES_DOSSIERS = require('../src/models/Dossier')

exports.getDoc_etape =function(req,res){
    const {matricule} = req.query;
    console.log(matricule)

    //premierement je recherche l'etudiant
    USERS.findOne({matricule:matricule},function(err,etudiant){
        if(err){
            console.log("une erreur s'est produite en essayant de trouver un etudiant associer a l'username que vous venez d'entrer");
            res.json({success:false,message:"une erreur s'est produite en essayant de trouver un etudiant associer a l'username que vous venez d'entrer",error:err}).status(500);
        }
        if(!etudiant){
            console.log(etudiant);
            return res.status(400).send("Etudiant not found");
        } 
    //L'etudiant a ete trouver
        //on retourne les etapes de son dossier
        try{
         ETAPES_DOSSIERS.EtapeDossier.findOne({dossier:etudiant.dossier},function(err,etapes){
             if(err){
                 console.log(err);
                 res.json({success:false,message:"Une erreur est survenue lors de la recuperation des etapes de dossier",error:error}).status(404)
             }
             if(!etapes){
                 console.log("pas d'etapes");
                 res.json({message:"aucune etapes initialiser pour le dossier de cette etudiant",success:false,data:etapes})
                }
            res.json({message:"Recuperation des etapes de dossiers avec success",success:true,data:etapes});
         });
        }catch(error){
            console.log(error);
            res.status(500).send("Something went wrong")
        }
    })


}
