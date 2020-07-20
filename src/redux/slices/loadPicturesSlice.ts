import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../config";
import { getRequest } from "../../api/getRequest";

interface PictureState {
  id: string;
  author: string;
  camera: string;
  tags: string;
  croppedPicture: string;
  fullPicture: string;
}

interface PicturesState {
  error: boolean;
  hasMore: boolean;
  pictures: Array<PictureState>;
  loading: boolean;
  page: 1;
  pageCount: number;
}

const picturesState: PicturesState = {
  error: false,
  hasMore: false,
  pictures: [],
  loading: false,
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

// First, create the thunk
const loadAllPictures = createAsyncThunk("pictures/loadAll", async (data, thunkAPI) => {
  // @ts-ignore
  const { auth, token } = thunkAPI.getState().auth;

  if (!auth) {
    throw new Error("You need to get Auth first!");
  }

  return await getRequest(`${apiUrl}/images`, token).then((json) => {
    return json;
  });
});

const picturesSlice = createSlice({
  name: "pictures",
  initialState: picturesState,
  reducers: {
    removeState() {
      return picturesState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllPictures.pending, (state, action) => {
      return { ...state, error: false, loading: true };
    });
    builder.addCase(loadAllPictures.fulfilled, (state, action) => {
      return { ...state, ...{ pictures: action.payload.pictures }, loading: false };
    });
    builder.addCase(loadAllPictures.rejected, (state, action) => {
      return { ...state, error: true, loading: false };
    });
  },
});

export const { removeState } = picturesSlice.actions;
export { loadAllPictures };
export default picturesSlice.reducer;
