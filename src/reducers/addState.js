import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  actionDelegation: 0,
  actionEmployee: 0,
  actionSeguradora: 0,
  actionApolice: 0,
  actionSeguro: 0,
  actionPedido: 0,
};

export const addState = createSlice({
  name: "action",
  initialState,
  reducers: {
    stateAddDele: (state) => {
      state.actionDelegation += 1;
    },
    stateAddEmployee: (state) => {
      state.actionEmployee += 1;
    },
    stateAddSeguradora: (state) => {
      state.actionSeguradora += 1;
    },
    stateAddApolice: (state) => {
      state.actionApolice += 1;
    },
    stateAddSeguro: (state) => {
      state.actionSeguro += 1;
    },
    stateAcceptPedido: (state) => {
      state.actionPedido += 1;
    },
  },
});

export const {
  stateAddDele,
  stateAddEmployee,
  stateAddSeguradora,
  stateAddApolice,
  stateAddSeguro,
  stateAcceptPedido,
} = addState.actions;

export default addState.reducer;
