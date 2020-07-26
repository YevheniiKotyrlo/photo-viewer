import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../config";
import { getRequest } from "../../api/getRequest";
import { RootState } from "../index";

interface PictureState {
  id: string;
  author: string;
  camera: string;
  tags: string;
  // todo
  croppedPicture?: string;
  fullPicture?: string;
  cropped_picture?: string;
  full_picture?: string;
}

interface PicturesState {
  hasMore: boolean;
  pictures: Array<PictureState>;
  page: 1;
  pageCount: number;
  status?: string;
  active: string;
}

const initialState: PicturesState = {
  hasMore: false,
  pictures: [],
  page: 1,
  pageCount: 0,
  status: "",
  active: "",
};

const name = "pictures";

const loadPictures = createAsyncThunk<PicturesState, number>(name + "/loadAll", async (page = 1, thunkAPI) => {
  const { auth, token } = (thunkAPI.getState() as RootState).auth;

  if (!auth) {
    throw new Error("You need to get Auth first!");
  }

  return await getRequest(`${apiUrl}/images?page=${page}`, token).then((json) => {
    return json;
  });
});

const loadPictureDetails = createAsyncThunk<PictureState, string>(name + "/loadDetails", async (id, thunkAPI) => {
  const { auth, token } = (thunkAPI.getState() as RootState).auth;

  if (!auth) {
    throw new Error("You need to get Auth first!");
  }

  return await getRequest(`${apiUrl}/images/${id}`, token).then((json) => {
    return json;
  });
});

const picturesSlice = createSlice({
  name,
  initialState,
  reducers: {
    resetImages() {
      return initialState;
    },
    closePopup: (state) => {
      state.active = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadPictures.fulfilled, (state, action) => {
      let newPictures: Array<PictureState>;
      try {
        newPictures = action.payload.pictures.map((picture: PictureState) => {
          const croppedPicture = picture.cropped_picture;
          const fullPicture = picture.full_picture;
          delete picture.cropped_picture;
          delete picture.full_picture;

          return { ...picture, croppedPicture, fullPicture };
        });
      } catch (e) {
        newPictures = [];
        console.error("Error while trying to parse pictures!", e);
      }

      return {
        ...state,
        ...action.payload,
        ...{ pictures: newPictures },
      };
    });

    builder.addCase(loadPictureDetails.fulfilled, (state, action) => {
      state.pictures.forEach((picture: PictureState, index) => {
        if (picture.id === action.payload.id) {
          const croppedPicture = action.payload.cropped_picture;
          const fullPicture = action.payload.full_picture;
          delete action.payload.cropped_picture;
          delete action.payload.full_picture;

          state.active = action.payload.id;

          state.pictures[index] = { ...state.pictures[index], ...action.payload, croppedPicture, fullPicture };
        }
      });

      return state;
    });
  },
});

export type { PictureState };
export const { closePopup } = picturesSlice.actions;
export { loadPictures, loadPictureDetails };
export default picturesSlice.reducer;
