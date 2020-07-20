import React, { useCallback } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { PhotoGrid } from "../PhotoGrid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "redux/slices/authSlice";

const cssModule = classNames.bind(styles);

export const App = (): JSX.Element => {
  // const [apiKey, setApiKey] = useState<string>("23567b218376f79d9415");

  // @ts-ignore
  const token = useSelector(({ auth }) => auth.token, shallowEqual);
  // @ts-ignore
  const auth = useSelector(({ auth }) => auth.auth, shallowEqual);
  // @ts-ignore
  const error = useSelector(({ auth }) => auth.error, shallowEqual);
  const dispatch = useDispatch();
  const login = useCallback(() => dispatch(signIn()), [dispatch]);
  const logout = useCallback(() => dispatch(signOut()), [dispatch]);

  return (
    <div>
      <h1 className={cssModule("App__title")}>React Photo Viewer</h1>
      {token}
      {auth}
      {error}
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      <PhotoGrid />
    </div>
  );
};
