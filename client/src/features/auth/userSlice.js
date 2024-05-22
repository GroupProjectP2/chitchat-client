import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  fullName: "",
  profilePic: "",
};

// auth slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFullName: (state, { payload }) => {
      state.fullName = payload;

      //   state.profilePic = payload.profilePic;
    },
    setProfilePic: (state, { payload }) => {
      state.profilePic = payload;
    },
  },
});

export const { setFullName, setProfilePic } = userSlice.actions;

export const fetchLoggedUser = () => {
  return async (dispatch) => {
    let { data } = await axios({
      method: "GET",
      url: "http://localhost:3000/users/",
      headers: { Authorization: localStorage.getItem("access_token") },
    });
    console.log(data, "<<< dari redux");
    dispatch(setFullName(data.user.fullName));
    dispatch(setProfilePic(data.user.profilePic));
  };
};
export default userSlice.reducer;
