import { createSlice } from "@reduxjs/toolkit";

const UpcomingMoviesSlice = createSlice({
  name: "UpcomingMovies",
  initialState: {
    upcomingMoviesList: [],
  },
  reducers: {
    setUpcomingMoviesList: (state, action) => {
      action.payload.forEach((el) => {
        state.upcomingMoviesList.push(el);
      });
    },
  },
});

export const { setUpcomingMoviesList } = UpcomingMoviesSlice.actions;

export default UpcomingMoviesSlice.reducer;
