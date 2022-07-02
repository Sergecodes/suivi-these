import { createSlice } from "@reduxjs/toolkit";

export const DataStorageSlice = createSlice({
  name: "dataStorage",
  initialState: {
    juries: [],
    unselectedJuries: []
  },
  reducers: {
    addJury: (state, action) => {
      state.juries = action.payload.juries;
      state.unselectedJuries = action.payload.unselectedJuries;
    },
  },
});
export const { addJury } = DataStorageSlice.actions;

export default DataStorageSlice.reducer;
