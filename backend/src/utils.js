/** Les fonctions d'utilite */
const { Types } = require('./constants');


const isNumeric = val => !isNaN(val);

/**
 * Remove `motDePasse` key from object
 * @param {dict} obj 
 */
const removePassword = obj => {
    if ('motDePasse' in obj) 
        delete obj.motDePasse;

    return obj;
}

const getActeur = (numDossier, niveau) => {
    const { EtapeDossier, ActeurDossier } = Types;
    const acteurMaster = {
        [EtapeDossier.DEUX_MASTER]: '',
        [EtapeDossier.TROIS_MASTER]: '',
        [EtapeDossier.QUATRE_MASTER]: '',

    };
    const acteurThese = {
        [EtapeDossier.DEUX_THESE]: '',
        [EtapeDossier.TROIS_THESE]: '',
        [EtapeDossier.QUATRE_THESE]: '',

    };

    if (numDossier === EtapeDossier.ZERO) {
        return ActeurDossier.ADMIN;
    } else if (niveau === Types.Niveau.THESE) {
        return acteurThese[numDossier];
    } else if (niveau === Types.Niveau.MASTER) {
        return acteurMaster[numDossier];
    }
}

const getEtapeWording = (numDossier, niveau) => {
    const EtapeDossier = Types.EtapeDossier;
    const wordingMaster = {
        [EtapeDossier.DEUX_MASTER]: '',
        [EtapeDossier.TROIS_MASTER]: '',
        [EtapeDossier.QUATRE_MASTER]: '',

    };
    const wordingThese = {
        [EtapeDossier.DEUX_THESE]: '',
        [EtapeDossier.TROIS_THESE]: '',
        [EtapeDossier.QUATRE_THESE]: '',

    };

    if (numDossier === EtapeDossier.ZERO) {
        return "Attente de validation par l'admin";
    } else if (numDossier === EtapeDossier.UNE) {
        return "Attente de validation de dossier par l'admin";
    } else if (niveau === Types.Niveau.THESE) {
        return wordingThese[numDossier];
    } else if (niveau === Types.Niveau.MASTER) {
        return wordingMaster[numDossier];
    }
}



module.exports = { isNumeric, getActeur, getEtapeWording, removePassword };
