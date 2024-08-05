import { createSlice } from "@reduxjs/toolkit";

const PopularMoviesSlice = createSlice({
  name: "PopularMovies",
  initialState: {
    id: "",
    popularMoviesList: [],
    releaseDate: [],
  },
  reducers: {
    // setPopularMoviesId: (state, action) => {
    //   state.id = action.payload;
    // },
    setPopularMoviesList: (state, action) => {
      console.log(action.payload, "popular movie list");
      action.payload.forEach((el) => {
        // console.log(state.popularMoviesList);
        state.popularMoviesList.push(el);
      });
    },
    setResetPopularMoviesList: (state, action) => {
      state.popularMoviesList = [];
    },
    // setReleaseDate: (state, action) => {
    //   console.log(action.payload, "regarde par la lalala");
    //   if (action.payload[0].release_dates.length > 1) {
    //     state.releaseDate = action.payload[0].release_dates[0];
    //   } else {
    //     state.releaseDate = action.payload[0].release_dates;
    //   }
    // },
  },
});

export const { setPopularMoviesId } = PopularMoviesSlice.actions;
export const { setPopularMoviesList } = PopularMoviesSlice.actions;
export const { setReleaseDate } = PopularMoviesSlice.actions;
export const { setResetPopularMoviesList } = PopularMoviesSlice.actions;

export default PopularMoviesSlice.reducer;
