import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getContactFav = createAsyncThunk("getContactFav", async (id) => {
  const urlDynamic =
    " https://surf.topsearchrealty.com/wp-json/contact/contactfavorites?contact_id=" +
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

const getContactFavSlice = createSlice({
  name: "getContactFav",
  initialState: {
    getContactFavData: [],
    status: null,
  },
  extraReducers: {
    [getContactFav.pending]: (state, action) => {
      state.status = "loading";
    },
    [getContactFav.fulfilled]: (state, action) => {
      state.status = "success";
      state.getContactFavData = action.payload;
    },
    [getContactFav.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getContactFavSlice.reducer;
