/* Declaration des enums et autres */

// Noms des acteures et leur modele
const ACTEURS = {
    COORDONATEUR: 'Coordonateur',
    EXPERT: 'Expert',
    CONSEIL: 'Conseil',
    ADMIN: 'Admin',
    ETUDIANT: 'Etudiant',
    JURY: 'Jury',
    RECTORAT: 'Rectorat',
    DEPARTEMENT: 'Departement'
}


const Niveau = Object.freeze({
    MASTER: "MASTER 2",
    THESE: "DOCTORAT",
});


const Sexe = Object.freeze({
    MALE: "Mâle",
    FEMELLE: "Femelle"
});


const TypeNotification = Object.freeze({
    RAPPEL: "Rappel",
    NOUVEAU_ETUDIANT: "Nouveau étudiant",
    NOUVEL_AVIS: 'Nouvel avis dossier',
    DOSSIER_REJETE: "Dossier de l'étudiant rejeté",
    COMPTE_REJETE: "Compte de l'étudiant rejeté",
    NOTE_JURY: "Nouvelle note de jury",
    AUTORISATION_SOUTENANCE: "Autorisation de soutenance d'un étudiant du Master 2"
});


const ModelNotif = Object.freeze({
    ...ACTEURS,
    AVIS: 'Avis',
    DOSSIER: 'Dossier',
    NOTE_DOSSIER: 'NoteDossier'
});


const Avis = Object.freeze({
    POSITIF: 'Positif',
    NEGATIF: 'Négatif',
    SOUTENANCE_FAVORABLE: "Soutenance favorable",
    FAVORABLE_SOUS_RESERVE: "Soutenance favorable sous reserve",
    DEFAVORABLE: "Défavorable",

});


const AvisEmetteur = Object.freeze({
    COORDONATEUR: ACTEURS.COORDONATEUR,
    EXPERT: ACTEURS.EXPERT,
    JURY: ACTEURS.JURY,
    CONSEIL: ACTEURS.CONSEIL,
    DEPARTEMENT: ACTEURS.DEPARTEMENT
});


const AvisDestinataire = Object.freeze({
    ADMIN: ACTEURS.ADMIN
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
    COORDONATEUR: ACTEURS.COORDONATEUR,
    EXPERT: ACTEURS.EXPERT,
    JURY: ACTEURS.JURY,
    ADMIN: ACTEURS.ADMIN,
    DEPARTEMENT: ACTEURS.DEPARTEMENT
});


const ActeurDossier = Object.freeze({
    ...ACTEURS
});

const CategorieNote = Object.freeze({
    
});


module.exports = {
    Niveau, Sexe, TypeNotification, ActeurDossier, GerantEtapeDossier,
    EtapeDossier, GradeExpert, CategorieFichier, AvisEmetteur, CategorieNote,
    StatutDossier, ModelNotif, Avis, TypeExpert, GradeJury, AvisDestinataire
}

