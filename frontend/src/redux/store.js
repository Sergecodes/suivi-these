import { configureStore } from "@reduxjs/toolkit";
import filesUploadReducer from "./filesUploadSlice"

export default  configureStore({
    reducer:{
        filesUpload:filesUploadReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
		serializableCheck:false,
	})
})