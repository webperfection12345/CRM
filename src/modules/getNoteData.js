import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNoteData = createAsyncThunk("getNoteData", async (id) => {
  const urlDynamic =
    " https://surf.topsearchrealty.com/wp-json/activity/activitynotes?Contactid=" +
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

const getNoteDataSlice = createSlice({
  name: "getNoteData",
  initialState: {
    getNoteData: [],
    status: null,
  },
  extraReducers: {
    [getNoteData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNoteData.fulfilled]: (state, action) => {
      state.status = "success";
      state.getContactsData = action.payload;
    },
    [getNoteData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getNoteDataSlice.reducer;
