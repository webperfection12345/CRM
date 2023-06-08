import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const transectioActivity = createAsyncThunk(
  "transectioActivity",
  async () => {
    const id = await AsyncStorage.getItem("userId");

    const urlDynamic =
      "https://surf.topsearchrealty.com/wp-json/activity/transectionactivity?Agentid=" +
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
  }
);

const transectioActivitySlice = createSlice({
  name: "transectioActivity",
  initialState: {
    transectioActivityData: [],
    status: null,
  },
  extraReducers: {
    [transectioActivity.pending]: (state, action) => {
      state.status = "loading";
    },
    [transectioActivity.fulfilled]: (state, action) => {
      state.status = "success";
      state.transectioActivityData = action.payload;
    },
    [transectioActivity.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default transectioActivitySlice.reducer;
