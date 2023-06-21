import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTodayDipos = createAsyncThunk(
  "getTodayDipos",
  async (id) => {
    const urlDynamic =
      " https://surf.topsearchrealty.com/wp-json/activity/todaydispositions?Contactid=" +
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

const getTodayDiposSlice = createSlice({
  name: "getTodayDipos",
  initialState: {
    getTodayDiposData: [],
    status: null,
  },
  extraReducers: {
    [getTodayDipos.pending]: (state, action) => {
      state.status = "loading";
    },
    [getTodayDipos.fulfilled]: (state, action) => {
      state.status = "success";
      state.getTodayDiposData = action.payload;
    },
    [getTodayDipos.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getTodayDiposSlice.reducer;
