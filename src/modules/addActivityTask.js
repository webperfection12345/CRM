import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../config/url";
import { postAPI } from "../config/apiMethod";

export const addActivityTask = createAsyncThunk("addActivityTask", async () => {
  const urlDynamic =
    " https://surf.topsearchrealty.com/wp-json/activity/addtask";
  try {
    const response = await postAPI(urlDynamic);
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

const addActivityTaskSlice = createSlice({
  name: "addActivityTask",
  initialState: {
    addActivityTaskData: [],
    status: null,
  },
  extraReducers: {
    [addActivityTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [addActivityTask.fulfilled]: (state, action) => {
      state.status = "success";
      state.addActivityTaskData = action.payload;
    },
    [addActivityTask.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default addActivityTaskSlice.reducer;
