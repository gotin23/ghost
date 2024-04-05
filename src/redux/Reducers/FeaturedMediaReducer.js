import { createSlice } from "@reduxjs/toolkit";

const FeaturedMediaSlice = createSlice({
  name: "featuredMedia",
  initialState: {
    id: "",
    featuredMediaDisplay: [],
    releaseDate: [],
  },
  reducers: {
    setFeaturedMediaId: (state, action) => {
      state.id = action.payload;
    },
    setFeaturedMediaDisplay: (state, action) => {
      state.featuredMediaDisplay = action.payload.response;
    },
    setReleaseDate: (state, action) => {
      if (action.payload[0].release_dates.length > 1) {
        state.releaseDate = action.payload[0].release_dates[0];
      } else {
        state.releaseDate = action.payload[0].release_dates;
      }
    },
  },
});

export const { setFeaturedMediaId } = FeaturedMediaSlice.actions;
export const { setFeaturedMediaDisplay } = FeaturedMediaSlice.actions;
export const { setReleaseDate } = FeaturedMediaSlice.actions;

export default FeaturedMediaSlice.reducer;
