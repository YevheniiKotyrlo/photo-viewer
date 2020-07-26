import React, { useCallback, useEffect } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPictureDetails, loadPictures } from "../../redux/slices/picturesSlice";
import { RootState } from "../../redux";

const cssModule = classNames.bind(styles);
export const PhotoGrid = (): JSX.Element => {
  const dispatch = useDispatch();

  const { pictures } = useSelector(({ pictures }: RootState) => pictures, shallowEqual);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(loadPictures(1));

      clearInterval(interval);
    }, 500);
  }, [dispatch]);

  const openPopup = useCallback((id: string) => {
      dispatch(loadPictureDetails(id));
    },
    [dispatch],
  );

  return (
    <div className={cssModule("PhotoGrid")}>
      <div className={cssModule("PhotoGrid__wrapper")}>
        {pictures.map((picture, index) => {
          return (
            <img
              src={picture.croppedPicture}
              className={cssModule("PhotoGrid__cropped-photo")}
              key={index}
              alt=""
              onClick={() => openPopup(picture.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
