import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import picturesSlice from "./slices/loadPicturesSlice";

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: {
    auth: authReducer,
    pictures: picturesSlice,
  },
  middleware,
});

// export type RootState = ReturnType<typeof store.getState>;
export default store;
