import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";
import picturesReducer from "./slices/loadPicturesSlice";
import { loggerHandler } from "./middlewares/logger";
import { loadingHandler } from "./middlewares/loading";
import { errorHandler } from "./middlewares/error";

const middleware = [...getDefaultMiddleware({ immutableCheck: false }), loggerHandler, loadingHandler, errorHandler];

const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    pictures: picturesReducer,
  },
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
