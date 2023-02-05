import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  isOpened: false,
};

export const navSlice = createSlice({
  name: "close",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.isOpened = action.payload;
    },
  },
});

export const { toggleSideBar } = navSlice.actions;

export default navSlice.reducer;
