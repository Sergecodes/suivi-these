
const Coordonateur = require('../models/Coordonateur');
const Jury = require('../models/Jury');
const Conseil = require('../models/Conseil');
const Expert = require('../models/Expert');
const Etudiant = require('../models/Etudiant');
// const AUTRES = require('../models/autresUtils');
const { Dossier } = require('../models/Dossier');
const AVIS = require('../models/Avis');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const CONSTANTES = require('../constants')
const { Types } = require('../constants');
const Admin = require('../models/Admin');
const { removePassword } = require('../utils');



/********************************/
//ALL ABOUT COORDONATOR
exports.register_coordonateur = function (req, res) {

    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    //2. Les verications ete effectuer
    //2.1 si il n'est pas authorizer
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {//2.1 il est autauriser
        var coordonateur = new Coordonateur();
        coordonateur.email = req.body.email;
        coordonateur.motDePasse = req.body.motDePasse;
        coordonateur.nom = req.body.nom;
        coordonateur.prenom = req.body.prenom;

        if (coordonateur.email == '') {
            return res.json({ success: false, message: "vous ne pouvez pas vous authentifier avec un email vide" }).status(500);

        } else if (coordonateur.motDePasse == '') {
            return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })

        } else if (coordonateur.motDePasse !== '') {
            if (passwordComplexity().validate(coordonateur.motDePasse).error) {
                return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
            } else {
                console.log("mot de passe valide")
            }
        } else if (coordonateur.nom == '') {
            return res.json({ success: false, message: "Vous devez entrez votre nom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter" }).status(500);
        } else if (coordonateur.prenom == '') {
            return res.json({ success: false, message: "Vous devez entrez votre prenom pour pouvoir vous enregistrer svp, Il est recommander d'ecrire votre nom complet tel quel est sur l'acte de naissance de peur que votre dossier soit rejetter" }).status(500);
        }

        coordonateur.save(function (err, nouveau_coordonateur) {
            if (err) {
                console.log("erreur lors de l'enregistrement dun conseil scientifique");
                res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique", error: err }).status(500)
            }
            res.json({ succes: true, mesage: "le nouveau conseil a ete enregistrer avec success", data: nouveau_coordonateur }).status(200);

        })
    }
}

exports.deleteCoordonator = function (req, res) {
    const { coord_id } = req.params;
    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        Coordonateur.findByIdAndRemove(coord_id, function (err, docs) {
            if (err) {
                console.log("une erreur s'est produite lors de la supression du coordonateur", err);
                res.json({ success: false, message: "une erreur s'est produite lors de la supression du coordonateur", error: err })
            } else {
                res.json({ success: true, message: "le coordonateur suivant a ete supprimer avec success", data: docs })
            }
        })
    }
}
/******************************* */


/***************EVERYTHING ABOUT Jury**********************/
exports.add_jury = function (req, res) {
    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    });
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        var jury = new Jury();
        jury.nom = req.body.nom;
        jury.prenom = req.body.prenom;
        jury.motDePasse = req.body.motDePasse;
        jury.email = req.body.email;
        jury.telephone = req.body.telephone;
        jury.grade = req.body.grade;
        if (jury.motDePasse == '') {
            return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })
        } else {
            if (passwordComplexity().validate(jury.motDePasse).error) {
                return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
            } else {
                console.log("mot de passe valide");
            }
        }
        jury.save(function (err, nouveau_jury) {
            if (err) {
                console.log("erreur lors de l'enregistrement dun jurry: ", err);
                res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau client", error: err }).status(500)
            }
            res.json({ success: true, message: 'Enregistrer avec success', data: nouveau_jury }).status(201);
        })
    }
}

exports.deleteJury = function (req, res) {
    const { jury_id } = req.params;
    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        Jury.findByIdAndRemove(jury_id, function (err, docs) {
            if (err) {
                console.log("une erreur s'est produite lors de la supression du jury", err);
                res.json({ success: false, message: "une erreur s'est produite lors de la supression du coordonateur", error: err });
            } else {
                res.json({ success: true, message: "le jury suivant a ete supprimer avec success", data: docs });
            }
        })
    }

}
/***************END OF EVERYTHING ABOUT Jury**************/







/***************EVERYTHING ABOUT Conseil*****************/
exports.add_conseil = function (req, res) {
    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    });
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        var Conseil = new Conseil();
        Conseil.email = req.body.email;
        Conseil.motDePasse = req.body.motDePasse;
        if (Conseil.email == '') {
            return res.json({ success: false, message: "vous ne pouvez pas vous authentifier avec un email vide" }).status(500);
        } else if (Conseil.motDePasse == '') {
            return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })
        } else if (Conseil.motDePasse !== '') {
            if (passwordComplexity().validate(Conseil.motDePasse).error) {
                return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
            } else {
                console.log("mot de passe valide")
            }
        }
        Conseil.save(function (err, nouveau_conseil) {
            if (err) {
                console.log("erreur lors de l'enregistrement dun conseil scientifique");
                res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique", error: err }).status(500)
            }
            res.json({ success: true, mesage: "le nouveau conseil a ete enregistrer avec success", data: nouveau_conseil }).status(201);
        })
    }
}


exports.deleteConseil = function (req, res) {
    const { conseil_id } = req.params;
    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        Conseil.findByIdAndRemove(conseil_id, function (err, docs) {
            if (err) {
                console.log("une erreur s'est produite lors de la supression du conseil", err);
                res.json({ success: false, message: "une erreur s'est produite lors de la supression du conseil", error: err });
            } else {
                res.json({ success: true, message: "le conseil suivant a ete supprimer avec success", data: docs });
            }
        })
    }
}
/***************END OF EVERYTHING ABOUT Conseil*********/






