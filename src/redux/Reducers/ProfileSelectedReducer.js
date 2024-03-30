import { createSlice } from "@reduxjs/toolkit";

const ProfileSelectedSlice = createSlice({
  name: "profileSelected",
  initialState: {
    profile: { username: "", avatar: "", role: "" },
  },
  reducers: {
    setProfileSelected: (state, action) => {
      console.log(action.payload.profile, "regarde");
      state.profile = action.payload.profile;
    },
  },
});

export const { setProfileSelected } = ProfileSelectedSlice.actions;

export default ProfileSelectedSlice.reducer;
