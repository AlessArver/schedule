import React, { FC } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";

import "./Toast.sass";
import { RootState } from "../../flux";

const Toast = () => {
  const isToast = useSelector((state: RootState) => state.toast.isToast);
  const toastType = useSelector((state: RootState) => state.toast.toastType);
  const text = useSelector((state: RootState) => state.toast.text);

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={classNames(
        "toast",
        { show: isToast, hide: !isToast },
        toastType
      )}
    >
      <div className="toast-body">{text}</div>
    </div>
  );
};
export default Toast;
