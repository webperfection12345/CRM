import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../config/url";
import { postAPI } from "../config/apiMethod";

export const activityAddnote = createAsyncThunk(
  "activityAddnote",
  async (payload) => {
    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/activity/addnote";
    try {
      const response = await postAPI(urlDynamic, payload); // Pass the payload to the postAPI function
      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log("API issue", error.response);
      } else if (error.request) {
        console.log("API issue", error.request);
      } else {
        console.log("API issue", error.message);
      }
      throw error;
    }
  }
);

const activityAddnoteSlice = createSlice({
  name: "activityAddnote",
  initialState: {
    activityAddnoteData: [],
    status: null,
  },
  extraReducers: {
    [activityAddnote.pending]: (state, action) => {
      state.status = "loading";
    },
    [activityAddnote.fulfilled]: (state, action) => {
      state.status = "success";
      state.activityAddnoteData = action.payload;
    },
    [activityAddnote.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activityAddnoteSlice.reducer;
