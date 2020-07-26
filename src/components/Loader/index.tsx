import React from "react";
import classNames from "classnames";
import styles from "./styles.scss";

const cssModule = classNames.bind(styles);

export const Loader = (): JSX.Element => {
  return (
    <div className={cssModule("Loader")}>
      <div className={cssModule("Loader__spinner")} />
    </div>
  );
};
