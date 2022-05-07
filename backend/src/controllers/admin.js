
const COORD = require('../models/Coordonateur');
const JURY = require('../models/Jury');
const CONSEIL = require('../models/Conseil');
const EXPERT = require('../models/Expert');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const CONSTANTES = require('../constants')

/********************************/
    //ALL ABOUT COORDONATOR
    exports.register_coordonateur = function(req,res){ 
       
        const {admin_email} = req.body.admin_email;
        const admin_authorized = CONSTANTES.EMAILS_ADMIN
        console.log("yo",admin_authorized);
        //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
        const Is_authorized = admin_authorized.find(function(item){
            if(item == admin_email){
               console.log("existe")
               return true;
            }else{
                console.log("existe pas");
                return false;
            }
        })
        console.log(Is_authorized);
    
        //2. Les verications ete effectuer
          //2.1 si il n'est pas authorizer
          if(Is_authorized === undefined){
              res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
          }else{//2.1 il est autauriser
            var coordonateur = new COORD();
            coordonateur.email = req.body.email;
            coordonateur.motDePasse = req.body.motDePasse;
            coordonateur.nom = req.body.nom;
            coordonateur.prenom = req.body.prenom;
    
            if(coordonateur.email == ''){
                return res.json({success:false,message:"vous ne pouvez pas vous authentifier avec un email vide"}).status(500);
    
            }else if(coordonateur.motDePasse == ''){
                return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
              
            }else if(coordonateur.motDePasse !== ''){
                if(passwordComplexity().validate(coordonateur.motDePasse).error){
                    return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
                }else{
                    console.log("mot de passe valide")
                }
            }else if(coordonateur.nom == ''){
                return res.json({success:false,message:"Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
            }else if(coordonateur.prenom == ''){
                return res.json({success:false,message:"Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
            }
    
            coordonateur.save(function(err,nouveau_coordonateur){
                if(err){
                    console.log("erreur lors de l'enregistrement dun conseil scientifique");
                    res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
                }
                res.json({succes:true,mesage:"le nouveau conseil a ete enregistrer avec success",data:nouveau_coordonateur}).status(200);
    
            })
          }
    }

    exports.deleteCoordonator = function(req,res){
        const{coord_id}= req.params;
        const {admin_email} = req.body.admin_email;
        const admin_authorized = CONSTANTES.EMAILS_ADMIN
        console.log("yo",admin_authorized);
         //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
         const Is_authorized = admin_authorized.find(function(item){
            if(item == admin_email){
               console.log("existe")
               return true;
            }else{
                console.log("existe pas");
                return false;
            }
        })
        console.log(Is_authorized);
        if(Is_authorized === undefined){
            res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
        }else{
            COORD.findByIdAndRemove(coord_id,function(err,docs){
                if(err){
                    console.log("une erreur s'est produite lors de la supression du coordonateur",err);
                    res.json({success:false,message:"une erreur s'est produite lors de la supression du coordonateur",error:err})
                }else{
                    res.json({success:true, message:"le coordonateur suivant a ete supprimer avec success",data:docs})
                }
            })
        }
    }
/******************************* */


/***************EVERYTHING ABOUT Jury**********************/
exports.add_jury = function(req,res){
    const {admin_email} = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo",admin_authorized);
     //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function(item){
        if(item == admin_email){
           console.log("existe")
           return true;
        }else{
            console.log("existe pas");
            return false;
        }
    });
    console.log(Is_authorized);
    if(Is_authorized === undefined){
        res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
    }else{
        var jury = new JURY();
        jury.nom = req.body.nom;
        jury.prenom=req.body.prenom;
        jury.motDePasse = req.body.motDePasse;
        jury.email = req.body.email;
        jury.telephone = req.body.telephone;
        jury.grade = req.body.grade;
        if(jury.motDePasse == ''){
            return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
        }else{
            if(passwordComplexity().validate(jury.motDePasse).error){
                return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
            }else{
                console.log("mot de passe valide");
            }
        }
        jury.save(function(err,nouveau_jury){
            if(err){
                console.log("erreur lors de l'enregistrement dun jurry: ",err);
                res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client",error:err}).status(500)
            }
            res.json({success:true,message:'Enregistrer avec success',data:nouveau_jury}).status(201);
        })
    }
}

exports.deleteJury = function(req,res){
    const {jury_id} = req.params;
    const {admin_email} = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo",admin_authorized);
     //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
     const Is_authorized = admin_authorized.find(function(item){
        if(item == admin_email){
           console.log("existe")
           return true;
        }else{
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if(Is_authorized === undefined){
        res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
    }else{
        JURY.findByIdAndRemove(jury_id,function(err,docs){
            if(err){
                console.log("une erreur s'est produite lors de la supression du jury",err);
                res.json({success:false,message:"une erreur s'est produite lors de la supression du coordonateur",error:err});
            }else{
                res.json({success:true, message:"le jury suivant a ete supprimer avec success",data:docs});
            }
        })
    }

} 
/***************END OF EVERYTHING ABOUT JURY**************/







/***************EVERYTHING ABOUT CONSEIL*****************/
exports.add_conseil = function(req,res){
    const {admin_email} = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo",admin_authorized);
     //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function(item){
        if(item == admin_email){
           console.log("existe")
           return true;
        }else{
            console.log("existe pas");
            return false;
        }
    });
    console.log(Is_authorized);
    if(Is_authorized === undefined){
        res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
    }else{
        var Conseil = new CONSEIL();
        Conseil.email = req.body.email;
        Conseil.motDePasse = req.body.motDePasse;
        if(Conseil.email == ''){
            return res.json({success:false,message:"vous ne pouvez pas vous authentifier avec un email vide"}).status(500);
        }else if(Conseil.motDePasse == ''){
            return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
        }else if(Conseil.motDePasse !== ''){
            if(passwordComplexity().validate(Conseil.motDePasse).error){
                return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
            }else{
                console.log("mot de passe valide")
            }
        }
        Conseil.save(function(err,nouveau_conseil){
            if(err){
                console.log("erreur lors de l'enregistrement dun conseil scientifique");
                res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
            }
            res.json({success:true,mesage:"le nouveau conseil a ete enregistrer avec success",data:nouveau_conseil}).status(201);
        })
    }
}


exports.deleteConseil = function(req,res){
    const {conseil_id} = req.params;
    const {admin_email} = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo",admin_authorized);
     //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
     const Is_authorized = admin_authorized.find(function(item){
        if(item == admin_email){
           console.log("existe")
           return true;
        }else{
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if(Is_authorized === undefined){
        res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
    }else{
        CONSEIL.findByIdAndRemove(conseil_id,function(err,docs){
            if(err){
                console.log("une erreur s'est produite lors de la supression du conseil",err);
                res.json({success:false,message:"une erreur s'est produite lors de la supression du conseil",error:err});
            }else{
                res.json({success:true, message:"le conseil suivant a ete supprimer avec success",data:docs});
            }
        })
    }
} 
/***************END OF EVERYTHING ABOUT CONSEIL*********/






/***************EVERYTHING ABOUT EXPERT*****************/
exports.add_expert = function(req,res){
    const {admin_email} = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo",admin_authorized);
     //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function(item){
        if(item == admin_email){
           console.log("existe")
           return true;
        }else{
            console.log("existe pas");
            return false;
        }
    });
    console.log(Is_authorized);
    if(Is_authorized === undefined){
        res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
    }else{
        var expert = new EXPERT();
        expert.nom = req.body.nom;
        expert.prenom=req.body.prenom;
        expert.motDePasse = req.body.motDePasse;
        expert.email = req.body.email;
        expert.ville = req.body.ville;
        expert.grade = req.body.grade;
        expert.type = req.body.type;

        if(expert.motDePasse == ''){
            return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
        }else{
            if(passwordComplexity().validate(expert.motDePasse).error){
                return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
            }else{
                console.log("mot de passe valide");
            }
        }
        expert.save(function(err,nouveau_expert){
            if(err){
                console.log("erreur lors de l'enregistrement dun expert: ",err);
                res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau expert",error:err}).status(500)
            }
            res.json({success:true,message:'Enregistrer avec success',data:nouveau_expert}).status(201);
        })
    }
}

exports.deleteExpert = function(req,res){
    const {expert_id} = req.params;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo",admin_authorized);
     //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
     const Is_authorized = admin_authorized.find(function(item){
        if(item == admin_email){
           console.log("existe")
           return true;
        }else{
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if(Is_authorized === undefined){
        res.json({success:false,message:"Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur"})
    }else{
        EXPERT.findByIdAndRemove(expert_id,function(err,docs){
            if(err){
                console.log("une erreur s'est produite lors de la supression de l'expert",err);
                res.json({success:false,message:"une erreur s'est produite lors de la supression de l'expert",error:err});
            }else{
                res.json({success:true, message:"l'expert suivant a ete supprimer avec success",data:docs});
            }
        })
    }
}
/***************END OF EVERYTHING ABOUT EXPERT*********/