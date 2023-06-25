const { createSlice } = require("@reduxjs/toolkit");

const toggleSlice = createSlice({
  name: "toggle",
  initialState: { menu: false },
  reducers: {
    toggleMenu(state,action) {
      state.menu = action.payload;
    },
  },
});

export const toggleAction = toggleSlice.actions.toggleMenu;
export default toggleSlice.reducer;
