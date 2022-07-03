import { createSlice } from "@reduxjs/toolkit";

export const DataStorageSlice = createSlice({
  name: "dataStorage",
  initialState: {
    juries: [],
    unselectedJuries: [],
    masterSubject:""
  },
  reducers: {
    addJury: (state, action) => {
      state.juries = action.payload.juries;
      state.unselectedJuries = action.payload.unselectedJuries;
    },
    addMasterSubject: (state,action) => {
      state.masterSubject = action.payload.subject
    }
  },
});
export const { addJury } = DataStorageSlice.actions;
export const { addMasterSubject } = DataStorageSlice.actions;

export default DataStorageSlice.reducer;
