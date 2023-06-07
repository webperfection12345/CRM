import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";

export const getClientDetails = createAsyncThunk(
  "getPropertiesDetails",
  async (id) => {
    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/client/singlecontacts/details/?contactid=" +
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

const getClientDetails = createSlice({
  name: "getClientDetails",
  initialState: {
    getClientDetails: [],
    status: null,
  },
  extraReducers: {
    [getClientDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getClientDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.getClientDetails = action.payload;
    },
    [getClientDetails.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getClientDetails.reducer;
