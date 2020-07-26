import { Middleware } from "@reduxjs/toolkit";
import { signIn } from "../slices/authSlice";
import { errorMessage } from "../slices/appSlice";
import { loadPictures } from "../slices/loadPicturesSlice";

export const errorHandler: Middleware = ({ dispatch }) => (next) => (action) => {
  const result = next(action);

  switch (action.type) {
    case signIn.pending.type:
      dispatch(errorMessage(""));
      break;
    case loadPictures.pending.type:
      dispatch(errorMessage(""));
      break;
    case signIn.rejected.type:
      dispatch(errorMessage("Failed to sign in"));
      break;
    case signIn.fulfilled.type:
      dispatch(errorMessage(""));
      break;
    case loadPictures.rejected.type:
      dispatch(errorMessage("Failed to load pictures"));
      break;
    case loadPictures.fulfilled.type:
      dispatch(errorMessage(""));
      break;
  }

  return result;
};
