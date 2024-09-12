import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todolist: false,
};

const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    todolistTrue: (state) => {
      state.todolist = true;
    },
    todolistFalse: (state) => {
      state.todolist = false;
    },
  },
});

export const { todolistTrue, todolistFalse } = todolistSlice.actions;

export default todolistSlice.reducer;
