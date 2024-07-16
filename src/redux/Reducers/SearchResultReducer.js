import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
import { createSlice } from "@reduxjs/toolkit";
// import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";

const SearchResultSlice = createSlice({
  name: "searchResult",
  initialState: {
    results: [],
  },
  reducers: {
    setResults: (state, action) => {
      const resultsFiltered = action.payload.response.results.filter((el) => el.media_type !== "uii");
      console.log(resultsFiltered);
      if (resultsFiltered.length > 0) {
        resultsFiltered.forEach((element) => {
          if (element.media_type === "person") {
            console.log(element);
          }
          state.results.push(element);
        });
      }
    },
    resetResults: (state) => {
      state.results = [];
    },
  },
});
export const { setResults, resetResults } = SearchResultSlice.actions;
export default SearchResultSlice.reducer;
// import { tdmbApiAction } from "@/Services/TmdbApi/TmdbApi";
// import { createSlice } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";

// const SearchResultSlice = createSlice({
//   name: "searchResult",
//   initialState: {
//     results: [],
//   },
//   reducers: {
//     setResults: (state, action) => {
//       // Cette partie ne fait rien pour le moment
//     },
//     updateResults: (state, action) => {
//       console.log(action);
//       state.results = action.payload;
//     },
//   },
// });

// export const { setResults, updateResults } = SearchResultSlice.actions;

// export const fetchAndSetResults = (results) => async (dispatch) => {
//   const detailedResults = await Promise.all(
//     results.map(async (el) => {
//       try {
//         const response = await tdmbApiAction("get", `3/movie/${el.id}?language=en-US`);
//         console.log(response, "on est la");
//         return response;
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//         return null;
//       }
//     })
//   );

//   // Filtrer les résultats nuls et dispatcher les résultats
//   const filteredResults = detailedResults.filter((result) => result !== null);
//   console.log(detailedResults, "par la");
//   //   dispatch(updateResults(filteredResults));
// };

// export default SearchResultSlice.reducer;
