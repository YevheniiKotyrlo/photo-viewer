import { Middleware } from "@reduxjs/toolkit";
import { signIn } from "../slices/authSlice";
import { loading } from "../slices/appSlice";
import { loadPictures } from "../slices/loadPicturesSlice";

export const loadingHandler: Middleware = ({ dispatch }) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case signIn.pending.type:
      dispatch(loading(true));
      break;
    case loadPictures.pending.type:
      dispatch(loading(true));
      break;
    case signIn.rejected.type:
      dispatch(loading(false));
      break;
    case signIn.fulfilled.type:
      dispatch(loading(false));
      break;
    case loadPictures.rejected.type:
      dispatch(loading(false));
      break;
    case loadPictures.fulfilled.type:
      dispatch(loading(false));
      break;
  }

  return result;
};
