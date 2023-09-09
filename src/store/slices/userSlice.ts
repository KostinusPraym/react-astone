import { createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";

import { db } from "../../firebase.config";


const initialState = {
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.email = actions.payload.email;
      state.token = actions.payload.token;
      state.id = actions.payload.id;
    },

    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },

    saveUser(state, actions) {
      set(ref(db, "user"), { email: actions.payload });
    },
  },
});

export const { setUser, removeUser, saveUser } = userSlice.actions;
export default userSlice.reducer;
