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
    setReset: (state) => {
      state.id = "";
      state.featuredMediaDisplay = [];
      state.releaseDate = [];
    },
  },
});

// export const { setFeaturedMediaId } = FeaturedMediaSlice.actions;
// export const { setFeaturedMediaDisplay } = FeaturedMediaSlice.actions;
// export const { setReleaseDate } = FeaturedMediaSlice.actions;
// export const { setReset } = FeaturedMediaSlice.actions;
export const { setFeaturedMediaId, setFeaturedMediaDisplay, setReleaseDate, setReset } = FeaturedMediaSlice.actions;

export default FeaturedMediaSlice.reducer;
