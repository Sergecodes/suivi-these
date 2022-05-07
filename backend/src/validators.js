/** Les fonctions de validation */

const { Types } = require('./constants');
const { isNumeric } = require('./utils')


/**
 * Verifier si le matricule est valide ou pas
 * Un matricule a la forme AABBCC ou 
 * AA - deux derniers chiffres de l'annee (ex 19, 11, 10; 10-22 -- annee courante)
 * BC - une lettre B et un chiffre C
 * DD.. des chiffres
 * @param matricule String
 */
function validerMatricule(matricule) {
    matricule = matricule.toString();

    // Valider la longueur
    let length = matricule.length;
    if (length < 6 || length > 7) {
        return false;
    }
    
    let aa = matricule.substring(0, 2), bc = matricule.substring(2, 4);
    let b = bc.charAt(0), c = bc.charAt(1);
    let dd = matricule.substring(4);

    // Valider AA
    if (isNaN(aa)) {
        return false;
    }

    aa = parseInt(aa, 10);
    let anneeCourante = new Date().getFullYear();
    let chiffresAnnee = parseInt(anneeCourante.toString().substring(2, 4), 10);
    
    if (aa < 10 || aa > chiffresAnnee) {
        return false;
    }

    // Valider BC
    if (isNumeric(b) || !isNumeric(c)) {
        return false;
    }

    // Valider dd
    if (isNaN(dd)) {
        return false;
    }

    return true;
}


// /**
//  * Verifier si les tous les fichiers requis sont envoyes.
//  * @param {string} niveau - Le niveau concerne
//  * @param {Array[str]} filenames - Nom des fichiers envoyes
//  */
// function validateFilenames(niveau, filenames) {
//     const checker = (arr, target) => target.every(v => arr.includes(v));

//     if (niveau == Types.Niveau.MASTER) {
//         let validNames = Object.values(Types.CategorieFichierMaster);
//         if (checker(filenames, validNames)) 
//             return true;
//         return false;

//     } else if (niveau == Types.Niveau.THESE) {
//         let validNames = Object.values(Types.CategorieFichierThese);
//         if (checker(filenames, validNames)) 
//             return true;
//         return false;
//     }

//     throw "Niveau invalide";
// }


module.exports = { validerMatricule };

