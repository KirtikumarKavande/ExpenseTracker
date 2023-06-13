import { createSlice } from "@reduxjs/toolkit";
const tokenFromLocalStorage= localStorage.getItem('token')

const authIntialState = { token: !!tokenFromLocalStorage?tokenFromLocalStorage:''};
const authSLice = createSlice({
  name: "auth",
  initialState: authIntialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = "";
    },
  },
});
export const authActions = authSLice.actions;
export default authSLice.reducer;
