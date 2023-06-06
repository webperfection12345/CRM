import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getAPI} from '../config/apiMethod';
import {url} from '../config/url';

export const getSearchProperties = createAsyncThunk(
  'getSearchProperties',
  async text => {
    const urlDynamic =
      'https://surf.topsearchrealty.com/wp-json/wp/v2/search/?search=' + text;
    return await getAPI(urlDynamic)
      .then(async response => {
        const {data} = response;
        return data;
      })
      .catch(e => {
        console.log(e);
        if (e.response) {
          console.log('api issue', e.response);
        } else if (e.request) {
          console.log('api issue', e.response);
        } else {
          console.log('api issue', e.response);
        }
      });
  },
);

const getSearchPropertiesSlice = createSlice({
  name: 'getSearchProperties',
  initialState: {
    getSearchPropertiesData: [],
    status: null,
  },
  extraReducers: {
    [getSearchProperties.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getSearchProperties.fulfilled]: (state, action) => {
      state.status = 'success';
      state.getSearchPropertiesData = action.payload;
    },
    [getSearchProperties.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default getSearchPropertiesSlice.reducer;
