import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../config/url";
import { postAPI } from "../config/apiMethod";

export const addDispositon = createAsyncThunk("addDispositon", async (payload) => {
  const urlDynamic = "https://surf.topsearchrealty.com/wp-json/activity/activitydisposition";
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



export default addDispositon;
