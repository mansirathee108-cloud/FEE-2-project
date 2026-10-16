import { createSlice } from '@reduxjs/toolkit';
import { loadCityData } from './persistence.js';

const citySlice = createSlice({
  name: 'city',
  initialState: loadCityData(),
  reducers: {
    activityAdded(state, action) {
      state.submissions.unshift(action.payload);
    },
    panicModeSet(state, action) {
      state.panicActive = action.payload;
    },
    cityDataReplaced(_state, action) {
      return action.payload;
    },
  },
});

export const { activityAdded, panicModeSet, cityDataReplaced } = citySlice.actions;
export default citySlice.reducer;
