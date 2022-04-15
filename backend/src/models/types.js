/* Declaration des enums et autres */

export const Niveau = Object.freeze({
    MASTER: "MASTER 2",
    THESE: "DOCTORAT",
});


export const Sexe = Object.freeze({
    MALE: "Mâle",
    FEMELLE: "Femelle"
});


export const Notification = Object.freeze({
    RAPPEL: "Rappel",
    
});


export const Avis = Object.freeze({
    POSITIF: 'Positif',
    NEGATIF: 'Négatif',
    SOUTENANCE_FAVORABLE: "Soutenance favorable",
    FAVORABLE_SOUS_RESERVE: "Soutenance favorable sous reserve",
    DEFAVORABLE: "Défavorable",

});


export const AvisEmetteur = Object.freeze({
   // On utilise les noms des modeles correspondants  
   COORDONATEUR: 'Coordonateur',
   EXPERT: 'Expert',
   CONSEIL: 'Conseil',

});


export const CategorieFichier = Object.freeze({
    THESE: 'Thèse',
    RESUME_THESE: 'Resumé du thèse',
});


export const StatutDossier = Object.freeze({
    ATTENTE_VALIDATION: "En attente de validation",
    ACCEPTE_ADMIN: "Validé par l'admin",
    REJETE_ADMIN: "Rejeté par l'admin"
});


export const TypeExpert = Object.freeze({
    INTERNE: "Interne",
    EXTERNE: "Externe"
});


export const GradeJury = Object.freeze({
    UN: 1,
    DEUX: 2,
    TROIS: 3
});


export const GradeExpert = GradeJury;


export const EtapeDossier = Object.freeze({
    UNE: 1,
    DEUX: 2,
    TROIS: 3,
    QUATRE: 4,
    CINQ: 5,
    SIX: 6
});


export const GerantEtapeDossier = Object.freeze({
    // On utilise les noms des modeles correspondants  
    COORDONATEUR: 'Coordonateur',
    EXPERT: 'Expert',
    JURY: 'Jury',
    ADMIN: 'Admin',

});


