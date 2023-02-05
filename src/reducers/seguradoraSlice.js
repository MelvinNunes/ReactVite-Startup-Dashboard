import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  seguradora: [],
};

export const seguradoraSlice = createSlice({
  name: "seguradora",
  initialState,
  reducers: {
    addSeguradora: (state, action) => {
      state.seguradora = action.payload;
    },
    removeSeguradora: (state, action) => {
      state.seguradora = null;
    },
  },
});

export const { addSeguradora, removeSeguradora } = seguradoraSlice.actions;

export default seguradoraSlice.reducer;
