import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { PhotoGrid } from "../PhotoGrid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/slices/authSlice";
import { RootState } from "../../redux";
import { CustomError } from "../../components/CustomError";
import { Loader } from "../../components/Loader";
import { PageNavigation } from "../../components/PageNavigation";
import { loadPictures } from "../../redux/slices/picturesSlice";
import { PhotoPopup } from "../PhotoPopup";

const cssModule = classNames.bind(styles);

export const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const loading = useSelector(({ app }: RootState) => app.loading, shallowEqual);
  const error = useSelector(({ app }: RootState) => app.error, shallowEqual);
  const { page, pageCount, active } = useSelector(({ pictures }: RootState) => pictures, shallowEqual);

  useEffect(() => {
    dispatch(signIn());
  }, [dispatch]);

  const updatePage = useCallback(
    (page) => {
      dispatch(loadPictures(page));
    },
    [dispatch],
  );

  return (
    <div className={cssModule("App")}>
      {error.hasError && <CustomError errorMessage={error.data.message} />}
      {loading && <Loader />}

      <h1 className={cssModule("App__title")}>React Photo Viewer</h1>

      <PhotoGrid />
      {active && <PhotoPopup />}
      <PageNavigation current={page} max={pageCount} updatePage={updatePage} />
    </div>
  );
};
