import { createSlice } from "@reduxjs/toolkit";

const NowPlayedMoviesSlice = createSlice({
  name: "NowPlayedMovies",
  initialState: {
    nowPlayedMoviesList: [],
  },
  reducers: {
    setNowPlayedMoviesList: (state, action) => {
      action.payload.forEach((el) => {
        state.nowPlayedMoviesList.push(el);
      });
    },
  },
});

export const { setNowPlayedMoviesList } = NowPlayedMoviesSlice.actions;

export default NowPlayedMoviesSlice.reducer;
