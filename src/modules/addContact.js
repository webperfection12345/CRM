import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../config/url";
import { postAPI } from "../config/apiMethod";

export const addContact = createAsyncThunk("addContact", async (payload) => {
  const urlDynamic =
    "https://surf.topsearchrealty.com/wp-json/contact/createcontact";
  try {
    const response = await postAPI(urlDynamic, payload);
    console.log(response, "res");
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      console.log("API issue", error.response);
    } else if (error.request) {
      console.log("API issue", error.request);
    } else {
      console.log("API issue", error.message);
    }
    throw error;
  }
});

const addContactSlice = createSlice({
  name: "addContact",
  initialState: {
    addActivityTaskData: [],
    status: null,
  },
  extraReducers: {
    [addContact.pending]: (state, action) => {
      state.status = "loading";
    },
    [addContact.fulfilled]: (state, action) => {
      state.status = "success";
      state.addActivityTaskData = action.payload;
    },
    [addContact.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default addContactSlice.reducer;
