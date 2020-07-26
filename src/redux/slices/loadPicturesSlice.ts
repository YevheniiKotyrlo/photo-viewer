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
  status?: string;
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

const loadPictures = createAsyncThunk<PicturesState, number>("pictures/loadAll", async (page = 1, thunkAPI) => {
  const { auth, token } = (thunkAPI.getState() as RootState).auth;

  if (!auth) {
    throw new Error("You need to get Auth first!");
  }

  return await getRequest(`${apiUrl}/images?page=${page}`, token).then((json) => {
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
    builder.addCase(loadPictures.fulfilled, (state, action) => {
      let newPictures: Array<PictureState>;
      try {
        newPictures = action.payload.pictures.map(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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

export { loadPictures };
export default picturesSlice.reducer;
