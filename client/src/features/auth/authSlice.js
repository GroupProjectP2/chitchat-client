import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  fullName: "",
  profilePic: "",
};

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFullName: (state, { payload }) => {
      console.log(payload);
      state.fullName = payload;
      console.log(state.fullName);
      //   state.profilePic = payload.profilePic;
    },
  },
});

export const { setFullName } = authSlice.actions;

export default authSlice.reducer;
