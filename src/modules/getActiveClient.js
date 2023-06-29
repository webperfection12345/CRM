// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getAPI } from "../config/apiMethod";
// import { url } from "../config/url";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const getRatings = createAsyncThunk("getRatings", async () => {
//   const urlDynamic =
//     "https://surf.topsearchrealty.com/api/v1/googleapi/allactivedata";
//   return await getAPI(urlDynamic)
//     .then(async (response) => {
//       console.log(response);
//       const { data } = response;
//       return data;
//     })
//     .catch((e) => {
//       console.log(e);
//       if (e.response) {
//         console.log("api issue", e.response);
//       } else if (e.request) {
//         console.log("api issue", e.response);
//       } else {
//         console.log("api issue", e.response);
//       }
//     });
// });

// const getRatingsSlice = createSlice({
//   name: "getRatings",
//   initialState: {
//     getRatingsData: [],
//     status: null,
//   },
//   extraReducers: {
//     [getRatings.pending]: (state, action) => {
//       state.status = "loading";
//     },
//     [getRatings.fulfilled]: (state, action) => {
//       state.status = "success";
//       state.getContactsData = action.payload;
//     },
//     [getRatings.rejected]: (state, action) => {
//       state.status = "failed";
//     },
//   },
// });

// export default getRatingsSlice.reducer;
