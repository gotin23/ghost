import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./Reducers/LogReducer";
import ProfilesReducer from "./Reducers/ProfilesReducer";
import ProfileSelectedReducer from "./Reducers/ProfileSelectedReducer";
import FeaturedMediaReducer from "./Reducers/FeaturedMediaReducer";
import PopularMoviesReducer from "./Reducers/PopularMoviesReducer";

const store = configureStore({
  reducer: {
    log: LogReducer,
    profiles: ProfilesReducer,
    profileSelected: ProfileSelectedReducer,
    featuredMedia: FeaturedMediaReducer,
    popularMovies: PopularMoviesReducer,
  },
});

export default store;
