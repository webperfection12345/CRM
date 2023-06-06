import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSearchhistory = createAsyncThunk(
  "getSearchhistory",
  async () => {
    const id = await AsyncStorage.getItem("userId");
    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/saved/search/?userid=" + id;
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

const getSearchhistorySlice = createSlice({
  name: "getSearchhistory",
  initialState: {
    getSearchhistoryData: [],
    status: null,
  },
  extraReducers: {
    [getSearchhistory.pending]: (state, action) => {
      state.status = "loading";
    },
    [getSearchhistory.fulfilled]: (state, action) => {
      state.status = "success";
      state.getSearchhistoryData = action.payload;
    },
    [getSearchhistory.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getSearchhistorySlice.reducer;
