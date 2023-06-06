import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getContacts = createAsyncThunk("getContacts", async () => {
  const id = await AsyncStorage.getItem("userId");
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/leads/contacts/?userid=" + id;
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

const getContactsSlice = createSlice({
  name: "getContacts",
  initialState: {
    getContactsData: [],
    status: null,
  },
  extraReducers: {
    [getContacts.pending]: (state, action) => {
      state.status = "loading";
    },
    [getContacts.fulfilled]: (state, action) => {
      state.status = "success";
      state.getContactsData = action.payload;
    },
    [getContacts.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getContactsSlice.reducer;
