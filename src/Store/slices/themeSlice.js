import { createSlice } from "@reduxjs/toolkit";

// mysite/src/redux/themeSlice.js
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    pallet: {
      mode: "light",
      primary: {
        main: "#202122ff",
      },
      secondary: {
        main: "#424242",
      },
    },
  },
  reducers: {
    toggleTheme: (state) => {
      state.pallet.mode = state.pallet.mode === "light" ? "dark" : "light";
    },
  },
});
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
