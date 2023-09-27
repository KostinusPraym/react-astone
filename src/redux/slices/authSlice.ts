import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface authSliceState {
  statusAuth: "LOADING" | "SUCCESS";
  email: null | string;
  uid: string;
}

const initialState: authSliceState = {
  statusAuth: "LOADING",
  email: null,
  uid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, actions: PayloadAction<{ email: string | null; uid: string }>) {
      state.email = actions.payload.email;
      state.uid = actions.payload.uid;
      state.statusAuth = "SUCCESS";
    },
    userNotFound(state) {
      state.email = null;
      state.uid = "";
      state.statusAuth = "SUCCESS";
    },
  },
});

export const { setUser, userNotFound } = authSlice.actions;
export default authSlice.reducer;
