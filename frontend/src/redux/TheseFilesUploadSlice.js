import { createSlice } from "@reduxjs/toolkit";

export const TheseFilesUploadSlice=createSlice({
    name:"theseFilesUpload",
    initialState:{
        declarationHonneur:{name:"aucun fichier selectionnés"},
        diplomeLicense:{name:"aucun fichier selectionnés"},
        diplomeBaccalaureat:{name:"aucun fichier selectionnés"},
        attestationM2:{name:"aucun fichier selectionnés"},
        listeSelection:{name:"aucun fichier selectionnés"},
        preuveValidation:{name:"aucun fichier selectionnés"},
        ficheInscription:{name:"aucun fichier selectionnés"},
        rapportEncadreur:{name:"aucun fichier selectionnés"},
        lettreEncadreur:{name:"aucun fichier selectionnés"},
        lettreChefDepartement:{name:"aucun fichier selectionnés"},
        these:{name:"aucun fichier selectionnés"},
        couverture:{name:"aucun fichier selectionnés"},
        resume:{name:"aucun fichier selectionnés"},
        abstract:{name:"aucun fichier selectionnés"},
        acteDeNaissance:{name:"aucun fichier selectionnés"},
        cv:{name:"aucun fichier selectionnés"},
        derogation:{name:"aucun fichier selectionnés"},
        attestationInscription:{name:"aucun fichier selectionnés"},

    },
    reducers:{
        addDeclarationHonneur:(state,action)=>{
            state.declarationHonneur=action.payload.declarationHonneur;
        },
        addDiplomeLicense:(state,action)=>{
            state.diplomeLicense=action.payload.diplomeLicense;
        },
        addDiplomeBaccalaureat:(state,action)=>{
            state.diplomeBaccalaureat=action.payload.diplomeBaccalaureat;
        },
        addAttestationM2:(state,action)=>{
            state.attestationM2=action.payload.attestationM2;
        },
        addListeSelectionThese:(state,action)=>{
            state.listeSelection=action.payload.listeSelection;
        },
        addPreuveValidation:(state,action)=>{
            state.preuveValidation=action.payload.preuveValidation;
        },
        addFicheInscriptionThese:(state,action)=>{
            state.ficheInscription=action.payload.ficheInscription;
        },
        addRapportEncadreur:(state,action)=>{
            state.rapportEncadreur=action.payload.rapportEncadreur;
        },
        addLettreEncadreur:(state,action)=>{
            state.lettreEncadreur=action.payload.lettreEncadreur;
        },
        addLettreChefDepartement:(state,action)=>{
            state.lettreChefDepartement=action.payload.lettreChefDepartement;
        },
        addThese:(state,action)=>{
            state.these=action.payload.these;
        },
        addCouverture:(state,action)=>{
            state.couverture=action.payload.couverture;
        },
        addResume:(state,action)=>{
            state.resume=action.payload.resume;
        },
        addAbstract:(state,action)=>{
            state.abstract=action.payload.abstract;
        },
        addActeDeNaissanceThese:(state,action)=>{
            state.acteDeNaissance=action.payload.acteDeNaissance;
        },
        addCvThese:(state,action)=>{
            state.cv=action.payload.cv;
        },
        addDerogation:(state,action)=>{
            state.derogation=action.payload.derogation;
        },
        addAttestationInscriptionThese:(state,action)=>{
            state.attestationInscription=action.payload.attestationInscription;
        },
      
      
    }
})

export const {addDeclarationHonneur}=TheseFilesUploadSlice.actions;
export const {addDiplomeLicense}=TheseFilesUploadSlice.actions;
export const {addDiplomeBaccalaureat}=TheseFilesUploadSlice.actions;
export const {addAttestationM2}=TheseFilesUploadSlice.actions;
export const {addListeSelectionThese}=TheseFilesUploadSlice.actions;
export const {addPreuveValidation}=TheseFilesUploadSlice.actions;
export const {addFicheInscriptionThese}=TheseFilesUploadSlice.actions;
export const {addRapportEncadreur}=TheseFilesUploadSlice.actions;
export const {addLettreEncadreur}=TheseFilesUploadSlice.actions;
export const {addLettreChefDepartement}=TheseFilesUploadSlice.actions;

export const {addThese}=TheseFilesUploadSlice.actions;
export const {addCouverture}=TheseFilesUploadSlice.actions;
export const {addResume}=TheseFilesUploadSlice.actions;
export const {addAbstract}=TheseFilesUploadSlice.actions;
export const {addActeDeNaissanceThese}=TheseFilesUploadSlice.actions;
export const {addCvThese}=TheseFilesUploadSlice.actions;
export const {addDerogation}=TheseFilesUploadSlice.actions;
export const {addAttestationInscriptionThese}=TheseFilesUploadSlice.actions;







export default TheseFilesUploadSlice.reducer;