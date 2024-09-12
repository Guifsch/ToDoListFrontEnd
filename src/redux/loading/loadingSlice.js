import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({

  name: "loading",
  initialState,
  reducers: {
    loadingTrue: (state) => {
      state.loading = true;
    },
    loadingFalse: (state) => {
      state.loading = false;
    },
  },
});

export const { loadingTrue, loadingFalse } = loadingSlice.actions;

export default loadingSlice.reducer;
