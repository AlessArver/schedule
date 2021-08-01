import React, { FC, useState } from "react";
import DocumentTitle from "react-document-title";
import { useTranslation } from "react-i18next";

import "./Settings.sass";
import { Button, Card } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../flux";
import { toggleTheme } from "../../flux/reducers/app";

const Settings = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const themeName = useSelector((state: RootState) => state.app.theme);

  const [theme, setTheme] = useState(themeName === "light" ? true : false);
  const [editName, setEditName] = useState(false);
  const [editSurname, setEditSurname] = useState(false);
  const [editEmail, setEditEmail] = useState(false);

  const nameActivateEdit = () => setEditName(true);
  const surnameActivateEdit = () => setEditSurname(true);
  const emailActivateEdit = () => setEditEmail(true);

  const onToggleTheme = () => {
    dispatch(toggleTheme(theme));
  };

  return (
    <DocumentTitle title="Settings">
      <div className="settings-wrapper">
        <Card>
          <div className="card-body">
            <div className="mb-2">
              <b>{t("settings.name")}:</b> {user?.name}
            </div>
            <div className="mb-2">
              <b>{t("settings.surname")}:</b> {user?.surname}
            </div>
            <div className="mb-2">
              <b>{t("settings.email")}:</b> {user?.email}
            </div>
            <div className="mb-2 d-flex justify-content-between">
              <b>{t("settings.theme")}:</b>
              <Button onClick={onToggleTheme}>{themeName}</Button>
            </div>
          </div>
        </Card>
      </div>
    </DocumentTitle>
  );
};
export default Settings;
