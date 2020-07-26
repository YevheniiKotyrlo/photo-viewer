import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  loading: boolean;
  error: {
    hasError: boolean;
    data: {
      message: string;
    };
  };
}

const initialState: AppState = {
  error: {
    hasError: false,
    data: {
      message: "",
    },
  },
  loading: false,
};

const name = "app";
const loadingAction = "loading";
const errorMessageAction = "errorMessage";

const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    [loadingAction]: (state, action) => {
      state.loading = action.payload;
    },
    [errorMessageAction]: (state, action) => {
      if (action.payload && action.payload.length) {
        state.error.hasError = true;
        state.error.data.message = action.payload;
      } else {
        state.error = initialState.error;
      }
    },
  },
});

/*export const loadingActionType = `${sliceName}/${loadingAction}`;
export const errorMessageActionType = `${sliceName}/${errorMessageAction}`;*/

export const { loading, errorMessage } = appSlice.actions;
export default appSlice.reducer;
