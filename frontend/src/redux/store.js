import { configureStore } from "@reduxjs/toolkit";
import MasterFilesUploadSlice from "./MasterFilesUploadSlice";
import TheseFilesUploadSlice from "./TheseFilesUploadSlice";
import DashboardDisplaySlice from "./DashboardDisplaySlice";

export default  configureStore({
    reducer:{
        masterFilesUpload:MasterFilesUploadSlice,
        theseFilesUpload:TheseFilesUploadSlice,
        dashboardDisplay:DashboardDisplaySlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
		serializableCheck:false,
	})
})