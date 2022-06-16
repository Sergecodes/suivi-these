import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    data:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    isRejected:false
};


// Edit password coordonateur
export const changeEmailCoordonateur = createAsyncThunk("coordonateur/editEmail",async(data ,{rejectWithValue})=>{
    try{
        console.log("je suis dans la fonction");

        const value =await axios.put(
            "/coordonateurs/change-password",{
                actualPass:data.actualPass, newPass:data.newPass
            }
        )
        console.log("je suis dans la fonction");
        // alert(JSON.stringify(value.data));
        console.log(JSON.stringify(value.data));
        return JSON.stringify(value.data);
    }catch(err){
        console.log(err);
        return rejectWithValue(err.response.data);

    }
})

 const  changeCoordonateurEmailSlice=createSlice({
    name:"changePasswordCoordonateur",
    initialState,
    reducers:{},
    extraReducer:(builder)=>{
        builder.addCase( changeEmailCoordonateur.pending, (state,action)=>{
            console.log("je suis dans le pending");
            state.isLoading = true;
        }).addCase(changeEmailCoordonateur.fulfilled,(state,action)=>{
state.isSuccess = true;
            state.message = action.payload;
            state.isLoading=false
            return state
        }
            
        ).addCase(changeEmailCoordonateur.rejected,(state,action)=>{
            state.isLoading = false;
            state.etudiant = null;
            state.isRejected = true;
    
            state.isError = true;
            state.message = action.payload;        })
    }
});

export default changeCoordonateurEmailSlice.reducer
