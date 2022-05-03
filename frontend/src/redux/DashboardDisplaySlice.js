import {createSlice} from "@reduxjs/toolkit";

export const DashboardDisplaySlice = createSlice({
    name:"dashboardDisplay",
    initialState:{
        clicked:false,
    },
    reducers:{
        setClicked(state,action){
            state.clicked=!state.clicked;
        }
    }
})

export const {setClicked}=DashboardDisplaySlice.actions;

export default DashboardDisplaySlice.reducer;
