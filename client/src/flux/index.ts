import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "redux-saga";

import todo from "./reducers/todo";
import authReducder from "./reducers/auth";
import loaderReducer from "./reducers/loader";
import toastReducer from "./reducers/toast";
import paginatorReducer from "./reducers/paginator";

import app from "./reducers/app";

const rootReducer = combineReducers({
  app: app,
  todos: todo,
  auth: authReducder,
  loader: loaderReducer,
  toast: toastReducer,
  paginator: paginatorReducer,
  form: formReducer,
});
type RootReducerType = typeof rootReducer;
export type RootState = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  RootState,
  unknown,
  A
>;

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);
// @ts-ignore
window._store = store;

export default store;
