import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteAPI } from "../config/apiMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const deleteContact = createAsyncThunk(
  "deleteContact",
  async (itemId) => {
    const userId = await AsyncStorage.getItem("userId");
    const urlDynamic =
      `https://surf.topsearchrealty.com/wp-json/agency/agents_details?agency_id` +
      userId;
    return await deleteAPI(urlDynamic)
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

const deleteContactSlice = createSlice({
  name: "deleteContact",
  initialState: {
    deleteContactData: [],
    status: null,
  },
  extraReducers: {
    [deleteContact.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.status = "success";
      state.deleteContactData = action.payload;
    },
    [deleteContact.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deleteContactSlice.reducer;
