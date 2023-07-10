import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStatsData = createAsyncThunk("getSearchFav", async (id) => {
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/contact/contactleveldata?contact_id=" +
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

const getStatsDataSlice = createSlice({
  name: "getStatsData",
  initialState: {
    getStatsData: {},
    status: null,
  },
  extraReducers: {
    [getStatsData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getStatsData.fulfilled]: (state, action) => {
      state.status = "success";
      state.getSearchFavData = action.payload;
    },
    [getStatsData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getStatsDataSlice.reducer;
