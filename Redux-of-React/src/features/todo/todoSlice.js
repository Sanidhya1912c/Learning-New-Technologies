import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: nanoid(), text: "Go to work" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = { id: nanoid(), text: action.payload.text };

      return state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      const id = action.payload.id;

      return (state.todos = state.todos.filter((todo) => todo.id !== id));
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;

      const todoItem = state.todos.find((todo) => todo.id === id);

      const updateTodo = { ...todoItem, text: text };

      const newState = state.todos.filter((todo) => todo.id !== id);

      newState.push(updateTodo);

      return (state = newState);
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer;
