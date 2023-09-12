import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const authSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, actions) {
      state.items = actions.payload;
    },
  },
});

export const { setItems } = authSlice.actions;
export default authSlice.reducer;
