import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./Reducers/LogReducer";
import ProfilesReducer from "./Reducers/ProfilesReducer";

const store = configureStore({
  reducer: {
    log: LogReducer,
    profiles: ProfilesReducer,
  },
});

export default store;
