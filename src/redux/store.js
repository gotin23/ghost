import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./Reducers/LogReducer";

const store = configureStore({
  reducer: {
    log: LogReducer,
  },
});

export default store;
