import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteAPI } from "../config/apiMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunk action creator for deleting a contact
export const deleteContact = createAsyncThunk(
  "deleteContact",
  async (itemId) => {
    const userId = await AsyncStorage.getItem("userId");
    const urlDynamic = `https://surf.topsearchrealty.com//wp-json/remove/contact?post_id=${encodeURIComponent(
      itemId
    )}`;

    try {
      const response = await deleteAPI(urlDynamic);
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
  }
);

// Redux slice for managing delete contact state
const deleteContactSlice = createSlice({
  name: "deleteContact",
  initialState: {
    deleteContactData: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteContact.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = "success";
        state.deleteContactData = action.payload;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default deleteContactSlice.reducer;
