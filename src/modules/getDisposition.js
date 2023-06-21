import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDisposition = createAsyncThunk(
  "getDisposition",
  async (id) => {
    const urlDynamic =
      " https://surf.topsearchrealty.com/wp-json/activity/activitydispositions?Contactid=" +
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

const getDispositionSlice = createSlice({
  name: "getDisposition",
  initialState: {
    getDispositionData: [],
    status: null,
  },
  extraReducers: {
    [getDisposition.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDisposition.fulfilled]: (state, action) => {
      state.status = "success";
      state.getDispositionData = action.payload;
    },
    [getDisposition.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getDispositionSlice.reducer;
