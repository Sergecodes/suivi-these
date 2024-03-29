import { createSlice } from "@reduxjs/toolkit";


export const MasterFilesUploadSlice=createSlice({
    name:"masterFilesUpload",
    initialState:{
        memoire:{name:"aucun fichier selectionnés"},
        attestationInscription:{name:"aucun fichier selectionnés"},
        rapportPresoutenance:{name:"aucun fichier selectionnés"},
        droitsUniversitaires:{name:"aucun fichier selectionnés"},
        attestationLicense:{name:"aucun fichier selectionnés"},
        releveM1:{name:"aucun fichier selectionnés"},
        releveM2:{name:"aucun fichier selectionnés"},
        listeSelection:{name:"aucun fichier selectionnés"},
        ficheInscription:{name:"aucun fichier selectionnés"},
        acteDeNaissance:{name:"aucun fichier selectionnés"},
        cv:{name:"aucun fichier selectionnés"}
    },
    reducers:{
        addMemoire:(state,action)=>{
            state.memoire=action.payload.memoire;
        },
        addAttestationInscription:(state,action)=>{
            state.attestationInscription=action.payload.attestationInscription;
        },
        addRapportPresoutenance:(state,action)=>{
            state.rapportPresoutenance=action.payload.rapportPresoutenance;
        },
        addDroitsUniversitaires:(state,action)=>{
            state.droitsUniversitaires=action.payload.droitsUniversitaires;
        },
        addAttestationLicense:(state,action)=>{
            state.attestationLicense=action.payload.attestationLicense;
        },
        addReleveM1:(state,action)=>{
            state.releveM1=action.payload.releveM1;
        },
        addReleveM2:(state,action)=>{
            state.releveM2=action.payload.releveM2;
        },
        addListeSelection:(state,action)=>{
            state.listeSelection=action.payload.listeSelection;
        },
        addFicheInscription:(state,action)=>{
            state.ficheInscription=action.payload.ficheInscription;
        },
        addActeDeNaissance:(state,action)=>{
            state.acteDeNaissance=action.payload.acteDeNaissance;
        },
        addCv:(state,action)=>{
            state.cv=action.payload.cv;
        }
    }
})

export const {addMemoire}=MasterFilesUploadSlice.actions;//
export const {addAttestationInscription}=MasterFilesUploadSlice.actions;//
export const {addRapportPresoutenance}=MasterFilesUploadSlice.actions;//
export const {addDroitsUniversitaires}=MasterFilesUploadSlice.actions;//
export const {addAttestationLicense}=MasterFilesUploadSlice.actions;//
export const {addReleveM1}=MasterFilesUploadSlice.actions;
export const {addReleveM2}=MasterFilesUploadSlice.actions;
export const {addListeSelection}=MasterFilesUploadSlice.actions;
export const {addFicheInscription}=MasterFilesUploadSlice.actions;
export const {addActeDeNaissance}=MasterFilesUploadSlice.actions;
export const {addCv}=MasterFilesUploadSlice.actions;






export default MasterFilesUploadSlice.reducer;