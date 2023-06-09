import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLeads = createAsyncThunk("getLeads", async () => {
  const id = await AsyncStorage.getItem("userId");
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/leads/leadsall?agentid=" + id;
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

const getLeadsSlice = createSlice({
  name: "getLeads",
  initialState: {
    getLeadsData: {},
    status: null,
  },
  extraReducers: {
    [getLeads.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLeads.fulfilled]: (state, action) => {
      state.status = "success";
      state.getLeadsData = action.payload;
    },
    [getLeads.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getLeadsSlice.reducer;
