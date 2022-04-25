import { createSlice } from "@reduxjs/toolkit";

export const filesUploadSlice=createSlice({
    name:"filesUpload",
    initialState:{
        memoire:[{name:"mémoire"}],
        rapportPresoutenance:[{name:"rapport présoutenance"}],
        droitsUniversitaires:[{name:"droits universitaires"}],
        attestationLicense:[{name:"attestion de license"}],
        releveM1:[{name:"relévé de notes M1"}]
    
    },
    reducers:{
        addMemoire:(state,action)=>{
            state.memoire=action.payload.memoire;
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
        }
    }
})

export const {addSubject}=filesUploadSlice.actions;
export const {addMemoire}=filesUploadSlice.actions;
export const {addRapportPresoutenance}=filesUploadSlice.actions;
export const {addDroitsUniversitaires}=filesUploadSlice.actions;
export const {addAttestationLicense}=filesUploadSlice.actions;
export const {addReleveM1}=filesUploadSlice.actions;


export default filesUploadSlice.reducer;