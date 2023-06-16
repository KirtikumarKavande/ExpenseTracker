import { createSlice } from "@reduxjs/toolkit";

const editData = {};
const editDataSlice = createSlice({
  name: "edit",
  initialState: editData,
  reducers: {
    getEditData(state, action) {
      state.editData = action.payload;
    },
  },
});

export const { getEditData } = editDataSlice.actions;
export default editDataSlice.reducer;
