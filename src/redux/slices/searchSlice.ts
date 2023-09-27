import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, actions) {
      state.search = actions.payload.searchValue;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
