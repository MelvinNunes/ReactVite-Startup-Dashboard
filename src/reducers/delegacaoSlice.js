import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  delegacao: [],
};

export const delegacaoSlice = createSlice({
  name: "delegacao",
  initialState,
  reducers: {
    addDelegacao: (state, action) => {
      state.delegacao = action.payload;
    },
    removeDelegacao: (state, action) => {
      state.delegacao = null;
    },
  },
});

export const { addDelegacao, removeDelegacao } = delegacaoSlice.actions;

export default delegacaoSlice.reducer;
