import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, actions: PayloadAction<{ searchValue: string }>) {
      state.search = actions.payload.searchValue;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
