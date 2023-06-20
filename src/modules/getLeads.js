import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAPI } from "../config/apiMethod";
import { url } from "../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLeads = createAsyncThunk("getLeads", async () => {
  const id = await AsyncStorage.getItem("userId");
  const urlDynamic =
    " https://surf.topsearchrealty.com/wp-json/leads/leadsall?agentid=" + id;
  return await getAPI(urlDynamic)
    .then(async (response) => {
      console.log(response, "leadsresponse");
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

export default getLeads;
