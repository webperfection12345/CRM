import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAPI } from "../config/apiMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunk action creator for updating a contact
export const updateActivity = async (payload) => {
    const url = "https://surf.topsearchrealty.com/wp-json/activity/editdisposition";
    try {
      const response = await postAPI(url, payload); 
      console.log(response);// Pass the payload to the postAPI function
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
  }


export default updateActivity;
