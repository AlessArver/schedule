import React, { FC, Suspense, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import "./App.css";
import store, { RootState } from "./flux";
import { initializeApp } from "./flux/reducers/app";
import { Preloader } from "./components";
import { AuthContainer } from "./containers";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import { Todos, Settings } from "./pages";

const App = () => {
  const dispatch = useDispatch();

  const initialized = useSelector((state: RootState) => state.app.initialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [initialized, dispatch]);

  if (initialized)
    return (
      <MainLayout>
        <Suspense fallback={<Preloader />}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/todos" />} />
            <Route path="/todos" component={Todos} />
            <Route path="/settings" component={Settings} />
            <Route path="*" component={Settings} />
            <AuthContainer />
          </Switch>
        </Suspense>
      </MainLayout>
    );
  else return <Preloader />;
};

const MainApp: FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default MainApp;
