import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using that type
const initialState = {
  user: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action) => {
      state.user = action.payload;
    },
    remove: (state, action) => {
      state.user = [];
    },
  },
});

export const { add, remove } = userSlice.actions;

export default userSlice.reducer;
