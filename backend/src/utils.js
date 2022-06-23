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

const getActeur = (numEtape, niveau) => {
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

    if (numEtape === EtapeDossier.ZERO) {
        return ActeurDossier.ADMIN;
    } else if (niveau === Types.Niveau.THESE) {
        return acteurThese[numEtape];
    } else if (niveau === Types.Niveau.MASTER) {
        return acteurMaster[numEtape];
    }
}

const getEtapeWording = (numEtape, niveau) => {
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

    if (numEtape === EtapeDossier.ZERO) {
        return "Attente de validation par l'admin";
    } else if (numEtape === EtapeDossier.UNE) {
        return "Attente de validation de dossier par l'admin";
    } else if (niveau === Types.Niveau.THESE) {
        return wordingThese[numEtape];
    } else if (niveau === Types.Niveau.MASTER) {
        return wordingMaster[numEtape];
    }
}



module.exports = { isNumeric, getActeur, getEtapeWording, removePassword };
