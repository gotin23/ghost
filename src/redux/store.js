import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./Reducers/LogReducer";
import ProfilesReducer from "./Reducers/ProfilesReducer";
import ProfileSelectedReducer from "./Reducers/ProfileSelectedReducer";
import FeaturedMediaReducer from "./Reducers/FeaturedMediaReducer";
import PopularMoviesReducer from "./Reducers/PopularMoviesReducer";
import TopRatedMoviesReducer from "./Reducers/TopRatedMoviesReducer";

const store = configureStore({
  reducer: {
    log: LogReducer,
    profiles: ProfilesReducer,
    profileSelected: ProfileSelectedReducer,
    featuredMedia: FeaturedMediaReducer,
    popularMovies: PopularMoviesReducer,
    topRatedMovies: TopRatedMoviesReducer,
  },
});

export default store;
