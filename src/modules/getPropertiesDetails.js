import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";

export const getPropertiesDetails = createAsyncThunk(
  "getPropertiesDetails",
  async (id) => {
    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/wp/v2/estate_property/" + id;
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

const getPropertiesDetailsSlice = createSlice({
  name: "getPropertiesDetails",
  initialState: {
    getPropertiesDetailsData: [],
    status: null,
  },
  extraReducers: {
    [getPropertiesDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getPropertiesDetails.fulfilled]: (state, action) => {
      state.status = "success";
      state.getPropertiesDetailsData = action.payload;
    },
    [getPropertiesDetails.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getPropertiesDetailsSlice.reducer;
