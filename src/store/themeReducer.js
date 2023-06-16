import { createSlice } from "@reduxjs/toolkit";

const intialTheme = { darkTheme: false };
const themeSlice=createSlice({
  name: "theme",
  initialState: intialTheme,
  reducers: {
    themeChange(state) {state.darkTheme=!state.darkTheme},
  },
});
 
export const themeAction= themeSlice.actions
export default themeSlice.reducer