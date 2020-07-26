import { Middleware } from "@reduxjs/toolkit";

export const loggerHandler: Middleware = (store) => (next) => (action) => {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};
