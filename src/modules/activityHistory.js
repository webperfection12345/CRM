import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";

export const activityHistory = createAsyncThunk("activityHistory", async () => {
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/activity/taskhistory";
  return await getAPI(urlDynamic)
    .then(async (response) => {
      const { data } = response;
      return data;
    })
    .catch((e) => {
      console.log(e);
      if (e.response) {
        console.log("api issue", e.response);
      } else if (e.request) {
        console.log("api issue", e.response);
      } else {
        console.log("api issue", e.response);
      }
    });
});

const activityHistorySlice = createSlice({
  name: "activityHistory",
  initialState: {
    activityHistoryData: [],
    status: null,
  },
  extraReducers: {
    [activityHistory.pending]: (state, action) => {
      state.status = "loading";
    },
    [activityHistory.fulfilled]: (state, action) => {
      state.status = "success";
      state.activityHistoryData = action.payload;
    },
    [activityHistory.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default activityHistorySlice.reducer;