/***************EVERYTHING ABOUT Expert*****************/
exports.add_expert = function (req, res) {
    const { admin_email } = req.body.admin_email;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    });
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        var expert = new Expert();
        expert.nom = req.body.nom;
        expert.prenom = req.body.prenom;
        expert.motDePasse = req.body.motDePasse;
        expert.email = req.body.email;
        expert.ville = req.body.ville;
        expert.grade = req.body.grade;
        expert.type = req.body.type;

        if (expert.motDePasse == '') {
            return res.json({ success: false, message: "veuillez svp entrer un mot de passe" })
        } else {
            if (passwordComplexity().validate(expert.motDePasse).error) {
                return res.json({ success: false, message: "mot de passe invalide, Svp votre mot de passe doit contenir 8 caractere au minimum, et 26 au maximale,au moin 1 caractere minuscule, au moin un caractere majuscule,au moin un symbole, au moin un chiffre," }).status(500)
            } else {
                console.log("mot de passe valide");
            }
        }
        expert.save(function (err, nouveau_expert) {
            if (err) {
                console.log("erreur lors de l'enregistrement dun expert: ", err);
                res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau expert", error: err }).status(500)
            }
            res.json({ success: true, message: 'Enregistrer avec success', data: nouveau_expert }).status(201);
        })
    }
}

exports.deleteExpert = function (req, res) {
    const { expert_id } = req.params;
    const admin_authorized = CONSTANTES.EMAILS_ADMIN
    console.log("yo", admin_authorized);
    //1.On verifie d'abord si c'est admin qui essaye d'executer la requette
    const Is_authorized = admin_authorized.find(function (item) {
        if (item == admin_email) {
            console.log("existe")
            return true;
        } else {
            console.log("existe pas");
            return false;
        }
    })
    console.log(Is_authorized);
    if (Is_authorized === undefined) {
        res.json({ success: false, message: "Desoler mais seuls les admins sont autorisees a efectuer cette requette, veuillez contacter votre administrateur" })
    } else {
        Expert.findByIdAndRemove(expert_id, function (err, docs) {
            if (err) {
                console.log("une erreur s'est produite lors de la supression de l'expert", err);
                res.json({ success: false, message: "une erreur s'est produite lors de la supression de l'expert", error: err });
            } else {
                res.json({ success: true, message: "l'expert suivant a ete supprimer avec success", data: docs });
            }
        })
    }
}
/***************END OF EVERYTHING ABOUT Expert*********/



/***********1- Rejetter l'inscription d'un etudiant**********************/
exports.rejetD1Etudiant = function (req, res) {
    const { etudiant_id, raison_de_rejet } = req.body;

    Etudiant.findById(etudiant_id, function (err, etudiant) {
        if (err) {
            return res.json({ success: false, message: "quelque chose nas pas marcher lors de la recuperation de l'etudiant", error: err }).status(500);
        }
        //L'etudiant a ete trouver
        AUTRES.rejeterEtudiant(etudiant, raison_de_rejet);
    })
}
/************************END**************************** */


/*********2- Rejetter la deande de soutenance d'un etudiant en these***************/
exports.rejetD1Dossier = function (req, res) {
    const { id_dossier, raison } = req.body;

    Dossier.findById(id_dossier, function (err, dossier) {
        if (err) {
            return res.json({ success: false, message: "quelque chose nas pas marcher lors de la recuperation du dossier de l'etudiant", error: err }).status(500);
        }
        //le dossier a ete trouver
        AUTRES.rejeterDossier(dossier, raison);
    })
}
/**************************END*****************************************************/

/*********************************************************************************/
// verifier si les rapports d'expertise sont majoritairement correct sinon contacter un deuxième expert et refaire une verification , ou dans le
// cas où les deux rapports sont defavorables rejeter le memoire

exports.Verification_rapport_expertise = function (req, res) {
    const { avis_id } = req.body;
    //On verifie tout d'abord si un avis existe dans la base de donnee;
    AVIS.findById(avis_id, function (err, avis) {
        if (err) {
            console.log("Nous sommes desoler une erreur est survenue lors de la recherche de l'avis");
        } else {
            //l'avis qu'on recherche existe
            if (avis.donneParModel == 'Expert' && avis.destinataireModel == 'Admin') {
                if (!avis) {
                    res.json({ success: true, message: "quelque chose s'est mal passer lors de" })
                }

            }
        }
    })

}

/********************************************************************************/

exports.register_admin = function (req, res) {
    var admin = new Admin();
    admin.motDePasse = req.body.motDePasse;
    admin.email = req.body.email;

    admin.save(function (err, nouveau_admin) {
        if (err) {
            console.log("erreur lors de l'enregistrement dun admin: ", err);
            return res.json({ success: false, message: "quelque chose s'est mal passer lors de l'enregistrement d'un nouveau conseil scientifique", error: err }).status(500)
        }

        // Create user session
        req.session.user = {
            _id: nouveau_admin._id,
            model: Types.ACTEURS.ADMIN
        };

        res.json({
            success: true,
            message: "Enregistre avec succes",
            data: removePassword(nouveau_admin.toJSON())
        }).status(201);
    })
}


exports.login_admin = async function (req, res) {
    try {
        const { email, motDePasse } = req.body;
        let admin = await Admin.findOne({ email });
        if (!admin) { return res.status(400).send("Invalid credentials") };

        bcrypt.compare(motDePasse, admin.motDePasse, function (err, result) {
            if (err) {
                console.log("une erreur interne est suvenue: ", err);
                return res.status(500).json({
                    success: false, message: "une erreur interne est survenue",
                    error: err
                });
            }

            if (!result) {
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
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong");
    }

}
