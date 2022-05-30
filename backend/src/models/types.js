/* Declaration des enums et autres */

// Noms des acteures et leur modele
const ACTEURS = Object.freeze({
    COORDONATEUR: 'Coordonateur',
    EXPERT: 'Expert',
    CONSEIL: 'Conseil',
    ADMIN: 'Admin',
    ETUDIANT: 'Etudiant',
    JURY: 'Jury',
    RECTORAT: 'Rectorat',
    DEPARTEMENT: 'Departement'
});


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
    SOUTENANCE_PROGRAMMEE: "Date de soutenance programmeé",
    AUTORISATION_SOUTENANCE: "Autorisation de soutenance",
    SOUTENANCE_NON_VALIDEE: "Soutenance non validé",
    THESE_REJETE: 'Thèse rejeté'
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
    // Autorisation de soutenance envoyee de l'admin au coordonateur 
    AUTORISATION_SOUTENANCE: "Autorisation de soutenance"

});


const AvisEmetteur = Object.freeze({
    COORDONATEUR: ACTEURS.COORDONATEUR,
    EXPERT: ACTEURS.EXPERT,
    JURY: ACTEURS.JURY,
    CONSEIL: ACTEURS.CONSEIL,
    DEPARTEMENT: ACTEURS.DEPARTEMENT
});


const AvisDestinataire = Object.freeze({
    ADMIN: ACTEURS.ADMIN,
    COORDONATEUR: ACTEURS.COORDONATEUR
 });


const CategorieFichierMaster = Object.freeze({
    CV: 'CV',
    MEMOIRE: 'Mémoire',
    ACTE_NAISSANCE: 'Acte de naissance',
    ATTEST_INSCRIP: "Attestation d'inscription",
    REL_NOTES_M1: 'Relevé de notes Master 1',
    REL_NOTES_M2: 'Relevé de notes Master 2',
    LISTE_SELECT: 'Liste de selection',
    FICHE_INSCRIP: "Fiche d'inscription",
    DROITS_UNIV: 'Droits universitaires',
    RAPPORT_PRESOUTIENT: 'Rapport pre soutenance',
    ATTEST_LIC: 'Attestation de license',
});

const CategorieFichierThese = Object.freeze({
    CV: 'CV',
    THESE: 'Thèse',
    RESUME_THESE: 'Resumé du thèse',
    MEMOIRE: 'Mémoire',
    ACTE_NAISSANCE: 'Acte de naissance',
    ATTEST_INSCRIP: "Attestation d'inscription",
    DECLAR_HONNEUR: "Déclaration d'honneur",
    DIPLOME_LIC: 'Diplome de license',
    DIPLOME_BAC: 'Diplome de baccalauréat',
    ATTEST_M2: 'Attestation Master 2',
    PREUVE_VALID: 'Preuve validation des unités',
    COUVERTURE: 'Couverture',
    ABSTRACT: 'Abstract',
    DEROGATION: 'Dérogation',
    RAPPORT_ENC: "Rapport de l'encadreur",
    LETTRE_ENC: "Lettre de l'encadreur",
    LETTRE_CHEF: 'Lettre du chef de departement',
    LISTE_SELECT: 'Liste de selection',
    FICHE_INSCRIP: "Fiche d'inscription",
});


const StatutDossier = Object.freeze({
    ATTENTE_VALIDATION: "En attente de validation",
    ACCEPTE_ADMIN: "Validé par l'admin",
    ACCEPTE_DEPARTEMENT: "Validé par le departement",
    REJETE_ADMIN: "Rejeté par l'admin",
    REJETE_DEPARTEMENT: "Rejeté par le departement" // Pour les etudiants de master
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
    LECTURE: 'Note de lecture',

});


module.exports = {
    Niveau, Sexe, TypeNotification, ActeurDossier, GerantEtapeDossier,
    EtapeDossier, GradeExpert, AvisEmetteur, CategorieNote, AvisDestinataire,
    StatutDossier, ModelNotif, Avis, TypeExpert, GradeJury, 
    CategorieFichierThese, CategorieFichierMaster, ACTEURS
}

