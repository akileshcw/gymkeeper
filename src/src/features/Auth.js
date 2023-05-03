import { createSlice } from "@reduxjs/toolkit";
const Auth = createSlice({
  name: "Auth",
  initialState: {
    name: "shaggy",
    email: "sekar",
    role: "nothing",
    uuid: "agdfgsfh-asdgfdg-ufASdgh",
    organization: "war gym",
    isAuthenticate: true,
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.uuid = action.payload.uuid;
      state.organization = action.payload.organization;
      state.isAuthenticate = true;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.role = "";
      state.uuid = "";
      state.organization;
      state.isAuthenticate = false;
    },
  },
});

export const { login, logout } = Auth.actions;
export default Auth.reducer;
