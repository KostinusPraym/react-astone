import { createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";

import { db } from "../../firebase.config";

const initialState = {
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.email = actions.payload.email;
    },

    removeUser(state) {
      state.email = null;
    },

    saveUser(_, actions) {
      set(ref(db, "user"), { email: actions.payload });
    },
  },
});

export const { setUser, removeUser, saveUser } = authSlice.actions;
export default authSlice.reducer;
