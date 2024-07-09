import { createSlice } from "@reduxjs/toolkit";

const SearchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    results: [],
  },
  reducers: {
    setResults: (state, action) => {
      console.log(action.payload, "results");
      // action.payload.forEach((el) => {
      //   // console.log(state.popularMoviesList);
      //   state.topRatedMoviesList.push(el);
      // });
    },
  },
});
export const { setResults } = SearchResultSlice.actions;
export default SearchResultSlice.reducer;
