/** Les fonctions d'utilite */
const { Types } = require('./constants');


exports.sum = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

exports.isNumeric = val => !isNaN(val);

/**
 * Remove `motDePasse` key from object
 * @param {dict} obj 
 */
exports.removePassword = obj => {
    if ('motDePasse' in obj) 
        delete obj.motDePasse;

    return obj;
}

exports.getActeur = (numEtape, niveau) => {
    const { EtapeDossier, ActeurDossier } = Types;
    const acteurMaster = {
        [EtapeDossier.UNE]: ActeurDossier.ETUDIANT,
        [EtapeDossier.DEUX_MASTER]: ActeurDossier.DEPARTEMENT,
        [EtapeDossier.TROIS_MASTER]: ActeurDossier.JURY,
        [EtapeDossier.QUATRE_MASTER]: 'CRFD-STG',
        [EtapeDossier.CINQ_MASTER]: ActeurDossier.COORDONATEUR,
        [EtapeDossier.SIX_MASTER] : ActeurDossier.COORDONATEUR
    };
    const acteurThese = {
        [EtapeDossier.UNE]: '',
        [EtapeDossier.DEUX_THESE]: '',
        [EtapeDossier.TROIS_THESE]: '',
        [EtapeDossier.QUATRE_THESE]: '',
        [EtapeDossier.CINQ_THESE]: '',
        [EtapeDossier.SIX_THESE] : ''
    };

    if (numEtape === EtapeDossier.ZERO) {
        return ActeurDossier.ADMIN;
    } else if (niveau === Types.Niveau.THESE) {
        return acteurThese[numEtape];
    } else if (niveau === Types.Niveau.MASTER) {
        return acteurMaster[numEtape];
    }
}

exports.getEtapeWording = (numEtape, niveau) => {
    const EtapeDossier = Types.EtapeDossier;
    const wordingMaster = {
        [EtapeDossier.DEUX_MASTER]: 'Vérification du dossier',
        [EtapeDossier.TROIS_MASTER]: 'Notation du dossier',
        [EtapeDossier.QUATRE_MASTER]: 'Evaluation de la notation',
        [EtapeDossier.CINQ_MASTER]: 'Vérification du rapport du CRFD',
        [EtapeDossier.SIX_MASTER] : 'Programmation de la date de soutenance'
    };
    const wordingThese = {
        [EtapeDossier.DEUX_THESE]: '',
        [EtapeDossier.TROIS_THESE]: '',
        [EtapeDossier.QUATRE_THESE]: '',
        [EtapeDossier.CINQ_THESE]: '',
        [EtapeDossier.SIX_THESE] : ''
    };

    if (numEtape === EtapeDossier.ZERO) {
        return "Creation et validation de compte";
    } else if (numEtape === EtapeDossier.UNE) {
        return "Envoi du dossier de soutenance";
    } else if (niveau === Types.Niveau.THESE) {
        return wordingThese[numEtape];
    } else if (niveau === Types.Niveau.MASTER) {
        return wordingMaster[numEtape];
    }
}

