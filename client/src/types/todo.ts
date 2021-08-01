import { TodoType, UpdateItemBase } from "./index";

interface Props {
  itemsIsLoading: Array<string>;
  deleteTodo: (_id: string) => void;
  updateTodoText: (_id: string, text: string) => void;
}

export interface TodosProps extends Props {
  todos: Array<TodoType>;
  onPageChanged: (currentPage: Date) => void;
  addTodo: (text: string) => void;
  addTodoSuccess: (_id: string, text: string, createdAt: Date) => void;
  updateTodoTextSuccess: (_id: string, text: string) => void;
}

export interface TodoProps extends Props {
  todo: TodoType;
  updateTodoTextSuccess: (_id: string, text: string) => void;
}

export type mapStateToProps = {
  todos: Array<TodoType>;
  isLoading: boolean;
  itemsIsLoading: Array<string>;
};
export type mapDispatchToProps = {
  requestTodos: (page: any) => void;
  addTodo: (text: string) => void;
  deleteTodo: (_id: string) => void;
  updateTodoText: (_id: string, text: string) => void;
  addTodoSuccess: (_id: string, text: string, createdAt: Date) => void;
  updateTodoTextSuccess: (_id: string, text: string) => void;
};
export type storeProps = mapStateToProps & mapDispatchToProps;

export interface form extends UpdateItemBase {
  text: string;
}

export type formKeys = Extract<keyof form, string>;
