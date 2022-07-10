export const JuryData = {
    id: 21221155,
    matricule: "17T2345",
    nom: "NCHOUWET MFOUAPON",
    prenom: "Kuntz Stephane",
    email: "stephane@gmail.com",
    numTelephone: "+237 655 55 55 55",
    sexe: "M",
    urlPhotoProfil: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6n_sDg2-zfzhaGPyi4aXh8TVGfEBj6cLJwQ&usqp=CAU",
}

export const TypeNotification = Object.freeze({
    RAPPEL: "Rappel",
    // Message d'un acteur a un autre (eg. admin a jury)
    MESSAGE: "Message", 
    NOUVEAU_ETUDIANT: "Nouveau étudiant",
    NOUVEL_AVIS: 'Nouvel avis dossier',
    DOSSIER_ENVOYE: "Dossier de l'étudiant envoyé",
    DOSSIER_VALIDE: "Dossier de l'étudiant validé",
    DOSSIER_REJETE: "Dossier de l'étudiant rejeté",
    COMPTE_REJETE: "Compte de l'étudiant rejeté",
    COMPTE_VALIDE: "Compte de l'étudiant validé",
    NOTE_JURY: "Nouvelle note de jury",
    SOUTENANCE_PROGRAMMEE: "Date de soutenance programmeé",
    AUTORISATION_SOUTENANCE: "Autorisation de soutenance",
    SOUTENANCE_NON_VALIDEE: "Soutenance non validée",
    THESE_REJETE: 'Thèse rejeté'
});

export const RectoratData = {
    id: 21221155,
    matricule: "17T2345",
    nom: "NCHOUWET MFOUAPON",
    prenom: "Kuntz Stephane",
    email: "stephane@gmail.com",
    numTelephone: "+237 655 55 55 55",
    sexe: "M",
    urlPhotoProfil: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6n_sDg2-zfzhaGPyi4aXh8TVGfEBj6cLJwQ&usqp=CAU",
}

export const ACTEURS = Object.freeze({
    COORDONATEUR: 'Coordonateur',
    EXPERT: 'Expert',
    CONSEIL: 'Conseil',
    ADMIN: 'Admin',
    ETUDIANT: 'Etudiant',
    JURY: 'Jury',
    RECTORAT: 'Rectorat',
    DECANAT: 'Decanat',
    DEPARTEMENT: 'Departement'
});


export const criteres = [
    {
        id: 1,
        nom: "Respect des normes de presentation d'un memoire de master (4points)",
        note: 0,
        max: "4"
    },
    {
        id: 2,
        nom: "Langue, style, fautes d'ortographe et de grammaire, qualité typographique, richesse de la bibliographie et utilisatioin des références récentes (6points)",
        note: 0,
        max: "6"
    },
    {
        id: 3,
        nom: "Cohérence dans la structuration du memoire et fluidité dans la lecture (6points)",
        note: 0,
        max: "6"
    },
    {
        id: 4,
        nom: "Qualité de la reliure et du document final (4points)",
        note: 0,
        max: "4"
    },
    {
        id: 5,
        nom: "Clarté et pertinence de la problématique (10points)",
        note: 0,
        max: "10"
    },
    {
        id: 6,
        nom: "Clarté dans la redaction (10points)",
        note: 0,
        max: "10"
    },
    {
        id: 7,
        nom: "Validité des résultats présentés (10points)",
        note: 0,
        max: "10"
    },
]

export const CategorieFichierMaster = Object.freeze({
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
    ATTEST_LIC: 'Attestation de licence',
});

export const CategorieFichierThese = Object.freeze({
    THESE: 'Thèse',
    CV: 'CV',
    RESUME_THESE: 'Resumé du thèse',
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
