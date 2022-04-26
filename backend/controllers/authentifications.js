const USERS  = require ('../src/models/Etudiant');
const CONSEIL = require('../src/models/Conseil');
const COORD = require('../src/models/Coordonateur');
const DEPART = require('../src/models/Departement');
const EXPERT = require('../src/models/Expert');
const JURY = require('../src/models/Jury');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// var passport = require('passport');

/************************EVERYTHINK ABOUT STUDEN ****************************** */

exports.register = function(req,res){
    console.log("enter")
    var Etudiant = new USERS();
        Etudiant.matricule = req.body.matricule;
        Etudiant.nom = req.body.nom;
        Etudiant.prenom = req.body.prenom;
        Etudiant.motDePasse = req.body.motDePasse;
        Etudiant.niveau = req.body.niveau;
        Etudiant.email = req.body.email;
        Etudiant.dateNaissance = req.body.dateNaissance;
        Etudiant.lieuNaissance = req.body.lieuNaissance;
        Etudiant.numTelephone = req.body.numTelephone;
        Etudiant.sexe = req.body.sexe;
        Etudiant.urlPhotoProfil = req.body.urlPhotoProfil;
        // Etudiant.uniteRecherche = req.body.uniteRecherche;
        // Etudiant.encadreur = req.body.encadreur;
        //controle;
        if(Etudiant.nom == ''){
            return res.json({success:false,message:"Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
        }else if(Etudiant.prenom == ''){
            return res.json({success:false,message:"Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter"}).status(500);
        }else if(Etudiant.motDePasse == ''){
            return res.json({success:false,message: "veuillez svp entrer un mot de passe"})
          
        }else if(Etudiant.motDePasse !== ''){
            if(passwordComplexity().validate(Etudiant.motDePasse).error){
                return res.json({success:false,message:"mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre,"}).status(500)
            }else{
                console.log("mot de passe valide")
            }
        }else if( Etudiant.dateNaissance == ''){
            return res.json({success:false,message:'le champ date de naissance est vide'}).status(500);
        }else if( Etudiant.lieuNaissance == ''){
            return res.json({success:false,message:'le champ Lieu de naissance est vide de naissance est vide'}).status(500);
        }else if(Etudiant.numTelephone == ''){
            res.json({success:false,message:"le champs numero de telephone est vide veuillez entrer votre numero de telephone"}).status(500);
        }
        Etudiant.save(function(err,nouveau_Etudiant){
            console.log('ici ici');
            if(err){
                console.log(err);
                res.json({success:false,message:"Quelques chose s'est mal passer lors de l'enregistrement d'un nouvel etulisateur", erreur:err}).status(500);
            }
            res.json({success:true,message:"le nouveau etudiant viens d'etre enregistrer avec success",data:nouveau_Etudiant}).status(200);
        })

        //if  passwordComplexity().validate(Etudiant.motDePasse).error
        //  
}

exports.login_student = async function(req,res){
    try{
        const {matricule,motDePasse} = req.body;
        let etudiant = await USERS.findOne({matricule});
        if(!etudiant){return res.status(400).send("User Not found")};
        const validPassword = await bcrypt.compare(motDePasse,etudiant.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:etudiant})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}

exports.change_student_password = function(req,res){
    const {id} = req.params;
    const {ActualPassword,NewPassword} = req.body;
    USERS.findById(id,function(err,etudiant){
        if(err){
            return res.json({success:false,message:"quelque chose nas pas marcher lors de la recuperation de l'etudiant",error:err}).status(500);
        }
        //L'utilisateur a ete trouver
        const validPassword =  bcrypt.compare(ActualPassword,etudiant.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
        if(req.body.NewPassword){
            etudiant.motDePasse = NewPassword;
        };
        etudiant.save(function(err,newStudent){
            if(err){
                console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau mot de passe: ", err);
                res.json({success:false,message:"Une erreur s'est produite au niveau de l'enregistrement du nouveau mot de passe",error:err}).status(500);        
            }
            res.json({success:true,message:"le mot de passe a ete enregistrer avec success",data:newStudent.motDePasse});
        })
    })
}

exports.changePhoneNumber = function(req,res){
    const {id} = req.params;
    const{newPhoneNumber} = req.body;
    USERS.findById(id,function(err,etudiant){
        if(err){
            return res.json({success:false,message:"quelque chose nas pas marcher lors de la recuperation de l'etudiant",error:err}).status(500);
        }
         //L'utilisateur a ete trouver
         if(req.body.newPhoneNumber){
             etudiant.numTelephone = newPhoneNumber;
         }
         etudiant.save(function(err,newStudent){
            if(err){
                console.log("Une erreur s'est produite au niveau de l'enregistrement du nouveau numero de telephone: ", err);
                res.json({success:false,message:"Une erreur s'est produite au niveau de l'enregistrement du nouveau numerode telephone",error:err}).status(500);        
            }
            res.json({success:true,message:"le nouveau numero de telephone a ete enregistrer avec success",data:newStudent.numTelephone});
        })



    })
}

/**************** CONSEIL SCIENTIFIQUE ***********************/
exports.new_conseil = function(req,res){
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
            res.json({succes:true,mesage:"le nouveau conseil a ete enregistrer avec success",data:nouveau_conseil}).status(200);
        })
}

exports.conseil_login = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let conseil = await CONSEIL.findOne({email});
        if(!conseil){return res.status(400).send("Conseil Not found")};
        const validPassword = await bcrypt.compare(motDePasse,conseil.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:conseil})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}
/*************************************************************/

/**********************COORDONATEUR*************************************/
exports.register_coordonateur = function(req,res){
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
/**********************************************************************/

/*****************************DEPARTEMENT*************************/

exports.register_departement = function(req,res){
    var departement = new DEPART();
        departement.nom = req.body.nom;
        departement.motDePasse = req.body.motDePasse;
        departement.email = req.body.email;

        departement.save(function(err,nouveau_departement){
            if(err){
                console.log("erreur lors de l'enregistrement dun departement: ",err);
                res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique",error:err}).status(500)
            }
            res.json({success:true,message:'Enregistrer avec success',data:nouveau_departement});
        })
}

exports.login_departement = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let departement = await DEPART.findOne({email});
        if(!departement){return res.status(400).send("Departement Not found")};
        const validPassword = await bcrypt.compare(motDePasse,departement.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:departement})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}

/****************************************************************/

/******************************EXPERT**************************/
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


/*************************************************************/

/***************************JURY*****************************/
exports.register_jury = function(req,res){
    var jury = new EXPERT();
        jury.nom = req.body.nom;
        jury.prenom=req.body.prenom;
        jury.motDePasse = req.body.motDePasse;
        jury.email = req.body.email;
        jury.telephone = req.body.telephone;
        jury.grade = req.body.grade;

        jury.save(function(err,nouveau_jury){
            if(err){
                console.log("erreur lors de l'enregistrement dun jurry: ",err);
                res.json({success:false,message:"quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client",error:err}).status(500)
            }
            res.json({success:true,message:'Enregistrer avec success',data:nouveau_jury});
        })
}


exports.login_jury = async function(req,res){
    try{
        const {email,motDePasse} = req.body;
        let jury = await JURY.findOne({email});
        if(!jury){return res.status(400).send("Jury Not found")};
        const validPassword = await bcrypt.compare(motDePasse,jury.motDePasse);
        if(!validPassword) return res.status(400).send("please enter a valid password");
       res.json({succes:true,message:"Connexion reussie",data:jury})
    } catch(error){
        console.log(error)
        res.status(500).send("Something went wrong");
    }
}

/***********************************************************/





