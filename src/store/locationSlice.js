import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const LOCATION_CACHE_KEY = 'approximateLocation';

function readCachedLocation() {
  try {
    const cached = JSON.parse(localStorage.getItem(LOCATION_CACHE_KEY) || 'null');
    if (
      cached &&
      cached.expiresAt > Date.now() &&
      Number.isFinite(cached.lat) &&
      Number.isFinite(cached.lon)
    ) {
      return cached;
    }
  } catch {
    return null;
  }
  return null;
}

function requestDeviceLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Browser location is unavailable.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ lat: coords.latitude, lon: coords.longitude }),
      reject,
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 8000 },
    );
  });
}

export const resolveLocation = createAsyncThunk(
  'location/resolve',
  async (_, { signal }) => {
    try {
      const coordinates = await requestDeviceLocation();
      return { coordinates, label: 'Your area', source: 'device' };
    } catch {
      const providers = ['https://ipwho.is/', 'https://ipapi.co/json/'];

      for (const url of providers) {
        try {
          const response = await fetch(url, { signal });
          const result = await response.json();
          const lat = Number(result.latitude);
          const lon = Number(result.longitude);
          if (
            !response.ok ||
            result.success === false ||
            !Number.isFinite(lat) ||
            !Number.isFinite(lon)
          ) {
            continue;
          }

          const label = result.city || 'Your area';
          const cached = {
            lat,
            lon,
            city: label,
            expiresAt: Date.now() + 12 * 60 * 60 * 1000,
          };
          try {
            localStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(cached));
          } catch {
            // This visit can use the coordinates even when storage is unavailable.
          }

          return { coordinates: { lat, lon }, label, source: 'ip' };
        } catch (error) {
          if (error.name === 'AbortError') throw error;
        }
      }

      const cached = readCachedLocation();
      if (cached) {
        return {
          coordinates: { lat: cached.lat, lon: cached.lon },
          label: cached.city || 'Your area',
          source: 'cache',
        };
      }

      throw new Error(
        'Could not determine your location. Check your connection and allow location access.',
      );
    }
  },
  {
    condition: (_, { getState }) => getState().location.status === 'idle',
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    coordinates: null,
    label: '',
    source: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resolveLocation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resolveLocation.fulfilled, (state, action) => {
        state.coordinates = action.payload.coordinates;
        state.label = action.payload.label;
        state.source = action.payload.source;
        state.status = 'succeeded';
      })
      .addCase(resolveLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Could not determine your location.';
      });
  },
});

export default locationSlice.reducer;
