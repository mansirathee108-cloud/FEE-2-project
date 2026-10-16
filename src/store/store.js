import { configureStore } from '@reduxjs/toolkit';
import cityReducer, { cityDataReplaced } from './citySlice.js';
import locationReducer from './locationSlice.js';
import { loadCityData, persistCityData } from './persistence.js';

export const store = configureStore({
  reducer: {
    city: cityReducer,
    location: locationReducer,
  },
});

let syncingFromStorage = false;

store.subscribe(() => {
  if (!syncingFromStorage) {
    persistCityData(store.getState().city);
  }
});

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'cityData') {
      syncingFromStorage = true;
      store.dispatch(cityDataReplaced(loadCityData()));
      syncingFromStorage = false;
    }
  });
}
