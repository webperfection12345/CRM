import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCurrentDisposition = createAsyncThunk(
  "getCurrentDisposition",
  async (id) => {
    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/activity/currentdispositions?Contactid=" +
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

const getCurrentDispositionSlice = createSlice({
  name: "getCurrentDispositionData",
  initialState: {
    getCurrentDispositionData: [],
    status: null,
  },
  extraReducers: {
    [getCurrentDisposition.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCurrentDisposition.fulfilled]: (state, action) => {
      state.status = "success";
      state.getCurrentDispositionData = action.payload;
    },
    [getCurrentDisposition.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getCurrentDispositionSlice.reducer;
