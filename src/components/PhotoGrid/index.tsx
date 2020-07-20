import React, { useCallback } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { loadAllPictures } from "../../redux/slices/loadPicturesSlice";

const cssModule = classNames.bind(styles);
export const PhotoGrid = (): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const pictures = useSelector(({ pictures }) => pictures.pictures, shallowEqual);
  const loadImagesGrid = useCallback(() => dispatch(loadAllPictures()), [dispatch]);

  return (
    <div className={cssModule("PhotoGrid")}>
      <button type="button" onClick={loadImagesGrid}>
        Load All Images
      </button>
      <div className={cssModule("PhotoGrid__wrapper")}>
        {pictures.map((picture: any) => {
          return <img src={picture.cropped_picture} className={cssModule("PhotoGrid__cropped-photo")}/>
        })}
      </div>

    </div>
  );
};
