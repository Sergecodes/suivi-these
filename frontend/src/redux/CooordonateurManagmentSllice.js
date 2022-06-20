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

// get Notification of coordonateur
export const  getNotifications=createAsyncThunk(
    "coordonateur/getNotifications",
    async ({rejectWithValue})=>{
        try{
            console.log("je suis dans la fonction getNotification");
            const value =await axios.get("/coordonateurs/notifications")
            localStorage.setItem("notificationsCoordonateur", JSON.stringify(value.data));
            console.log(`les datas des notification sont ${value}`);
            return JSON.stringify(value.notifs);

        }catch(err){
            console.log(`l'erreur icic est ${err.response.data}`);
            return rejectWithValue(err.response.data);

        }
    }
);


export const getNotificationSlice=createSlice({
    name:"notificationCoordonateur",
    initialState,
    reducer:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getNotifications.pending,(state,action)=>{
            console.log("je suis dans le pennding");
            state.isLoading=true
        }).addCase(getNotifications.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.data = action.payload;
            state.isLoading = false;
    
            console.log("je suis dans le isloading");
    
            state.isRejected = true;
            // state.message = action.payload.data.message;
            return state;
        }).addCase(getNotifications.rejected,(state,action)=>{
            state.isLoading = false;
            state.etudiant = null;
            state.isRejected = true;
    
            state.isError = true;
            state.message = action.payload;
    
        });
    }
})


export default getNotificationSlice.reducer
