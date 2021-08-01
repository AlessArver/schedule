import React from "react";

import "./Todos.sass";
import Todo from "./Todo/Todo";
import * as t from "../../types/todo";
import TodoCreateReduxForm from "./TodoCreateForm/TodoCreateForm";
import Paginator from "../../components/Paginator/Paginator";

import { useTranslation } from "react-i18next";
import DocumentTitle from "react-document-title";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodoText } from "../../flux/reducers/todo";
import { RootState } from "../../flux";

const Todos = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const itemsIsLoading = useSelector(
    (state: RootState) => state.loader.itemsIsLoading
  );

  const onSubmit = (data: t.form) => {
    dispatch(addTodo(data.text));
  };
  const onDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };
  const onUpdateTodoText = (id: string, text: string) => {
    dispatch(updateTodoText(id, text));
  };
  const onPageChanged = () => {
    dispatch(onPageChanged());
  };

  // useEffect(() => {
  //   socket.on("add_todo", (data: TodoType) => {
  //     dispatch(addTodoSuccess(data._id, data.text, data.createdAt));
  //     return () => socket.off("add_todo");
  //   });
  // }, [todos]);

  let showTodos = todos.map((item) => (
    <Todo
      item={item}
      key={item._id}
      itemsIsLoading={itemsIsLoading}
      deleteTodo={onDeleteTodo}
      updateTodoText={onUpdateTodoText}
    />
  ));

  return (
    <DocumentTitle title="Todos">
      <div className="todos-wrapper">
        <Paginator onPageChanged={onPageChanged} />
        {!todos.length && <h2>{t("todo.no_todos")}</h2>}
        {showTodos}
        <TodoCreateReduxForm onSubmit={onSubmit} />
      </div>
    </DocumentTitle>
  );
};
export default Todos;
