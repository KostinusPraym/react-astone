import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "LOADING",
  email: null,
  uid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.email = actions.payload.email;
      state.uid = actions.payload.uid;
      state.status = "SUCCESS";
    },
    userNotFound(state) {
      state.email = null;
      state.uid = "";
      state.status = "SUCCESS";
    },
  },
});

export const { setUser, userNotFound} = authSlice.actions;
export default authSlice.reducer;
