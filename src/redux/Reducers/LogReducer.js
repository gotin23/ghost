import { createSlice } from "@reduxjs/toolkit";

const LogSlice = createSlice({
  name: "log",
  initialState: {
    token: "",
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.response.token;
    },
    setLogout: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setLogin } = LogSlice.actions;
export const { setLogout } = LogSlice.actions;
export default LogSlice.reducer;
