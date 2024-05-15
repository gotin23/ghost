import { createSlice } from "@reduxjs/toolkit";

const TopRatedMoviesSlice = createSlice({
  name: "TopRatedMovies",
  initialState: {
    id: "",
    topRatedMoviesList: [],
    releaseDate: [],
  },
  reducers: {
    // setPopularMoviesId: (state, action) => {
    //   state.id = action.payload;
    // },
    setTopRatedMoviesList: (state, action) => {
      console.log(action.payload, "popular movie list");
      action.payload.forEach((el) => {
        // console.log(state.popularMoviesList);
        state.topRatedMoviesList.push(el);
      });
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

// export const { setPopularMoviesId } = PopularMoviesSlice.actions;
export const { setTopRatedMoviesList } = TopRatedMoviesSlice.actions;
// export const { setReleaseDate } = PopularMoviesSlice.actions;

export default TopRatedMoviesSlice.reducer;
