/* Declaration des enums et autres */

const ACTEURS = {
    COORDONATEUR: 'Coordonateur',
    EXPERT: 'Expert',
    CONSEIL: 'Conseil',
    ADMIN: 'Admin',
    ETUDIANT: 'Etudiant',
    JURY: 'Jury',
    RECTORAT: 'Rectorat',
    Departement: 'Departement'
}


const Niveau = Object.freeze({
    MASTER: "MASTER 2",
    THESE: "DOCTORAT",
});


const Sexe = Object.freeze({
    MALE: "Mâle",
    FEMELLE: "Femelle"
});


const Notification = Object.freeze({
    RAPPEL: "Rappel",
    
});


// On utilise les noms des modeles correspondants  
const ActeurNotif = Object.freeze({
    ...ACTEURS
});


const Avis = Object.freeze({
    POSITIF: 'Positif',
    NEGATIF: 'Négatif',
    SOUTENANCE_FAVORABLE: "Soutenance favorable",
    FAVORABLE_SOUS_RESERVE: "Soutenance favorable sous reserve",
    DEFAVORABLE: "Défavorable",

});


const AvisEmetteur = Object.freeze({
   // On utilise les noms des modeles correspondants  
   COORDONATEUR: 'Coordonateur',
   EXPERT: 'Expert',
   CONSEIL: 'Conseil',

});


const CategorieFichier = Object.freeze({
    THESE: 'Thèse',
    RESUME_THESE: 'Resumé du thèse',
});


const StatutDossier = Object.freeze({
    ATTENTE_VALIDATION: "En attente de validation",
    ACCEPTE_ADMIN: "Validé par l'admin",
    REJETE_ADMIN: "Rejeté par l'admin"
});


const TypeExpert = Object.freeze({
    INTERNE: "Interne",
    EXTERNE: "Externe"
});


const GradeJury = Object.freeze({
    UN: 1,
    DEUX: 2,
    TROIS: 3
});


const GradeExpert = GradeJury;


const EtapeDossier = Object.freeze({
    UNE: 1,
    DEUX: 2,
    TROIS: 3,
    QUATRE: 4,
    CINQ: 5,
    SIX: 6
});


const GerantEtapeDossier = Object.freeze({
    // On utilise les noms des modeles correspondants  
    COORDONATEUR: 'Coordonateur',
    EXPERT: 'Expert',
    JURY: 'Jury',
    ADMIN: 'Admin',
    DEPARTEMENT: 'Departement'
});


// On utilise les noms des modeles correspondants  
const ActeurDossier = Object.freeze({
    ...ACTEURS
});


module.exports = {
    Niveau, Sexe, Notification, ActeurDossier, GerantEtapeDossier,
    EtapeDossier, GradeExpert, CategorieFichier, AvisEmetteur,
    StatutDossier, ActeurNotif, Avis, TypeExpert, GradeJury
}

