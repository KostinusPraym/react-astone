import { createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";

import { db } from "../../firebase.config";

const initialState = {
  email: null,
};

const userSlice = createSlice({
  name: "name",
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

export const { setUser, removeUser, saveUser } = userSlice.actions;
export default userSlice.reducer;
