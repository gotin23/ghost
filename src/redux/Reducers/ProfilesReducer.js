import { createSlice } from "@reduxjs/toolkit";

const ProfilesSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [{ username: "", avatar: "", role: "" }],
  },
  reducers: {
    setProfiles: (state, action) => {
      console.log(action.payload.data.Profiles, "regarde");
      state.profiles = action.payload.data.Profiles;
    },
  },
});

export const { setProfiles } = ProfilesSlice.actions;

export default ProfilesSlice.reducer;
