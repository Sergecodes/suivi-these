import { createSlice } from "@reduxjs/toolkit";


export const DataStorageSlice=createSlice({
    name:"dataStorage",
    initialState:{
        jury:[]
    },
    reducers:{
        addJury:(state,action)=>{
            state.jury=action.payload.jury
        }
    }
})
export const {addJury} = DataStorageSlice.actions;

export default DataStorageSlice.reducer;