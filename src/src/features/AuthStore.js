import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth";

export const Authstore = configureStore({
  reducer: {
    Auth: Auth,
  },
});
