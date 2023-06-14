import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getActivityData = createAsyncThunk(
  "getActivityData",
  async (id) => {
    const urlDynamic =
      " https://surf.topsearchrealty.com/wp-json/activity/activitytask?Contactid=" +
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
  }
);

const getActivityDataSlice = createSlice({
  name: "getActivityData",
  initialState: {
    getActivityData: [],
    status: null,
  },
  extraReducers: {
    [getActivityData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getActivityData.fulfilled]: (state, action) => {
      state.status = "success";
      state.getActivityData = action.payload;
    },
    [getActivityData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getActivityDataSlice.reducer;
