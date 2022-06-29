import {createSlice} from "@reduxjs/toolkit";

export const DashboardDisplaySlice = createSlice({
    name:"dashboardDisplay",
    initialState:{
        clicked:false,
        adminClicked:false,
        coordoClicked:false,
        rejectModal:false
    },
    reducers:{
        setClicked(state,action){
            state.clicked=!state.clicked;
        },
        setAdminClicked(state,action){
            state.adminClicked = !state.adminClicked;
        },
        setCoordoClicked(state,action){
            state.coordoClicked = !state.coordoClicked;
        },
        setRejectModal(state,action){
            state.rejectModal = !state.rejectModal
        }
    }
})

export const {setClicked}=DashboardDisplaySlice.actions;
export const {setAdminClicked}=DashboardDisplaySlice.actions;
export const {setCoordoClicked}=DashboardDisplaySlice.actions;
export const {setRejectModal}=DashboardDisplaySlice.actions;


export default DashboardDisplaySlice.reducer;
