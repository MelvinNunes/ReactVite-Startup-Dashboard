import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import seguradoraReducer from "./reducers/seguradoraSlice";
import delegacaoReducer from "./reducers/delegacaoSlice";
import addState from "./reducers/addState";
import navReducer from "./reducers/navSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    seguradora: seguradoraReducer,
    delegacao: delegacaoReducer,
    addState: addState,
    navbar: navReducer,
  },
});
