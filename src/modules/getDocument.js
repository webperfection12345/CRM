import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";

export const getDocument = createAsyncThunk("getDocument", async () => {
  const urlDynamic = "https://surf.topsearchrealty.com/api/v1/docusign/";
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
});

const getDocumentSlice = createSlice({
  name: "getDocument",
  initialState: {
    getDocumentData: [],
    status: null,
  },
  extraReducers: {
    [getDocument.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDocument.fulfilled]: (state, action) => {
      state.status = "success";
      state.getDocumentData = action.payload;
    },
    [getDocument.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default getDocumentSlice.reducer;
