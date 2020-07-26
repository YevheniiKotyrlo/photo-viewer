import React, { useCallback } from "react";
import classNames from "classnames";
import styles from "./styles.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { loadPictureDetails, PictureState, closePopup } from "../../redux/slices/picturesSlice";

const cssModule = classNames.bind(styles);
export const PhotoPopup = (): JSX.Element => {
  /*const pictures: PicturesState = [{
  id: "-1",
  author: "",
  camera: "",
  tags: "#preview",
  croppedPicture: "https://dummyimage.com/600x400/000/fff",
  fullPicture: "https://dummyimage.com/600x400/000/fff",
}];*/
  const dispatch = useDispatch();

  const closePopupWindow = useCallback(() => {
    dispatch(closePopup());
  }, [dispatch]);

  const { pictures, active } = useSelector(({ pictures }: RootState) => pictures, shallowEqual);

  const ourPicture = pictures.find((picture) => picture.id === active) as PictureState;

  return (
    <div className={cssModule("PhotoPopup")} style={{ backgroundImage: "url(" + ourPicture.fullPicture + ")" }}>
      <button type="button" className={cssModule("PhotoPopup__button-close")} onClick={closePopupWindow}>
        Close
      </button>
      <div className={cssModule("PhotoPopup__info")}>
        <p>{ourPicture.tags}</p>
        <p>{ourPicture.camera}</p>
        <p>{ourPicture.author}</p>
      </div>
    </div>
  );
};
