import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../config/url";
import { postAPI } from "../config/apiMethod";

export const transectioAddActivity = createAsyncThunk(
  "transectioAddActivity",
  async () => {
    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/activity/addactivity";
    try {
      const response = await postAPI(urlDynamic);
      console.log(response, "res");
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

const transectioAddActivitySlice = createSlice({
  name: "transectioAddActivity",
  initialState: {
    transectioAddActivityData: [],
    status: null,
  },
  extraReducers: {
    [transectioAddActivity.pending]: (state, action) => {
      state.status = "loading";
    },
    [transectioAddActivity.fulfilled]: (state, action) => {
      state.status = "success";
      state.transectioAddActivityData = action.payload;
    },
    [transectioAddActivity.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default transectioAddActivitySlice.reducer;
