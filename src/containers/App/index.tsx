import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { PhotoGrid } from "../PhotoGrid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { signIn, signOut } from "../../redux/slices/authSlice";
import { RootState } from "../../redux";
import { CustomError } from "../../components/CustomError";
import { Loader } from "../../components/Loader";

const cssModule = classNames.bind(styles);

export const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const login = useCallback(() => dispatch(signIn()), [dispatch]);
  const logout = useCallback(() => dispatch(signOut()), [dispatch]);

  const loading = useSelector(({ app }: RootState) => app.loading, shallowEqual);
  const error = useSelector(({ app }: RootState) => app.error, shallowEqual);

  useEffect(() => {
    dispatch(signIn());
  }, [dispatch]);

  return (
    <div className={cssModule("App")}>
      <h1 className={cssModule("App__title")}>React Photo Viewer</h1>

      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>

      {error.hasError && <CustomError errorMessage={error.data.message} />}
      {loading && <Loader />}
      <PhotoGrid />
    </div>
  );
};
