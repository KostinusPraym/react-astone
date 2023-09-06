import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
