import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMyClientList = createAsyncThunk("getMyClientList", async () => {
  const id = await AsyncStorage.getItem("userId");
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/leads/contacts/?userid=" + id;
  return await getAPI(urlDynamic)
    .then(async (response) => {
      console.log(response, "amg");
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

const getMyClientListSlice = createSlice({
  name: "getMyClientList",
  initialState: {
    getMyClientListData: [],
    status: null,
  },
  extraReducers: {
    [getMyClientList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getMyClientList.fulfilled]: (state, action) => {
      state.status = "success";
      state.getMyClientListData = action.payload;
    },
    [getMyClientList.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getMyClientListSlice.reducer;
