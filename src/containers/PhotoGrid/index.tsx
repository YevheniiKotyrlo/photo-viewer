import React, { useEffect } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadPictures } from "../../redux/slices/loadPicturesSlice";
import { RootState } from "../../redux";

const cssModule = classNames.bind(styles);
export const PhotoGrid = (): JSX.Element => {
  const dispatch = useDispatch();

  const pictures = useSelector(({ pictures }: RootState) => pictures.pictures, shallowEqual);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(loadPictures(1));

      clearInterval(interval);
    }, 500);
  }, [dispatch]);

  return (
    <div className={cssModule("PhotoGrid")}>
      <div className={cssModule("PhotoGrid__wrapper")}>
        {pictures.map((picture, index) => {
          return (
            <img src={picture.croppedPicture} className={cssModule("PhotoGrid__cropped-photo")} key={index} alt="" />
          );
        })}
      </div>
    </div>
  );
};
