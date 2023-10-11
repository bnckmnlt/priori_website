import { createSlice } from "@reduxjs/toolkit";
import { useNewRequest } from "../hooks/util-hooks";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
  },
  reducers: {
    signinUser: (state, action) => {
      state.currentUser = action.payload;
    },
    signoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signinUser, signoutUser } = authReducer.actions;

export const fetchCurrentUser = (userId) => async (dispatch) => {
  if (userId) {
    try {
      const newAxiosRequest = useNewRequest();
      const response = await newAxiosRequest.get(`/auth/${userId}`);

      if (response.status === 200) {
        const data = response.data;
        dispatch(signinUser(data));
        console.log("User stored successfully");
      }
    } catch (e) {
      console.error("Failed to fetch current user:", e.code);
    }
  }
};

export default authReducer.reducer;
