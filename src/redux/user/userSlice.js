import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  header: false,
  snackBarMessageLogout: false,
  toDoListRefresh: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.header = true;
      state.snackBarMessageLogout = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.snackBarMessageLogout = true;
    },
  },
});

export const { signInSuccess, updateUserSuccess, deleteUserSuccess, signOut } =
  userSlice.actions;

export default userSlice.reducer;
