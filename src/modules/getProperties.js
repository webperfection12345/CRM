import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";

export const getProperties = createAsyncThunk("getProperties", async (page) => {
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/wp/v2/estate_property?per_page=50";
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

const getPropertiesSlice = createSlice({
  name: "getProperties",
  initialState: {
    getPropertiesData: [],
    status: null,
  },
  extraReducers: {
    [getProperties.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProperties.fulfilled]: (state, action) => {
      state.status = "success";
      state.getPropertiesData = action.payload;
    },
    [getProperties.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getPropertiesSlice.reducer;
