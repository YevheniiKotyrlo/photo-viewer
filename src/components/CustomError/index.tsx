import React from "react";
import classNames from "classnames";
import styles from "./styles.scss";

const cssModule = classNames.bind(styles);

interface ErrorProps {
  errorMessage: string;
}

export const CustomError = ({ errorMessage }: ErrorProps): JSX.Element => {
  return (
    <div className={cssModule("CustomError")}>
      <p className={cssModule("CustomError__message")}>{errorMessage}</p>
    </div>
  );
};
