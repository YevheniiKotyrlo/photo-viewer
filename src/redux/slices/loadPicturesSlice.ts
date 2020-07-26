import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../config";
import { getRequest } from "../../api/getRequest";
import { RootState } from "../index";

interface PictureState {
  id: string;
  author: string;
  camera: string;
  tags: string;
  croppedPicture: string;
  fullPicture: string;
}

interface PicturesState {
  hasMore: boolean;
  pictures: Array<PictureState>;
  page: 1;
  pageCount: number;
}

const initialState: PicturesState = {
  hasMore: false,
  pictures: [],
  page: 1,
  pageCount: 0,
};

/*const pictures: PicturesState = [{
  id: "-1",
  author: "",
  camera: "",
  tags: "#preview",
  croppedPicture: "https://dummyimage.com/600x400/000/fff",
  fullPicture: "https://dummyimage.com/600x400/000/fff",
}];*/

const loadAllPictures = createAsyncThunk("pictures/loadAll", async (data, thunkAPI) => {
  const { auth, token } = (thunkAPI.getState() as RootState).auth;

  if (!auth) {
    throw new Error("You need to get Auth first!");
  }

  return await getRequest(`${apiUrl}/images`, token).then((json) => {
    return json;
  });
});

const name = "pictures";

const picturesSlice = createSlice({
  name,
  initialState,
  reducers: {
    resetImages() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllPictures.fulfilled, (state, action) => {
      let newPictures: Array<PictureState>;
      try {
        newPictures = action.payload.pictures.map(
          (picture: PictureState & { cropped_picture: string; full_picture: string }) => {
            const croppedPicture = picture.cropped_picture;
            const fullPicture = picture.full_picture;
            delete picture.cropped_picture;
            delete picture.full_picture;

            return { ...picture, croppedPicture, fullPicture };
          },
        );
      } catch (e) {
        newPictures = [];
        console.error("Error while trying to parse pictures!", e);
      }
      console.log({ ...state, ...action.payload, ...{ pictures: newPictures } });

      return { ...state, ...action.payload, ...{ pictures: newPictures } };
    });
  },
});

export { loadAllPictures };
export default picturesSlice.reducer;
