import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from "../modules/loginUser";
import getPropertiesReducer from "../modules/getProperties";
import getSearchPropertiesReducer from "../modules/getSearchProperties";
import getPropertiesDetailsReducer from "../modules/getPropertiesDetails";
import getContactsReducer from "../modules/getContacts";
import getSearchHistoryReducer from "../modules/getSearchHistory";
import getDashbaordDataReducer from "../modules/getDashboardData";
import getMyClientListReducer from "../modules/getMyClientList";
import updateContactReducer from "../modules/deleteContact";
import getClientDetailsReducer from "../modules/getMyClientDetails";
import activityHistoryReducers from "../modules/activityHistory";
import addActivityTaskReducers from "../modules/addActivityTask";
import activityAddnoteReducers from "../modules/activityAddnote";
import transectionActivityReducer from "../modules/transectionActivity";

export const store = configureStore({
  reducer: {
    loginUser: loginUserReducer,
    getProperties: getPropertiesReducer,
    getSearchProperties: getSearchPropertiesReducer,
    getPropertiesDetails: getPropertiesDetailsReducer,
    getContacts: getContactsReducer,
    getSearchHistory: getSearchHistoryReducer,
    getDashbaordData: getDashbaordDataReducer,
    getMyClientList: getMyClientListReducer,
    updateContact: updateContactReducer,
    getClientDetails: getClientDetailsReducer,
    activityHistory: activityHistoryReducers,
    addActivityTask: addActivityTaskReducers,
    activityAddnote: activityAddnoteReducers,
    transectioActivity: transectionActivityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      hasError: true,
      errorName: "ValidationError",
      errorMessage: "Foo must be greater than Bar",
    }),
});
