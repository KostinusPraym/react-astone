import { createSlice } from "@reduxjs/toolkit";

import { logoutAction } from "../actions/authActions";

const initialState = {
  status: "LOADING",
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, actions) {
      state.email = actions.payload;
      state.status = "SUCCESS";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.email = null;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
