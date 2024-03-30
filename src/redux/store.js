import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./Reducers/LogReducer";
import ProfilesReducer from "./Reducers/ProfilesReducer";
import ProfileSelectedReducer from "./Reducers/ProfileSelectedReducer";

const store = configureStore({
  reducer: {
    log: LogReducer,
    profiles: ProfilesReducer,
    profileSelected: ProfileSelectedReducer,
  },
});

export default store;
