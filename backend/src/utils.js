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
        [EtapeDossier.DEUX_MASTER]: 'CRFD-STG',
        [EtapeDossier.TROIS_MASTER]: ActeurDossier.DEPARTEMENT,
        [EtapeDossier.QUATRE_MASTER]: ActeurDossier.JURY,
        [EtapeDossier.CINQ_MASTER]: 'CRFD-STG',
        [EtapeDossier.SIX_MASTER]: ActeurDossier.COORDONATEUR,
        [EtapeDossier.SEPT_MASTER]: ActeurDossier.COORDONATEUR,

    };
    const acteurThese = {
        [EtapeDossier.UNE]: ActeurDossier.ETUDIANT,
        [EtapeDossier.DEUX_THESE]: 'CRFD-STG',
        [EtapeDossier.TROIS_THESE]: ActeurDossier.COORDONATEUR,
        [EtapeDossier.QUATRE_THESE]: 'CRFD-STG',
        [EtapeDossier.CINQ_THESE]: ActeurDossier.EXPERT,
        [EtapeDossier.SIX_THESE]: 'CRFD-STG',
        [EtapeDossier.SEPT_THESE]: ActeurDossier.CONSEIL,
        [EtapeDossier.HUIT_THESE]: 'CRFD-STG',
        [EtapeDossier.NEUF_THESE]: ActeurDossier.RECTORAT,
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
        [EtapeDossier.DEUX_MASTER]: 'Vérification du dossier', // departement
        [EtapeDossier.TROIS_MASTER]: 'Verification jury', // admin
        [EtapeDossier.QUATRE_MASTER]: 'Notation du dossier', // jury
        [EtapeDossier.CINQ_MASTER]: 'Evaluation de la notation', // admin
        [EtapeDossier.SIX_MASTER]: 'Vérification du rapport du CRFD', // coordonateur
        [EtapeDossier.SEPT_MASTER]: 'Programmation de la date de soutenance' // coordonateur
    };
    const wordingThese = {
        [EtapeDossier.DEUX_THESE]: 'Vérification du dossier', // admin
        [EtapeDossier.TROIS_THESE]: 'Validation dossier', // coordo
        [EtapeDossier.QUATRE_THESE]: 'Evaluation décision coordonateur', // admin
        [EtapeDossier.CINQ_THESE]: 'Notation du dossier', // expert
        [EtapeDossier.SIX_THESE]: 'Evaluation de la notation', // admin
        [EtapeDossier.SEPT_THESE]: 'Appreciation du dossier par conseil ', // conseil
        [EtapeDossier.HUIT_THESE]: 'Evaluation appréciation dossier',// admin
        [EtapeDossier.NEUF_THESE]: 'Programmation date de soutenance',// rectorat

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

