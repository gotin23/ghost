import { configureStore } from "@reduxjs/toolkit";
import LogReducer from "./Reducers/LogReducer";
import ProfilesReducer from "./Reducers/ProfilesReducer";
import ProfileSelectedReducer from "./Reducers/ProfileSelectedReducer";
import FeaturedMediaReducer from "./Reducers/FeaturedMediaReducer";
import PopularMoviesReducer from "./Reducers/PopularMoviesReducer";
import TopRatedMoviesReducer from "./Reducers/TopRatedMoviesReducer";
import NowPlayedMoviesReducer from "./Reducers/NowPlayedMoviesReducer";
import UpcomingMoviesReducer from "./Reducers/UpcomingMoviesReducer";
import SearchResultReducer from "./Reducers/SearchResultReducer";

const store = configureStore({
  reducer: {
    log: LogReducer,
    profiles: ProfilesReducer,
    profileSelected: ProfileSelectedReducer,
    featuredMedia: FeaturedMediaReducer,
    popularMovies: PopularMoviesReducer,
    topRatedMovies: TopRatedMoviesReducer,
    nowPlayedMovies: NowPlayedMoviesReducer,
    upcomingMovies: UpcomingMoviesReducer,
    searchResult: SearchResultReducer,
  },
});

export default store;
