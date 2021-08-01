import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import s from "./MainLayout.module.sass";
import { Footer, NavBar, Toast } from "../../components";
import { RootState } from "../../flux";
import { GlobalStyles } from "../../global";

type Props = {
  children: React.ReactNode;
};
export const MainLayout: React.FC<Props> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.app.theme);

  return (
    <ThemeProvider theme={{ theme: { main: theme } }}>
      <GlobalStyles />
      <div className={s.wrapper}>
        <NavBar />
        <div className="container">{children}</div>
        <Toast />
        <Footer />
      </div>
    </ThemeProvider>
  );
};
