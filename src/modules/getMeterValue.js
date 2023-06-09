import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMeterData = createAsyncThunk("getMeterData", async () => {
  const id = await AsyncStorage.getItem("userId");
  const urlDynamic =
    " https://surf.topsearchrealty.com/wp-json/activity/trackactivity?Agentid=" +
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

const getMeterDataSlice = createSlice({
  name: "getMeterData",
  initialState: {
    getMeterData: [],
    status: null,
  },
  extraReducers: {
    [getMeterData.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMeterData.fulfilled]: (state, action) => {
      state.status = "success";
      state.getContactsData = action.payload;
    },
    [getMeterData.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getMeterDataSlice.reducer;
