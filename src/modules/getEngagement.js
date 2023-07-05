import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getEngagement = createAsyncThunk("getEngagement", async (id) => {
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/contact/userengagement?contact_id=" +
    id;
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

const getEngagementSlice = createSlice({
  name: "getEngagement",
  initialState: {
    getEngagementData: [],
    status: null,
  },
  extraReducers: {
    [getEngagement.pending]: (state, action) => {
      state.status = "loading";
    },
    [getEngagement.fulfilled]: (state, action) => {
      state.status = "success";
      state.getEngagementData = action.payload;
    },
    [getEngagement.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getEngagementSlice.reducer;
