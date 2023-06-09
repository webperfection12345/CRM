import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postAPI } from "../config/apiMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Async thunk action creator for updating a contact
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (payload) => {
    const url = "https://surf.topsearchrealty.com/wp-json/leads/updatecontacts";
    try {
      const response = await postAPI(url, payload); // Pass the payload to the postAPI function
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

// Redux slice for managing update contact state
const updateContactSlice = createSlice({
  name: "contacts",
  initialState: {
    updateContactData: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateContact.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.status = "success";
        state.updateContactData = action.payload;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default updateContactSlice.reducer;
