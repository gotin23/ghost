import { createSlice } from "@reduxjs/toolkit";

const ProfilesSlice = createSlice({
  name: "profiles",
  initialState: {
    admin: [{ username: "", avatar: "", _id: "" }],
    secondaryUsers: [],
  },
  reducers: {
    setProfiles: (state, action) => {
      console.log(action.payload.data);
      state.admin = action.payload.data.Admin[0];
      state.secondaryUsers = action.payload.data.secondaryUsers;
    },
  },
});

export const { setProfiles } = ProfilesSlice.actions;

export default ProfilesSlice.reducer;
