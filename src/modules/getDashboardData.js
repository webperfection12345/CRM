import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getDashboardData = createAsyncThunk(
  "getDashboardData",
  async (dispatch) => {
    const id = await AsyncStorage.getItem("userId");
    let data = {
      user_id: id,
    };
    return await postAPI(url.BASE_URL + "wp-json/Dashboard/dashboard", data)
      .then(async (response) => {
        const { data } = response;
        return data;
      })
      .catch((e) => {
        console.log(e);
        //  console.log('error');
        if (e.response) {
          console.log("api issue", e.response);
          console.log(e.response.data.message);
        } else if (e.request) {
          console.log("error");
        } else {
          console.log("error");
        }
      });
  }
);

const getDashboardDataSlice = createSlice({
  name: "getDashboardData",
  initialState: {
    bookData: [],
    bookStatus: null,
  },
  extraReducers: {
    [getDashboardData.pending]: (state, action) => {
      state.bookStatus = "loading";
    },
    [getDashboardData.fulfilled]: (state, action) => {
      state.bookStatus = "success";
      state.bookData = action.payload;
    },
    [getDashboardData.rejected]: (state, action) => {
      state.bookStatus = "failed";
    },
  },
});

export default getDashboardDataSlice.reducer;
