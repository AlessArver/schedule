import { RootState } from "../flux";

export const getTodos = (state: RootState) => state.todos.todos;

export const getCompletedInProgress = (state: RootState) =>
  state.todos.completedInProgress;
